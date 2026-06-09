import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog", "/blog/", "/showcase", "/showcase/"],
        disallow: [
          "/admin/",
          "/sign-in/",
          "/sign-up/",
          "/api/",
          // Block thin/duplicate filtered listings, but allow ?page= pagination
          // so crawlers can reach articles beyond page 1.
          "/blog?*q=",
          "/blog?*tag=",
          "/blog?*category=",
          "/blog?*year=",
          "/*?*sort=",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
