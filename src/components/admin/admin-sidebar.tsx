"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, SidebarDropdown } from "@/components/ui/sidebar";
import {
  IconLayoutDashboard,
  IconBriefcase,
  IconSettings,
  IconArrowLeft,
  IconArticle,
  IconMessageCircle,
  IconListDetails,
  IconPlus,
  IconEdit,
  IconPhoto
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  
  const linkGroups = [
    {
      title: "Overview",
      links: [
        {
          label: "Dashboard",
          href: "/admin",
          icon: (
            <IconLayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
      ]
    },
    {
      title: "Content Management",
      links: [
        {
          label: "Blog Posts",
          href: "/admin/blog",
          icon: (
            <IconArticle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          isDropdown: true,
          label: "Portfolio",
          icon: (
            <IconBriefcase className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
          subLinks: [
            {
              label: "Ganti Hero",
              href: "/admin/portfolio/hero",
              icon: <IconPhoto className="text-neutral-700 dark:text-neutral-200 h-4 w-4 flex-shrink-0" />,
            },
            {
              label: "Manage Portfolio",
              href: "/admin/portfolio",
              icon: <IconEdit className="text-neutral-700 dark:text-neutral-200 h-4 w-4 flex-shrink-0" />,
            },
          ]
        },
        {
          isDropdown: true,
          label: "Testimonials",
          icon: (
            <IconMessageCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
          subLinks: [
            {
              label: "Daftar Testimoni",
              href: "/admin/testimonials",
              icon: <IconListDetails className="text-neutral-700 dark:text-neutral-200 h-4 w-4 flex-shrink-0" />,
            },
            {
              label: "Tambah Testimoni",
              href: "/admin/testimonials/add",
              icon: <IconPlus className="text-neutral-700 dark:text-neutral-200 h-4 w-4 flex-shrink-0" />,
            }
          ]
        }
      ]
    },
    {
      title: "Preferences",
      links: [
        {
          label: "Settings",
          href: "/admin/settings",
          icon: (
            <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
      ]
    }
  ];

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 bg-white dark:bg-black border-r border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mt-8 flex items-center justify-start gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-black dark:bg-white flex-shrink-0">
              <span className="font-bold text-white dark:text-black text-sm">A</span>
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-neutral-800 dark:text-white whitespace-pre"
            >
              Admin
            </motion.span>
          </div>
          <div className="mt-8 flex flex-col gap-6">
            {linkGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="flex flex-col gap-2">
                {open && (
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-2 mb-1">
                    {group.title}
                  </span>
                )}
                {group.links.map((link, idx) => {
                  if (link.isDropdown) {
                    return <SidebarDropdown key={idx} group={link as any} />;
                  }
                  return <SidebarLink key={idx} link={link as any} className="hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg px-2" />;
                })}
              </div>
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            className="hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg px-2"
            link={{
              label: "Back to Site",
              href: "/",
              icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 w-5 h-5 flex-shrink-0" />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};
