import type { SiteConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

export function getWorkflowEditFields(config: SiteConfig): InlineEditField[] {
  const section = "workflow" as const;
  return [
    { section, label: "Eyebrow workflow", name: "workflow.eyebrow", value: config.workflow.eyebrow },
    { section, label: "Heading workflow", name: "workflow.headingPrefix", value: config.workflow.headingPrefix },
    { section, label: "Kata rotasi", name: "workflow.rotatingWords", value: config.workflow.rotatingWords.join("\n"), textarea: true },
    { section, label: "Deskripsi workflow", name: "workflow.description", value: config.workflow.description, textarea: true },
    ...config.workflow.steps.flatMap((step, index) => [
      { section, label: `Step ${index + 1} nomor`, name: `workflow.${index}.step`, value: step.step },
      { section, label: `Step ${index + 1} judul`, name: `workflow.${index}.title`, value: step.title },
      { section, label: `Step ${index + 1} deskripsi`, name: `workflow.${index}.description`, value: step.description, textarea: true },
    ]),
  ];
}
