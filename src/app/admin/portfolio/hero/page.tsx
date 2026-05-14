import React from "react";
import { IconDeviceFloppy, IconEye } from "@tabler/icons-react";

export default function ManageHeroPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.4fr]">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Homepage
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">
            Hero Content
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Update headline, subheadline, dan call-to-action utama di landing page.
          </p>
        </div>

        {/* Form */}
        <form className="rounded-md border border-neutral-200 bg-white p-6 shadow-none space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700">
              Rotating Words
            </label>
            <textarea
              rows={4}
              className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none"
              defaultValue={"Web Platforms.\nDigital Futures.\nModern UI/UX."}
            />
            <p className="text-xs text-neutral-400">
              Satu kata/frasa per baris — akan diputar sebagai animasi di hero.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700">Deskripsi</label>
            <input
              type="text"
              className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              defaultValue="Kami membangun website dan sistem digital untuk UMKM dan startup yang ingin tampil profesional."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">Primary CTA</label>
              <input
                type="text"
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                defaultValue="Mulai Konsultasi"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">Secondary CTA</label>
              <input
                type="text"
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                defaultValue="Lihat Portfolio"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700">Trust Text</label>
            <input
              type="text"
              className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              defaultValue="Dipercaya 50+ klien"
            />
            <p className="text-xs text-neutral-400">
              Teks kecil di samping avatar klien di hero section.
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-50"
            >
              <IconEye size={15} />
              Preview
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              <IconDeviceFloppy size={15} />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>

      {/* Sidebar checklist */}
      <aside className="space-y-4">
        <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
          <p className="text-sm font-semibold text-neutral-900 mb-4">Hero Checklist</p>
          <div className="space-y-2">
            {[
              "Headline jelas dan singkat",
              "CTA utama terlihat",
              "Deskripsi max 2 baris",
              "Trust text ada angka",
              "Mobile friendly",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-md bg-neutral-50 border border-neutral-100 px-3 py-2"
              >
                <span className="text-xs text-neutral-600">{item}</span>
                <span className="text-xs font-bold text-indigo-600">✓</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-indigo-100 bg-indigo-50 p-5">
          <p className="text-xs font-semibold text-indigo-700 mb-2">Tips</p>
          <p className="text-xs text-indigo-600 leading-relaxed">
            Rotating words yang efektif: gunakan 3-5 kata/frasa pendek yang relevan dengan layanan utama kamu.
          </p>
        </div>
      </aside>
    </div>
  );
}
