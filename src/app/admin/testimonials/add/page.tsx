import React from "react";
import Link from "next/link";
import { IconArrowLeft, IconDeviceFloppy } from "@tabler/icons-react";

export default function AddTestimonialPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:p-8">
        <Link
          href="/admin/testimonials"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-950 dark:hover:text-white"
        >
          <IconArrowLeft size={16} />
          Kembali
        </Link>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">Social Proof</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Add Testimonial</h1>
        <p className="mt-2 text-neutral-500">Tambahkan review klien yang akan tampil di website.</p>
      </div>

      <form className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Client Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none transition-colors focus:border-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Client Role / Company</label>
            <input
              type="text"
              placeholder="e.g. CEO at Acme Corp"
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none transition-colors focus:border-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Avatar URL</label>
          <input
            type="url"
            placeholder="https://example.com/avatar.jpg"
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none transition-colors focus:border-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Testimonial Content</label>
          <textarea
            rows={6}
            placeholder="What did the client say about your service?"
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 outline-none transition-colors focus:border-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-white"
          />
        </div>

        <div className="flex flex-col gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:justify-end dark:border-neutral-800">
          <Link
            href="/admin/testimonials"
            className="inline-flex items-center justify-center rounded-md border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black dark:bg-white dark:text-neutral-950"
          >
            <IconDeviceFloppy size={16} />
            Save Testimonial
          </button>
        </div>
      </form>
    </div>
  );
}
