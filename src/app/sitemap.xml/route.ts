import { NextResponse } from "next/server";
import db from "@/lib/db";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://buildwithreys.tech";

export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry({
  url,
  lastModified,
  changeFrequency,
  priority,
}: {
  url: string;
  lastModified: Date;
  changeFrequency: "daily" | "weekly";
  priority: number;
}) {
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastModified.toISOString()}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const now = new Date();
  const staticRoutes = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "daily" as const, priority: 0.8 },
  ];

  const posts = await db.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
    take: 500,
  }).catch(() => []);

  const routes = [
    ...staticRoutes,
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(urlEntry).join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
