import type { SiteConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

export function getHeroEditFields(config: SiteConfig): InlineEditField[] {
  const section = "hero" as const;
  return [
    { section, label: "Trust badge", name: "hero.trustText", value: config.hero.trustText },
    { section, label: "Headline", name: "hero.headlinePrefix", value: config.hero.headlinePrefix },
    { section, label: "Kata rotasi", name: "hero.rotatingWords", value: config.hero.rotatingWords.join("\n"), textarea: true },
    { section, label: "Deskripsi", name: "hero.description", value: config.hero.description, textarea: true },
    { section, label: "CTA utama", name: "hero.primaryCta", value: config.hero.primaryCta },
    { section, label: "CTA kedua", name: "hero.secondaryCta", value: config.hero.secondaryCta },
  ];
}
