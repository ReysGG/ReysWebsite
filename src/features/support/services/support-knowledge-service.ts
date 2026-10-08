import "server-only";

import { defaultSiteConfig, getSiteConfig } from "@/lib/site-config";
import { DEFAULT_SITE_SETTINGS, getSiteSettings } from "@/lib/site-settings";
import { getSiteUrl } from "@/lib/site-url";

const clean = (value: unknown) => (typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "");

/**
 * Compact, plain-text knowledge base for the public support chat, built from the same
 * content the landing page renders (admin-editable), so answers stay in sync with the site.
 */
export async function buildSupportKnowledge() {
  const [config, settings] = await Promise.all([
    getSiteConfig().catch(() => defaultSiteConfig),
    getSiteSettings().catch(() => DEFAULT_SITE_SETTINGS),
  ]);
  const siteUrl = getSiteUrl();
  const lines: string[] = [];

  lines.push(`# ${settings.siteName || "Buildwithreys"} — ${clean(settings.tagline)}`);
  lines.push(clean(settings.description));
  lines.push(`Website: ${siteUrl}`);
  if (settings.whatsapp) lines.push(`WhatsApp: ${settings.whatsapp}`);
  if (settings.contactEmail) lines.push(`Email: ${settings.contactEmail}`);

  lines.push("\n## Tentang layanan");
  lines.push(clean(config.hero.description));

  lines.push(`\n## ${clean(config.services.heading) || "Layanan"}`);
  config.services.items.forEach((s) => lines.push(`- ${clean(s.title)}: ${clean(s.description)}`));

  lines.push(`\n## ${clean(config.pricing.heading) || "Harga"}`);
  if (config.pricing.description) lines.push(clean(config.pricing.description));
  config.pricing.tiers.forEach((t) =>
    lines.push(`- ${clean(t.title)} — ${clean(t.price)} (estimasi ${clean(t.timeline)}): ${clean(t.description)}. Termasuk: ${t.features.map(clean).join(", ")}`),
  );

  lines.push(`\n## Alur kerja`);
  config.workflow.steps.forEach((s) => lines.push(`- ${clean(s.step)} ${clean(s.title)}: ${clean(s.description)}`));

  lines.push(`\n## ${clean(config.whatYouGet.heading) || "Yang didapat"}`);
  config.whatYouGet.items.forEach((item) => lines.push(`- ${clean(item)}`));

  if (config.solutions.items.length) {
    lines.push(`\n## ${clean(config.solutions.heading) || "Contoh solusi"}`);
    config.solutions.items.slice(0, 8).forEach((s) => lines.push(`- ${clean(s.title)}: ${clean(s.description)}`));
  }

  lines.push(`\n## FAQ`);
  config.faq.items.forEach((f) => lines.push(`- T: ${clean(f.question)}\n  J: ${clean(f.answer)}`));

  lines.push(`\n## Halaman penting`);
  lines.push(`- Blog: ${siteUrl}/blog`);
  lines.push(`- Showcase / contoh prototipe: ${siteUrl}/showcase`);
  lines.push(`- Konsultasi: ${siteUrl}/#cta`);

  return lines.filter(Boolean).join("\n").slice(0, 12_000);
}
