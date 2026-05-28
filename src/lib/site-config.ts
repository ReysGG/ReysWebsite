import { unstable_cache } from "next/cache";
import db from "@/lib/db";
import { defaultSiteConfig } from "@/lib/default-site-config";
import type { SimpleTextItemConfig, SiteConfig } from "@/lib/site-config-types";

export { defaultSiteConfig } from "@/lib/default-site-config";
export type {
  FaqItemConfig,
  PricingTierConfig,
  ServiceItemConfig,
  SimpleTextItemConfig,
  SiteConfig,
  StatItemConfig,
  TrustStripConfig,
  WorkflowStepConfig,
} from "@/lib/site-config-types";

export const SITE_CONFIG_TAG = "site-config";
export const SITE_CONFIG_KEY = "landing-page";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function isSiteConfig(value: unknown): value is Partial<SiteConfig> {
  if (!isRecord(value)) return false;
  return Boolean(value.hero || value.stats || value.services || value.workflow || value.solutions || value.pricing || value.cta || value.faq);
}

function normalizeTrustStripItems(value: unknown): SimpleTextItemConfig[] {
  if (!Array.isArray(value)) return defaultSiteConfig.trustStrip.items;

  return value.map((item, index) => {
    const fallback = defaultSiteConfig.trustStrip.items[index] ?? { title: "", description: "" };
    if (typeof item === "string") {
      return { title: item, description: fallback.description };
    }
    if (isRecord(item)) {
      return {
        title: typeof item.title === "string" && item.title.trim() ? item.title : fallback.title,
        description: typeof item.description === "string" && item.description.trim() ? item.description : fallback.description,
      };
    }
    return fallback;
  });
}

function mergeSiteConfig(value: Partial<SiteConfig>): SiteConfig {
  return {
    ...defaultSiteConfig,
    ...value,
    hero: {
      ...defaultSiteConfig.hero,
      ...value.hero,
      scopePreview: {
        ...defaultSiteConfig.hero.scopePreview,
        ...value.hero?.scopePreview,
      },
    },
    stats: Array.isArray(value.stats) ? value.stats : defaultSiteConfig.stats,
    trustStrip: Array.isArray(value.trustStrip)
      ? { ...defaultSiteConfig.trustStrip, items: normalizeTrustStripItems(value.trustStrip) }
      : {
          ...defaultSiteConfig.trustStrip,
          ...value.trustStrip,
          items: normalizeTrustStripItems(value.trustStrip?.items),
        },
    problems: {
      ...defaultSiteConfig.problems,
      ...value.problems,
      items: Array.isArray(value.problems?.items) ? value.problems.items : defaultSiteConfig.problems.items,
    },
    services: {
      ...defaultSiteConfig.services,
      ...value.services,
      items: Array.isArray(value.services?.items) ? value.services.items : defaultSiteConfig.services.items,
    },
    workflow: {
      ...defaultSiteConfig.workflow,
      ...value.workflow,
      rotatingWords: Array.isArray(value.workflow?.rotatingWords) ? value.workflow.rotatingWords : defaultSiteConfig.workflow.rotatingWords,
      steps: Array.isArray(value.workflow?.steps) ? value.workflow.steps : defaultSiteConfig.workflow.steps,
    },
    solutions: {
      ...defaultSiteConfig.solutions,
      ...value.solutions,
      items: Array.isArray(value.solutions?.items) ? value.solutions.items : defaultSiteConfig.solutions.items,
    },
    pricing: {
      ...defaultSiteConfig.pricing,
      ...value.pricing,
      tiers: Array.isArray(value.pricing?.tiers) ? value.pricing.tiers : defaultSiteConfig.pricing.tiers,
    },
    whatYouGet: {
      ...defaultSiteConfig.whatYouGet,
      ...value.whatYouGet,
      items: Array.isArray(value.whatYouGet?.items) ? value.whatYouGet.items : defaultSiteConfig.whatYouGet.items,
    },
    cta: { ...defaultSiteConfig.cta, ...value.cta },
    faq: {
      ...defaultSiteConfig.faq,
      ...value.faq,
      items: Array.isArray(value.faq?.items) ? value.faq.items : defaultSiteConfig.faq.items,
    },
  };
}

export const getSiteConfig = unstable_cache(
  async (): Promise<SiteConfig> => {
    try {
      const row = await db.siteConfig.findUnique({ where: { key: SITE_CONFIG_KEY } });
      if (row && isSiteConfig(row.value)) {
        return mergeSiteConfig(row.value);
      }
    } catch {
      // Keep the public website usable if the database is unavailable.
    }

    return defaultSiteConfig;
  },
  ["site-config"],
  { tags: [SITE_CONFIG_TAG], revalidate: 3600 },
);
