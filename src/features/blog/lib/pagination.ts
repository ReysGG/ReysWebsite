export const BLOG_PAGE_SIZE = 9;
export const ADMIN_BLOG_PAGE_SIZE = 10;

export function getPaginationMeta(total: number, page: number, pageSize: number) {
  const safeTotal = Math.max(0, total);
  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(safeTotal / safePageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  return {
    total: safeTotal,
    page: currentPage,
    pageSize: safePageSize,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    skip: (currentPage - 1) * safePageSize,
    take: safePageSize,
  };
}
