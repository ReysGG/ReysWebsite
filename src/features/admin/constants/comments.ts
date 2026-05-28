export const COMMENTS_PAGE_SIZE = 20;

export const COMMENT_TYPE_FILTERS = ["all", "top", "reply"] as const;

export type CommentTypeFilter = (typeof COMMENT_TYPE_FILTERS)[number];

export function normalizeCommentTypeFilter(value: string | undefined): CommentTypeFilter {
  if (value === "top" || value === "reply") return value;
  return "all";
}
