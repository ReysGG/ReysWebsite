import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { ArticleContent } from "@/features/blog/components/article-content";
import { ArticleHeader } from "@/features/blog/components/article-header";
import { ArticleRelatedPosts } from "@/features/blog/components/article-related-posts";
import type { getAdminBlogPreviewData } from "@/features/admin/services/blog-preview-service";

type BlogPreviewData = Awaited<ReturnType<typeof getAdminBlogPreviewData>>;

type BlogPreviewPageViewProps = {
  post: NonNullable<BlogPreviewData["post"]>;
  related: BlogPreviewData["related"];
};

export function BlogPreviewPageView({ post, related }: BlogPreviewPageViewProps) {
  return (
    <main className="min-h-screen bg-brand-tint pt-6 pb-24 text-neutral-950">
      <div className="mx-auto mb-4 flex max-w-4xl items-center justify-between px-6 md:px-0">
        <Link href={`/admin/blog/${post.slug}/edit`} className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 hover:border-brand-soft hover:bg-brand-tint hover:text-brand">
          <ArrowLeft className="h-4 w-4" />
          Kembali edit
        </Link>
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-soft bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
          <Eye className="h-3.5 w-3.5" />
          Preview {post.published ? "Published" : "Draft"}
        </div>
      </div>

      <article className="mx-auto max-w-4xl rounded-3xl bg-white px-6 py-8 md:px-10 md:py-10 lg:px-12">
        <ArticleHeader post={post} />
        <ArticleContent content={post.content} />
        {related.length > 0 && <ArticleRelatedPosts posts={related} />}
      </article>
    </main>
  );
}
