import type { Metadata } from "next";
import { getExcerptFromHtml } from "./reading-time";

type SeoPost = {
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  coverImage?: string | null;
  ogImage?: string | null;
  author?: string | null;
  category?: string | null;
  focusKeyword?: string | null;
  canonicalUrl?: string | null;
  publishedAt?: Date | null;
  metaTitle?: string | null;
  metaDesc?: string | null;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
};

export function buildPostMetadata(post: SeoPost): Metadata {
  const title = post.metaTitle || post.title;
  const description = post.metaDesc || post.excerpt || getExcerptFromHtml(post.content);
  const image = post.ogImage || post.coverImage || undefined;
  const keywords = Array.from(new Set([post.focusKeyword, ...(post.tags ?? [])].filter(Boolean) as string[]));
  const publishedTime = (post.publishedAt ?? post.createdAt).toISOString();

  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      modifiedTime: post.updatedAt.toISOString(),
      authors: post.author ? [post.author] : undefined,
      section: post.category ?? undefined,
      tags: post.tags,
      images: image ? [{ url: image, alt: post.title }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function buildBlogPostingJsonLd(post: SeoPost, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt || getExcerptFromHtml(post.content),
    url,
    image: post.ogImage || post.coverImage ? [post.ogImage || post.coverImage] : undefined,
    datePublished: (post.publishedAt ?? post.createdAt).toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "Admin",
    },
    articleSection: post.category ?? undefined,
    keywords: Array.from(new Set([post.focusKeyword, ...(post.tags ?? [])].filter(Boolean) as string[])).join(", ") || undefined,
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
