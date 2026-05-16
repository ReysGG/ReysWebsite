"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Globe,
  FileText,
  Briefcase,
  MessageCircle,
  Settings,
  ChevronDown,
  ChevronRight,
  Plus,
  List,
  Image as ImageIcon,
  ArrowLeft,
  Menu,
  X,
  PencilLine,
  Type,
  BarChart3,
  ListChecks,
  DatabaseZap,
  FileWarning,
  PackageCheck,
  MousePointerClick,
  DollarSign,
  Megaphone,
  CircleHelp,
  Mail,
  MessageSquareText,
  Send,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";

type SubItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type NavItem = {
  label: string;
  href?: string;
  basePath?: string;
  icon: React.ReactNode;
  subItems?: SubItem[];
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const LANDING_SECTIONS: SubItem[] = [
  { label: "Sync Copy", href: "/admin/landing-page/sync", icon: <DatabaseZap className="h-3.5 w-3.5" /> },
  { label: "Hero", href: "/admin/landing-page/hero", icon: <Type className="h-3.5 w-3.5" /> },
  { label: "Trust Strip", href: "/admin/landing-page/trustStrip", icon: <DatabaseZap className="h-3.5 w-3.5" /> },
  { label: "Problem", href: "/admin/landing-page/problems", icon: <FileWarning className="h-3.5 w-3.5" /> },
  { label: "Statistik", href: "/admin/landing-page/stats", icon: <BarChart3 className="h-3.5 w-3.5" /> },
  { label: "Layanan", href: "/admin/landing-page/services", icon: <ListChecks className="h-3.5 w-3.5" /> },
  { label: "Workflow", href: "/admin/landing-page/workflow", icon: <MousePointerClick className="h-3.5 w-3.5" /> },
  { label: "Pricing", href: "/admin/landing-page/pricing", icon: <DollarSign className="h-3.5 w-3.5" /> },
  { label: "What You Get", href: "/admin/landing-page/whatYouGet", icon: <PackageCheck className="h-3.5 w-3.5" /> },
  { label: "CTA Akhir", href: "/admin/landing-page/cta", icon: <Megaphone className="h-3.5 w-3.5" /> },
  { label: "FAQ", href: "/admin/landing-page/faq", icon: <CircleHelp className="h-3.5 w-3.5" /> },
];

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: <LayoutDashboard className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Website",
    items: [
      {
        label: "Landing Page",
        basePath: "/admin/landing-page",
        icon: <Globe className="h-4 w-4" />,
        subItems: LANDING_SECTIONS,
      },
    ],
  },
  {
    title: "Blog",
    items: [
      {
        label: "Blog Content",
        basePath: "/admin/blog",
        icon: <FileText className="h-4 w-4" />,
        subItems: [
          { label: "Overview Artikel", href: "/admin/blog", icon: <List className="h-3.5 w-3.5" /> },
          { label: "Published", href: "/admin/blog/published", icon: <Send className="h-3.5 w-3.5" /> },
          { label: "Draft", href: "/admin/blog/drafts", icon: <PencilLine className="h-3.5 w-3.5" /> },
          { label: "SEO Issues", href: "/admin/blog/seo", icon: <AlertTriangle className="h-3.5 w-3.5" /> },
          { label: "Editorial Calendar", href: "/admin/blog/calendar", icon: <CalendarDays className="h-3.5 w-3.5" /> },
          { label: "Tulis Artikel", href: "/admin/blog/create", icon: <Plus className="h-3.5 w-3.5" /> },
        ],
      },
    ],
  },
  {
    title: "Portfolio",
    items: [
      {
        label: "Portfolio Content",
        basePath: "/admin/portfolio",
        icon: <Briefcase className="h-4 w-4" />,
        subItems: [
          { label: "Semua Project", href: "/admin/portfolio", icon: <List className="h-3.5 w-3.5" /> },
          { label: "Edit Intro Portfolio", href: "/admin/portfolio/hero", icon: <ImageIcon className="h-3.5 w-3.5" /> },
        ],
      },
    ],
  },
  {
    title: "Social Proof",
    items: [
      {
        label: "Testimonials",
        basePath: "/admin/testimonials",
        icon: <MessageCircle className="h-4 w-4" />,
        subItems: [
          { label: "Daftar Testimoni", href: "/admin/testimonials", icon: <List className="h-3.5 w-3.5" /> },
          { label: "Tambah Testimoni", href: "/admin/testimonials/add", icon: <Plus className="h-3.5 w-3.5" /> },
        ],
      },
    ],
  },
  {
    title: "Audience",
    items: [
      {
        label: "Subscribers",
        href: "/admin/subscribers",
        icon: <Mail className="h-4 w-4" />,
      },
      {
        label: "Comments",
        href: "/admin/comments",
        icon: <MessageSquareText className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Promo Banner",
        href: "/admin/banner",
        icon: <Megaphone className="h-4 w-4" />,
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: <Settings className="h-4 w-4" />,
      },
    ],
  },
];

const isRouteActive = (pathname: string, href?: string, basePath?: string) => {
  if (href === "/admin") return pathname === "/admin";
  if (href) return pathname === href || pathname.startsWith(`${href}/`);
  if (basePath) return pathname === basePath || pathname.startsWith(`${basePath}/`);
  return false;
};

const getActiveSubHref = (pathname: string, subItems: SubItem[]) => {
  const exact = subItems.find((sub) => pathname === sub.href);
  if (exact) return exact.href;

  const nested = subItems
    .filter((sub) => pathname.startsWith(`${sub.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0];

  return nested?.href;
};

const NavItemRow = ({ item, collapsed }: { item: NavItem; collapsed: boolean }) => {
  const pathname = usePathname();
  const parentActive = isRouteActive(pathname, item.href, item.basePath);
  const activeSubHref = item.subItems ? getActiveSubHref(pathname, item.subItems) : undefined;
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
              ? "bg-indigo-50 text-indigo-700"
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
                      ? "bg-white text-indigo-700 ring-1 ring-indigo-100"
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

  const active = isRouteActive(pathname, item.href, item.basePath);

  return (
    <Link
      href={item.href!}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-indigo-50 text-indigo-700" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
      )}
      title={collapsed ? item.label : undefined}
    >
      <span className="shrink-0">{item.icon}</span>
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
};

export const AdminSidebar = () => {
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
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600">
              <PencilLine className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <span className="block text-sm font-bold leading-none text-neutral-900">Admin Panel</span>
              <span className="mt-0.5 block text-[10px] font-medium text-neutral-400">Content Manager</span>
            </div>
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
        {NAV_GROUPS.map((group) => (
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
};
