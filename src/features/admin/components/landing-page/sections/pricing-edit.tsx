import type { SiteConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

export function getPricingEditFields(config: SiteConfig): InlineEditField[] {
  const section = "pricing" as const;
  return [
    { section, label: "Eyebrow pricing", name: "pricing.eyebrow", value: config.pricing.eyebrow },
    { section, label: "Heading pricing", name: "pricing.heading", value: config.pricing.heading },
    { section, label: "Deskripsi pricing", name: "pricing.description", value: config.pricing.description, textarea: true },
    ...config.pricing.tiers.flatMap((tier, index) => [
      { section, label: `Paket ${index + 1} judul`, name: `pricing.${index}.title`, value: tier.title },
      { section, label: `Paket ${index + 1} harga`, name: `pricing.${index}.price`, value: tier.price },
      { section, label: `Paket ${index + 1} timeline`, name: `pricing.${index}.timeline`, value: tier.timeline },
      { section, label: `Paket ${index + 1} deskripsi`, name: `pricing.${index}.description`, value: tier.description, textarea: true },
      { section, label: `Paket ${index + 1} fitur`, name: `pricing.${index}.features`, value: tier.features.join("\n"), textarea: true },
      { section, label: `Paket ${index + 1} tombol`, name: `pricing.${index}.buttonText`, value: tier.buttonText },
    ]),
  ];
}
