"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ChevronDown, ChevronRight, Menu, X } from "lucide-react";

import { ADMIN_NAV_GROUPS } from "@/components/admin/admin-sidebar-nav";
import { getActiveAdminSubHref, isAdminRouteActive } from "@/components/admin/admin-sidebar-routing";
import type { AdminSidebarNavItem } from "@/components/admin/admin-sidebar-types";
import { cn } from "@/lib/utils";

function NavItemRow({ item, collapsed }: { item: AdminSidebarNavItem; collapsed: boolean }) {
  const pathname = usePathname();
  const parentActive = isAdminRouteActive(pathname, item.href, item.basePath);
  const activeSubHref = item.subItems ? getActiveAdminSubHref(pathname, item.subItems) : undefined;
  const [manuallyOpen, setManuallyOpen] = useState(false);
  const expanded = manuallyOpen || parentActive;

  if (item.subItems) {
    return (
      <div className="space-y-1">
        <button
          type="button"
          onClick={() => setManuallyOpen((v) => !v)}
          aria-expanded={expanded}
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            expanded
              ? "bg-[#fffcc9] text-[#ff8a00]"
              : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
          )}
          title={collapsed ? item.label : undefined}
        >
          <span className="shrink-0">{item.icon}</span>
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              {expanded ? <ChevronDown className="h-3.5 w-3.5 opacity-60" /> : <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
            </>
          )}
        </button>

        {expanded && !collapsed && (
          <div className="ml-4 flex min-w-0 flex-col gap-0.5 border-l border-neutral-200 pl-2">
            {item.subItems.map((sub) => {
              const subActive = activeSubHref === sub.href;
              return (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className={cn(
                    "flex min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                    subActive
                      ? "bg-white text-[#ff8a00] ring-1 ring-[#ffcd80]"
                      : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                  )}
                >
                  <span className="shrink-0">{sub.icon}</span>
                  <span className="min-w-0 truncate">{sub.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const active = isAdminRouteActive(pathname, item.href, item.basePath);

  return (
    <Link
      href={item.href!}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-[#fffcc9] text-[#ff8a00]" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
      )}
      title={collapsed ? item.label : undefined}
    >
      <span className="shrink-0">{item.icon}</span>
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-full flex-col overflow-x-hidden border-r border-neutral-200 bg-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Image
              src="/BWR.png"
              alt="Build With Reys"
              width={112}
              height={31}
              priority
              className="h-8 w-auto"
            />
            <span className="rounded bg-[#fffcc9] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#ff8a00]">
              Admin
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden px-3 py-4">
        {ADMIN_NAV_GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col gap-1">
            {!collapsed && (
              <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                {group.title}
              </p>
            )}
            {group.items.map((item) => (
              <NavItemRow key={item.label} item={item} collapsed={collapsed} />
            ))}
          </div>
        ))}
      </div>

      <div className="border-t border-neutral-200 px-3 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          title={collapsed ? "Kembali ke Site" : undefined}
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Kembali ke Site</span>}
        </Link>
      </div>
    </aside>
  );
}
