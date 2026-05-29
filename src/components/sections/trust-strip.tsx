import React from "react";
import { ArrowRight, BookOpen, ClipboardList, Monitor, ShieldCheck, Smartphone } from "lucide-react";
import type { SimpleTextItemConfig, SiteConfig } from "@/lib/site-config";

const DEFAULT_TRUST_STRIP_ITEMS: SimpleTextItemConfig[] = [
  {
    title: "Scope jelas sebelum development",
    description: "Halaman, fitur, timeline, dan kebutuhan project disepakati di awal agar semua terarah dan sesuai tujuan.",
  },
  {
    title: "Progress bisa dicek via staging link",
    description: "Pantau hasil website secara real-time sebelum masuk tahap launch, jadi lebih transparan dan minim revisi.",
  },
  {
    title: "Mobile-first dan SEO-ready",
    description: "Website dibuat responsif, cepat, dan lebih mudah dipahami Google untuk performa yang lebih baik.",
  },
  {
    title: "Handover akses penuh setelah launch",
    description: "Akses, dokumentasi, dan panduan penggunaan diberikan setelah project selesai, jadi kamu bisa kelola sendiri.",
  },
];

const CARD_META = [
  { icon: ClipboardList, number: "01" },
  { icon: Monitor, number: "02" },
  { icon: Smartphone, number: "03" },
  { icon: BookOpen, number: "04" },
];

const GRID_COLS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

const DEFAULT_TRUST_STRIP_COPY = {
  eyebrow: "Kenapa Build With Reys?",
  heading: "Website bukan cuma dibuat bagus, tapi dibangun dengan alur yang jelas.",
  description: "Dari perencanaan sampai serah terima, setiap langkah transparan dan terukur.",
  footerText: "Proses jelas, hasil maksimal, dan support tetap ada.",
  buttonText: "Mulai konsultasi project",
};

function normalizeTrustStripItem(item: SimpleTextItemConfig | string, index: number): SimpleTextItemConfig {
  const fallback = DEFAULT_TRUST_STRIP_ITEMS[index] ?? { title: "", description: "" };
  if (typeof item === "string") {
    return { title: item, description: fallback.description };
  }
  return {
    title: item.title || fallback.title,
    description: item.description || fallback.description,
  };
}

function normalizeTrustStrip(content: SiteConfig["trustStrip"] | string[]): SiteConfig["trustStrip"] {
  if (Array.isArray(content)) {
    return { ...DEFAULT_TRUST_STRIP_COPY, items: content.map(normalizeTrustStripItem) };
  }

  return {
    ...DEFAULT_TRUST_STRIP_COPY,
    ...content,
    items: Array.isArray(content.items) ? content.items.map(normalizeTrustStripItem) : DEFAULT_TRUST_STRIP_ITEMS,
  };
}

export const TrustStripSection = ({ content }: { content: SiteConfig["trustStrip"] | string[] }) => {
  const trustStrip = normalizeTrustStrip(content);
  const safeItems = trustStrip.items.slice(0, 4);

  if (safeItems.length === 0) return null;

  const colClass = GRID_COLS[safeItems.length] ?? "md:grid-cols-4";

  return (
    <section className="w-full border-y border-slate-200 bg-[#f7faff] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-[#ff8a00] md:text-sm">
            {trustStrip.eyebrow}
          </p>
          <h2 className="mt-4 text-[1.7rem] font-bold leading-tight text-slate-950 md:text-5xl">
            {trustStrip.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-600 md:text-lg">
            {trustStrip.description}
          </p>
        </div>

        <div className={`mt-8 grid gap-4 md:mt-10 md:gap-6 ${colClass}`}>
          {safeItems.map((point, index) => {
            const meta = CARD_META[index] ?? CARD_META[0];
            const Icon = meta.icon;

            return (
              <article
                key={`${point.title}-${index}`}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.07)] md:min-h-[270px] md:p-6"
              >
                <div className="flex gap-4 md:block">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#fffcc9] text-[#ff8a00] md:mb-7 md:h-16 md:w-16">
                    <Icon className="h-7 w-7 stroke-[1.8] md:h-8 md:w-8" />
                  </div>
                  <div className="min-w-0">
                    <div className="mb-3 flex items-center gap-3 md:mb-5">
                      <span className="text-sm font-bold text-[#ff8a00]">{meta.number}</span>
                      <span className="h-px w-20 bg-[#ffcd80]" />
                    </div>
                    <h3 className="text-lg font-bold leading-tight text-slate-950 md:text-xl">
                      {point.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 md:mt-4 md:text-[15px]">
                      {point.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-5 text-center">
          <p className="inline-flex items-center gap-3 text-sm font-medium text-slate-600 md:text-base">
            <ShieldCheck className="h-6 w-6 shrink-0 text-[#ff8a00]" />
            {trustStrip.footerText}
          </p>
          <a
            href="#cta"
            className="inline-flex min-h-11 w-full max-w-sm items-center justify-center gap-3 rounded-lg bg-[#ff8a00] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_35px_rgba(255,138,0,0.24)] transition-colors hover:bg-[#f4b738] sm:w-auto sm:min-w-72"
          >
            {trustStrip.buttonText}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
