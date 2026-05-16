import type { SiteConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

export function getProblemsEditFields(config: SiteConfig): InlineEditField[] {
  const section = "problems" as const;
  return [
    { section, label: "Eyebrow", name: "problems.eyebrow", value: config.problems.eyebrow },
    { section, label: "Heading", name: "problems.heading", value: config.problems.heading, textarea: true },
    { section, label: "Deskripsi", name: "problems.description", value: config.problems.description, textarea: true },
    ...config.problems.items.flatMap((item, index) => [
      { section, label: `Problem ${index + 1} title`, name: `problems.items.${index}.title`, value: item.title },
      { section, label: `Problem ${index + 1} deskripsi`, name: `problems.items.${index}.description`, value: item.description, textarea: true },
    ] satisfies InlineEditField[]),
  ];
}
