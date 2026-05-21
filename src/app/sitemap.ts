import type { MetadataRoute } from "next";
import { getAllPublishedSlugs } from "@/features/blog/data/posts";
import { getPublishedShowcaseItems } from "@/features/showcase/data";

const BASE_URL = "https://buildwithreys.tech";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, showcaseItems] = await Promise.all([
    getAllPublishedSlugs().catch(() => []),
    getPublishedShowcaseItems().catch(() => []),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/showcase`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map(({ slug }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const showcaseRoutes: MetadataRoute.Sitemap = showcaseItems.map((item) => ({
    url: `${BASE_URL}/showcase/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...showcaseRoutes];
}
