import "server-only";

import type { Prisma } from "@prisma/client";
import db from "@/lib/db";
import { stripHtml } from "@/features/blog/lib/reading-time";
import { updatePostRecord, type PostMutationInput } from "@/features/admin/services/blog-post-mutation-service";

/** Read/patch helpers shaped for LLM tool results: compact, explicit fields only. */

export type AiPostStatus = "draft" | "scheduled" | "published";

function statusOf(post: { published: boolean; scheduledAt: Date | null }): AiPostStatus {
  if (post.published) return "published";
  return post.scheduledAt ? "scheduled" : "draft";
}

export async function listPostsForAi(params: { query?: string; status?: AiPostStatus | "all"; limit?: number }) {
  const where: Prisma.PostWhereInput = {
    ...(params.status === "published" ? { published: true } : {}),
    ...(params.status === "draft" ? { published: false, scheduledAt: null } : {}),
    ...(params.status === "scheduled" ? { published: false, scheduledAt: { not: null } } : {}),
    ...(params.query
      ? {
          OR: [
            { title: { contains: params.query, mode: "insensitive" } },
            { slug: { contains: params.query, mode: "insensitive" } },
            { focusKeyword: { contains: params.query, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const posts = await db.post.findMany({
    where,
    select: {
      id: true, title: true, slug: true, published: true, scheduledAt: true, publishedAt: true,
      focusKeyword: true, category: true, aiGenerated: true, updatedAt: true,
    },
    orderBy: { updatedAt: "desc" },
    take: Math.min(params.limit ?? 20, 50),
  });
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    status: statusOf(post),
    focusKeyword: post.focusKeyword,
    category: post.category,
    aiGenerated: post.aiGenerated,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    scheduledAt: post.scheduledAt?.toISOString() ?? null,
    updatedAt: post.updatedAt.toISOString(),
  }));
}

const fullSelect = {
  id: true, title: true, slug: true, content: true, excerpt: true, coverImage: true, coverImageCredit: true, ogImage: true,
  category: true, focusKeyword: true, canonicalUrl: true, metaTitle: true, metaDesc: true, tags: true,
  published: true, featured: true, publishedAt: true, scheduledAt: true, aiGenerated: true,
} as const;

export async function getPostForAi(idOrSlug: string) {
  return db.post.findFirst({ where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] }, select: fullSelect });
}

export type PostPatch = Partial<
  Pick<PostMutationInput, "title" | "content" | "slug" | "focusKeyword" | "excerpt" | "coverImage" | "coverImageCredit" | "ogImage" | "category" | "canonicalUrl" | "metaTitle" | "metaDesc" | "tags" | "featured">
>;

/** Applies a partial update on top of the stored post (status fields are untouched). */
export async function patchPost(id: string, patch: PostPatch) {
  const existing = await db.post.findUnique({ where: { id }, select: fullSelect });
  if (!existing) throw new Error("Post tidak ditemukan.");
  const merged: PostMutationInput = {
    title: patch.title ?? existing.title,
    content: patch.content ?? existing.content,
    slug: patch.slug ?? existing.slug,
    focusKeyword: patch.focusKeyword ?? existing.focusKeyword,
    excerpt: patch.excerpt ?? existing.excerpt,
    coverImage: patch.coverImage ?? existing.coverImage,
    coverImageCredit: patch.coverImageCredit ?? existing.coverImageCredit,
    ogImage: patch.ogImage ?? existing.ogImage,
    category: patch.category ?? existing.category,
    canonicalUrl: patch.canonicalUrl ?? existing.canonicalUrl,
    metaTitle: patch.metaTitle ?? existing.metaTitle,
    metaDesc: patch.metaDesc ?? existing.metaDesc,
    tags: patch.tags ?? existing.tags,
    featured: patch.featured ?? existing.featured,
    published: existing.published,
    publishedAt: existing.publishedAt,
    scheduledAt: existing.scheduledAt,
  };
  return updatePostRecord(id, merged);
}

export async function findInternalLinkCandidates(keyword: string, excludeId?: string, limit = 8) {
  const words = keyword.split(/\s+/).filter((w) => w.length > 3).slice(0, 4);
  const posts = await db.post.findMany({
    where: {
      published: true,
      ...(excludeId ? { id: { not: excludeId } } : {}),
      OR: [
        { title: { contains: keyword, mode: "insensitive" } },
        { focusKeyword: { contains: keyword, mode: "insensitive" } },
        ...words.map((word) => ({ title: { contains: word, mode: "insensitive" as const } })),
        ...words.map((word) => ({ tags: { has: word } })),
      ],
    },
    select: { title: true, slug: true, focusKeyword: true, excerpt: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
  return posts.map((post) => ({ title: post.title, url: `/blog/${post.slug}`, focusKeyword: post.focusKeyword, excerpt: post.excerpt }));
}

/** Existing titles/keywords so the agent can avoid duplicate topics (keyword cannibalization). */
export async function getTopicInventory(limit = 80) {
  const posts = await db.post.findMany({
    select: { title: true, focusKeyword: true, category: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return posts;
}

export async function getTaxonomy() {
  const posts = await db.post.findMany({ select: { tags: true, category: true }, take: 500, orderBy: { createdAt: "desc" } });
  const tagCounts = new Map<string, number>();
  posts.flatMap((p) => p.tags).forEach((tag) => tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1));
  return {
    categories: Array.from(new Set(posts.map((p) => p.category).filter((c): c is string => Boolean(c)))).sort(),
    topTags: Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 40).map(([tag]) => tag),
  };
}

export function summarizeContent(html: string, max = 600) {
  const text = stripHtml(html);
  return text.length > max ? `${text.slice(0, max)}…` : text;
}
