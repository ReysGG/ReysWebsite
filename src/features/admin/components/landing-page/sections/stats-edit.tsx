import type { SiteConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

const STAT_COLUMNS = ["left-[9%]", "left-[34%]", "left-[59%]", "left-[84%]"];

export function getStatsEditFields(config: SiteConfig): InlineEditField[] {
  const section = "stats" as const;

  return config.stats.flatMap((stat, index) => {
    const column = STAT_COLUMNS[index] ?? "left-1/2";

    return [
      {
        section,
        label: `Stat ${index + 1} angka`,
        name: `stats.${index}.value`,
        value: String(stat.value),
        hotspotClassName: `${column} top-[39%] h-14 w-24 -translate-x-1/2`,
      },
      {
        section,
        label: `Stat ${index + 1} suffix`,
        name: `stats.${index}.suffix`,
        value: stat.suffix,
        hotspotClassName: `${column} top-[39%] ml-8 h-14 w-10 -translate-x-1/2`,
      },
      {
        section,
        label: `Stat ${index + 1} label`,
        name: `stats.${index}.label`,
        value: stat.label,
        hotspotClassName: `${column} top-[54%] h-8 w-44 -translate-x-1/2`,
      },
      {
        section,
        label: `Stat ${index + 1} deskripsi`,
        name: `stats.${index}.description`,
        value: stat.description,
        textarea: true,
        hotspotClassName: `${column} top-[62%] h-8 w-56 -translate-x-1/2`,
      },
    ];
  });
}
