import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogEditorForm } from "@/features/admin/components/blog/blog-editor-form";
import db from "@/lib/db";

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });
  if (!post) notFound();
  return <div className="space-y-6"><div className="rounded-md border border-neutral-200 bg-white p-6"><Link href="/admin/blog" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">← Kembali ke Blog</Link><h1 className="mt-3 text-2xl font-bold text-neutral-900">Edit Artikel</h1><p className="mt-1 text-sm text-neutral-500">{post.title}</p></div><BlogEditorForm initialData={post} /></div>;
}
