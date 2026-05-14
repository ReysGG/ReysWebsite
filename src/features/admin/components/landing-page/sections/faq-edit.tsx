import type { SiteConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

export function getFaqEditFields(config: SiteConfig): InlineEditField[] {
  const section = "faq" as const;
  return [
    { section, label: "Eyebrow FAQ", name: "faq.eyebrow", value: config.faq.eyebrow, hotspotClassName: "left-[18%] top-[21%] h-8 w-48 -translate-x-1/2" },
    { section, label: "Heading FAQ", name: "faq.heading", value: config.faq.heading, hotspotClassName: "left-[22%] top-[32%] h-24 w-80 -translate-x-1/2" },
    ...config.faq.items.flatMap((item, index) => [
      { section, label: `FAQ ${index + 1} pertanyaan`, name: `faq.items.${index}.question`, value: item.question, textarea: true, hotspotClassName: `left-[64%] top-[${22 + index * 12}%] h-12 w-[36rem] -translate-x-1/2` },
      { section, label: `FAQ ${index + 1} jawaban`, name: `faq.items.${index}.answer`, value: item.answer, textarea: true, hotspotClassName: `left-[64%] top-[${28 + index * 12}%] h-12 w-[36rem] -translate-x-1/2` },
    ]),
  ];
}
