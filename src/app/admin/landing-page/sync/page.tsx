import Link from "next/link";
import { ArrowRight, Check, Database, ExternalLink, RefreshCw, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import { defaultSiteConfig, getSiteConfig } from "@/lib/site-config";
import { SyncButton } from "./sync-button";

const SECTIONS = [
  { key: "hero", label: "Hero", description: "Positioning technical partner, CTA, dan trust badge." },
  { key: "services", label: "Services", description: "Layanan berbasis outcome bisnis." },
  { key: "workflow", label: "Workflow", description: "Discovery, scope, staging, launch, dan handover." },
  { key: "pricing", label: "Pricing", description: "Project packages: Starter, Business, Custom System." },
  { key: "cta", label: "CTA", description: "Scope call singkat dan prioritas project." },
  { key: "faq", label: "FAQ", description: "Jawaban trust sebelum project dimulai." },
];

function same(value: unknown, expected: unknown) {
  return JSON.stringify(value) === JSON.stringify(expected);
}

function getSyncStatus(config: Awaited<ReturnType<typeof getSiteConfig>>) {
  const checks = [
    { label: "Hero positioning", ready: same(config.hero, defaultSiteConfig.hero), href: "/admin/landing-page/hero" },
    { label: "Services outcome copy", ready: same(config.services, defaultSiteConfig.services), href: "/admin/landing-page/services" },
    { label: "Workflow profesional", ready: same(config.workflow, defaultSiteConfig.workflow), href: "/admin/landing-page/workflow" },
    { label: "Pricing project packages", ready: same(config.pricing, defaultSiteConfig.pricing), href: "/admin/landing-page/pricing" },
    { label: "CTA dan FAQ trust", ready: same(config.cta, defaultSiteConfig.cta) && same(config.faq, defaultSiteConfig.faq), href: "/admin/landing-page/cta" },
  ];

  const synced = checks.filter((item) => item.ready).length;
  return { checks, synced, total: checks.length };
}

export default async function LandingPageSyncPage() {
  const config = await getSiteConfig();
  const status = getSyncStatus(config);
  const isFullySynced = status.synced === status.total;

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-30 rounded-md border border-neutral-200 bg-white/95 p-4 shadow-none backdrop-blur">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Landing Page Content</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Sync Professional Copy</h1>
            <p className="mt-1 max-w-2xl text-sm text-neutral-500">
              Update data landing page di database supaya copy baru yang lebih profesional tampil di website live.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" target="_blank" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 active:bg-neutral-100 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]">
              <ExternalLink size={16} />
              Preview Website
            </Link>
            <Link href="/admin/landing-page/hero" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 active:bg-neutral-100 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]">
              Edit Manual
              <ArrowRight size={16} />
            </Link>
            <SyncButton />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-3xl font-bold tracking-tight text-neutral-900">{status.synced}/{status.total}</p>
              <p className="mt-1 text-sm font-semibold text-neutral-700">Section synced</p>
              <p className="mt-1 text-xs text-neutral-400">Dibandingkan dengan default profesional terbaru.</p>
            </div>
            <div className="rounded-md border border-neutral-200 bg-[#fffcc9] p-2">
              <Database className="text-[#ff8a00]" size={18} />
            </div>
          </div>
        </div>
        <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className={isFullySynced ? "text-3xl font-bold tracking-tight text-[#ff8a00]" : "text-3xl font-bold tracking-tight text-amber-600"}>
                {isFullySynced ? "Ready" : "Perlu sync"}
              </p>
              <p className="mt-1 text-sm font-semibold text-neutral-700">Database content</p>
              <p className="mt-1 text-xs text-neutral-400">Homepage memakai data DB, bukan hanya file default.</p>
            </div>
            <div className="rounded-md border border-neutral-200 bg-neutral-50 p-2">
              {isFullySynced ? <ShieldCheck className="text-[#ff8a00]" size={18} /> : <AlertTriangle className="text-amber-600" size={18} />}
            </div>
          </div>
        </div>
        <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-3xl font-bold tracking-tight text-neutral-900">Profesional</p>
              <p className="mt-1 text-sm font-semibold text-neutral-700">Positioning</p>
              <p className="mt-1 text-xs text-neutral-400">Technical partner, scope jelas, staging, handover.</p>
            </div>
            <div className="rounded-md border border-neutral-200 bg-[#fffcc9] p-2">
              <Sparkles className="text-[#ff8a00]" size={18} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-none">
          <div className="border-b border-neutral-200 p-4">
            <p className="text-sm font-bold text-neutral-900">Sync checklist</p>
            <p className="mt-1 text-xs text-neutral-500">Klik section untuk review manual, atau sync semua copy profesional sekaligus.</p>
          </div>
          <div className="divide-y divide-neutral-100">
            {status.checks.map((item) => (
              <Link key={item.label} href={item.href} className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-neutral-50 active:bg-neutral-100 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]">
                <div className="flex min-w-0 items-center gap-3">
                  <span className={item.ready ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#fffcc9] text-[#ff8a00]" : "flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-600"}>
                    {item.ready ? <Check size={17} /> : <RefreshCw size={17} />}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-neutral-900">{item.label}</p>
                    <p className="mt-1 text-xs text-neutral-500">{item.ready ? "Sudah sama dengan default profesional." : "Masih berbeda dari default profesional."}</p>
                  </div>
                </div>
                <span className={item.ready ? "rounded-md border border-[#ffcd80] bg-[#fffcc9] px-2 py-1 text-xs font-semibold text-[#ff8a00]" : "rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700"}>
                  {item.ready ? "Synced" : "Outdated"}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Apa yang akan berubah?</p>
            <h2 className="mt-2 text-lg font-bold text-neutral-900">Copy homepage jadi lebih profesional</h2>
            <div className="mt-5 space-y-3">
              {SECTIONS.map((section) => (
                <div key={section.key} className="rounded-md border border-neutral-200 bg-neutral-50 p-3">
                  <p className="text-sm font-bold text-neutral-900">{section.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-500">{section.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-amber-200 bg-amber-50 p-5 shadow-none">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 shrink-0 text-amber-700" size={18} />
              <div>
                <p className="text-sm font-bold text-amber-900">Sync akan menimpa konten landing page saat ini.</p>
                <p className="mt-1 text-xs leading-relaxed text-amber-800">
                  Gunakan tombol ini untuk mengganti value `landing-page` di database dengan default profesional terbaru. Setelah itu masih bisa edit manual per section.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
