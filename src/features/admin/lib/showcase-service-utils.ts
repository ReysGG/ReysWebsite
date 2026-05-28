import type { Prisma } from "@prisma/client";
import { ADMIN_SHOWCASE_PAGE_SIZE, type AdminShowcaseDashboard, type ShowcaseMutationInput, type ShowcaseStatus } from "@/features/admin/types/showcase-service";

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

export function buildShowcaseWhere(params: { q: string; status: ShowcaseStatus; category: string }) {
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

export function readShowcaseGroupCount(row: { _count?: true | { id?: number; _all?: number } } | undefined) {
  const count = row?._count;
  if (!count || count === true) return 0;
  return count.id ?? count._all ?? 0;
}

export function slugifyShowcaseRecord(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
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
