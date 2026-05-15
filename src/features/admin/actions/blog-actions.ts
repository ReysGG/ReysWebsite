"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { requireAdmin } from "@/features/admin/lib/auth";
import { ensureUniquePostSlug, isValidSlug, buildKeywordSlug, slugifyTitle } from "@/features/blog/lib/slug";
import { sanitizeRichText } from "@/features/blog/lib/sanitize";
import { getExcerptFromHtml } from "@/features/blog/lib/reading-time";

export type BlogActionState = {
  success?: boolean;
  ok?: boolean;
  message?: string;
  error?: string;
  errors?: Record<string, string>;
  postId?: string;
  slug?: string;
};

function getString(formData: FormData, key: string, fallback = "") {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : fallback;
}

function getBool(formData: FormData, key: string) {
  const value = formData.get(key);
  return value === "true" || value === "on" || value === "1";
}

function getTags(formData: FormData) {
  const values = formData.getAll("tags").flatMap((value) =>
    typeof value === "string" ? value.split(",") : [],
  );
  return Array.from(new Set(values.map((tag) => tag.trim()).filter(Boolean))).slice(0, 12);
}

function optional(value: string) {
  return value || null;
}

function getOptionalDate(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value ? new Date(value) : null;
}

async function buildPostInput(formData: FormData, excludePostId?: string) {
  const title = getString(formData, "title");
  const rawContent = getString(formData, "content");
  if (title.length < 3) throw new Error("Judul minimal 3 karakter.");
  if (rawContent.length < 10) throw new Error("Konten minimal 10 karakter.");

  const content = sanitizeRichText(rawContent);
  const requestedSlug = getString(formData, "slug");
  const focusKeyword = getString(formData, "focusKeyword");
  const baseSlug = requestedSlug ? slugifyTitle(requestedSlug) : buildKeywordSlug(title, focusKeyword);
  if (!isValidSlug(baseSlug)) throw new Error("Slug hanya boleh huruf kecil, angka, dan tanda hubung.");

  const slug = await ensureUniquePostSlug(baseSlug, excludePostId);
  const excerpt = getString(formData, "excerpt") || getExcerptFromHtml(content);

  const published = getBool(formData, "published");
  const requestedPublishedAt = getOptionalDate(formData, "publishedAt");

  return {
    title,
    slug,
    content,
    excerpt: optional(excerpt),
    coverImage: optional(getString(formData, "coverImage")),
    ogImage: optional(getString(formData, "ogImage")),
    category: optional(getString(formData, "category")),
    focusKeyword: optional(focusKeyword),
    canonicalUrl: optional(getString(formData, "canonicalUrl")),
    metaTitle: optional(getString(formData, "metaTitle")),
    metaDesc: optional(getString(formData, "metaDesc")),
    tags: getTags(formData),
    published,
    featured: getBool(formData, "featured"),
    publishedAt: published ? requestedPublishedAt ?? new Date() : null,
  };
}

function revalidateBlogPaths(slug?: string | null) {
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin/blog/published");
  revalidatePath("/admin/blog/drafts");
  revalidatePath("/admin/blog/seo");
  revalidatePath("/admin/blog/calendar");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function createPost(_prevState: BlogActionState, formData: FormData): Promise<BlogActionState> {
  try {
    const admin = await requireAdmin();
    const input = await buildPostInput(formData);
    const post = await db.post.create({
      data: {
        ...input,
        author: admin.name,
      },
      select: { id: true, slug: true },
    });

    revalidateBlogPaths(post.slug);
    return { success: true, ok: true, message: "Post berhasil dibuat.", postId: post.id, slug: post.slug };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Gagal membuat post." };
  }
}

export async function updatePost(idOrState: string | BlogActionState, stateOrFormData: BlogActionState | FormData, maybeFormData?: FormData): Promise<BlogActionState> {
  try {
    await requireAdmin();
    const formData = (typeof idOrState === "string" ? maybeFormData : stateOrFormData) as FormData;
    if (!formData) return { success: false, error: "Form data tidak valid." };
    const id = typeof idOrState === "string" ? idOrState : getString(formData, "id");
    if (!id) return { success: false, error: "ID post tidak valid." };

    const existing = await db.post.findUnique({ where: { id }, select: { slug: true, publishedAt: true } });
    if (!existing) return { success: false, error: "Post tidak ditemukan." };

    const input = await buildPostInput(formData, id);
    if (input.published && existing.publishedAt && !getString(formData, "publishedAt")) {
      input.publishedAt = existing.publishedAt;
    }
    const post = await db.post.update({ where: { id }, data: input, select: { id: true, slug: true } });

    revalidateBlogPaths(existing.slug);
    revalidateBlogPaths(post.slug);
    return { success: true, ok: true, message: "Post berhasil diperbarui.", postId: post.id, slug: post.slug };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Gagal memperbarui post." };
  }
}

export async function deletePost(idOrState: string | BlogActionState, maybeFormData?: FormData): Promise<BlogActionState> {
  try {
    await requireAdmin();
    const id = typeof idOrState === "string" ? idOrState : getString(maybeFormData as FormData, "id");
    if (!id) return { success: false, error: "ID post tidak valid." };

    const post = await db.post.delete({ where: { id }, select: { id: true, slug: true } });
    revalidateBlogPaths(post.slug);
    return { success: true, ok: true, message: "Post berhasil dihapus.", postId: post.id };
  } catch {
    return { success: false, error: "Gagal menghapus post." };
  }
}

async function setPublished(formData: FormData, published: boolean): Promise<BlogActionState> {
  try {
    await requireAdmin();
    const id = getString(formData, "id");
    if (!id) return { success: false, error: "ID post tidak valid." };

    const post = await db.post.update({
      where: { id },
      data: { published, publishedAt: published ? new Date() : null },
      select: { id: true, slug: true },
    });
    revalidateBlogPaths(post.slug);
    return { success: true, ok: true, message: published ? "Post berhasil dipublikasikan." : "Post berhasil dijadikan draft.", postId: post.id, slug: post.slug };
  } catch {
    return { success: false, error: "Gagal mengubah status publikasi post." };
  }
}

export async function publishPost(_prevState: BlogActionState, formData: FormData) {
  return setPublished(formData, true);
}

export async function unpublishPost(_prevState: BlogActionState, formData: FormData) {
  return setPublished(formData, false);
}

async function bulkSetPublished(formData: FormData, published: boolean): Promise<BlogActionState> {
  try {
    await requireAdmin();
    const ids = formData.getAll("postIds").filter((value): value is string => typeof value === "string" && value.length > 0);
    if (ids.length === 0) return { success: false, error: "Pilih minimal satu artikel." };

    const posts = await db.post.findMany({ where: { id: { in: ids } }, select: { slug: true } });
    await db.post.updateMany({
      where: { id: { in: ids } },
      data: { published, publishedAt: published ? new Date() : null },
    });

    revalidateBlogPaths();
    posts.forEach((post) => revalidateBlogPaths(post.slug));
    return {
      success: true,
      ok: true,
      message: published ? `${ids.length} artikel dipublish.` : `${ids.length} artikel dijadikan draft.`,
    };
  } catch {
    return { success: false, error: "Gagal mengubah status publikasi artikel." };
  }
}

export async function bulkPublishPosts(_prevState: BlogActionState, formData: FormData) {
  return bulkSetPublished(formData, true);
}

export async function bulkUnpublishPosts(_prevState: BlogActionState, formData: FormData) {
  return bulkSetPublished(formData, false);
}
