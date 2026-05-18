import Link from 'next/link';
import type { BlogPost } from '@/features/blog/data/posts';

export function BlogSidebar({
  trending,
  categories,
  tags,
}: {
  trending: BlogPost[];
  categories: string[];
  tags: string[];
}) {
  return (
    <div className="space-y-0">
      {/* Trending */}
      <div className="mb-6 border-b border-neutral-200 pb-6">
        <p className="mb-4 border-b border-neutral-100 pb-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
          Trending
        </p>
        <ol className="space-y-4">
          {trending.slice(0, 5).map((post, i) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group flex gap-3">
                <span className="w-8 shrink-0 text-2xl font-black leading-none text-neutral-200 dark:text-neutral-200 transition group-hover:text-indigo-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug text-neutral-900 dark:text-neutral-900 line-clamp-2 transition group-hover:text-indigo-700">
                    {post.title}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2">
                    {post.category && (
                      <span className="text-[11px] font-bold uppercase text-indigo-600">
                        {post.category}
                      </span>
                    )}
                    {post.views > 0 && (
                      <span className="text-[11px] text-neutral-400">
                        {post.views.toLocaleString('id-ID')} views
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Kategori */}
      {categories.length > 0 && (
        <div className="mb-6 border-b border-neutral-200 pb-6">
          <p className="mb-3 border-b border-neutral-100 pb-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
            Kategori
          </p>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className="flex items-center justify-between py-1 text-sm text-neutral-700 dark:text-neutral-700 transition hover:text-indigo-600"
                >
                  {cat}
                  <span className="text-neutral-300">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mb-6 border-b border-neutral-200 pb-6">
          <p className="mb-3 border-b border-neutral-100 pb-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
            Tag
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="rounded bg-neutral-100 dark:bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 dark:text-neutral-600 transition hover:bg-indigo-50 hover:text-indigo-700"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter */}
      <div className="rounded-md bg-indigo-600 p-5 text-white">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-indigo-300">
          Newsletter
        </p>
        <h3 className="mb-1 text-base font-bold">Artikel terbaru ke inbox</h3>
        <p className="mb-4 text-xs text-indigo-200">
          Tips dan insight langsung ke email kamu.
        </p>
        <form action="/api/newsletter" method="POST" className="space-y-2">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] h-px w-px opacity-0"
            aria-hidden="true"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="email@kamu.com"
            className="w-full rounded-md border border-white/30 bg-white/20 px-3 py-2 text-sm text-white placeholder:text-indigo-300 outline-none focus:bg-white/30 transition"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-white px-4 py-2 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
