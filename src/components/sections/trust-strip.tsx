import React from "react";
import { ArrowRight, BookOpen, ClipboardList, Monitor, ShieldCheck, Smartphone } from "lucide-react";
import type { SiteConfig } from "@/lib/site-config";

const DESCRIPTIONS: Record<string, string> = {
  "Scope jelas sebelum development":
    "Halaman, fitur, timeline, dan kebutuhan project disepakati di awal agar semua terarah dan sesuai tujuan.",
  "Progress bisa dicek via staging link":
    "Pantau hasil website secara real-time sebelum masuk tahap launch, jadi lebih transparan dan minim revisi.",
  "Mobile-first dan SEO-ready":
    "Website dibuat responsif, cepat, dan lebih mudah dipahami Google untuk performa yang lebih baik.",
  "Handover akses penuh setelah launch":
    "Akses, dokumentasi, dan panduan penggunaan diberikan setelah project selesai, jadi kamu bisa kelola sendiri.",
};

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

export const TrustStripSection = ({ items }: { items: SiteConfig["trustStrip"] }) => {
  const safeItems = Array.isArray(items) ? items.slice(0, 4) : [];

  if (safeItems.length === 0) return null;

  const colClass = GRID_COLS[safeItems.length] ?? "md:grid-cols-4";

  return (
    <section className="w-full border-y border-slate-200 bg-[#f7faff] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-blue-600 md:text-sm">
            Kenapa Build With Reys?
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            Website bukan cuma dibuat bagus, tapi dibangun dengan alur yang jelas.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-600 md:text-lg">
            Dari perencanaan sampai serah terima, setiap langkah transparan dan terukur.
          </p>
        </div>

        <div className={`mt-10 grid gap-4 md:gap-6 ${colClass}`}>
          {safeItems.map((point, index) => {
            const meta = CARD_META[index] ?? CARD_META[0];
            const Icon = meta.icon;

            return (
              <article
                key={point}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)] md:min-h-[270px] md:p-6"
              >
                <div className="flex gap-4 md:block">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 md:mb-7 md:h-16 md:w-16">
                    <Icon className="h-7 w-7 stroke-[1.8] md:h-8 md:w-8" />
                  </div>
                  <div className="min-w-0">
                    <div className="mb-3 flex items-center gap-3 md:mb-5">
                      <span className="text-sm font-bold text-blue-600">{meta.number}</span>
                      <span className="h-px w-20 bg-blue-100" />
                    </div>
                    <h3 className="text-lg font-bold leading-tight text-slate-950 md:text-xl">
                      {point}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 md:mt-4 md:text-[15px]">
                      {DESCRIPTIONS[point] ?? "Detail project dibuat jelas, mudah dipantau, dan siap dilanjutkan setelah launch."}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-5 text-center">
          <p className="inline-flex items-center gap-3 text-sm font-medium text-slate-600 md:text-base">
            <ShieldCheck className="h-6 w-6 shrink-0 text-blue-600" />
            Proses jelas, hasil maksimal, dan support tetap ada.
          </p>
          <a
            href="#cta"
            className="inline-flex min-h-11 w-full max-w-sm items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_14px_35px_rgba(37,99,235,0.24)] transition-colors hover:bg-blue-700 sm:w-auto sm:min-w-72"
          >
            Mulai konsultasi project
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
