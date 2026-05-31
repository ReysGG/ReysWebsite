import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { Prisma } from "@prisma/client";
import db from "@/lib/db";
import { BLOG_PAGE_SIZE, ADMIN_BLOG_PAGE_SIZE, getPaginationMeta } from "../lib/pagination";
import type { BlogSearchParams } from "../lib/filters";

export const BLOG_FILTER_OPTIONS_TAG = "blog-filter-options";

export type BlogPost = Prisma.PostGetPayload<{ select: typeof listSelect }>;

const listSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  coverImage: true,
  ogImage: true,
  author: true,
  category: true,
  focusKeyword: true,
  published: true,
  featured: true,
  publishedAt: true,
  metaTitle: true,
  metaDesc: true,
  tags: true,
  createdAt: true,
  updatedAt: true,
  views: true,
  readingTime: true,
} satisfies Prisma.PostSelect;

function dateRangeForYear(year?: number) {
  if (!year) return undefined;
  return { gte: new Date(year, 0, 1), lt: new Date(year + 1, 0, 1) };
}

function buildTsQuery(input: string): string | null {
  const tokens = input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 2)
    .slice(0, 6);
  if (!tokens.length) return null;
  return tokens.map((t) => `${t}:*`).join(' & ');
}

async function searchPostIds(query: string, limit = 200): Promise<string[]> {
  const ts = buildTsQuery(query);
  if (!ts) return [];
  const rows = await db.$queryRaw<Array<{ id: string }>>`
    SELECT "id"
    FROM "Post"
    WHERE "published" = true
      AND "searchVector" @@ to_tsquery('simple', ${ts})
    ORDER BY ts_rank("searchVector", to_tsquery('simple', ${ts})) DESC,
             "publishedAt" DESC NULLS LAST
    LIMIT ${limit}
  `;
  return rows.map((r) => r.id);
}

function publicWhere(params: Partial<BlogSearchParams> = {}, searchIds?: string[]): Prisma.PostWhereInput {
  const tags = [params.tag].filter(Boolean) as string[];
  const where: Prisma.PostWhereInput = {
    published: true,
    ...(params.category
      ? { OR: [{ category: params.category }, { tags: { has: params.category } }] }
      : {}),
    ...(tags.length ? { tags: { hasSome: tags } } : {}),
    ...(params.year ? { publishedAt: dateRangeForYear(params.year) } : {}),
  };
  if (searchIds) where.id = { in: searchIds };
  return where;
}

export async function getPublishedPosts(params: Partial<BlogSearchParams> = {}) {
  const page = params.page ?? 1;
  const searchIds = params.q ? await searchPostIds(params.q) : undefined;
  if (params.q && (!searchIds || !searchIds.length)) {
    const pagination = getPaginationMeta(0, page, BLOG_PAGE_SIZE);
    const empty: BlogPost[] = [];
    return Object.assign(empty, { posts: empty, pagination });
  }
  const where = publicWhere(params, searchIds);
  const [total, posts] = await Promise.all([
    db.post.count({ where }),
    db.post.findMany({
      where,
      select: listSelect,
      orderBy: searchIds
        ? [{ publishedAt: "desc" }, { createdAt: "desc" }]
        : [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * BLOG_PAGE_SIZE,
      take: BLOG_PAGE_SIZE,
    }),
  ]);
  const pagination = getPaginationMeta(total, page, BLOG_PAGE_SIZE);

  return Object.assign(posts, { posts, pagination });
}

export async function getAllPublishedSlugs() {
  return db.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true, publishedAt: true, createdAt: true },
  });
}

export const getPublishedPostBySlug = cache(async (slug: string) => {
  return db.post.findFirst({ where: { slug, published: true } });
});

export async function getRelatedPosts(post: { id: string; tags: string[]; category?: string | null }, take = 3) {
  const relatedClauses: Prisma.PostWhereInput[] = [];
  if (post.category) relatedClauses.push({ category: post.category });
  if (post.tags.length) relatedClauses.push({ tags: { hasSome: post.tags } });

  return db.post.findMany({
    where: {
      id: { not: post.id },
      published: true,
      ...(relatedClauses.length ? { OR: relatedClauses } : {}),
    },
    select: listSelect,
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
    take,
  });
}

export async function getAdjacentPosts(post: { publishedAt: Date | null; createdAt: Date }) {
  const date = post.publishedAt ?? post.createdAt;

  const [prevArr, nextArr] = await Promise.all([
    db.post.findMany({
      where: { published: true, publishedAt: { lt: date } },
      orderBy: { publishedAt: "desc" },
      take: 1,
      select: { slug: true, title: true },
    }),
    db.post.findMany({
      where: { published: true, publishedAt: { gt: date } },
      orderBy: { publishedAt: "asc" },
      take: 1,
      select: { slug: true, title: true },
    }),
  ]);

  return {
    prev: prevArr[0] ?? null,
    next: nextArr[0] ?? null,
  };
}

export const getBlogFilterOptions = unstable_cache(
  async () => {
    const posts = await db.post.findMany({
      where: { published: true },
      select: { tags: true, category: true, publishedAt: true, createdAt: true },
    });

    const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
    const years = Array.from(new Set(posts.map((post) => (post.publishedAt ?? post.createdAt).getFullYear()))).sort((a, b) => b - a);
    const categories = Array.from(new Set(posts.map((post) => post.category || post.tags[0] || "Umum"))).sort();

    return { tags, categories, years };
  },
  ["blog-filter-options"],
  { tags: [BLOG_FILTER_OPTIONS_TAG], revalidate: 3600 },
);

export async function getAdminPosts(params: Partial<BlogSearchParams> = {}) {
  const page = params.page ?? 1;
  const where: Prisma.PostWhereInput = {
    ...(params.status && params.status !== "all" ? { published: params.status === "published" } : {}),
    ...(params.q
      ? { OR: [
          { title: { contains: params.q, mode: "insensitive" } },
          { slug: { contains: params.q, mode: "insensitive" } },
          { excerpt: { contains: params.q, mode: "insensitive" } },
        ] }
      : {}),
    ...(params.tag ? { tags: { has: params.tag } } : {}),
    ...(params.category ? { OR: [{ category: params.category }, { tags: { has: params.category } }] } : {}),
    ...(params.year ? { publishedAt: dateRangeForYear(params.year) } : {}),
  };
  const [total, posts] = await Promise.all([
    db.post.count({ where }),
    db.post.findMany({
      where,
      select: listSelect,
      orderBy: [{ updatedAt: "desc" }],
      skip: (page - 1) * ADMIN_BLOG_PAGE_SIZE,
      take: ADMIN_BLOG_PAGE_SIZE,
    }),
  ]);
  const pagination = getPaginationMeta(total, page, ADMIN_BLOG_PAGE_SIZE);

  return { posts, pagination };
}

export async function getPostById(id: string) {
  return db.post.findUnique({ where: { id } });
}
