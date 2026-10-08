/** Client-safe metadata about supported LLM provider types (no secrets, no SDK imports). */
export const AI_PROVIDER_TYPES = ["OPENAI", "ANTHROPIC", "GOOGLE", "OPENROUTER", "OPENAI_COMPATIBLE"] as const;
export type AiProviderTypeValue = (typeof AI_PROVIDER_TYPES)[number];

type ProviderMeta = {
  label: string;
  defaultBaseUrl: string;
  baseUrlRequired: boolean;
  supportsImages: boolean;
  modelPlaceholder: string;
  imageModelPlaceholder?: string;
  hint: string;
};

export const PROVIDER_META: Record<AiProviderTypeValue, ProviderMeta> = {
  OPENAI: {
    label: "OpenAI",
    defaultBaseUrl: "https://api.openai.com/v1",
    baseUrlRequired: false,
    supportsImages: true,
    modelPlaceholder: "gpt-5-mini",
    imageModelPlaceholder: "gpt-image-1",
    hint: "API key dari platform.openai.com.",
  },
  ANTHROPIC: {
    label: "Anthropic Claude",
    defaultBaseUrl: "https://api.anthropic.com/v1",
    baseUrlRequired: false,
    supportsImages: false,
    modelPlaceholder: "claude-sonnet-5-5",
    hint: "API key dari console.anthropic.com. Tidak mendukung generate gambar.",
  },
  GOOGLE: {
    label: "Google Gemini",
    defaultBaseUrl: "https://generativelanguage.googleapis.com/v1beta",
    baseUrlRequired: false,
    supportsImages: true,
    modelPlaceholder: "gemini-2.5-flash",
    imageModelPlaceholder: "imagen-4.0-generate-001",
    hint: "API key dari aistudio.google.com.",
  },
  OPENROUTER: {
    label: "OpenRouter",
    defaultBaseUrl: "https://openrouter.ai/api/v1",
    baseUrlRequired: false,
    supportsImages: true,
    modelPlaceholder: "anthropic/claude-sonnet-5-5",
    hint: "Satu key untuk ratusan model. Pastikan model mendukung tool calling.",
  },
  OPENAI_COMPATIBLE: {
    label: "OpenAI-compatible (9router, Ollama, Groq, DeepSeek, …)",
    defaultBaseUrl: "http://localhost:20128/v1",
    baseUrlRequired: true,
    supportsImages: true,
    modelPlaceholder: "cc/claude-sonnet-5-5",
    hint: "Endpoint apa pun yang kompatibel dengan OpenAI /v1/chat/completions, termasuk router self-hosted seperti 9router.",
  },
};

export function isProviderType(value: unknown): value is AiProviderTypeValue {
  return typeof value === "string" && (AI_PROVIDER_TYPES as readonly string[]).includes(value);
}
