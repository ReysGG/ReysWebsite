import "server-only";

import db from "@/lib/db";
import { BLOG_CALENDAR_POST_LIMIT, getSeoIssues } from "@/features/admin/lib/blog-calendar";
import type { BlogCalendarData, BlogCalendarFilters } from "@/features/admin/types/blog-calendar";

export async function getBlogCalendarData(filters: Pick<BlogCalendarFilters, "weekStart" | "weekEnd">): Promise<BlogCalendarData> {
  try {
    const posts = await db.post.findMany({
      where: {
        OR: [
          { publishedAt: { gte: filters.weekStart, lt: filters.weekEnd } },
          { published: false },
        ],
      },
      orderBy: [{ publishedAt: "asc" }, { updatedAt: "desc" }],
      take: BLOG_CALENDAR_POST_LIMIT,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        category: true,
        published: true,
        publishedAt: true,
        updatedAt: true,
        createdAt: true,
        metaTitle: true,
        metaDesc: true,
        views: true,
      },
    });

    return {
      posts,
      publishedThisWeek: posts.filter((post) => post.published && post.publishedAt && post.publishedAt >= filters.weekStart && post.publishedAt < filters.weekEnd),
      drafts: posts.filter((post) => !post.published),
      seoIssues: posts.filter((post) => getSeoIssues(post).length > 0),
      databaseError: false,
    };
  } catch {
    return {
      posts: [],
      publishedThisWeek: [],
      drafts: [],
      seoIssues: [],
      databaseError: true,
    };
  }
}
