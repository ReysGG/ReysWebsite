import Link from "next/link";
import type { ReactNode } from "react";
import { Bot, CalendarClock, KeyRound, LayoutDashboard, ScrollText } from "lucide-react";

const TABS = [
  { href: "/admin/ai", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/ai/chat", label: "Chat", icon: Bot },
  { href: "/admin/ai/providers", label: "Providers", icon: KeyRound },
  { href: "/admin/ai/rules", label: "Rules", icon: ScrollText },
  { href: "/admin/ai/schedules", label: "Schedules", icon: CalendarClock },
];

export function AiStudioHeader({ title, description, active, actions }: { title: string; description: string; active: string; actions?: ReactNode }) {
  return (
    <div className="rounded-md border border-neutral-200 bg-white shadow-none">
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">AI Studio</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">{title}</h1>
          <p className="mt-1 text-sm text-neutral-500">{description}</p>
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-neutral-100 px-4" aria-label="AI Studio">
        {TABS.map((tab) => {
          const isActive = tab.href === active;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-3 text-sm font-semibold transition-colors ${
                isActive ? "border-brand text-brand-deep" : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export const aiInputClass =
  "w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand-tint";
export const aiLabelClass = "text-xs font-semibold uppercase tracking-widest text-neutral-500";
export const aiPrimaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-deep disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-soft";
export const aiSecondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:border-brand-soft hover:bg-brand-tint hover:text-brand-deep disabled:opacity-60";
