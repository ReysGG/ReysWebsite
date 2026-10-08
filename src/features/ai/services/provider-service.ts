import "server-only";

import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogle } from "@ai-sdk/google";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import type { ImageModelV4, LanguageModelV4 } from "@ai-sdk/provider";
import { generateText } from "ai";
import type { AiProviderType } from "@prisma/client";
import db from "@/lib/db";
import { decryptSecret, encryptSecret, maskSecret } from "@/features/ai/lib/crypto";
import { PROVIDER_META } from "@/features/ai/lib/provider-catalog";

export type AiProviderView = {
  id: string;
  name: string;
  type: AiProviderType;
  baseUrl: string | null;
  models: string[];
  defaultModel: string;
  imageModel: string | null;
  priority: number;
  enabled: boolean;
  keyPreview: string;
  lastError: string | null;
  lastErrorAt: string | null;
  lastUsedAt: string | null;
};

export type AiProviderInput = {
  name: string;
  type: AiProviderType;
  baseUrl?: string | null;
  apiKey?: string | null; // empty on update = keep existing key
  models: string[];
  defaultModel: string;
  imageModel?: string | null;
  enabled: boolean;
};

type ProviderSecretRecord = {
  id: string;
  name: string;
  type: AiProviderType;
  baseUrl: string | null;
  apiKeyEnc: string;
  defaultModel: string;
  imageModel: string | null;
};

const secretSelect = { id: true, name: true, type: true, baseUrl: true, apiKeyEnc: true, defaultModel: true, imageModel: true } as const;

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://buildwithreys.com";
}

function normalizeBaseUrl(value?: string | null) {
  const trimmed = value?.trim().replace(/\/+$/, "");
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error();
    return url.toString().replace(/\/+$/, "");
  } catch {
    throw new Error("Base URL tidak valid.");
  }
}

function resolveBaseUrl(provider: Pick<ProviderSecretRecord, "type" | "baseUrl">) {
  return provider.baseUrl || PROVIDER_META[provider.type].defaultBaseUrl;
}

// ---------------------------------------------------------------- SDK factories

function createSdkProvider(provider: ProviderSecretRecord) {
  const apiKey = decryptSecret(provider.apiKeyEnc);
  const baseURL = provider.baseUrl ?? undefined;
  switch (provider.type) {
    case "OPENAI": {
      const sdk = createOpenAI({ apiKey, baseURL });
      return { language: (id: string) => sdk(id), image: (id: string) => sdk.image(id) };
    }
    case "ANTHROPIC": {
      const sdk = createAnthropic({ apiKey, baseURL });
      return { language: (id: string) => sdk(id), image: null };
    }
    case "GOOGLE": {
      const sdk = createGoogle({ apiKey, baseURL });
      return { language: (id: string) => sdk(id), image: (id: string) => sdk.image(id) };
    }
    case "OPENROUTER":
    case "OPENAI_COMPATIBLE": {
      const sdk = createOpenAICompatible({
        name: provider.type === "OPENROUTER" ? "openrouter" : "compatible",
        baseURL: resolveBaseUrl(provider),
        apiKey,
        includeUsage: true,
        headers: provider.type === "OPENROUTER" ? { "HTTP-Referer": siteUrl(), "X-Title": "Buildwithreys AI Studio" } : undefined,
      });
      return { language: (id: string) => sdk.chatModel(id), image: (id: string) => sdk.imageModel(id) };
    }
  }
}

export function buildLanguageModel(provider: ProviderSecretRecord, modelId?: string): LanguageModelV4 {
  return createSdkProvider(provider).language(modelId || provider.defaultModel);
}

export function buildImageModel(provider: ProviderSecretRecord): ImageModelV4 | null {
  if (!provider.imageModel) return null;
  const sdk = createSdkProvider(provider);
  return sdk.image ? sdk.image(provider.imageModel) : null;
}

// ---------------------------------------------------------------- queries

export async function listProviders(): Promise<AiProviderView[]> {
  const rows = await db.aiProvider.findMany({
    orderBy: [{ priority: "asc" }, { createdAt: "asc" }],
    select: {
      id: true, name: true, type: true, baseUrl: true, apiKeyEnc: true, models: true, defaultModel: true, imageModel: true,
      priority: true, enabled: true, lastError: true, lastErrorAt: true, lastUsedAt: true,
    },
  });
  return rows.map(({ apiKeyEnc, ...row }) => {
    let keyPreview: string;
    try {
      keyPreview = maskSecret(decryptSecret(apiKeyEnc));
    } catch {
      keyPreview = "⚠ tidak bisa didekripsi (AI_ENCRYPTION_KEY berubah?)";
    }
    return {
      ...row,
      keyPreview,
      lastErrorAt: row.lastErrorAt?.toISOString() ?? null,
      lastUsedAt: row.lastUsedAt?.toISOString() ?? null,
    };
  });
}

/** Enabled providers in fallback order, with secrets — server use only. */
export async function getEnabledProviderSecrets(): Promise<ProviderSecretRecord[]> {
  return db.aiProvider.findMany({
    where: { enabled: true },
    orderBy: [{ priority: "asc" }, { createdAt: "asc" }],
    select: secretSelect,
  });
}

export async function countEnabledProviders() {
  return db.aiProvider.count({ where: { enabled: true } });
}

async function getProviderSecret(id: string) {
  const provider = await db.aiProvider.findUnique({ where: { id }, select: secretSelect });
  if (!provider) throw new Error("Provider tidak ditemukan.");
  return provider;
}

// ---------------------------------------------------------------- mutations

function cleanModels(models: string[], defaultModel: string) {
  return Array.from(new Set([defaultModel, ...models].map((m) => m.trim()).filter(Boolean))).slice(0, 200);
}

export async function createProvider(input: AiProviderInput) {
  if (!input.apiKey?.trim()) throw new Error("API key wajib diisi.");
  if (!input.defaultModel.trim()) throw new Error("Default model wajib diisi.");
  const baseUrl = normalizeBaseUrl(input.baseUrl);
  if (PROVIDER_META[input.type].baseUrlRequired && !baseUrl) throw new Error("Base URL wajib untuk provider ini.");

  const last = await db.aiProvider.findFirst({ orderBy: { priority: "desc" }, select: { priority: true } });
  return db.aiProvider.create({
    data: {
      name: input.name.trim() || PROVIDER_META[input.type].label,
      type: input.type,
      baseUrl,
      apiKeyEnc: encryptSecret(input.apiKey.trim()),
      models: cleanModels(input.models, input.defaultModel),
      defaultModel: input.defaultModel.trim(),
      imageModel: input.imageModel?.trim() || null,
      enabled: input.enabled,
      priority: (last?.priority ?? -1) + 1,
    },
    select: { id: true },
  });
}

export async function updateProvider(id: string, input: AiProviderInput) {
  if (!input.defaultModel.trim()) throw new Error("Default model wajib diisi.");
  const baseUrl = normalizeBaseUrl(input.baseUrl);
  if (PROVIDER_META[input.type].baseUrlRequired && !baseUrl) throw new Error("Base URL wajib untuk provider ini.");

  return db.aiProvider.update({
    where: { id },
    data: {
      name: input.name.trim() || PROVIDER_META[input.type].label,
      type: input.type,
      baseUrl,
      ...(input.apiKey?.trim() ? { apiKeyEnc: encryptSecret(input.apiKey.trim()) } : {}),
      models: cleanModels(input.models, input.defaultModel),
      defaultModel: input.defaultModel.trim(),
      imageModel: input.imageModel?.trim() || null,
      enabled: input.enabled,
    },
    select: { id: true },
  });
}

export async function deleteProvider(id: string) {
  await db.aiProvider.delete({ where: { id } });
}

export async function setProviderEnabled(id: string, enabled: boolean) {
  await db.aiProvider.update({ where: { id }, data: { enabled }, select: { id: true } });
}

/** Persists a new fallback order: index in `orderedIds` becomes the priority. */
export async function reorderProviders(orderedIds: string[]) {
  await db.$transaction(
    orderedIds.map((id, index) => db.aiProvider.update({ where: { id }, data: { priority: index }, select: { id: true } })),
  );
}

export async function recordProviderSuccess(id: string) {
  await db.aiProvider.update({ where: { id }, data: { lastUsedAt: new Date() }, select: { id: true } }).catch(() => undefined);
}

export async function recordProviderError(id: string, message: string) {
  await db.aiProvider
    .update({ where: { id }, data: { lastError: message.slice(0, 1000), lastErrorAt: new Date() }, select: { id: true } })
    .catch(() => undefined);
}

// ---------------------------------------------------------------- diagnostics

export async function testProvider(id: string, modelId?: string) {
  const provider = await getProviderSecret(id);
  const started = Date.now();
  try {
    const result = await generateText({
      model: buildLanguageModel(provider, modelId),
      prompt: "Reply with exactly: OK",
      maxOutputTokens: 16,
      maxRetries: 0,
      timeout: 30_000,
    });
    await db.aiProvider.update({ where: { id }, data: { lastUsedAt: new Date(), lastError: null, lastErrorAt: null }, select: { id: true } });
    return { ok: true as const, latencyMs: Date.now() - started, reply: result.text.slice(0, 80) };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await recordProviderError(id, message);
    return { ok: false as const, latencyMs: Date.now() - started, error: message.slice(0, 500) };
  }
}

/** Lists model ids from the provider's API (OpenAI-style /models, Anthropic /models, Gemini models.list). */
export async function fetchProviderModels(id: string): Promise<string[]> {
  const provider = await getProviderSecret(id);
  const apiKey = decryptSecret(provider.apiKeyEnc);
  const base = resolveBaseUrl(provider);
  const signal = AbortSignal.timeout(20_000);

  if (provider.type === "ANTHROPIC") {
    const res = await fetch(`${base}/models?limit=100`, { headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01" }, signal });
    if (!res.ok) throw new Error(`Gagal mengambil model (HTTP ${res.status}).`);
    const json = (await res.json()) as { data?: { id: string }[] };
    return (json.data ?? []).map((m) => m.id);
  }

  if (provider.type === "GOOGLE") {
    const res = await fetch(`${base}/models?pageSize=200`, { headers: { "x-goog-api-key": apiKey }, signal });
    if (!res.ok) throw new Error(`Gagal mengambil model (HTTP ${res.status}).`);
    const json = (await res.json()) as { models?: { name: string; supportedGenerationMethods?: string[] }[] };
    return (json.models ?? [])
      .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
      .map((m) => m.name.replace(/^models\//, ""));
  }

  const res = await fetch(`${base}/models`, { headers: { Authorization: `Bearer ${apiKey}` }, signal });
  if (!res.ok) throw new Error(`Gagal mengambil model (HTTP ${res.status}).`);
  const json = (await res.json()) as { data?: { id: string }[] };
  return (json.data ?? []).map((m) => m.id).sort();
}

export async function saveProviderModels(id: string, models: string[]) {
  const provider = await db.aiProvider.findUnique({ where: { id }, select: { defaultModel: true } });
  if (!provider) throw new Error("Provider tidak ditemukan.");
  await db.aiProvider.update({ where: { id }, data: { models: cleanModels(models, provider.defaultModel) }, select: { id: true } });
}
