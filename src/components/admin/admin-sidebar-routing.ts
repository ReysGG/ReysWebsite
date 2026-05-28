import type { AdminSidebarSubItem } from "@/components/admin/admin-sidebar-types";

export function isAdminRouteActive(pathname: string, href?: string, basePath?: string) {
  if (href === "/admin") return pathname === "/admin";
  if (href) return pathname === href || pathname.startsWith(`${href}/`);
  if (basePath) return pathname === basePath || pathname.startsWith(`${basePath}/`);
  return false;
}

export function getActiveAdminSubHref(pathname: string, subItems: AdminSidebarSubItem[]) {
  const exact = subItems.find((sub) => pathname === sub.href);
  if (exact) return exact.href;

  const nested = subItems
    .filter((sub) => pathname.startsWith(`${sub.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0];

  return nested?.href;
}
