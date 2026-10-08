import { revalidatePath, revalidateTag } from "next/cache";
import { BLOG_FILTER_OPTIONS_TAG } from "@/features/blog/data/posts";

/** Revalidates every public + admin route affected by a blog post mutation. */
export function revalidateBlogPaths(slug?: string | null) {
  revalidateTag(BLOG_FILTER_OPTIONS_TAG, "max");
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin/blog/published");
  revalidatePath("/admin/blog/drafts");
  revalidatePath("/admin/blog/seo");
  revalidatePath("/admin/blog/calendar");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
}

/**
 * Never-throwing variant for background contexts (AI tools, `after()` callbacks):
 * a failed cache revalidation must not make a successful DB write look failed.
 */
export function safeRevalidateBlogPaths(...slugs: (string | null | undefined)[]) {
  try {
    if (slugs.length === 0) revalidateBlogPaths();
    slugs.forEach((slug) => revalidateBlogPaths(slug));
  } catch (error) {
    console.warn("[revalidate-blog]", error instanceof Error ? error.message : error);
  }
}
