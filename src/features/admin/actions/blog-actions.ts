"use server";

import { requireAdmin } from "@/features/admin/lib/auth";
import { revalidateBlogPaths } from "@/features/blog/lib/revalidate-blog";
import {
  bulkSetPostsPublished,
  createPostRecord,
  deletePostRecord,
  setPostPublished,
  updatePostRecord,
  type PostMutationInput,
} from "@/features/admin/services/blog-post-mutation-service";

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
  return formData.getAll("tags").flatMap((value) => (typeof value === "string" ? value.split(",") : []));
}

function getOptionalDate(formData: FormData, key: string) {
  const value = getString(formData, key);
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formToPostInput(formData: FormData): PostMutationInput {
  return {
    title: getString(formData, "title"),
    content: getString(formData, "content"),
    slug: getString(formData, "slug"),
    focusKeyword: getString(formData, "focusKeyword"),
    excerpt: getString(formData, "excerpt"),
    coverImage: getString(formData, "coverImage"),
    ogImage: getString(formData, "ogImage"),
    category: getString(formData, "category"),
    canonicalUrl: getString(formData, "canonicalUrl"),
    metaTitle: getString(formData, "metaTitle"),
    metaDesc: getString(formData, "metaDesc"),
    tags: getTags(formData),
    published: getBool(formData, "published"),
    featured: getBool(formData, "featured"),
    publishedAt: getOptionalDate(formData, "publishedAt"),
    scheduledAt: getOptionalDate(formData, "scheduledAt"),
  };
}

export async function createPost(_prevState: BlogActionState, formData: FormData): Promise<BlogActionState> {
  try {
    const admin = await requireAdmin();
    const post = await createPostRecord(formToPostInput(formData), admin.name);

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

    const post = await updatePostRecord(id, formToPostInput(formData));

    revalidateBlogPaths(post.previousSlug);
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

    const post = await deletePostRecord(id);
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

    const post = await setPostPublished(id, published);
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

    const slugs = await bulkSetPostsPublished(ids, published);

    revalidateBlogPaths();
    slugs.forEach((slug) => revalidateBlogPaths(slug));
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
