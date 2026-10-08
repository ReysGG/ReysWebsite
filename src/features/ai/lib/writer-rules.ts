/** Writer rules: editorial + SEO policy injected into every AI writing session. Stored in SiteConfig. */
export type ImageSourcePreference = "stock" | "ai" | "stock-then-ai" | "none";

export type AiWriterRules = {
  language: string;
  tone: string;
  audience: string;
  brandVoice: string;
  minWords: number;
  maxWords: number;
  seoScoreThreshold: number;
  internalLinks: number;
  externalLinks: number;
  requireFaq: boolean;
  requireTldr: boolean;
  requireCta: boolean;
  ctaText: string;
  forbiddenTopics: string;
  forbiddenPhrases: string;
  extraRules: string;
  defaultCategory: string;
  authorName: string;
  imageSource: ImageSourcePreference;
  inlineImages: number;
  maxAgentSteps: number;
};

export const DEFAULT_WRITER_RULES: AiWriterRules = {
  language: "Bahasa Indonesia",
  tone: "Profesional, hangat, mudah dipahami, tidak kaku",
  audience: "Pemilik UMKM, startup, dan profesional yang butuh website/aplikasi",
  brandVoice: "Buildwithreys adalah jasa pembuatan website & aplikasi. Tulis sebagai praktisi berpengalaman yang memberi saran praktis, bukan iklan.",
  minWords: 1200,
  maxWords: 2000,
  seoScoreThreshold: 80,
  internalLinks: 2,
  externalLinks: 1,
  requireFaq: true,
  requireTldr: true,
  requireCta: true,
  ctaText: "Butuh website profesional? Konsultasi gratis dengan Buildwithreys.",
  forbiddenTopics: "Politik praktis, SARA, judi, konten dewasa",
  forbiddenPhrases: "Di era digital ini, Tidak dapat dipungkiri, Kesimpulannya",
  extraRules: "",
  defaultCategory: "",
  authorName: "Tim Buildwithreys",
  imageSource: "stock-then-ai",
  inlineImages: 1,
  maxAgentSteps: 30,
};

const clampInt = (value: unknown, min: number, max: number, fallback: number) => {
  const n = typeof value === "number" ? value : Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : fallback;
};
const str = (value: unknown, fallback: string, max = 2000) =>
  typeof value === "string" ? value.trim().slice(0, max) : fallback;
const bool = (value: unknown, fallback: boolean) => (typeof value === "boolean" ? value : fallback);

export function normalizeWriterRules(input: Partial<Record<keyof AiWriterRules, unknown>> | null | undefined): AiWriterRules {
  const d = DEFAULT_WRITER_RULES;
  const v = input ?? {};
  const minWords = clampInt(v.minWords, 300, 6000, d.minWords);
  const imageSource = ["stock", "ai", "stock-then-ai", "none"].includes(String(v.imageSource))
    ? (v.imageSource as ImageSourcePreference)
    : d.imageSource;
  return {
    language: str(v.language, d.language, 80) || d.language,
    tone: str(v.tone, d.tone, 300),
    audience: str(v.audience, d.audience, 300),
    brandVoice: str(v.brandVoice, d.brandVoice),
    minWords,
    maxWords: Math.max(minWords + 100, clampInt(v.maxWords, 400, 8000, d.maxWords)),
    seoScoreThreshold: clampInt(v.seoScoreThreshold, 40, 100, d.seoScoreThreshold),
    internalLinks: clampInt(v.internalLinks, 0, 10, d.internalLinks),
    externalLinks: clampInt(v.externalLinks, 0, 10, d.externalLinks),
    requireFaq: bool(v.requireFaq, d.requireFaq),
    requireTldr: bool(v.requireTldr, d.requireTldr),
    requireCta: bool(v.requireCta, d.requireCta),
    ctaText: str(v.ctaText, d.ctaText, 300),
    forbiddenTopics: str(v.forbiddenTopics, d.forbiddenTopics, 1000),
    forbiddenPhrases: str(v.forbiddenPhrases, d.forbiddenPhrases, 1000),
    extraRules: str(v.extraRules, d.extraRules, 4000),
    defaultCategory: str(v.defaultCategory, d.defaultCategory, 80),
    authorName: str(v.authorName, d.authorName, 80) || d.authorName,
    imageSource,
    inlineImages: clampInt(v.inlineImages, 0, 5, d.inlineImages),
    maxAgentSteps: clampInt(v.maxAgentSteps, 8, 60, d.maxAgentSteps),
  };
}
