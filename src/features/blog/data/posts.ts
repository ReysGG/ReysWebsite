import type { Prisma } from "@prisma/client";
import db from "@/lib/db";
import { BLOG_PAGE_SIZE, ADMIN_BLOG_PAGE_SIZE, getPaginationMeta } from "../lib/pagination";
import type { BlogSearchParams } from "../lib/filters";

export type BlogPost = Prisma.PostGetPayload<object>;

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
  canonicalUrl: true,
  published: true,
  featured: true,
  publishedAt: true,
  metaTitle: true,
  metaDesc: true,
  tags: true,
  createdAt: true,
  updatedAt: true,
  views: true,
  content: true,
} satisfies Prisma.PostSelect;

function dateRangeForYear(year?: number) {
  if (!year) return undefined;
  return { gte: new Date(year, 0, 1), lt: new Date(year + 1, 0, 1) };
}

function publicWhere(params: Partial<BlogSearchParams> = {}): Prisma.PostWhereInput {
  const tags = [params.tag].filter(Boolean) as string[];
  return {
    published: true,
    ...(params.q
      ? { OR: [
          { title: { contains: params.q, mode: "insensitive" } },
          { excerpt: { contains: params.q, mode: "insensitive" } },
          { content: { contains: params.q, mode: "insensitive" } },
        ] }
      : {}),
    ...(params.category
      ? { OR: [{ category: params.category }, { tags: { has: params.category } }] }
      : {}),
    ...(tags.length ? { tags: { hasSome: tags } } : {}),
    ...(params.year ? { publishedAt: dateRangeForYear(params.year) } : {}),
  };
}

export async function getPublishedPosts(params: Partial<BlogSearchParams> = {}) {
  const page = params.page ?? 1;
  const where = publicWhere(params);
  const total = await db.post.count({ where });
  const pagination = getPaginationMeta(total, page, BLOG_PAGE_SIZE);
  const posts = await db.post.findMany({
    where,
    select: listSelect,
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
    skip: pagination.skip,
    take: pagination.take,
  });

  return Object.assign(posts, { posts, pagination });
}

export async function getPublishedPostBySlug(slug: string) {
  return db.post.findFirst({ where: { slug, published: true } });
}

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

export async function getBlogFilterOptions() {
  const posts = await db.post.findMany({
    where: { published: true },
    select: { tags: true, category: true, publishedAt: true, createdAt: true },
  });

  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
  const years = Array.from(new Set(posts.map((post) => (post.publishedAt ?? post.createdAt).getFullYear()))).sort((a, b) => b - a);
  const categories = Array.from(new Set(posts.map((post) => post.category || post.tags[0] || "Umum"))).sort();

  return { tags, categories, years };
}

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
  const total = await db.post.count({ where });
  const pagination = getPaginationMeta(total, page, ADMIN_BLOG_PAGE_SIZE);
  const posts = await db.post.findMany({
    where,
    select: listSelect,
    orderBy: [{ updatedAt: "desc" }],
    skip: pagination.skip,
    take: pagination.take,
  });

  return { posts, pagination };
}

export async function getPostById(id: string) {
  return db.post.findUnique({ where: { id } });
}
