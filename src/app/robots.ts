import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://buildwithreys.tech";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog/", "/showcase/"],
        disallow: [
          "/admin/",
          "/sign-in/",
          "/sign-up/",
          "/api/",
          "/blog?*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
