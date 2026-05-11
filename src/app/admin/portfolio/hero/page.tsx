import React from "react";
import { IconDeviceFloppy, IconEye } from "@tabler/icons-react";

export default function ManageHeroPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr]">
      <div className="space-y-8">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">Homepage</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">Hero Content</h1>
          <p className="mt-2 max-w-2xl text-neutral-500">
            Update headline, subheadline, dan call-to-action utama di landing page.
          </p>
        </div>

        <form className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:p-8">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Headlines</label>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none transition-colors focus:border-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-white"
              defaultValue={"Web Platforms.\nDigital Futures.\nModern UI/UX."}
            />
            <p className="text-xs text-neutral-500">Satu headline per baris untuk animasi FlipWords.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Subheadline</label>
            <input
              type="text"
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none transition-colors focus:border-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-white"
              defaultValue="We engineer high-performance web platforms for visionary UMKM and fast-scaling startups."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Primary CTA</label>
              <input
                type="text"
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none transition-colors focus:border-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-white"
                defaultValue="Start Consultation"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Secondary CTA</label>
              <input
                type="text"
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none transition-colors focus:border-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-white"
                defaultValue="View Portfolio"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:justify-end dark:border-neutral-800">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-200 px-5 py-3 text-sm font-semibold transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"
            >
              <IconEye size={16} />
              Preview
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black dark:bg-white dark:text-neutral-950"
            >
              <IconDeviceFloppy size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm font-bold">Hero checklist</p>
        <div className="mt-5 space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
          {["Headline jelas", "CTA utama terlihat", "Copy singkat", "Mobile friendly"].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2 dark:bg-neutral-950">
              <span>{item}</span>
              <span className="text-xs font-bold text-emerald-600">OK</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
