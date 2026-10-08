"use client";

import React from "react";
import Link from "next/link";
import {
  Globe,
  FileText,
  Briefcase,
  MessageCircle,
  Plus,
  ArrowRight,
} from "lucide-react";

const QUICK_ACTIONS = [
  {
    title: "Edit Landing Page",
    description: "Update teks hero, layanan, harga, dan FAQ",
    href: "/admin/landing-page",
    icon: Globe,
    color: "bg-brand-tint text-brand",
  },
  {
    title: "Tulis Artikel Baru",
    description: "Buat konten blog untuk SEO dan engagement",
    href: "/admin/blog/create",
    icon: Plus,
    color: "bg-brand-tint text-brand",
  },
  {
    title: "Kelola Portfolio",
    description: "Tambah atau update project showcase",
    href: "/admin/portfolio",
    icon: Briefcase,
    color: "bg-brand-tint text-brand",
  },
  {
    title: "Tambah Testimoni",
    description: "Tambahkan review klien terbaru",
    href: "/admin/testimonials/add",
    icon: MessageCircle,
    color: "bg-brand-tint text-brand",
  },
  {
    title: "Semua Artikel",
    description: "Lihat dan kelola semua artikel blog",
    href: "/admin/blog",
    icon: FileText,
    color: "bg-brand-tint text-brand",
  },
  {
    title: "Daftar Testimoni",
    description: "Kelola semua review klien yang tampil",
    href: "/admin/testimonials",
    icon: MessageCircle,
    color: "bg-brand-tint text-brand",
  },
];

export const OverviewBento = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {QUICK_ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.href}
            href={action.href}
            className="group flex items-start gap-4 rounded-md border border-neutral-200 bg-neutral-50 p-4 transition-all hover:border-brand-soft hover:bg-brand-tint/50 active:scale-[0.99] active:bg-brand-tint/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-soft"
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${action.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900 group-hover:text-brand transition-colors">
                {action.title}
              </p>
              <p className="mt-0.5 text-xs text-neutral-500 leading-relaxed">
                {action.description}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-neutral-300 group-hover:text-brand group-hover:translate-x-0.5 transition-all mt-0.5" />
          </Link>
        );
      })}
    </div>
  );
};
