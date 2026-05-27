import Link from "next/link";
import db from "@/lib/db";
import { MessageSquareText, Reply, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { DeleteCommentButton } from "@/features/admin/components/comments/delete-comment-button";
import { CommentsFilterBar } from "@/features/admin/components/comments/comments-filter-bar";
import type { Prisma } from "@prisma/client";

const PAGE_SIZE = 20;

export default async function AdminCommentsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const slugFilter = typeof params.slug === "string" ? params.slug.trim() : "";
  const filter = typeof params.filter === "string" ? params.filter : "all";
  const page = Math.max(1, parseInt(typeof params.page === "string" ? params.page : "1", 10) || 1);

  let comments: Array<{
    id: string;
    content: string;
    userName: string | null;
    userId: string;
    parentId: string | null;
    createdAt: Date;
    post: { title: string; slug: string };
  }> = [];
  let totalComments = 0;
  let repliesCount = 0;
  let filteredCount = 0;
  let databaseError = false;

  try {
    const where: Prisma.CommentWhereInput = {};

    if (q) {
      where.OR = [
        { content: { contains: q, mode: "insensitive" } },
        { userName: { contains: q, mode: "insensitive" } },
      ];
    }
    if (slugFilter) {
      where.post = { slug: slugFilter };
    }
    if (filter === "top") {
      where.parentId = null;
    } else if (filter === "reply") {
      where.parentId = { not: null };
    }

    [comments, totalComments, repliesCount, filteredCount] = await Promise.all([
      db.comment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        select: {
          id: true,
          content: true,
          userName: true,
          userId: true,
          parentId: true,
          createdAt: true,
          post: { select: { title: true, slug: true } },
        },
      }),
      db.comment.count(),
      db.comment.count({ where: { parentId: { not: null } } }),
      db.comment.count({ where }),
    ]);
  } catch {
    databaseError = true;
  }

  const totalPages = Math.max(1, Math.ceil(filteredCount / PAGE_SIZE));

  function buildPageUrl(p: number) {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (slugFilter) sp.set("slug", slugFilter);
    if (filter && filter !== "all") sp.set("filter", filter);
    if (p > 1) sp.set("page", String(p));
    const qs = sp.toString();
    return `/admin/comments${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-md border border-[#ffcd80] bg-gradient-to-br from-white via-[#fffcc9]/60 to-white p-6 shadow-none">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Audience</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Comments</h1>
            <p className="mt-1 text-sm text-neutral-500">Monitor dan moderasi komentar pembaca blog.</p>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-[#ff8a00] px-4 py-3 text-white">
            <MessageSquareText className="h-4 w-4" />
            <span className="text-sm font-semibold">{totalComments} komentar</span>
          </div>
        </div>
      </div>

      {databaseError && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">Database tidak bisa diakses.</div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
          <p className="text-xs font-semibold text-neutral-500">Total Komentar</p>
          <p className="mt-2 text-3xl font-bold text-neutral-900">{totalComments}</p>
        </div>
        <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
          <p className="text-xs font-semibold text-neutral-500">Top-level</p>
          <p className="mt-2 text-3xl font-bold text-neutral-900">{Math.max(totalComments - repliesCount, 0)}</p>
        </div>
        <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
          <p className="text-xs font-semibold text-neutral-500">Replies</p>
          <p className="mt-2 text-3xl font-bold text-neutral-900">{repliesCount}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-none">
        <CommentsFilterBar initialQuery={q} initialSlug={slugFilter} initialFilter={filter} />

        {filteredCount > 0 && (
          <div className="border-b border-neutral-100 px-5 py-3">
            <p className="text-xs text-neutral-500">
              Menampilkan {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredCount)} dari {filteredCount} komentar
            </p>
          </div>
        )}

        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-[#fffcc9]"><MessageSquareText className="h-5 w-5 text-[#ff8a00]" /></div>
            <p className="text-sm font-semibold text-neutral-700">Tidak ada komentar ditemukan</p>
            <p className="mt-1 text-xs text-neutral-400">Coba ubah filter atau kata kunci pencarian.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {comments.map((comment) => (
              <div key={comment.id} className="p-5 hover:bg-neutral-50">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-neutral-900">{comment.userName ?? comment.userId}</p>
                      {comment.parentId && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#fffcc9] px-2 py-0.5 text-xs font-semibold text-[#ff8a00]"><Reply className="h-3 w-3" /> Reply</span>
                      )}
                      <span className="text-xs text-neutral-400">{comment.createdAt.toLocaleDateString("id-ID")}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{comment.content}</p>
                    <p className="mt-2 text-xs text-neutral-400">Artikel: <span className="font-medium text-neutral-600">{comment.post.title}</span></p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Link href={`/blog/${comment.post.slug}`} target="_blank" className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:border-[#ffcd80] hover:bg-[#fffcc9] hover:text-[#ff8a00]">
                      Lihat <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                    <DeleteCommentButton id={comment.id} slug={comment.post.slug} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-neutral-200 px-5 py-4">
            <p className="text-xs text-neutral-500">Halaman {page} dari {totalPages}</p>
            <div className="flex items-center gap-2">
              {page > 1 ? (
                <Link href={buildPageUrl(page - 1)} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
                  <ChevronLeft className="h-3.5 w-3.5" /> Prev
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-md border border-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-300">
                  <ChevronLeft className="h-3.5 w-3.5" /> Prev
                </span>
              )}
              {page < totalPages ? (
                <Link href={buildPageUrl(page + 1)} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-md border border-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-300">
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
