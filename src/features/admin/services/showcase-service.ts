import "server-only";

import db from "@/lib/db";
import { uploadShowcaseHtml } from "@/features/admin/services/showcase-html-storage-service";
import {
  adminShowcaseListSelect,
  ADMIN_SHOWCASE_PAGE_SIZE,
  showcaseFormSelect,
  type AdminShowcaseDashboard,
  type AdminShowcaseSearchParams,
  type ShowcaseMutationInput,
} from "@/features/admin/types/showcase-service";
import {
  buildShowcaseWhere,
  normalizeShowcaseStatus,
  readShowcaseGroupCount,
  slugifyShowcaseRecord,
} from "@/features/admin/lib/showcase-service-utils";
export { emptyAdminShowcaseDashboard, parseShowcaseFormData } from "@/features/admin/lib/showcase-service-utils";
export { ADMIN_SHOWCASE_PAGE_SIZE } from "@/features/admin/types/showcase-service";
export type {
  AdminShowcaseDashboard,
  AdminShowcaseRow,
  AdminShowcaseSearchParams,
  ShowcaseFormRecord,
  ShowcaseMutationInput,
  ShowcaseStatus,
} from "@/features/admin/types/showcase-service";

export async function getAdminShowcaseDashboard(
  searchParams: AdminShowcaseSearchParams,
): Promise<AdminShowcaseDashboard> {
  const q = String(searchParams.q ?? "").trim();
  const status = normalizeShowcaseStatus(searchParams.status);
  const category = String(searchParams.category ?? "").trim();
  const page = Math.max(1, Number(searchParams.page || 1));
  const where = buildShowcaseWhere({ q, status, category });
  const skip = (page - 1) * ADMIN_SHOWCASE_PAGE_SIZE;

  const [items, filteredTotal, statusCounts, categoryCounts] = await db.$transaction([
    db.showcase.findMany({
      where,
      select: adminShowcaseListSelect,
      orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
      skip,
      take: ADMIN_SHOWCASE_PAGE_SIZE,
    }),
    db.showcase.count({ where }),
    db.showcase.groupBy({
      by: ["published"],
      _count: { id: true },
      orderBy: { published: "desc" },
    }),
    db.showcase.groupBy({
      by: ["category"],
      _count: { id: true },
      orderBy: { category: "asc" },
    }),
  ]);

  const published = readShowcaseGroupCount(statusCounts.find((item) => item.published));
  const draft = readShowcaseGroupCount(statusCounts.find((item) => !item.published));
  const totalPages = Math.max(1, Math.ceil(filteredTotal / ADMIN_SHOWCASE_PAGE_SIZE));

  return {
    items,
    categories: categoryCounts.map((item) => ({ name: item.category, count: readShowcaseGroupCount(item) })),
    filters: { q, status, category, page },
    pagination: {
      page,
      pageSize: ADMIN_SHOWCASE_PAGE_SIZE,
      total: filteredTotal,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
    stats: {
      total: published + draft,
      published,
      draft,
      categories: categoryCounts.length,
    },
  };
}

export async function getShowcaseFormOptions() {
  const [categories, maxOrder] = await db.$transaction([
    db.showcase.groupBy({
      by: ["category"],
      _count: { id: true },
      orderBy: { category: "asc" },
    }),
    db.showcase.aggregate({ _max: { order: true } }),
  ]);

  return {
    categories: categories.map((item) => item.category).filter(Boolean),
    nextOrder: (maxOrder._max.order ?? 0) + 1,
  };
}

export async function getShowcaseForEdit(id: string) {
  return db.showcase.findUnique({
    where: { id },
    select: showcaseFormSelect,
  });
}

export async function createShowcaseRecord(input: ShowcaseMutationInput) {
  const data = await buildShowcaseData(input);
  return db.showcase.create({ data, select: { id: true, slug: true } });
}

export async function updateShowcaseRecord(id: string, input: ShowcaseMutationInput) {
  const data = await buildShowcaseData(input, id);
  return db.showcase.update({ where: { id }, data, select: { id: true, slug: true } });
}

export async function deleteShowcaseRecord(id: string) {
  return db.showcase.delete({ where: { id }, select: { id: true, slug: true } });
}

export async function toggleShowcasePublishedById(id: string) {
  return db.$executeRaw`
    UPDATE "Showcase"
    SET "published" = NOT "published", "updatedAt" = NOW()
    WHERE "id" = ${id}
  `;
}

async function buildShowcaseData(input: ShowcaseMutationInput, excludeId?: string) {
  if (input.title.length < 3) throw new Error("Judul minimal 3 karakter.");
  if (input.description.length < 10) throw new Error("Deskripsi minimal 10 karakter.");
  if (!input.category) throw new Error("Kategori wajib diisi.");

  const baseSlug = slugifyShowcaseRecord(input.requestedSlug || input.title);
  const slug = await ensureUniqueSlug(baseSlug, excludeId);
  const htmlUrl = await resolveShowcaseHtmlUrl(input, slug);
  const order = input.order ?? await getNextShowcaseOrder();

  return {
    slug,
    title: input.title,
    description: input.description,
    category: input.category,
    htmlUrl,
    thumbnail: input.thumbnail || null,
    tags: input.tags,
    published: input.published,
    order,
  };
}

async function getNextShowcaseOrder() {
  const result = await db.showcase.aggregate({ _max: { order: true } });
  return (result._max.order ?? 0) + 1;
}

async function resolveShowcaseHtmlUrl(input: ShowcaseMutationInput, slug: string) {
  if (input.htmlSourceMode === "editor") {
    if (!input.htmlSource) throw new Error("Isi HTML editor dulu sebelum menyimpan.");
    return uploadShowcaseHtml({ html: input.htmlSource, slug });
  }

  if (!input.htmlUrl) throw new Error("Upload file HTML, isi editor HTML, atau tempel URL HTML dulu.");
  return input.htmlUrl;
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: string) {
  const rootSlug = baseSlug || `showcase-${Date.now()}`;
  let slug = rootSlug;
  let attempt = 1;

  while (true) {
    const existing = excludeId
      ? await db.showcase.findFirst({
          where: { slug, NOT: { id: excludeId } },
          select: { id: true },
        })
      : await db.showcase.findUnique({
          where: { slug },
          select: { id: true },
        });

    if (!existing) return slug;
    attempt += 1;
    slug = `${rootSlug}-${attempt}`;
  }
}
