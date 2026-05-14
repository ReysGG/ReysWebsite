import type { SiteConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

const PRICING_COLUMNS = ["left-[17%]", "left-1/2", "left-[83%]"];

export function getPricingEditFields(config: SiteConfig): InlineEditField[] {
  const section = "pricing" as const;
  return [
    { section, label: "Eyebrow pricing", name: "pricing.eyebrow", value: config.pricing.eyebrow, hotspotClassName: "left-1/2 top-[12%] h-8 w-56 -translate-x-1/2" },
    { section, label: "Heading pricing", name: "pricing.heading", value: config.pricing.heading, hotspotClassName: "left-1/2 top-[18%] h-16 w-[42rem] -translate-x-1/2" },
    { section, label: "Deskripsi pricing", name: "pricing.description", value: config.pricing.description, textarea: true, hotspotClassName: "left-1/2 top-[29%] h-16 w-[36rem] -translate-x-1/2" },
    ...config.pricing.tiers.flatMap((tier, index) => {
      const column = PRICING_COLUMNS[index] ?? "left-1/2";

      return [
        { section, label: `Paket ${index + 1} judul`, name: `pricing.tiers.${index}.title`, value: tier.title, hotspotClassName: `${column} top-[47%] h-10 w-56 -translate-x-1/2` },
        { section, label: `Paket ${index + 1} harga`, name: `pricing.tiers.${index}.price`, value: tier.price, hotspotClassName: `${column} top-[55%] h-14 w-56 -translate-x-1/2` },
        { section, label: `Paket ${index + 1} timeline`, name: `pricing.tiers.${index}.timeline`, value: tier.timeline, hotspotClassName: `${column} top-[63%] h-8 w-44 -translate-x-1/2` },
        { section, label: `Paket ${index + 1} deskripsi`, name: `pricing.tiers.${index}.description`, value: tier.description, textarea: true, hotspotClassName: `${column} top-[70%] h-14 w-60 -translate-x-1/2` },
        { section, label: `Paket ${index + 1} fitur`, name: `pricing.tiers.${index}.features`, value: tier.features.join("\n"), textarea: true, hotspotClassName: `${column} top-[82%] h-36 w-64 -translate-x-1/2` },
        { section, label: `Paket ${index + 1} tombol`, name: `pricing.tiers.${index}.buttonText`, value: tier.buttonText, hotspotClassName: `${column} top-[94%] h-12 w-64 -translate-x-1/2` },
      ];
    }),
  ];
}
