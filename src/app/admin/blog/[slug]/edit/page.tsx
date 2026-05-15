import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogEditorForm } from "@/features/admin/components/blog/blog-editor-form";
import { PenLine } from "lucide-react";
import db from "@/lib/db";

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });
  if (!post) notFound();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
            <PenLine size={16} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-base font-bold text-neutral-900 dark:text-neutral-900">Edit Artikel</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 max-w-xs truncate">{post.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">↗ Preview</a>
          <Link href="/admin/blog" className="text-sm font-semibold text-neutral-400 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-700">← Kembali</Link>
        </div>
      </div>
      <BlogEditorForm initialData={post} />
    </div>
  );
}
