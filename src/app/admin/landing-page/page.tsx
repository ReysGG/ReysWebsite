import React from "react";
import { getSiteConfig } from "@/lib/site-config";
import { resetLandingPage } from "@/features/admin/actions/landing-page-actions";
import { LandingPageForm } from "@/features/admin/components/landing-page/landing-page-form";

export default async function LandingPageAdmin() {
  const config = await getSiteConfig();

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">Website Content</p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Landing Page</h1>
            <p className="mt-2 max-w-2xl text-neutral-500">
              Ganti teks hero, statistik, layanan, proses, harga, CTA, dan FAQ yang tampil di halaman utama.
            </p>
          </div>
          <form action={resetLandingPage}>
            <button className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-semibold hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
              Reset default
            </button>
          </form>
        </div>
      </div>

      <LandingPageForm config={config} />
    </div>
  );
}
