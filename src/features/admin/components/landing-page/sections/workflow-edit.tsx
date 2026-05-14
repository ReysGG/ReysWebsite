import type { SiteConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

const WORKFLOW_COLUMNS = ["left-[20%]", "left-[40%]", "left-[60%]", "left-[80%]"];

export function getWorkflowEditFields(config: SiteConfig): InlineEditField[] {
  const section = "workflow" as const;
  return [
    { section, label: "Eyebrow workflow", name: "workflow.eyebrow", value: config.workflow.eyebrow, hotspotClassName: "left-1/2 top-[17%] h-8 w-56 -translate-x-1/2" },
    { section, label: "Heading workflow", name: "workflow.headingPrefix", value: config.workflow.headingPrefix, hotspotClassName: "left-[43%] top-[25%] h-16 w-80 -translate-x-1/2" },
    { section, label: "Kata rotasi", name: "workflow.rotatingWords", value: config.workflow.rotatingWords.join("\n"), textarea: true, hotspotClassName: "left-[62%] top-[25%] h-16 w-72 -translate-x-1/2" },
    { section, label: "Deskripsi workflow", name: "workflow.description", value: config.workflow.description, textarea: true, hotspotClassName: "left-1/2 top-[36%] h-16 w-[36rem] -translate-x-1/2" },
    ...config.workflow.steps.flatMap((step, index) => {
      const column = WORKFLOW_COLUMNS[index] ?? "left-1/2";

      return [
        { section, label: `Step ${index + 1} nomor`, name: `workflow.steps.${index}.step`, value: step.step, hotspotClassName: `${column} top-[58%] h-20 w-20 -translate-x-1/2` },
        { section, label: `Step ${index + 1} judul`, name: `workflow.steps.${index}.title`, value: step.title, hotspotClassName: `${column} top-[72%] h-10 w-48 -translate-x-1/2` },
        { section, label: `Step ${index + 1} deskripsi`, name: `workflow.steps.${index}.description`, value: step.description, textarea: true, hotspotClassName: `${column} top-[81%] h-20 w-56 -translate-x-1/2` },
      ];
    }),
  ];
}
