import React from "react";
import Link from "next/link";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

const DUMMY_TESTIMONIALS = [
  { id: 1, name: "Budi Santoso", role: "CEO TechCorp", snippet: "Website yang luar biasa cepat dan mudah dikelola." },
  { id: 2, name: "Siti Aminah", role: "Founder LocalBrand", snippet: "Penjualan meningkat 200% berkat landing page baru." },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function ManageTestimonialsPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">Social Proof</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">Testimonials</h1>
            <p className="mt-2 max-w-2xl text-neutral-500">
              Kelola review klien yang memperkuat trust di halaman publik.
            </p>
          </div>
          <Link
            href="/admin/testimonials/add"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black dark:bg-white dark:text-neutral-950"
          >
            <IconPlus size={16} />
            Add Testimonial
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {DUMMY_TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            className="flex min-h-[260px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div>
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-sm font-bold text-white dark:bg-white dark:text-neutral-950">
                  {getInitials(item.name)}
                </div>
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-neutral-500">{item.role}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                &ldquo;{item.snippet}&rdquo;
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-neutral-100 pt-4 text-sm font-medium dark:border-neutral-800">
              <button className="inline-flex h-9 items-center gap-2 rounded-md border border-neutral-200 px-3 text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800">
                <IconEdit size={15} />
                Edit
              </button>
              <button className="inline-flex h-9 items-center gap-2 rounded-md bg-red-600 px-3 text-white transition-colors hover:bg-red-700">
                <IconTrash size={15} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
