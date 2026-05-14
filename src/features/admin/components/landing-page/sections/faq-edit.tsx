import type { SiteConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

export function getFaqEditFields(config: SiteConfig): InlineEditField[] {
  const section = "faq" as const;
  return [
    { section, label: "Eyebrow FAQ", name: "faq.eyebrow", value: config.faq.eyebrow },
    { section, label: "Heading FAQ", name: "faq.heading", value: config.faq.heading },
    ...config.faq.items.flatMap((item, index) => [
      { section, label: `FAQ ${index + 1} pertanyaan`, name: `faq.${index}.question`, value: item.question, textarea: true },
      { section, label: `FAQ ${index + 1} jawaban`, name: `faq.${index}.answer`, value: item.answer, textarea: true },
    ]),
  ];
}
