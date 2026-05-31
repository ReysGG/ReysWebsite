export const dynamic = "force-dynamic";

import { getAllPublishedSlugs } from "@/features/blog/data/posts";
import { getPublishedShowcaseItems } from "@/features/showcase/data";
import { getSiteUrl } from "@/lib/site-url";

const BASE_URL = getSiteUrl();

export async function GET() {
  const [blogSlugs, showcaseItems] = await Promise.all([
    getAllPublishedSlugs().catch((e) => { console.error("[sitemap] blog error:", e); return []; }),
    getPublishedShowcaseItems().catch((e) => { console.error("[sitemap] showcase error:", e); return []; }),
  ]);

  const staticRoutes = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/showcase`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const blogRoutes = blogSlugs.map(({ slug, updatedAt, publishedAt, createdAt }: { slug: string; updatedAt: Date; publishedAt: Date | null; createdAt: Date }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: updatedAt || publishedAt || createdAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const showcaseRoutes = showcaseItems.map((item) => ({
    url: `${BASE_URL}/showcase/${item.slug}`,
    lastModified: item.updatedAt || item.createdAt,
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
