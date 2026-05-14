import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPostBySlug, getRelatedPosts } from "@/features/blog/data/posts";
import { ArticleHeader } from "@/features/blog/components/article-header";
import { ArticleContent } from "@/features/blog/components/article-content";
import { ArticleRelatedPosts } from "@/features/blog/components/article-related-posts";
import { ArticleCta } from "@/features/blog/components/article-cta";
import { stripHtml } from "@/features/blog/components/blog-card";
import { ViewCounter } from "@/features/blog/components/view-counter";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const posts = await import('@/features/blog/data/posts').then(m => m.getPublishedPosts());
    return posts.map((p: { slug: string }) => ({ slug: p.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Artikel Tidak Ditemukan" };
  const description = post.metaDesc || post.excerpt || stripHtml(post.content).slice(0, 155);
  const image = post.ogImage || post.coverImage;
  return { title: post.metaTitle || `${post.title} | WebServices Blog`, description, alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined, keywords: post.focusKeyword ? [post.focusKeyword] : undefined, openGraph: { type: "article", title: post.metaTitle || post.title, description, images: image ? [image] : [], authors: post.author ? [post.author] : [], publishedTime: (post.publishedAt || post.createdAt).toISOString(), modifiedTime: post.updatedAt.toISOString() }, twitter: { card: "summary_large_image", title: post.metaTitle || post.title, description, images: image ? [image] : [] } };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug).catch(() => null);
  if (!post) notFound();
  const related = await getRelatedPosts(post).catch(() => []);
  const jsonLd = [{ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt || stripHtml(post.content).slice(0, 155), image: (post.ogImage || post.coverImage) ? [post.ogImage || post.coverImage] : undefined, datePublished: (post.publishedAt || post.createdAt).toISOString(), dateModified: post.updatedAt.toISOString(), keywords: post.focusKeyword || undefined, articleSection: post.category || undefined, author: { "@type": "Person", name: post.author || "WebServices" } }, { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "/" }, { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" }, { "@type": "ListItem", position: 3, name: post.title, item: `/blog/${post.slug}` }] }];

  return <main className="relative min-h-screen overflow-hidden bg-[#f5f2ff] dark:bg-[#f5f2ff] pt-32 pb-24 text-neutral-950 dark:text-neutral-950"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.16),transparent_34rem)]" /><article className="relative z-10 mx-auto max-w-4xl px-6 md:px-12"><ArticleHeader post={post} /><ArticleContent content={post.content} /><ArticleCta /></article><div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12"><ArticleRelatedPosts posts={related} /></div><ViewCounter id={post.id} /></main>;
}
