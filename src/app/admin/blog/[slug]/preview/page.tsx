import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye } from "lucide-react";
import db from "@/lib/db";
import { ArticleHeader } from "@/features/blog/components/article-header";
import { ArticleContent } from "@/features/blog/components/article-content";
import { ArticleRelatedPosts } from "@/features/blog/components/article-related-posts";
import { getRelatedPosts } from "@/features/blog/data/posts";

export const metadata = {
  title: "Preview Artikel",
  robots: { index: false, follow: false },
};

export default async function AdminBlogPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });
  if (!post) notFound();

  const related = await getRelatedPosts(post).catch(() => []);

  return (
    <main className="min-h-screen bg-[#fffcc9] pt-6 pb-24 text-neutral-950">
      <div className="mx-auto mb-4 flex max-w-4xl items-center justify-between px-6 md:px-0">
        <Link
          href={`/admin/blog/${post.slug}/edit`}
          className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 hover:border-[#ffcd80] hover:bg-[#fffcc9] hover:text-[#ff8a00]"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali edit
        </Link>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#ffcd80] bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">
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
