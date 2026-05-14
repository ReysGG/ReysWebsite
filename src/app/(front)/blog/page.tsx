import type { Metadata } from "next";
import { getBlogFilterOptions, getPublishedPosts } from "@/features/blog/data/posts";
import { parseBlogSearchParams } from "@/features/blog/lib/filters";
import { BlogHero } from "@/features/blog/components/blog-hero";
import { BlogFilterBar } from "@/features/blog/components/blog-filter-bar";
import { FeaturedPostCard } from "@/features/blog/components/featured-post-card";
import { BlogCard } from "@/features/blog/components/blog-card";
import { BlogPagination } from "@/features/blog/components/blog-pagination";
import { BlogEmptyState } from "@/features/blog/components/blog-empty-state";
import { BlogErrorState } from "@/features/blog/components/blog-error-state";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Blog & Insights | WebServices", description: "Panduan teknis, studi kasus, dan insight pengembangan website." };
}

const single = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value || "";

export default async function PublicBlogPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const parsed = parseBlogSearchParams(params);
  const tag = parsed.tag || "";
  const category = parsed.category || "";
  const year = parsed.year ? String(parsed.year) : "";

  const data = await getPublishedPosts(parsed).then(async (result) => ({
    result,
    filterOptions: await getBlogFilterOptions(),
    failed: false as const,
  })).catch((error) => {
    console.error("[blog] failed to load posts", error);
    return {
      result: null,
      filterOptions: { tags: [], categories: [], years: [] },
      failed: true as const,
    };
  });

  if (data.failed || !data.result) {
    return <main className="min-h-screen bg-[#f5f2ff] dark:bg-[#f5f2ff] px-6 pt-32 text-neutral-950 dark:text-neutral-950"><BlogErrorState /></main>;
  }

  const { posts, pagination } = data.result;
  const featured = parsed.page === 1 ? posts[0] : undefined;
  const list = featured ? posts.slice(1) : posts;

  return <main className="relative min-h-screen overflow-hidden bg-[#f5f2ff] dark:bg-[#f5f2ff] pt-32 pb-24 text-neutral-950 dark:text-neutral-950"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.16),transparent_34rem)]" /><div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12"><BlogHero totalPosts={pagination.total} /><BlogFilterBar q={single(params.q)} tag={tag} category={category} year={year} tags={data.filterOptions.tags} categories={data.filterOptions.categories} years={data.filterOptions.years} />{featured && <FeaturedPostCard post={featured} />}{list.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((post) => <BlogCard key={post.id} post={post} />)}</div> : <BlogEmptyState />}<BlogPagination page={pagination.page} totalPages={pagination.totalPages} query={{ q: single(params.q), tag, category, year }} /></div></main>;
}
