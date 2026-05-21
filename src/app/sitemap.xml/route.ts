export const dynamic = "force-dynamic";

import { getAllPublishedSlugs } from "@/features/blog/data/posts";
import { getPublishedShowcaseItems } from "@/features/showcase/data";

const BASE_URL = "https://buildwithreys.tech";

export async function GET() {
  const [blogSlugs, showcaseItems] = await Promise.all([
    getAllPublishedSlugs().catch(() => []),
    getPublishedShowcaseItems().catch(() => []),
  ]);

  const staticRoutes = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/showcase`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const blogRoutes = blogSlugs.map(({ slug }: { slug: string }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const showcaseRoutes = showcaseItems.map((item: { slug: string }) => ({
    url: `${BASE_URL}/showcase/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const allRoutes = [...staticRoutes, ...blogRoutes, ...showcaseRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${route.url}</loc>
    <lastmod>${new Date(route.lastModified).toISOString()}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
