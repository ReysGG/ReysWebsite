import React from "react";
import Link from "next/link";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

const DUMMY_TESTIMONIALS = [
  { id: 1, name: "Hendra Kusuma", role: "Owner Toko Bangunan Maju Jaya", snippet: "Website company profile kami selesai dalam 12 hari. Desainnya clean, loading cepat." },
  { id: 2, name: "Sari Dewi", role: "Manajer Operasional, Klinik Sehat Prima", snippet: "Dashboard operasional yang dibangun benar-benar mengubah cara kami kerja." },
];

const getInitials = (name: string) =>
  name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

export default function ManageTestimonialsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Social Proof
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">
              Testimonials
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Kelola review klien yang memperkuat trust di halaman publik.
            </p>
          </div>
          <Link
            href="/admin/testimonials/add"
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 shrink-0"
          >
            <IconPlus size={16} />
            Tambah Testimoni
          </Link>
        </div>
      </div>

      {/* Empty state or grid */}
      {DUMMY_TESTIMONIALS.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-neutral-300 bg-white py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-50 mb-4">
            <IconPlus size={20} className="text-indigo-600" />
          </div>
          <p className="text-sm font-semibold text-neutral-700">Belum ada testimoni</p>
          <p className="mt-1 text-xs text-neutral-400">Tambahkan review klien pertama kamu.</p>
          <Link
            href="/admin/testimonials/add"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            <IconPlus size={15} /> Tambah Sekarang
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {DUMMY_TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-md border border-neutral-200 bg-white p-6 shadow-none transition-shadow "
            >
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-600 text-sm font-bold text-white">
                    {getInitials(item.name)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">{item.name}</h3>
                    <p className="text-xs text-neutral-500">{item.role}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-neutral-600">
                  &ldquo;{item.snippet}&rdquo;
                </p>
              </div>
              <div className="mt-5 flex justify-end gap-2 border-t border-neutral-100 pt-4">
                <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-neutral-200 px-3 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-50">
                  <IconEdit size={13} /> Edit
                </button>
                <button className="inline-flex h-8 items-center gap-1.5 rounded-md bg-red-50 border border-red-200 px-3 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100">
                  <IconTrash size={13} /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
