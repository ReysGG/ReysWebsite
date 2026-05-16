import type { SiteConfig } from "@/lib/site-config";
import { getCtaEditFields } from "@/features/admin/components/landing-page/sections/cta-edit";
import { getFaqEditFields } from "@/features/admin/components/landing-page/sections/faq-edit";
import { getHeroEditFields } from "@/features/admin/components/landing-page/sections/hero-edit";
import { getPricingEditFields } from "@/features/admin/components/landing-page/sections/pricing-edit";
import { getProblemsEditFields } from "@/features/admin/components/landing-page/sections/problems-edit";
import { getServicesEditFields } from "@/features/admin/components/landing-page/sections/services-edit";
import { getStatsEditFields } from "@/features/admin/components/landing-page/sections/stats-edit";
import { getTrustStripEditFields } from "@/features/admin/components/landing-page/sections/trust-strip-edit";
import { getWhatYouGetEditFields } from "@/features/admin/components/landing-page/sections/what-you-get-edit";
import { getWorkflowEditFields } from "@/features/admin/components/landing-page/sections/workflow-edit";

export type SectionKey = "hero" | "trustStrip" | "problems" | "stats" | "services" | "workflow" | "pricing" | "whatYouGet" | "cta" | "faq";

export type InlineEditField = {
  section: SectionKey;
  label: string;
  name: string;
  value: string;
  textarea?: boolean;
  hotspotClassName?: string;
};

export type SectionMeta = {
  key: SectionKey;
  label: string;
  description: string;
};

export const LANDING_PAGE_SECTIONS: SectionMeta[] = [
  { key: "hero", label: "Hero", description: "Headline, trust badge, dan CTA utama." },
  { key: "trustStrip", label: "Trust Strip", description: "Poin trust singkat setelah hero." },
  { key: "problems", label: "Problem", description: "Pain points bisnis sebelum layanan." },
  { key: "stats", label: "Statistik", description: "Angka ringkas yang tampil setelah hero." },
  { key: "services", label: "Layanan", description: "Section service cards di homepage." },
  { key: "workflow", label: "Workflow", description: "Step proses kerja dari awal sampai delivery." },
  { key: "pricing", label: "Pricing", description: "Paket harga, fitur, dan popular badge." },
  { key: "whatYouGet", label: "What You Get", description: "Checklist deliverable project." },
  { key: "cta", label: "CTA Akhir", description: "Section ajakan konsultasi sebelum FAQ." },
  { key: "faq", label: "FAQ", description: "Pertanyaan yang sering muncul." },
];

export function isSectionKey(value: string): value is SectionKey {
  return LANDING_PAGE_SECTIONS.some((section) => section.key === value);
}

export function getInlineEditFields(section: SectionKey, config: SiteConfig): InlineEditField[] {
  const fieldGetters: Record<SectionKey, (config: SiteConfig) => InlineEditField[]> = {
    hero: getHeroEditFields,
    trustStrip: getTrustStripEditFields,
    problems: getProblemsEditFields,
    stats: getStatsEditFields,
    services: getServicesEditFields,
    workflow: getWorkflowEditFields,
    pricing: getPricingEditFields,
    whatYouGet: getWhatYouGetEditFields,
    cta: getCtaEditFields,
    faq: getFaqEditFields,
  };

  return fieldGetters[section](config);
}

export function setLandingPageField(config: SiteConfig, name: string, rawValue: string): SiteConfig {
  const value = rawValue.trim();

  if (!name || !value) {
    throw new Error("Nama field dan konten wajib diisi.");
  }

  const nextConfig: SiteConfig = structuredClone(config);
  const parts = name.split(".");
  let cursor: unknown = nextConfig;

  for (let index = 0; index < parts.length - 1; index += 1) {
    const key = parts[index];
    const nextCursor = Array.isArray(cursor) ? cursor[Number(key)] : (cursor as Record<string, unknown>)[key];

    if (nextCursor === undefined || nextCursor === null) {
      throw new Error("Field landing page tidak ditemukan.");
    }

    cursor = nextCursor;
  }

  const lastKey = parts[parts.length - 1];
  if (!cursor || typeof cursor !== "object") {
    throw new Error("Field landing page tidak valid.");
  }

  const target = cursor as Record<string, unknown>;
  if (!(lastKey in target)) {
    throw new Error("Field landing page tidak ditemukan.");
  }

  const currentValue = target[lastKey];
  if (Array.isArray(currentValue)) {
    target[lastKey] = value.split("\n").map((item) => item.trim()).filter(Boolean);
  } else if (typeof currentValue === "number") {
    const nextNumber = Number(value);
    if (!Number.isFinite(nextNumber)) throw new Error("Konten harus berupa angka yang valid.");
    target[lastKey] = nextNumber;
  } else if (typeof currentValue === "boolean") {
    target[lastKey] = value === "true" || value === "on";
  } else if (typeof currentValue === "string") {
    target[lastKey] = value;
  } else {
    throw new Error("Tipe field landing page tidak didukung.");
  }

  return nextConfig;
}
