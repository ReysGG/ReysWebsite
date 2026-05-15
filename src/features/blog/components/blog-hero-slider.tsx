'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const [animKey, setAnimKey] = useState(0);

  const total = posts.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrent((index + total) % total);
      setAnimKey((k) => k + 1);
    },
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play every 5 seconds
  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, total]);

  if (!posts.length) return null;

  const post = posts[current];

  return (
    <div className="relative w-full overflow-hidden bg-neutral-900 dark:bg-neutral-900">
      {/* Keyframe injection */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* Breaking-news ticker */}
      <div className="relative z-20 flex h-8 items-center overflow-hidden bg-red-600 dark:bg-red-600">
        <span className="shrink-0 px-3 text-xs font-bold uppercase tracking-widest text-white dark:text-white">
          Terbaru
        </span>
        <div className="h-full w-px bg-red-400 dark:bg-red-400" />
        <div className="relative flex-1 overflow-hidden">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: 'marquee 30s linear infinite' }}
          >
            {/* Duplicate for seamless loop */}
            {[...posts, ...posts].map((p, i) => (
              <Link
                key={`${p.id}-${i}`}
                href={`/blog/${p.slug}`}
                className="inline-block px-8 text-xs font-medium text-white/90 hover:text-white dark:text-white/90 dark:hover:text-white"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="relative h-[480px] w-full md:h-[560px]">
        {posts.map((p, i) => (
          <div
            key={p.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? 'auto' : 'none' }}
          >
            {/* Background */}
            {p.coverImage ? (
              <Image
                src={p.coverImage}
                alt={p.title}
                fill
                className="object-cover"
                priority={i === 0}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 to-violet-800" />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>
        ))}

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-14 md:px-12 lg:px-20">
          {/* Category badge */}
          {post.category && (
            <span className="mb-3 inline-block w-fit rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white dark:bg-indigo-600 dark:text-white">
              {post.category}
            </span>
          )}

          {/* Animated title */}
          <h2
            key={animKey}
            className="max-w-3xl text-2xl font-bold leading-tight text-white dark:text-white md:text-4xl lg:text-5xl"
            style={{ animation: 'slideUp 0.5s ease forwards' }}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/80 dark:text-white/80 md:text-base">
              {post.excerpt}
            </p>
          )}

          {/* Meta + CTA */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-white/70 dark:text-white/70">
              <Clock className="h-3.5 w-3.5" />
              {formatBlogDate(getPostDate(post))}
            </span>
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-bold text-neutral-900 transition-colors hover:bg-indigo-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-indigo-50"
            >
              Baca Selengkapnya
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Prev / Next arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Slide sebelumnya"
              onClick={prev}
              className="absolute left-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 dark:bg-black/40 dark:text-white dark:hover:bg-black/60 md:left-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Slide berikutnya"
              onClick={next}
              className="absolute right-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 dark:bg-black/40 dark:text-white dark:hover:bg-black/60 md:right-8"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Dot indicators */}
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
                  i === current
                    ? 'h-2.5 w-6 bg-white dark:bg-white'
                    : 'h-2 w-2 bg-white/50 hover:bg-white/80 dark:bg-white/50 dark:hover:bg-white/80',
                ].join(' ')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
