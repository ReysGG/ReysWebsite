"use client";

import React from "react";
import { CheckCircle2, FileCheck2, Rocket } from "lucide-react";
import type { SiteConfig } from "@/lib/site-config";

const WORKFLOW_STEPS = [
  { label: "Scope Locked", meta: "Fitur, halaman, timeline, dan revisi disepakati", progress: 100, bar: "bg-[#ff8a00]" },
  { label: "Build", meta: "Preview berjalan di staging link", progress: 72, bar: "bg-[#f4b738]" },
  { label: "Launch", meta: "QA, SEO, dan deploy", progress: 48, bar: "bg-[#ff8a00]" },
];

const METRICS = [
  { label: "Scope approved", value: "100%", icon: FileCheck2, accent: "text-[#ff8a00]" },
  { label: "Website ready", value: "100%", icon: CheckCircle2, accent: "text-[#ff8a00]" },
];

type HeroScopePreview = SiteConfig["hero"]["scopePreview"];

const fallbackScopePreview: HeroScopePreview = {
  eyebrow: "Before development",
  title: "Scope dikunci sebelum coding",
  projectLabel: "Project Brief",
  pages: "Home, About, Services, Contact",
  features: "Lead form, WhatsApp CTA, SEO setup",
  timeline: "14–21 hari kerja",
  revisions: "2x minor revision",
  deliverable: "Staging link, source code, handover",
  status: "Approved — Ready to build",
};

export const HomepageShowcaseSection = ({ content = fallbackScopePreview }: { content?: HeroScopePreview }) => {
  const scopeItems = [
    { label: "Pages", value: content.pages },
    { label: "Features", value: content.features },
    { label: "Timeline", value: content.timeline },
    { label: "Revisions", value: content.revisions },
    { label: "Deliverable", value: content.deliverable },
  ];

  return (
    <div className="relative w-full">
      <div className="absolute -right-8 top-8 h-56 w-56 rounded-full bg-[#ffcd80]/35 blur-3xl" />
      <div className="absolute -left-8 bottom-8 h-44 w-44 rounded-full bg-[#fffcc9]/60 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-[580px] flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-white/80 bg-white/90 p-5 shadow-[0_24px_70px_rgba(255,138,0,0.16)] backdrop-blur-xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff8a00] text-white shadow-lg shadow-[#ff8a00]/25">
              <Rocket className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm font-semibold text-neutral-500">Estimasi launch</p>
            <p className="mt-1 text-2xl font-black tracking-tight text-neutral-950">14–21 hari</p>
            <p className="mt-1 text-xs font-medium text-neutral-500">Estimasi waktu pengerjaan</p>
          </div>

          <div className="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_24px_70px_rgba(255,138,0,0.14)] backdrop-blur-xl">
            <p className="mb-3 text-sm font-bold text-neutral-900">Quality Checks</p>
            <div className="space-y-2">
              {METRICS.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="flex items-center justify-between rounded-xl border border-[#ffcd80] bg-[#fffcc9]/50 px-4 py-3">
                    <div>
                      <p className="text-2xl font-black leading-none text-neutral-950">{metric.value}</p>
                      <p className="mt-1 text-xs font-semibold text-neutral-500">{metric.label}</p>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white">
                      <Icon className={`h-4 w-4 ${metric.accent}`} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,138,0,0.24),transparent_36%),linear-gradient(135deg,#111827,#050505)] p-5 text-white shadow-[0_30px_90px_rgba(15,23,42,0.35)] md:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#fffcc9]/90">{content.eyebrow}</p>
              <h3 className="mt-1 text-2xl font-black tracking-tight">{content.title}</h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <FileCheck2 className="h-5 w-5 text-white/65" />
            </div>
          </div>

          <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.065] p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-white/45">{content.projectLabel}</p>
              <span className="rounded-full border border-[#ffcd80]/40 bg-[#ff8a00]/15 px-2.5 py-1 text-[11px] font-bold text-[#fffcc9]">Scope locked</span>
            </div>
            <div className="space-y-2.5">
              {scopeItems.map((item) => (
                <div key={item.label} className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 text-xs">
                  <span className="font-semibold text-white/40">{item.label}</span>
                  <span className="font-semibold text-white/82">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#ffcd80]/35 bg-[#ff8a00]/15 px-3 py-2 text-xs font-bold text-[#fffcc9]">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {content.status}
            </div>
          </div>

          <div className="space-y-3">
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.label} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-white">{step.label}</p>
                    <p className="mt-1 text-xs font-medium text-white/45">{step.meta}</p>
                  </div>
                  <p className="text-sm font-black text-white/80">{step.progress}%</p>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full rounded-full ${step.bar}`} style={{ width: `${step.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
