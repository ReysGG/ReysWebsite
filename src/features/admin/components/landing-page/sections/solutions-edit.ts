import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";
import type { SiteConfig } from "@/lib/site-config";
import { DEFAULT_SOLUTIONS_CONFIG } from "@/lib/solutions-config";

export function getSolutionsEditFields(config: SiteConfig): InlineEditField[] {
  const solutions = config.solutions ?? DEFAULT_SOLUTIONS_CONFIG;
  const base: InlineEditField[] = [
    { section: "solutions", label: "Eyebrow", name: "solutions.eyebrow", value: solutions.eyebrow },
    { section: "solutions", label: "Heading", name: "solutions.heading", value: solutions.heading, textarea: true },
    { section: "solutions", label: "Description", name: "solutions.description", value: solutions.description, textarea: true },
  ];

  const itemFields = solutions.items.flatMap((item, index) => [
    { section: "solutions" as const, label: `Card ${index + 1} Title`, name: `solutions.items.${index}.title`, value: item.title },
    { section: "solutions" as const, label: `Card ${index + 1} Description`, name: `solutions.items.${index}.description`, value: item.description, textarea: true },
    { section: "solutions" as const, label: `Card ${index + 1} GIF Path`, name: `solutions.items.${index}.media`, value: item.media },
  ]);

  return [...base, ...itemFields];
}
