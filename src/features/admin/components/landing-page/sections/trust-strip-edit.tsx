import type { SiteConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

export function getTrustStripEditFields(config: SiteConfig): InlineEditField[] {
  const section = "trustStrip" as const;
  return [
    {
      section,
      label: "Trust points",
      name: "trustStrip",
      value: config.trustStrip.join("\n"),
      textarea: true,
    },
  ];
}
