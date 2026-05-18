import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays } from "lucide-react";
import type { Post } from "@prisma/client";
import { formatBlogDate, getPostDate, getReadingTime } from "./blog-card";

export function ArticleHeader({ post }: { post: Post }) {
  const author = post.author || "BuildWebsite Team";

  return (
    <header className="mb-7">
      <Link
        href="/blog"
        className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-indigo-700"
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
        <span>{getReadingTime(post)}</span>
        {post.featured && <span className="text-indigo-600">Featured</span>}
      </div>

      <h1 className="max-w-5xl text-3xl font-bold tracking-tight text-neutral-950 md:text-5xl">
        {post.title}
      </h1>
      {post.excerpt && (
        <p className="mt-4 max-w-4xl text-base leading-7 text-neutral-600 md:text-lg md:leading-8">
          {post.excerpt}
        </p>
      )}

      {post.coverImage && (
        <div className="relative mt-7 h-[340px] overflow-hidden rounded-2xl md:h-[440px]">
          <Image src={post.coverImage} alt={post.title} fill sizes="(min-width: 1280px) 1152px, 100vw" className="object-cover" priority />
        </div>
      )}
    </header>
  );
}
