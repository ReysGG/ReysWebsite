import type { CommentTypeFilter } from "@/features/admin/constants/comments";

export type AdminCommentListItem = {
  id: string;
  content: string;
  userName: string | null;
  userId: string;
  parentId: string | null;
  createdAt: Date;
  post: {
    title: string;
    slug: string;
  };
};

export type AdminCommentListFilters = {
  q: string;
  slug: string;
  filter: CommentTypeFilter;
  page: number;
};

export type AdminCommentListResult = {
  comments: AdminCommentListItem[];
  totalComments: number;
  repliesCount: number;
  filteredCount: number;
  totalPages: number;
  pageSize: number;
  databaseError: boolean;
};
