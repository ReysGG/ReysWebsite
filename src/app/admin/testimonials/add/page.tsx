import React from "react";
import Link from "next/link";
import { IconArrowLeft, IconDeviceFloppy } from "@tabler/icons-react";

export default function AddTestimonialPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <Link
          href="/admin/testimonials"
          className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 transition-colors hover:text-indigo-600"
        >
          <IconArrowLeft size={14} /> Kembali ke Testimoni
        </Link>
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
          Social Proof
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">
          Tambah Testimoni
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Tambahkan review klien yang akan tampil di halaman utama.
        </p>
      </div>

      {/* Form */}
      <form className="rounded-md border border-neutral-200 bg-white p-6 shadow-none space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700">Nama Klien</label>
            <input
              type="text"
              placeholder="contoh: Hendra Kusuma"
              className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700">Jabatan / Perusahaan</label>
            <input
              type="text"
              placeholder="contoh: Owner Toko Maju Jaya"
              className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700">URL Foto (opsional)</label>
          <input
            type="url"
            placeholder="https://example.com/foto.jpg"
            className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
          <p className="text-xs text-neutral-400">Kosongkan jika tidak ada foto — akan pakai inisial nama.</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700">Isi Testimoni</label>
          <textarea
            rows={5}
            placeholder="Apa yang klien katakan tentang layanan kamu?"
            className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none"
          />
        </div>

        <div className="flex flex-col gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:justify-end">
          <Link
            href="/admin/testimonials"
            className="inline-flex items-center justify-center rounded-md border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-50"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            <IconDeviceFloppy size={15} />
            Simpan Testimoni
          </button>
        </div>
      </form>
    </div>
  );
}
