import { BlogAdminPageShell } from "@/features/admin/components/blog/blog-admin-page-shell";

export default async function SeoBlogAdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; status?: string; category?: string; page?: string }>;
}) {
  const params = (await searchParams) || {};
  return <BlogAdminPageShell params={params} view="seo" />;
}
