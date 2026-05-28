import { notFound } from "next/navigation";
import { BlogPreviewPageView } from "@/features/admin/components/blog/blog-preview-page-view";
import { getAdminBlogPreviewData } from "@/features/admin/services/blog-preview-service";

export const metadata = {
  title: "Preview Artikel",
  robots: { index: false, follow: false },
};

export default async function AdminBlogPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post, related } = await getAdminBlogPreviewData(slug);

  if (!post) notFound();

  return <BlogPreviewPageView post={post} related={related} />;
}
