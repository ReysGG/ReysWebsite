import Link from "next/link";
import { BlogEditorForm } from "@/features/admin/components/blog/blog-editor-form";
import { ArrowLeft, PenLine } from "lucide-react";

export const metadata = { title: "Artikel Baru | Admin" };

export default function CreateBlogPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#fffcc9]">
              <PenLine size={18} className="text-[#ff8a00]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Editorial</p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Artikel Baru</h1>
              <p className="mt-1 text-sm text-neutral-500">Tulis draft, lengkapi SEO, lalu publish ke blog publik.</p>
            </div>
          </div>
          <Link href="/admin/blog" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Blog
          </Link>
        </div>
      </div>
      <BlogEditorForm />
    </div>
  );
}
