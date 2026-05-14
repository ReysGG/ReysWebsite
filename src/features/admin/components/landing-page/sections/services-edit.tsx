import type { SiteConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

export function getServicesEditFields(config: SiteConfig): InlineEditField[] {
  const section = "services" as const;
  return [
    { section, label: "Eyebrow layanan", name: "services.eyebrow", value: config.services.eyebrow },
    { section, label: "Heading layanan", name: "services.heading", value: config.services.heading, textarea: true },
    ...config.services.items.flatMap((item, index) => [
      { section, label: `Layanan ${index + 1} nomor`, name: `services.items.${index}.number`, value: item.number },
      { section, label: `Layanan ${index + 1} judul`, name: `services.items.${index}.title`, value: item.title },
      { section, label: `Layanan ${index + 1} deskripsi`, name: `services.items.${index}.description`, value: item.description, textarea: true },
    ]),
  ];
}
