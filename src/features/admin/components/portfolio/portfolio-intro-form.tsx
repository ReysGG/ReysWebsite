"use client";

import { useActionState } from "react";
import { Save, Eye } from 'lucide-react';
import { savePortfolioIntro } from "@/features/admin/actions/portfolio-actions";
import type { PortfolioIntroConfig } from "@/lib/portfolio-config";

export function PortfolioIntroForm({ intro }: { intro: PortfolioIntroConfig }) {
  const [state, formAction, isPending] = useActionState(savePortfolioIntro, { success: false });

  return (
    <form action={formAction} className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
      <div className="border-b border-neutral-100 pb-5">
        <p className="text-sm font-bold text-neutral-900">Konten Intro</p>
        <p className="mt-1 text-xs text-neutral-500">Teks ini muncul di bagian atas section portfolio pada landing page.</p>
      </div>

      <div className="mt-5 space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-neutral-500" htmlFor="portfolio-eyebrow">
            Eyebrow / Label kecil
          </label>
          <input
            id="portfolio-eyebrow"
            name="eyebrow"
            type="text"
            defaultValue={intro.eyebrow}
            className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
          <p className="text-xs text-neutral-400">Contoh: Portfolio, Showcase, Studi Kasus.</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-neutral-500" htmlFor="portfolio-heading">
            Heading utama
          </label>
          <textarea
            id="portfolio-heading"
            name="heading"
            rows={3}
            defaultValue={intro.heading}
            className="w-full resize-none rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
          <p className="text-xs text-neutral-400">Usahakan 1-2 baris agar tetap rapi di desktop dan mobile.</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-neutral-500" htmlFor="portfolio-description">
            Deskripsi
          </label>
          <textarea
            id="portfolio-description"
            name="description"
            rows={5}
            defaultValue={intro.description}
            className="w-full resize-none rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm leading-relaxed text-neutral-900 outline-none transition-colors focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
          <p className="text-xs text-neutral-400">Jelaskan jenis solusi/project yang pengunjung bisa lihat di portfolio.</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-neutral-500" htmlFor="portfolio-featured-label">
            Label tambahan
          </label>
          <input
            id="portfolio-featured-label"
            name="featuredLabel"
            type="text"
            defaultValue={intro.featuredLabel}
            className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
          <p className="text-xs text-neutral-400">Badge kecil untuk preview/admin.</p>
        </div>
      </div>

      {state.error ? <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{state.error}</p> : null}
      {state.success && state.message ? <p className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{state.message}</p> : null}

      <div className="mt-6 flex flex-col gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:justify-end">
        <button type="button" className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-50">
          <Eye size={15} />
          Preview
        </button>
        <button disabled={isPending} className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300">
          <Save size={15} />
          {isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
