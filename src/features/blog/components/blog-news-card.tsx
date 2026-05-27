import Link from 'next/link';
import Image from 'next/image';
import { FileText } from 'lucide-react';
import type { BlogPost } from '@/features/blog/data/posts';
import { formatBlogDate, getReadingTime, getPostDate } from './blog-card';

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=';

export function BlogNewsCard({
  post,
  size = 'default',
  featured = false,
  priority = false,
}: {
  post: BlogPost;
  size?: 'default' | 'compact';
  featured?: boolean;
  priority?: boolean;
}) {
  // Compact variant — used in sidebar recent posts etc.
  if (size === 'compact') {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group flex gap-3 border-b border-neutral-100 pb-3 last:border-0 last:pb-0"
      >
        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-neutral-100">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="80px"
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FileText className="h-4 w-4 text-neutral-300" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          {post.category && (
            <span className="text-[10px] font-bold uppercase tracking-wide bg-gradient-to-r from-[#ff8a00] via-[#f4b738] to-[#ffcd80] bg-clip-text text-transparent">
              {post.category}
            </span>
          )}
          <h3 className="mt-0.5 text-xs font-semibold leading-snug text-neutral-900 dark:text-neutral-900 group-hover:text-[#ff8a00] line-clamp-2">
            {post.title}
          </h3>
          <span className="text-[10px] text-neutral-400">
            {formatBlogDate(getPostDate(post))}
          </span>
        </div>
      </Link>
    );
  }

  // Featured variant — first post, image on top full-width
  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group mb-5 block border-b border-neutral-200 pb-5"
      >
        <div className="relative mb-3 h-44 w-full overflow-hidden rounded-md bg-neutral-100 md:h-52">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 800px, (min-width: 768px) 90vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              priority={priority}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#fffcc9] to-[#ffcd80]">
              <FileText className="h-10 w-10 text-[#ff8a00]" />
            </div>
          )}
        </div>
        <div className="mb-1.5 flex items-center gap-3">
          {post.category && (
            <span className="text-[11px] font-bold uppercase tracking-wide bg-gradient-to-r from-[#ff8a00] via-[#f4b738] to-[#ffcd80] bg-clip-text text-transparent">
              {post.category}
            </span>
          )}
          <span className="text-xs text-neutral-400">{formatBlogDate(getPostDate(post))}</span>
          <span className="text-xs text-neutral-400">{getReadingTime(post)}</span>
        </div>
        <h2 className="text-xl font-bold leading-snug text-neutral-900 dark:text-neutral-900 transition group-hover:text-[#ff8a00] md:text-2xl">
          {post.title}
        </h2>
        <p className="mt-1.5 text-sm leading-6 text-neutral-500 dark:text-neutral-500 line-clamp-2">
          {post.excerpt ?? ''}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500"
            >
              {t}
            </span>
          ))}
        </div>
      </Link>
    );
  }

  // Default: horizontal, image left
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-3.5 border-b border-neutral-100 py-3.5 last:border-0"
    >
      <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-md bg-neutral-100 md:w-40">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 160px, 144px"
            className="object-cover transition duration-500 group-hover:scale-105"
            priority={priority}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <FileText className="h-7 w-7 text-neutral-300" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div>
          <div className="mb-1 flex items-center gap-2">
            {post.category && (
              <span className="text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-[#ff8a00] via-[#f4b738] to-[#ffcd80] bg-clip-text text-transparent">
                {post.category}
              </span>
            )}
            {post.featured && (
              <span className="rounded bg-[#fffcc9] px-1.5 py-0.5 text-[10px] font-bold text-[#ff8a00]">
                Featured
              </span>
            )}
          </div>
          <h3 className="text-[15px] font-bold leading-snug text-neutral-900 dark:text-neutral-900 transition line-clamp-2 group-hover:text-[#ff8a00] md:text-base">
            {post.title}
          </h3>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-500 line-clamp-2">
            {post.excerpt ?? ''}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-neutral-400 dark:text-neutral-400">
          <span>{formatBlogDate(getPostDate(post))}</span>
          <span>{getReadingTime(post)}</span>
          {post.views > 0 && (
            <span>{post.views.toLocaleString('id-ID')} views</span>
          )}
        </div>
      </div>
    </Link>
  );
}
