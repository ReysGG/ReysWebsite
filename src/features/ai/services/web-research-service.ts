import "server-only";

import { generateText, isStepCount } from "ai";
import {
  buildWebSearchSetup,
  getEnabledProviderSecrets,
  recordProviderError,
  recordProviderSuccess,
} from "@/features/ai/services/provider-service";

export type WebResearchResult =
  | { ok: true; provider: string; summary: string; sources: { url: string; title?: string }[] }
  | { ok: false; error: string };

/**
 * Runs a short, isolated research call using the first enabled provider that has built-in web search
 * (Claude web search, OpenAI web search, Gemini Google Search, OpenRouter :online). Kept separate from
 * the main agent so provider-specific search tools never clash with our function tools or the fallback chain.
 */
export async function runWebResearch(query: string, focus?: string): Promise<WebResearchResult> {
  const providers = await getEnabledProviderSecrets();
  const candidates = providers
    .map((provider) => {
      try {
        const setup = buildWebSearchSetup(provider);
        return setup ? { provider, setup } : null;
      } catch {
        return null;
      }
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  if (candidates.length === 0) {
    return {
      ok: false,
      error: "Tidak ada provider aktif dengan web search bawaan (Claude, OpenAI, Gemini, atau OpenRouter). Tulis dari pengetahuan model saja.",
    };
  }

  const errors: string[] = [];
  for (const { provider, setup } of candidates) {
    try {
      const result = await generateText({
        model: setup.model,
        tools: setup.tools,
        stopWhen: isStepCount(4),
        maxRetries: 1,
        timeout: { totalMs: 120_000 },
        instructions:
          "Kamu adalah peneliti. Cari di web, lalu tulis ringkasan faktual dalam Bahasa Indonesia (maks 350 kata): poin-poin penting, angka/statistik, tanggal, harga, dan tren terbaru. Sebutkan sumber untuk setiap klaim penting. Jangan mengarang.",
        prompt: `Riset: ${query}${focus ? `\nFokus: ${focus}` : ""}`,
      });
      const sources = Array.from(
        new Map(
          result.sources
            .filter((s): s is Extract<typeof s, { sourceType: "url" }> => s.sourceType === "url")
            .map((s) => [s.url, { url: s.url, title: s.title }]),
        ).values(),
      ).slice(0, 10);
      void recordProviderSuccess(provider.id);
      return { ok: true, provider: provider.name, summary: result.text.slice(0, 4000), sources };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`${provider.name}: ${message.slice(0, 200)}`);
      void recordProviderError(provider.id, `web search: ${message}`);
    }
  }
  return { ok: false, error: `Web search gagal di semua provider. ${errors.join(" | ")}` };
}
