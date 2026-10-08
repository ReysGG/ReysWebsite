import "server-only";

import type { ImageModelV4, LanguageModelV4, LanguageModelV4CallOptions } from "@ai-sdk/provider";
import {
  buildImageModel,
  buildLanguageModel,
  getEnabledProviderSecrets,
  recordProviderError,
  recordProviderSuccess,
} from "@/features/ai/services/provider-service";

export type ModelUsageTracker = {
  providerName: string | null;
  modelId: string | null;
  failures: { providerName: string; error: string }[];
};

type Candidate = { providerId: string; providerName: string; modelId: string; model: LanguageModelV4 };

function isAbort(error: unknown) {
  return error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError");
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

/**
 * A LanguageModel that tries each enabled provider in priority order, per model call.
 * Because fallback happens per step (not per agent run), a provider failing mid tool-loop
 * hands the conversation to the next provider instead of restarting the run.
 * For streaming, fallback only happens if the provider fails before the stream starts.
 */
function createFallbackModel(candidates: Candidate[], tracker: ModelUsageTracker): LanguageModelV4 {
  const primary = candidates[0];
  // Providers that already failed in this session are tried last, so a dead provider
  // doesn't cost a timeout/retry on every step of a long tool loop.
  const failedIds = new Set<string>();

  async function run<T>(call: (model: LanguageModelV4) => PromiseLike<T>, options: LanguageModelV4CallOptions): Promise<T> {
    let lastError: unknown;
    const ordered = [...candidates.filter((c) => !failedIds.has(c.providerId)), ...candidates.filter((c) => failedIds.has(c.providerId))];
    for (const candidate of ordered) {
      if (options.abortSignal?.aborted) break;
      try {
        const result = await call(candidate.model);
        tracker.providerName = candidate.providerName;
        tracker.modelId = candidate.modelId;
        failedIds.delete(candidate.providerId);
        void recordProviderSuccess(candidate.providerId);
        return result;
      } catch (error) {
        if (isAbort(error)) throw error;
        lastError = error;
        failedIds.add(candidate.providerId);
        tracker.failures.push({ providerName: candidate.providerName, error: errorMessage(error).slice(0, 300) });
        void recordProviderError(candidate.providerId, errorMessage(error));
      }
    }
    throw lastError ?? new Error("Semua provider AI gagal.");
  }

  return {
    specificationVersion: "v4",
    provider: "ai-studio-fallback",
    modelId: `${primary.providerName}/${primary.modelId}`,
    supportedUrls: {},
    doGenerate: (options) => run((model) => model.doGenerate(options), options),
    doStream: (options) => run((model) => model.doStream(options), options),
  };
}

export class NoProviderConfiguredError extends Error {
  constructor() {
    super("Belum ada provider AI yang aktif. Tambahkan di Admin → AI Studio → Providers.");
  }
}

/**
 * Builds the fallback chain. `preferredProviderId` / `modelOverride` move one provider
 * (optionally with a specific model) to the front of the chain.
 */
export async function getChatModel(options: { preferredProviderId?: string | null; modelOverride?: string | null } = {}) {
  const providers = await getEnabledProviderSecrets();
  if (providers.length === 0) throw new NoProviderConfiguredError();

  const ordered = options.preferredProviderId
    ? [...providers.filter((p) => p.id === options.preferredProviderId), ...providers.filter((p) => p.id !== options.preferredProviderId)]
    : providers;

  const candidates: Candidate[] = [];
  for (const provider of ordered) {
    const modelId = provider.id === options.preferredProviderId && options.modelOverride ? options.modelOverride : provider.defaultModel;
    try {
      candidates.push({ providerId: provider.id, providerName: provider.name, modelId, model: buildLanguageModel(provider, modelId) });
    } catch (error) {
      // e.g. key can't be decrypted — skip this provider but surface it.
      void recordProviderError(provider.id, errorMessage(error));
    }
  }
  if (candidates.length === 0) throw new NoProviderConfiguredError();

  const tracker: ModelUsageTracker = { providerName: null, modelId: null, failures: [] };
  return { model: createFallbackModel(candidates, tracker), tracker };
}

/** First enabled provider that has an image model configured. */
export async function getImageModel(): Promise<{ model: ImageModelV4; providerName: string; providerId: string } | null> {
  const providers = await getEnabledProviderSecrets();
  for (const provider of providers) {
    if (!provider.imageModel) continue;
    try {
      const model = buildImageModel(provider);
      if (model) return { model, providerName: provider.name, providerId: provider.id };
    } catch {
      continue;
    }
  }
  return null;
}
