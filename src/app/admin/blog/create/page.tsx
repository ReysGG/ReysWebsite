import Link from "next/link";
import { BlogEditorForm } from "@/features/admin/components/blog/blog-editor-form";

export const metadata = { title: "Buat Artikel Blog | Admin Dashboard" };

export default function CreateBlogPage() {
  return <div className="space-y-6"><div className="rounded-md border border-neutral-200 bg-white p-6"><Link href="/admin/blog" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">← Kembali ke Blog</Link><h1 className="mt-3 text-2xl font-bold text-neutral-900">Create Blog</h1><p className="mt-1 text-sm text-neutral-500">Editor artikel dengan layout seperti WordPress: konten utama di kiri, publish dan SEO di kanan.</p></div><BlogEditorForm /></div>;
}
