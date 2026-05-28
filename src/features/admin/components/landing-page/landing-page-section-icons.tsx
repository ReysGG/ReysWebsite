import { BarChart3, CircleHelp, DatabaseZap, DollarSign, FileWarning, LayoutTemplate, ListChecks, Megaphone, MousePointerClick, PackageCheck } from "lucide-react";
import type { SectionKey } from "@/features/admin/lib/landing-page-edit";

export const SECTION_ICONS: Record<SectionKey, React.ReactNode> = {
  hero: <LayoutTemplate className="h-4 w-4" />,
  trustStrip: <DatabaseZap className="h-4 w-4" />,
  problems: <FileWarning className="h-4 w-4" />,
  stats: <BarChart3 className="h-4 w-4" />,
  services: <ListChecks className="h-4 w-4" />,
  workflow: <MousePointerClick className="h-4 w-4" />,
  solutions: <LayoutTemplate className="h-4 w-4" />,
  pricing: <DollarSign className="h-4 w-4" />,
  whatYouGet: <PackageCheck className="h-4 w-4" />,
  cta: <Megaphone className="h-4 w-4" />,
  faq: <CircleHelp className="h-4 w-4" />,
};
