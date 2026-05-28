"use client";

import Link from "next/link";
import Image from "next/image";
import { useActionState, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { BlogPost } from "@/features/blog/data/posts";
import { Edit3, FileText, Eye, CheckCircle2, AlertTriangle, Send, Pencil } from "lucide-react";
import { DeletePostButton } from "./delete-post-button";
import { BlogPreviewModal } from "./blog-preview-modal";
import { bulkPublishPosts, bulkUnpublishPosts, publishPost, unpublishPost, type BlogActionState } from "@/features/admin/actions/blog-actions";

const dateFmt = (d: Date) => new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

function getSeoIssues(post: BlogPost) {
  const issues: string[] = [];
  if (!post.metaTitle) issues.push("Meta title");
  if (!post.metaDesc) issues.push("Meta desc");
  if (!post.coverImage) issues.push("Cover");
  return issues;
}

function pageHref(pathname: string, searchParams: URLSearchParams, page: number) {
  const params = new URLSearchParams(searchParams.toString());
  if (page <= 1) params.delete("page");
  else params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

function TogglePublishButton({ id, published }: { id: string; published: boolean }) {
  const action = published ? unpublishPost : publishPost;
  const [, formAction, pending] = useActionState(action, {} as BlogActionState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <button
        disabled={pending}
        className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold disabled:opacity-50 ${
          published
            ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
            : "border-[#ffcd80] bg-[#fffcc9] text-[#ff8a00] hover:bg-[#fffcc9]"
        }`}
      >
        {published ? <Pencil className="h-3.5 w-3.5" /> : <Send className="h-3.5 w-3.5" />}
        {published ? "Draft" : "Publish"}
      </button>
    </form>
  );
}

function BulkActions({ selectedIds }: { selectedIds: string[] }) {
  const [, publishAction, publishPending] = useActionState(bulkPublishPosts, {} as BlogActionState);
  const [, draftAction, draftPending] = useActionState(bulkUnpublishPosts, {} as BlogActionState);
  const disabled = selectedIds.length === 0 || publishPending || draftPending;
  const hiddenInputs = selectedIds.map((id) => <input key={id} type="hidden" name="postIds" value={id} />);

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2">
      <span className="text-xs font-semibold text-neutral-500">{selectedIds.length} dipilih</span>
      <form action={publishAction}>
        {hiddenInputs}
        <button disabled={disabled} className="rounded-md bg-[#ff8a00] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#f4b738] disabled:cursor-not-allowed disabled:opacity-50">
          Bulk Publish
        </button>
      </form>
      <form action={draftAction}>
        {hiddenInputs}
        <button disabled={disabled} className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50">
          Bulk Draft
        </button>
      </form>
    </div>
  );
}

export function BlogAdminTable({ posts, page, totalPages }: { posts: BlogPost[]; page: number; totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allVisibleSelected = posts.length > 0 && posts.every((post) => selectedIds.includes(post.id));

  const pagination = useMemo(() => ({
    prev: pageHref(pathname, searchParams, page - 1),
    next: pageHref(pathname, searchParams, page + 1),
  }), [page, pathname, searchParams]);

  const toggleAll = () => {
    setSelectedIds(allVisibleSelected ? [] : posts.map((post) => post.id));
  };

  const toggleOne = (id: string) => {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  return (
    <div className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-none">
      <div className="flex flex-col gap-3 border-b border-neutral-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">Article Inventory</h2>
          <p className="mt-1 text-xs text-neutral-500">Kelola status publish, SEO health, dan action per artikel.</p>
        </div>
        <BulkActions selectedIds={selectedIds} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="w-10 px-4 py-3"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} aria-label="Pilih semua artikel" /></th>
              <th className="min-w-[340px] px-4 py-3">Artikel</th>
              <th className="px-4 py-3">Status</th>
              <th className="min-w-[180px] px-4 py-3">SEO Health</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3">Views</th>
              <th className="min-w-[280px] px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {posts.length ? posts.map((post) => {
              const issues = getSeoIssues(post);
              return (
                <tr key={post.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-4 align-top"><input type="checkbox" checked={selectedIds.includes(post.id)} onChange={() => toggleOne(post.id)} aria-label={`Pilih ${post.title}`} /></td>
                  <td className="px-4 py-4">
                    <div className="flex items-start gap-3">
                      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-[#fffcc9]">
                        {post.coverImage ? <Image src={post.coverImage} alt={post.title || "cover"} fill unoptimized className="object-cover" /> : <div className="flex h-full w-full items-center justify-center bg-[#fffcc9]"><FileText size={18} className="text-[#ffcd80]" /></div>}
                      </div>
                      <div className="min-w-0">
                        <div className="line-clamp-2 font-semibold text-neutral-900">{post.title || "Untitled"}</div>
                        <div className="mt-1 text-xs text-neutral-500">/{post.slug} · {post.author || "Admin"}</div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {post.category && <span className="rounded-md bg-[#fffcc9] px-2 py-0.5 text-[11px] font-semibold text-[#ff8a00]">{post.category}</span>}
                          {post.featured && <span className="rounded-md bg-[#fffcc9] px-2 py-0.5 text-[11px] font-semibold text-[#ff8a00]">Featured</span>}
                          {post.tags?.slice(0, 3).map((tag) => <span key={tag} className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600">{tag}</span>)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${post.published ? "border-[#ffcd80] bg-[#fffcc9] text-[#ff8a00]" : "border-neutral-200 bg-neutral-100 text-neutral-600"}`}>{post.published ? "Published" : "Draft"}</span>
                  </td>
                  <td className="px-4 py-4 align-top">
                    {issues.length === 0 ? (
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-[#fffcc9] px-2.5 py-1 text-xs font-semibold text-[#ff8a00]"><CheckCircle2 className="h-3.5 w-3.5" /> OK</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {issues.map((issue) => <span key={issue} className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700"><AlertTriangle className="h-3 w-3" /> Missing {issue}</span>)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 align-top text-neutral-500">{post.publishedAt ? dateFmt(post.publishedAt) : "—"}</td>
                  <td className="px-4 py-4 align-top text-neutral-500">{dateFmt(post.updatedAt || post.createdAt)}</td>
                  <td className="px-4 py-4 align-top text-neutral-500">{post.views || 0}</td>
                  <td className="px-4 py-4 align-top">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/blog/${post.slug}/edit`} className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 hover:border-[#ffcd80] hover:bg-[#fffcc9] hover:text-[#ff8a00]"><Edit3 size={13} /> Edit</Link>
                      <TogglePublishButton id={post.id} published={post.published} />
                      <BlogPreviewModal slug={post.slug} label={<span className="inline-flex items-center gap-1.5"><Eye size={13} /> Preview</span>} className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 hover:border-[#ffcd80] hover:bg-[#fffcc9] hover:text-[#ff8a00]" />
                      <DeletePostButton id={post.id} />
                    </div>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan={8} className="px-4 py-12 text-center text-neutral-400">Belum ada artikel.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-neutral-100 px-4 py-3 text-sm text-neutral-500">
          <span>Halaman {page} dari {totalPages}</span>
          <div className="flex gap-2">
            {page > 1 && <Link href={pagination.prev} className="rounded-md border border-neutral-200 px-3 py-1.5 hover:bg-neutral-50">← Prev</Link>}
            {page < totalPages && <Link href={pagination.next} className="rounded-md border border-neutral-200 px-3 py-1.5 hover:bg-neutral-50">Next →</Link>}
          </div>
        </div>
      )}
    </div>
  );
}
