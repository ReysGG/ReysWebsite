'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/features/blog/data/posts';
import { formatBlogDate, getPostDate } from './blog-card';

interface BlogHeroSliderProps {
  posts: BlogPost[];
}

export function BlogHeroSlider({ posts }: BlogHeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const total = posts.length;

  const goTo = useCallback(
    (index: number) => {
      if (!total) return;
      setCurrent((index + total) % total);
    },
    [total],
  );

  if (!posts.length) return null;

  const post = posts[current];

  return (
    <section className="relative w-full overflow-hidden bg-neutral-900">
      {/* Static latest strip — no infinite marquee to avoid scroll jank */}
      <div className="relative z-20 flex min-h-9 items-center overflow-hidden bg-red-600">
        <span className="shrink-0 px-3 text-xs font-bold uppercase tracking-widest text-white">
          Terbaru
        </span>
        <div className="h-5 w-px bg-red-400" />
        <div className="flex min-w-0 gap-6 overflow-hidden px-4">
          {posts.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="truncate text-xs font-medium text-white/90 hover:text-white"
            >
              {p.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="relative h-[480px] w-full md:h-[560px]">
        {post.coverImage ? (
          <Image
            key={post.id}
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 to-violet-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-14 md:px-12 lg:px-20">
          {post.category && (
            <span className="mb-3 inline-block w-fit rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {post.category}
            </span>
          )}

          <h2 className="max-w-3xl text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
              {post.excerpt}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-white/70">
              <Clock className="h-3.5 w-3.5" />
              {formatBlogDate(getPostDate(post))}
            </span>
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-bold text-neutral-900 transition-colors hover:bg-indigo-50"
            >
              Baca Selengkapnya
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Slide sebelumnya"
              onClick={() => goTo(current - 1)}
              className="absolute left-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 md:left-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Slide berikutnya"
              onClick={() => goTo(current + 1)}
              className="absolute right-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 md:right-8"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </>
        )}

        {total > 1 && (
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {posts.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={[
                  'rounded-full transition-all duration-300',
                  i === current ? 'h-2.5 w-6 bg-white' : 'h-2 w-2 bg-white/50 hover:bg-white/80',
                ].join(' ')}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
