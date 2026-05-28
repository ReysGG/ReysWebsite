import "server-only";

import type { Prisma } from "@prisma/client";
import db from "@/lib/db";
import { COMMENTS_PAGE_SIZE } from "@/features/admin/constants/comments";
import type { AdminCommentListFilters, AdminCommentListResult } from "@/features/admin/types/comments";

function buildCommentWhere(filters: Pick<AdminCommentListFilters, "q" | "slug" | "filter">): Prisma.CommentWhereInput {
  const where: Prisma.CommentWhereInput = {};

  if (filters.q) {
    where.OR = [
      { content: { contains: filters.q, mode: "insensitive" } },
      { userName: { contains: filters.q, mode: "insensitive" } },
    ];
  }

  if (filters.slug) {
    where.post = { slug: filters.slug };
  }

  if (filters.filter === "top") where.parentId = null;
  if (filters.filter === "reply") where.parentId = { not: null };

  return where;
}

export async function getAdminCommentList(filters: AdminCommentListFilters): Promise<AdminCommentListResult> {
  const where = buildCommentWhere(filters);

  try {
    const [comments, totalComments, repliesCount, filteredCount] = await db.$transaction([
      db.comment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (filters.page - 1) * COMMENTS_PAGE_SIZE,
        take: COMMENTS_PAGE_SIZE,
        select: {
          id: true,
          content: true,
          userName: true,
          userId: true,
          parentId: true,
          createdAt: true,
          post: { select: { title: true, slug: true } },
        },
      }),
      db.comment.count(),
      db.comment.count({ where: { parentId: { not: null } } }),
      db.comment.count({ where }),
    ]);

    return {
      comments,
      totalComments,
      repliesCount,
      filteredCount,
      totalPages: Math.max(1, Math.ceil(filteredCount / COMMENTS_PAGE_SIZE)),
      pageSize: COMMENTS_PAGE_SIZE,
      databaseError: false,
    };
  } catch {
    return {
      comments: [],
      totalComments: 0,
      repliesCount: 0,
      filteredCount: 0,
      totalPages: 1,
      pageSize: COMMENTS_PAGE_SIZE,
      databaseError: true,
    };
  }
}
