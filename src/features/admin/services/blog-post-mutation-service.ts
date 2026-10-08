import "server-only";

import db from "@/lib/db";
import { ensureUniquePostSlug, isValidSlug, buildKeywordSlug, slugifyTitle } from "@/features/blog/lib/slug";
import { sanitizeRichText } from "@/features/blog/lib/sanitize";
import { getExcerptFromHtml, calculateReadingTime } from "@/features/blog/lib/reading-time";

/** Typed input shared by the admin blog form (FormData) and the AI tools. */
export type PostMutationInput = {
  title: string;
  content: string;
  slug?: string | null;
  focusKeyword?: string | null;
  excerpt?: string | null;
  coverImage?: string | null;
  coverImageCredit?: string | null;
  ogImage?: string | null;
  category?: string | null;
  canonicalUrl?: string | null;
  metaTitle?: string | null;
  metaDesc?: string | null;
  tags?: string[];
  published?: boolean;
  featured?: boolean;
  publishedAt?: Date | null;
  scheduledAt?: Date | null;
  aiGenerated?: boolean;
};

export type PostRef = { id: string; slug: string };

function optional(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function normalizeTags(tags: string[] = []) {
  return Array.from(new Set(tags.map((tag) => tag.trim()).filter(Boolean))).slice(0, 12);
}

export async function normalizePostInput(input: PostMutationInput, excludePostId?: string) {
  const title = input.title.trim();
  const rawContent = input.content.trim();
  if (title.length < 3) throw new Error("Judul minimal 3 karakter.");
  if (rawContent.length < 10) throw new Error("Konten minimal 10 karakter.");

  const content = sanitizeRichText(rawContent);
  const requestedSlug = input.slug?.trim() ?? "";
  const focusKeyword = input.focusKeyword?.trim() ?? "";
  const baseSlug = requestedSlug ? slugifyTitle(requestedSlug) : buildKeywordSlug(title, focusKeyword);
  if (!isValidSlug(baseSlug)) throw new Error("Slug hanya boleh huruf kecil, angka, dan tanda hubung.");

  const slug = await ensureUniquePostSlug(baseSlug, excludePostId);
  const excerpt = input.excerpt?.trim() || getExcerptFromHtml(content);
  const published = Boolean(input.published);

  return {
    title,
    slug,
    content,
    excerpt: optional(excerpt),
    readingTime: calculateReadingTime(content),
    coverImage: optional(input.coverImage),
    // undefined = keep the stored credit (the manual form doesn't edit it).
    ...(input.coverImageCredit !== undefined ? { coverImageCredit: optional(input.coverImageCredit) } : {}),
    ogImage: optional(input.ogImage),
    category: optional(input.category),
    focusKeyword: optional(focusKeyword),
    canonicalUrl: optional(input.canonicalUrl),
    metaTitle: optional(input.metaTitle),
    metaDesc: optional(input.metaDesc),
    tags: normalizeTags(input.tags),
    published,
    featured: Boolean(input.featured),
    publishedAt: published ? input.publishedAt ?? new Date() : null,
    // A published post is never "scheduled"; drafts keep the requested schedule.
    scheduledAt: published ? null : input.scheduledAt ?? null,
    ...(input.aiGenerated !== undefined ? { aiGenerated: input.aiGenerated } : {}),
  };
}

export async function createPostRecord(input: PostMutationInput, author?: string | null): Promise<PostRef> {
  const data = await normalizePostInput(input);
  return db.post.create({
    data: { ...data, author: author ?? null },
    select: { id: true, slug: true },
  });
}

/**
 * Full update (form semantics): every field in `input` replaces the stored value.
 * Keeps the original publishedAt when re-saving a published post without an explicit date.
 */
export async function updatePostRecord(id: string, input: PostMutationInput): Promise<{ previousSlug: string } & PostRef> {
  const existing = await db.post.findUnique({ where: { id }, select: { slug: true, publishedAt: true } });
  if (!existing) throw new Error("Post tidak ditemukan.");

  const data = await normalizePostInput(input, id);
  if (data.published && existing.publishedAt && !input.publishedAt) {
    data.publishedAt = existing.publishedAt;
  }
  const post = await db.post.update({ where: { id }, data, select: { id: true, slug: true } });
  return { ...post, previousSlug: existing.slug };
}

export async function deletePostRecord(id: string): Promise<PostRef> {
  return db.post.delete({ where: { id }, select: { id: true, slug: true } });
}

export async function setPostPublished(id: string, published: boolean): Promise<PostRef> {
  return db.post.update({
    where: { id },
    data: { published, publishedAt: published ? new Date() : null, scheduledAt: null },
    select: { id: true, slug: true },
  });
}

export async function bulkSetPostsPublished(ids: string[], published: boolean): Promise<string[]> {
  const [posts] = await db.$transaction([
    db.post.findMany({ where: { id: { in: ids } }, select: { slug: true } }),
    db.post.updateMany({
      where: { id: { in: ids } },
      data: { published, publishedAt: published ? new Date() : null, scheduledAt: null },
    }),
  ]);
  return posts.map((post) => post.slug);
}

/** Queue a draft to be auto-published by the cron tick at `scheduledAt`. */
export async function schedulePostRecord(id: string, scheduledAt: Date): Promise<PostRef> {
  if (Number.isNaN(scheduledAt.getTime())) throw new Error("Tanggal jadwal tidak valid.");
  if (scheduledAt.getTime() <= Date.now()) throw new Error("Jadwal harus di masa depan.");
  return db.post.update({
    where: { id },
    data: { published: false, publishedAt: null, scheduledAt },
    select: { id: true, slug: true },
  });
}

export async function unschedulePostRecord(id: string): Promise<PostRef> {
  return db.post.update({ where: { id }, data: { scheduledAt: null }, select: { id: true, slug: true } });
}

/**
 * Publishes every draft whose schedule is due. Uses the scheduled time as publishedAt.
 * Returns the slugs that went live so callers can revalidate.
 */
export async function publishDueScheduledPosts(now = new Date()): Promise<string[]> {
  const due = await db.post.findMany({
    where: { published: false, scheduledAt: { lte: now } },
    select: { id: true, slug: true, scheduledAt: true },
    take: 50,
  });
  if (due.length === 0) return [];

  const results = await db.$transaction(
    due.map((post) =>
      db.post.updateMany({
        // Guard against a concurrent tick or a manual edit that already changed the state.
        where: { id: post.id, published: false, scheduledAt: { lte: now } },
        data: { published: true, publishedAt: post.scheduledAt ?? now, scheduledAt: null },
      }),
    ),
  );
  return due.filter((_, index) => results[index].count === 1).map((post) => post.slug);
}
