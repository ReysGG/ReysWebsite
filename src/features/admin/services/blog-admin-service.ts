import "server-only";

import db from "@/lib/db";
import { getAdminPosts } from "@/features/blog/data/posts";

export type BlogAdminSearchParams = {
  q?: string;
  status?: string;
  category?: string;
  page?: string;
};

export type BlogAdminView = "all" | "published" | "draft" | "seo";

export async function getBlogPostForEdit(slug: string) {
  return db.post.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
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
    },
  });
}

function normalizeBlogStatus(params: BlogAdminSearchParams, view: BlogAdminView) {
  if (view === "published") return "published";
  if (view === "draft") return "draft";
  if (params.status === "published" || params.status === "draft" || params.status === "all") return params.status;
  return "published";
}

export async function getBlogAdminDashboard(params: BlogAdminSearchParams, view: BlogAdminView) {
  const status = normalizeBlogStatus(params, view);
  const emptyResult: Awaited<ReturnType<typeof getAdminPosts>> = {
    posts: [],
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      skip: 0,
      take: 10,
    },
  };

  try {
    const [postsResult, all, published, draft, seoIssuesAgg, viewsAgg] = await Promise.all([
      getAdminPosts({
        page: Math.max(1, Number(params.page || 1)),
        q: params.q,
        category: params.category,
        status,
      }),
      db.post.count(),
      db.post.count({ where: { published: true } }),
      db.post.count({ where: { published: false } }),
      db.post.count({
        where: {
          OR: [
            { metaTitle: null },
            { metaTitle: "" },
            { metaDesc: null },
            { metaDesc: "" },
            { coverImage: null },
            { coverImage: "" },
          ],
        },
      }),
      db.post.aggregate({ _sum: { views: true } }),
    ]);

    return {
      result: postsResult,
      totals: {
        all,
        published,
        draft,
        seoIssues: seoIssuesAgg,
        views: viewsAgg._sum.views ?? 0,
      },
      status,
      databaseError: false,
    };
  } catch {
    return {
      result: emptyResult,
      totals: { all: 0, published: 0, draft: 0, seoIssues: 0, views: 0 },
      status,
      databaseError: true,
    };
  }
}
