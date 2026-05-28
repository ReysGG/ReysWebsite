import type { ReactNode } from "react";

export type AdminSidebarSubItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

export type AdminSidebarNavItem = {
  label: string;
  href?: string;
  basePath?: string;
  icon: ReactNode;
  subItems?: AdminSidebarSubItem[];
};

export type AdminSidebarNavGroup = {
  title: string;
  items: AdminSidebarNavItem[];
};
