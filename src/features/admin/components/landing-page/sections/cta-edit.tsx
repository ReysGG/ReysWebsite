import type { SiteConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

export function getCtaEditFields(config: SiteConfig): InlineEditField[] {
  const section = "cta" as const;
  return [
    { section, label: "Badge CTA", name: "cta.badge", value: config.cta.badge, hotspotClassName: "left-1/2 top-[18%] h-10 w-64 -translate-x-1/2" },
    { section, label: "Heading atas", name: "cta.headingTop", value: config.cta.headingTop, hotspotClassName: "left-1/2 top-[31%] h-20 w-[42rem] -translate-x-1/2" },
    { section, label: "Heading aksen", name: "cta.headingAccent", value: config.cta.headingAccent, hotspotClassName: "left-1/2 top-[43%] h-20 w-[42rem] -translate-x-1/2" },
    { section, label: "Deskripsi CTA", name: "cta.description", value: config.cta.description, textarea: true, hotspotClassName: "left-1/2 top-[56%] h-20 w-[38rem] -translate-x-1/2" },
    { section, label: "WhatsApp URL", name: "cta.whatsappUrl", value: config.cta.whatsappUrl, hotspotClassName: "left-[39%] top-[69%] h-14 w-64 -translate-x-1/2" },
    { section, label: "CTA utama", name: "cta.primaryCta", value: config.cta.primaryCta, hotspotClassName: "left-[39%] top-[69%] h-14 w-64 -translate-x-1/2" },
    { section, label: "CTA kedua", name: "cta.secondaryCta", value: config.cta.secondaryCta, hotspotClassName: "left-[61%] top-[69%] h-14 w-56 -translate-x-1/2" },
    { section, label: "Social proof", name: "cta.socialProof", value: config.cta.socialProof, hotspotClassName: "left-[42%] top-[84%] h-10 w-72 -translate-x-1/2" },
    { section, label: "Rating", name: "cta.ratingText", value: config.cta.ratingText, hotspotClassName: "left-[62%] top-[84%] h-10 w-52 -translate-x-1/2" },
  ];
}
