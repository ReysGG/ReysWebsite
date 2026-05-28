import type { Prisma } from "@prisma/client";

export const ADMIN_SHOWCASE_PAGE_SIZE = 12;

export type ShowcaseStatus = "all" | "published" | "draft";

export type AdminShowcaseSearchParams = {
  q?: string;
  status?: string;
  category?: string;
  page?: string;
};

export const adminShowcaseListSelect = {
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

export const showcaseFormSelect = {
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
