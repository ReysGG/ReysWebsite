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
    { section, label: "Hero visual image", name: "hero.visualImage", value: config.hero.visualImage },
    { section, label: "Scope eyebrow", name: "hero.scopePreview.eyebrow", value: config.hero.scopePreview.eyebrow },
    { section, label: "Scope title", name: "hero.scopePreview.title", value: config.hero.scopePreview.title },
    { section, label: "Scope label", name: "hero.scopePreview.projectLabel", value: config.hero.scopePreview.projectLabel },
    { section, label: "Scope pages", name: "hero.scopePreview.pages", value: config.hero.scopePreview.pages },
    { section, label: "Scope features", name: "hero.scopePreview.features", value: config.hero.scopePreview.features },
    { section, label: "Scope timeline", name: "hero.scopePreview.timeline", value: config.hero.scopePreview.timeline },
    { section, label: "Scope revisions", name: "hero.scopePreview.revisions", value: config.hero.scopePreview.revisions },
    { section, label: "Scope deliverable", name: "hero.scopePreview.deliverable", value: config.hero.scopePreview.deliverable },
    { section, label: "Scope status", name: "hero.scopePreview.status", value: config.hero.scopePreview.status },
  ];
}
