import type { SiteConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

export function getWhatYouGetEditFields(config: SiteConfig): InlineEditField[] {
  const section = "whatYouGet" as const;
  return [
    { section, label: "Eyebrow", name: "whatYouGet.eyebrow", value: config.whatYouGet.eyebrow },
    { section, label: "Heading", name: "whatYouGet.heading", value: config.whatYouGet.heading, textarea: true },
    { section, label: "Deskripsi", name: "whatYouGet.description", value: config.whatYouGet.description, textarea: true },
    {
      section,
      label: "Checklist deliverable",
      name: "whatYouGet.items",
      value: config.whatYouGet.items.join("\n"),
      textarea: true,
    },
  ];
}
