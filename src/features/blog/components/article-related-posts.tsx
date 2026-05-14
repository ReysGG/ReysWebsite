import type { BlogPost } from "@/features/blog/data/posts";
import { BlogCard } from "./blog-card";

export function ArticleRelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;
  return <section className="mt-14"><p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-indigo-600">Artikel terkait</p><div className="grid gap-6 md:grid-cols-3">{posts.map((post) => <BlogCard key={post.id} post={post} />)}</div></section>;
}
