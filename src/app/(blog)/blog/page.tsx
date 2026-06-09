import type { Metadata } from 'next';
import { getBlogFilterOptions, getPublishedPosts } from '@/features/blog/data/posts';
import { parseBlogSearchParams } from '@/features/blog/lib/filters';
import { BlogHeroSlider } from '@/features/blog/components/blog-hero-slider';
import { BlogNewsCard } from '@/features/blog/components/blog-news-card';
import { BlogSidebar } from '@/features/blog/components/blog-sidebar';
import { BlogFilterBar } from '@/features/blog/components/blog-filter-bar';
import { BlogPagination } from '@/features/blog/components/blog-pagination';
import { BlogEmptyState } from '@/features/blog/components/blog-empty-state';
import { BlogErrorState } from '@/features/blog/components/blog-error-state';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams;
  const parsed = parseBlogSearchParams(params);
  const tag = parsed.tag || '';
  const category = parsed.category || '';
  const year = parsed.year ? String(parsed.year) : '';
  const isFiltered = !!(parsed.q || tag || category || year);
  const page = parsed.page || 1;

  const title = 'Blog & Insights | WebServices';
  const description = 'Panduan teknis, studi kasus, dan insight pengembangan website.';

  // Filtered/search views are thin, near-duplicate listings — keep them out of the
  // index but let crawlers follow links to the underlying articles. Paginated pages
  // get a self-referencing canonical so each page is its own indexable entity.
  const canonical = page > 1 ? `/blog?page=${page}` : '/blog';

  return {
    title,
    description,
    alternates: { canonical },
    robots: isFiltered ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      locale: 'id_ID',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const single = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v || '';

export default async function PublicBlogPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const parsed = parseBlogSearchParams(params);
  const tag = parsed.tag || '';
  const category = parsed.category || '';
  const year = parsed.year ? String(parsed.year) : '';

  const [data, filterOptions] = await Promise.all([
    getPublishedPosts(parsed).catch(() => null),
    getBlogFilterOptions().catch(() => ({ tags: [], categories: [], years: [] })),
  ]);

  if (!data) {
    return (
      <main className="min-h-screen bg-white dark:bg-white pt-0 text-neutral-950 dark:text-neutral-950">
        <BlogErrorState />
      </main>
    );
  }

  const { posts, pagination } = data;
  const isFiltered = !!(parsed.q || tag || category || year);

  // Slider: posts with coverImage first, fallback to any posts.
  // Only show it when there are enough posts; with 1-3 posts it feels like the
  // hero is "taking" one article from the list and makes the page look sparse.
  const sliderPosts = posts.filter((p) => p.coverImage).slice(0, 5);
  const fallbackSlider = sliderPosts.length >= 1 ? sliderPosts : posts.slice(0, 5);
  const shouldShowSlider = fallbackSlider.length >= 4;

  // Trending: sort by views desc
  const trending = [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  return (
    <main className="min-h-screen bg-[#f7f7f8] dark:bg-[#f7f7f8] text-neutral-950 dark:text-neutral-950">
      {/* Hero Slider — full width, no padding, only on page 1 no filter */}
      {parsed.page === 1 && !isFiltered && shouldShowSlider && (
        <BlogHeroSlider posts={fallbackSlider} />
      )}

      {/* Main content */}
      <div className="px-5 py-6 md:px-10 lg:px-16">
        {/* Filter bar */}
        <BlogFilterBar
          q={single(params.q)}
          tag={tag}
          category={category}
          year={year}
          tags={filterOptions.tags}
          categories={filterOptions.categories}
          years={filterOptions.years}
        />

        {/* 2-column layout: articles + sidebar */}
        <div className="mt-5 grid gap-7 lg:grid-cols-[1fr_300px]">
          {/* Left: article list */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-900">
                {isFiltered ? 'Hasil Pencarian' : 'Artikel Terbaru'}
              </h2>
              <span className="text-sm text-neutral-400 dark:text-neutral-400">
                {pagination.total} artikel
              </span>
            </div>

            {posts.length === 0 ? (
              <BlogEmptyState />
            ) : (
              <div>
                {posts.map((post, i) => (
                  <BlogNewsCard
                    key={post.id}
                    post={post}
                    featured={i === 0 && !isFiltered}
                    priority={i < 3}
                  />
                ))}
              </div>
            )}

            <BlogPagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              query={{ q: single(params.q), tag, category, year }}
            />
          </div>

          {/* Right: sidebar */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <BlogSidebar
              trending={trending}
              categories={filterOptions.categories}
              tags={filterOptions.tags}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
