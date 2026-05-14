import { BlogAdminFilterBar } from "@/features/admin/components/blog/blog-admin-filter-bar";
import { BlogAdminTable } from "@/features/admin/components/blog/blog-admin-table";
import { BlogAdminToolbar } from "@/features/admin/components/blog/blog-admin-toolbar";
import { BlogDashboardStats } from "@/features/admin/components/blog/blog-dashboard-stats";
import { getAdminPosts } from "@/features/blog/data/posts";

export default async function BlogAdminPage({ searchParams }: { searchParams?: Promise<{ q?: string; status?: string; category?: string; page?: string }> }) {
  const params = (await searchParams) || {};
  let result: Awaited<ReturnType<typeof getAdminPosts>> = {
    posts: [],
    pagination: { page: 1, pageSize: 10, total: 0, totalPages: 1, hasNextPage: false, hasPreviousPage: false, skip: 0, take: 10 },
  };
  let databaseError = false;
  try {
    result = await getAdminPosts({ page: Math.max(1, Number(params.page || 1)), q: params.q, category: params.category, status: params.status === "published" || params.status === "draft" ? params.status : "all" });
  } catch {
    databaseError = true;
  }

  const status = params.status || "all";
  const posts = result.posts;
  const filtered = posts;
  const totalPages = result.pagination.totalPages;
  const page = result.pagination.page;

  return <div className="space-y-6">{databaseError ? <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">Database tidak bisa diakses. Data blog ditampilkan kosong.</div> : null}<BlogAdminToolbar /><BlogDashboardStats posts={posts} /><BlogAdminFilterBar search={params.q} status={status} category={params.category} /><BlogAdminTable posts={filtered} page={page} totalPages={totalPages} /></div>;
}
