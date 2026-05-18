import { unstable_cache } from "next/cache";
import db from "@/lib/db";

export const SHOWCASE_TAG = "showcase";

export type ShowcaseItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  htmlPath: string;
  tags: string[];
};

const FALLBACK_THUMBNAIL = "/images/homepage-slider-reference.webp";

function toItem(row: {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string | null;
  htmlUrl: string;
  tags: string[];
}): ShowcaseItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    thumbnail: row.thumbnail || FALLBACK_THUMBNAIL,
    htmlPath: row.htmlUrl,
    tags: row.tags,
  };
}

export const getPublishedShowcaseItems = unstable_cache(
  async (): Promise<ShowcaseItem[]> => {
    try {
      const rows = await db.showcase.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      });
      return rows.map(toItem);
    } catch {
      return [];
    }
  },
  ["showcase-published"],
  { tags: [SHOWCASE_TAG], revalidate: 3600 },
);

export const getPublishedShowcaseItem = unstable_cache(
  async (slug: string): Promise<ShowcaseItem | null> => {
    try {
      const row = await db.showcase.findFirst({
        where: { slug, published: true },
      });
      return row ? toItem(row) : null;
    } catch {
      return null;
    }
  },
  ["showcase-by-slug"],
  { tags: [SHOWCASE_TAG], revalidate: 3600 },
);

export async function getAllShowcaseSlugs(): Promise<Array<{ slug: string }>> {
  try {
    return await db.showcase.findMany({
      where: { published: true },
      select: { slug: true },
    });
  } catch {
    return [];
  }
}
