import type { BlogPost } from "@/features/blog/data/posts";
import { BlogCard } from "./blog-card";

export function ArticleRelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;
  return (
    <section className="mt-14 border-t border-neutral-200 pt-10">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-600">Artikel terkait</p>
        <h2 className="mt-2 text-2xl font-bold text-neutral-900 md:text-3xl">Lanjutkan baca</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => <BlogCard key={post.id} post={post} />)}
      </div>
    </section>
  );
}
