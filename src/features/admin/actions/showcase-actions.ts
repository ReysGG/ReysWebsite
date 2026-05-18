"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { requireAdmin } from "@/features/admin/lib/auth";
import { SHOWCASE_TAG } from "@/features/showcase/data";

export type ShowcaseActionState = {
  success?: boolean;
  error?: string;
  message?: string;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getTags(formData: FormData) {
  const raw = getString(formData, "tags");
  if (!raw) return [];
  return Array.from(new Set(raw.split(",").map((t) => t.trim()).filter(Boolean))).slice(0, 10);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: string) {
  let slug = baseSlug || `showcase-${Date.now()}`;
  let attempt = 1;
  while (true) {
    const existing = await db.showcase.findFirst({
      where: { slug, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
      select: { id: true },
    });
    if (!existing) return slug;
    attempt += 1;
    slug = `${baseSlug}-${attempt}`;
  }
}

function revalidateShowcase() {
  revalidateTag(SHOWCASE_TAG, "max");
  revalidatePath("/showcase");
  revalidatePath("/admin/showcase");
}

async function buildInput(formData: FormData, excludeId?: string) {
  const title = getString(formData, "title");
  const description = getString(formData, "description");
  const category = getString(formData, "category");
  const htmlUrl = getString(formData, "htmlUrl");
  const thumbnail = getString(formData, "thumbnail");
  const requestedSlug = getString(formData, "slug");
  const order = Number(formData.get("order")) || 0;
  const published = formData.get("published") === "on" || formData.get("published") === "true";

  if (title.length < 3) throw new Error("Judul minimal 3 karakter.");
  if (description.length < 10) throw new Error("Deskripsi minimal 10 karakter.");
  if (!category) throw new Error("Kategori wajib diisi.");
  if (!htmlUrl) throw new Error("URL HTML wajib diisi (upload atau tempel link).");

  const baseSlug = slugify(requestedSlug || title);
  const slug = await ensureUniqueSlug(baseSlug, excludeId);

  return {
    slug,
    title,
    description,
    category,
    htmlUrl,
    thumbnail: thumbnail || null,
    tags: getTags(formData),
    published,
    order,
  };
}

export async function createShowcase(_state: ShowcaseActionState, formData: FormData): Promise<ShowcaseActionState> {
  try {
    await requireAdmin();
    const input = await buildInput(formData);
    await db.showcase.create({ data: input });
    revalidateShowcase();
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Gagal membuat showcase." };
  }
  redirect("/admin/showcase");
}

export async function updateShowcase(id: string, _state: ShowcaseActionState, formData: FormData): Promise<ShowcaseActionState> {
  try {
    await requireAdmin();
    const existing = await db.showcase.findUnique({ where: { id }, select: { id: true } });
    if (!existing) return { success: false, error: "Showcase tidak ditemukan." };
    const input = await buildInput(formData, id);
    await db.showcase.update({ where: { id }, data: input });
    revalidateShowcase();
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Gagal memperbarui showcase." };
  }
  redirect("/admin/showcase");
}

export async function deleteShowcase(formData: FormData) {
  await requireAdmin();
  const id = getString(formData, "id");
  if (!id) return;
  await db.showcase.delete({ where: { id } });
  revalidateShowcase();
}

export async function toggleShowcasePublished(formData: FormData) {
  await requireAdmin();
  const id = getString(formData, "id");
  if (!id) return;
  const current = await db.showcase.findUnique({ where: { id }, select: { published: true } });
  if (!current) return;
  await db.showcase.update({ where: { id }, data: { published: !current.published } });
  revalidateShowcase();
}
