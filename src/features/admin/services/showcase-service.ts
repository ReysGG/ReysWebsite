import "server-only";

import type { Prisma } from "@prisma/client";
import db from "@/lib/db";
import { uploadShowcaseHtml } from "@/features/admin/services/showcase-html-storage-service";

export const ADMIN_SHOWCASE_PAGE_SIZE = 12;

export type ShowcaseStatus = "all" | "published" | "draft";

export type AdminShowcaseSearchParams = {
  q?: string;
  status?: string;
  category?: string;
  page?: string;
};

const adminShowcaseListSelect = {
  id: true,
  slug: true,
  title: true,
  description: true,
  category: true,
  thumbnail: true,
  htmlUrl: true,
  tags: true,
  published: true,
  order: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ShowcaseSelect;

const showcaseFormSelect = {
  id: true,
  slug: true,
  title: true,
  description: true,
  category: true,
  thumbnail: true,
  htmlUrl: true,
  tags: true,
  published: true,
  order: true,
} satisfies Prisma.ShowcaseSelect;

export type AdminShowcaseRow = Prisma.ShowcaseGetPayload<{ select: typeof adminShowcaseListSelect }>;
export type ShowcaseFormRecord = Prisma.ShowcaseGetPayload<{ select: typeof showcaseFormSelect }>;

export type AdminShowcaseDashboard = {
  items: AdminShowcaseRow[];
  categories: Array<{ name: string; count: number }>;
  filters: {
    q: string;
    status: ShowcaseStatus;
    category: string;
    page: number;
  };
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  stats: {
    total: number;
    published: number;
    draft: number;
    categories: number;
  };
};

export type ShowcaseMutationInput = {
  title: string;
  description: string;
  category: string;
  htmlUrl: string;
  htmlSourceMode: "upload" | "editor";
  htmlSource: string;
  thumbnail: string;
  requestedSlug: string;
  order?: number;
  published: boolean;
  tags: string[];
};

export function emptyAdminShowcaseDashboard(): AdminShowcaseDashboard {
  return {
    items: [],
    categories: [],
    filters: { q: "", status: "all", category: "", page: 1 },
    pagination: {
      page: 1,
      pageSize: ADMIN_SHOWCASE_PAGE_SIZE,
      total: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
    stats: { total: 0, published: 0, draft: 0, categories: 0 },
  };
}

export function normalizeShowcaseStatus(value?: string): ShowcaseStatus {
  if (value === "published" || value === "draft") return value;
  return "all";
}

export function parseShowcaseFormData(formData: FormData): ShowcaseMutationInput {
  return {
    title: getString(formData, "title"),
    description: getString(formData, "description"),
    category: getString(formData, "category"),
    htmlUrl: getString(formData, "htmlUrl"),
    htmlSourceMode: getHtmlSourceMode(formData),
    htmlSource: getString(formData, "htmlSource"),
    thumbnail: getString(formData, "thumbnail"),
    requestedSlug: getString(formData, "slug"),
    order: getOptionalNumber(formData, "order"),
    published: formData.get("published") === "on" || formData.get("published") === "true",
    tags: getTags(formData),
  };
}

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

  const published = readGroupCount(statusCounts.find((item) => item.published));
  const draft = readGroupCount(statusCounts.find((item) => !item.published));
  const totalPages = Math.max(1, Math.ceil(filteredTotal / ADMIN_SHOWCASE_PAGE_SIZE));

  return {
    items,
    categories: categoryCounts.map((item) => ({ name: item.category, count: readGroupCount(item) })),
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

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalNumber(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string" || !value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function getTags(formData: FormData) {
  const raw = getString(formData, "tags");
  if (!raw) return [];
  return Array.from(new Set(raw.split(",").map((tag) => tag.trim()).filter(Boolean))).slice(0, 10);
}

function getHtmlSourceMode(formData: FormData): ShowcaseMutationInput["htmlSourceMode"] {
  return formData.get("htmlSourceMode") === "editor" ? "editor" : "upload";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function buildShowcaseWhere(params: { q: string; status: ShowcaseStatus; category: string }) {
  const and: Prisma.ShowcaseWhereInput[] = [];

  if (params.status === "published") and.push({ published: true });
  if (params.status === "draft") and.push({ published: false });
  if (params.category) and.push({ category: params.category });

  if (params.q) {
    and.push({
      OR: [
        { title: { contains: params.q, mode: "insensitive" } },
        { description: { contains: params.q, mode: "insensitive" } },
        { category: { contains: params.q, mode: "insensitive" } },
        { slug: { contains: params.q, mode: "insensitive" } },
      ],
    });
  }

  const where: Prisma.ShowcaseWhereInput = and.length ? { AND: and } : {};
  return where;
}

function readGroupCount(row: { _count?: true | { id?: number; _all?: number } } | undefined) {
  const count = row?._count;
  if (!count || count === true) return 0;
  return count.id ?? count._all ?? 0;
}

async function buildShowcaseData(input: ShowcaseMutationInput, excludeId?: string) {
  if (input.title.length < 3) throw new Error("Judul minimal 3 karakter.");
  if (input.description.length < 10) throw new Error("Deskripsi minimal 10 karakter.");
  if (!input.category) throw new Error("Kategori wajib diisi.");

  const baseSlug = slugify(input.requestedSlug || input.title);
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
