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
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Tulis Artikel Baru",
    description: "Buat konten blog untuk SEO dan engagement",
    href: "/admin/blog/create",
    icon: Plus,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Kelola Portfolio",
    description: "Tambah atau update project showcase",
    href: "/admin/portfolio",
    icon: Briefcase,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Tambah Testimoni",
    description: "Tambahkan review klien terbaru",
    href: "/admin/testimonials/add",
    icon: MessageCircle,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Semua Artikel",
    description: "Lihat dan kelola semua artikel blog",
    href: "/admin/blog",
    icon: FileText,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Daftar Testimoni",
    description: "Kelola semua review klien yang tampil",
    href: "/admin/testimonials",
    icon: MessageCircle,
    color: "bg-indigo-50 text-indigo-600",
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
            className="group flex items-start gap-4 rounded-md border border-neutral-200 bg-neutral-50 p-4 transition-all hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-none"
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${action.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900 group-hover:text-indigo-700 transition-colors">
                {action.title}
              </p>
              <p className="mt-0.5 text-xs text-neutral-500 leading-relaxed">
                {action.description}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-neutral-300 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all mt-0.5" />
          </Link>
        );
      })}
    </div>
  );
};
