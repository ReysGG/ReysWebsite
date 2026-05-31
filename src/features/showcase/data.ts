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
  updatedAt: Date;
  createdAt: Date;
};

const FALLBACK_THUMBNAIL = "/images/homepage-slider-reference.webp";

const showcaseItemSelect = {
  id: true,
  slug: true,
  title: true,
  description: true,
  category: true,
  thumbnail: true,
  htmlUrl: true,
  tags: true,
  updatedAt: true,
  createdAt: true,
} as const;

function toItem(row: {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string | null;
  htmlUrl: string;
  tags: string[];
  updatedAt: Date;
  createdAt: Date;
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
    updatedAt: row.updatedAt,
    createdAt: row.createdAt,
  };
}

export const getPublishedShowcaseItems = unstable_cache(
  async (): Promise<ShowcaseItem[]> => {
    try {
      const rows = await db.showcase.findMany({
        where: { published: true },
        select: showcaseItemSelect,
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      });
      return rows.map(toItem);
    } catch (e) {
      console.error("[showcase] getPublishedShowcaseItems error:", e);
      return [];
    }
  },
  ["showcase-published-v2"],
  { tags: [SHOWCASE_TAG], revalidate: 3600 },
);

export const getPublishedShowcaseItem = unstable_cache(
  async (slug: string): Promise<ShowcaseItem | null> => {
    try {
      const row = await db.showcase.findFirst({
        where: { slug, published: true },
        select: showcaseItemSelect,
      });
      return row ? toItem(row) : null;
    } catch {
      return null;
    }
  },
  ["showcase-by-slug"],
  { tags: [SHOWCASE_TAG], revalidate: 3600 },
);
