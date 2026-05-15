import Link from "next/link";
import { BlogEditorForm } from "@/features/admin/components/blog/blog-editor-form";
import { PenLine } from "lucide-react";

export const metadata = { title: "Artikel Baru | Admin" };

export default function CreateBlogPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
            <PenLine size={16} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-base font-bold text-neutral-900 dark:text-neutral-900">Artikel Baru</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">Tulis dan publish artikel blog</p>
          </div>
        </div>
        <Link href="/admin/blog" className="text-sm font-semibold text-neutral-400 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-700">← Kembali</Link>
      </div>
      <BlogEditorForm />
    </div>
  );
}
