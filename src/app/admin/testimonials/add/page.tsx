import Link from "next/link";
import { ArrowLeft, MessageSquareQuote } from "lucide-react";
import { TestimonialForm } from "@/features/admin/components/testimonials/testimonial-form";
import { createTestimonial } from "@/features/admin/actions/testimonial-actions";

export default function AddTestimonialPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <Link href="/admin/testimonials" className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-indigo-600">
          <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Testimoni
        </Link>
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
            <MessageSquareQuote className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Social Proof</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Tambah Testimoni</h1>
            <p className="mt-1 text-sm text-neutral-500">Tambahkan review klien yang akan tampil di halaman utama.</p>
          </div>
        </div>
      </div>

      <TestimonialForm action={createTestimonial} />
    </div>
  );
}
