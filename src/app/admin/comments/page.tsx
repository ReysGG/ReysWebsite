import { CommentsAdminView } from "@/features/admin/components/comments/comments-admin-view";
import { normalizeCommentTypeFilter } from "@/features/admin/constants/comments";
import { getAdminCommentList } from "@/features/admin/services/comment-service";
import type { AdminCommentListFilters } from "@/features/admin/types/comments";

function parseCommentFilters(params: Record<string, string | string[] | undefined>): AdminCommentListFilters {
  const pageValue = typeof params.page === "string" ? params.page : "1";

  return {
    q: typeof params.q === "string" ? params.q.trim() : "",
    slug: typeof params.slug === "string" ? params.slug.trim() : "",
    filter: normalizeCommentTypeFilter(typeof params.filter === "string" ? params.filter : undefined),
    page: Math.max(1, parseInt(pageValue, 10) || 1),
  };
}

export default async function AdminCommentsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const filters = parseCommentFilters(await searchParams);
  const result = await getAdminCommentList(filters);

  return <CommentsAdminView filters={filters} result={result} />;
}
