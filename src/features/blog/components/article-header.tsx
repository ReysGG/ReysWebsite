import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays } from "lucide-react";
import type { BlogPost } from "@/features/blog/data/posts";
import { formatBlogDate, getPostDate, getReadingTime } from "./blog-card";

export function ArticleHeader({ post }: { post: BlogPost }) {
  const author = post.author || "BuildWebsite Team";

  return (
    <header className="mb-10">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-indigo-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Blog
      </Link>

      <div className="mb-4 text-sm font-semibold text-indigo-700">
        {author}
      </div>

      <div className="mb-5 flex flex-wrap gap-3 text-sm font-medium text-neutral-500">
        {post.category && (
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
            {post.category}
          </span>
        )}
        <span className="inline-flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          {formatBlogDate(getPostDate(post))}
        </span>
        <span>{getReadingTime(post.content)}</span>
        {post.featured && <span className="text-indigo-600">Featured</span>}
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-neutral-950 md:text-6xl">
        {post.title}
      </h1>
      {post.excerpt && (
        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600">
          {post.excerpt}
        </p>
      )}

      {post.coverImage && (
        <div className="relative mt-10 h-[420px] overflow-hidden rounded-3xl md:h-[520px]">
          <Image src={post.coverImage} alt={post.title} fill sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" priority />
        </div>
      )}
    </header>
  );
}
