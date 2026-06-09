"use client";

import Link from "next/link";

export function BlogErrorState({ reset }: { reset?: () => void }) {
  return <div className="mx-auto max-w-2xl rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm"><h1 className="text-2xl font-bold text-neutral-950">Blog belum bisa dimuat</h1><p className="mt-3 text-neutral-600">Terjadi masalah saat memuat konten. Silakan coba lagi.</p><div className="mt-6 flex justify-center gap-3">{reset && <button type="button" onClick={reset} className="rounded-full bg-[#ff8a00] px-5 py-2 text-sm font-bold text-white">Coba lagi</button>}<Link href="/" className="rounded-full border border-neutral-200 px-5 py-2 text-sm font-bold">Ke beranda</Link></div></div>;
}
