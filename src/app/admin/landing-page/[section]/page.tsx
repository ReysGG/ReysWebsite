import React from "react";
import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/site-config";
import { resetLandingPage } from "@/features/admin/actions/landing-page-actions";
import { LandingPageForm } from "@/features/admin/components/landing-page/landing-page-form";

type SectionKey = "hero" | "trustStrip" | "problems" | "stats" | "services" | "workflow" | "pricing" | "whatYouGet" | "cta" | "faq";

const SECTION_LABELS: Record<SectionKey, string> = {
  hero: "Hero",
  trustStrip: "Trust Strip",
  problems: "Problem",
  stats: "Statistik",
  services: "Layanan",
  workflow: "Workflow",
  pricing: "Pricing",
  whatYouGet: "What You Get",
  cta: "CTA Akhir",
  faq: "FAQ",
};

const SECTION_DESCRIPTIONS: Record<SectionKey, string> = {
  hero: "Edit headline, trust badge, deskripsi, dan CTA utama di hero section.",
  trustStrip: "Edit poin trust singkat yang tampil setelah hero.",
  problems: "Edit problem/pain points bisnis sebelum section layanan.",
  stats: "Edit angka ringkas dan label statistik yang tampil setelah hero.",
  services: "Edit heading layanan dan copy utama section service cards.",
  workflow: "Edit teks proses kerja dari brief sampai delivery.",
  pricing: "Edit heading dan deskripsi paket harga.",
  whatYouGet: "Edit checklist deliverable yang didapat client.",
  cta: "Edit ajakan konsultasi akhir sebelum FAQ.",
  faq: "Edit heading FAQ dan pertanyaan umum.",
};

const isSectionKey = (value: string): value is SectionKey =>
  value in SECTION_LABELS;

export default async function LandingPageSectionAdmin({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!isSectionKey(section)) {
    notFound();
  }

  const config = await getSiteConfig();

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Website Content
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              Landing Page / {SECTION_LABELS[section]}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-neutral-500">
              {SECTION_DESCRIPTIONS[section]}
            </p>
          </div>
          <form action={resetLandingPage}>
            <button className="rounded-md border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900">
              Reset default
            </button>
          </form>
        </div>
      </div>

      <LandingPageForm config={config} initialSection={section} />
    </div>
  );
}
