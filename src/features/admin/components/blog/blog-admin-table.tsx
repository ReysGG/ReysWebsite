"use client";

import Link from "next/link";
import Image from "next/image";
import { useActionState } from "react";
import type { Post } from "@prisma/client";
import { Edit3, FileText } from "lucide-react";
import { DeletePostButton } from "./delete-post-button";
import { publishPost, unpublishPost, type BlogActionState } from "@/features/admin/actions/blog-actions";

const dateFmt = (d: Date) => new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

function TogglePublishButton({ id, published }: { id: string; published: boolean }) {
  const action = published ? unpublishPost : publishPost;
  const [, formAction, pending] = useActionState(action, {} as BlogActionState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <button
        disabled={pending}
        title={published ? "Jadikan Draft" : "Publish"}
        className={`inline-flex h-8 w-8 items-center justify-center rounded-md border text-xs font-bold disabled:opacity-50 ${
          published
            ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
            : "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
        }`}
      >
        {published ? "↓" : "↑"}
      </button>
    </form>
  );
}

export function BlogAdminTable({ posts, page, totalPages }: { posts: Post[]; page: number; totalPages: number }) {
  return (
    <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-3">Artikel</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3">Views</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {posts.length ? posts.map((post) => (
              <tr key={post.id} className="hover:bg-neutral-50">
                <td className="px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-indigo-50">
                      {post.coverImage ? (
                        <Image src={post.coverImage} alt={post.title || "cover"} fill unoptimized className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-100 to-violet-100">
                          <FileText size={18} className="text-indigo-400" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-neutral-900 line-clamp-2">{post.title || "Untitled"}</div>
                      <div className="mt-1 text-xs text-neutral-500">/{post.slug} · {post.author || "Admin"}</div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {post.category && <span className="rounded bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">{post.category}</span>}
                        {post.featured && <span className="rounded bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700">Featured</span>}
                        {post.tags?.slice(0, 3).map((t) => <span key={t} className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${post.published ? "border-indigo-200 bg-indigo-50 text-indigo-700" : "border-neutral-200 bg-neutral-100 text-neutral-600"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-4 text-neutral-500">{post.publishedAt ? dateFmt(post.publishedAt) : "—"}</td>
                <td className="px-4 py-4 text-neutral-500">{dateFmt(post.updatedAt || post.createdAt)}</td>
                <td className="px-4 py-4 text-neutral-500">{post.views || 0}</td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/blog/${post.slug}/edit`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                      title="Edit"
                    >
                      <Edit3 size={14} />
                    </Link>
                    <TogglePublishButton id={post.id} published={post.published} />
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Preview"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 text-xs font-bold"
                    >
                      ↗
                    </a>
                    <DeletePostButton id={post.id} />
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-neutral-400">Belum ada artikel.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-neutral-100 px-4 py-3 text-sm text-neutral-500">
          <span>Halaman {page} dari {totalPages}</span>
          <div className="flex gap-2">
            {page > 1 && <Link href={`?page=${page - 1}`} className="rounded-md border border-neutral-200 px-3 py-1.5 hover:bg-neutral-50">← Prev</Link>}
            {page < totalPages && <Link href={`?page=${page + 1}`} className="rounded-md border border-neutral-200 px-3 py-1.5 hover:bg-neutral-50">Next →</Link>}
          </div>
        </div>
      )}
    </div>
  );
}
