import type { SiteConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

export function getCtaEditFields(config: SiteConfig): InlineEditField[] {
  const section = "cta" as const;
  return [
    { section, label: "Badge CTA", name: "cta.badge", value: config.cta.badge },
    { section, label: "Heading atas", name: "cta.headingTop", value: config.cta.headingTop },
    { section, label: "Heading aksen", name: "cta.headingAccent", value: config.cta.headingAccent },
    { section, label: "Deskripsi CTA", name: "cta.description", value: config.cta.description, textarea: true },
    { section, label: "WhatsApp URL", name: "cta.whatsappUrl", value: config.cta.whatsappUrl },
    { section, label: "CTA utama", name: "cta.primaryCta", value: config.cta.primaryCta },
    { section, label: "CTA kedua", name: "cta.secondaryCta", value: config.cta.secondaryCta },
    { section, label: "Social proof", name: "cta.socialProof", value: config.cta.socialProof },
    { section, label: "Rating", name: "cta.ratingText", value: config.cta.ratingText },
  ];
}
