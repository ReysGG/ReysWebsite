"use client";

import Link from "next/link";
import { useReloadOnStaleDeploy } from "@/components/ui/route-error";

export default function RootError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const stale = useReloadOnStaleDeploy(error);
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-white px-6 py-24">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-brand-navy">{stale ? "Memuat versi terbaru…" : "Terjadi kesalahan"}</h1>
        <p className="mt-3 text-neutral-600">
          {stale ? "Website baru saja diperbarui. Halaman akan dimuat ulang otomatis." : "Maaf, halaman ini gagal dimuat. Silakan coba lagi."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={stale ? () => window.location.reload() : reset} className="rounded-full bg-brand px-5 py-2 text-sm font-bold text-white hover:bg-brand-deep">
            {stale ? "Muat ulang" : "Coba lagi"}
          </button>
          <Link href="/" className="rounded-full border border-neutral-200 px-5 py-2 text-sm font-bold text-neutral-700">Ke beranda</Link>
        </div>
      </div>
    </main>
  );
}
