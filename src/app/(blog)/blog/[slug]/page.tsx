import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPostBySlug, getRelatedPosts, getAllPublishedSlugs } from "@/features/blog/data/posts";
import { ArticleHeader } from "@/features/blog/components/article-header";
import { ArticleContent } from "@/features/blog/components/article-content";
import { ArticleRelatedPosts } from "@/features/blog/components/article-related-posts";
import { ViewCounter } from "@/features/blog/components/view-counter";
import { SocialEngagementLoader } from "@/features/blog/components/frontend/social-engagement-loader";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const posts = await getAllPublishedSlugs();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Artikel Tidak Ditemukan" };
  const description = post.metaDesc || post.excerpt || "";
  const image = post.ogImage || post.coverImage;
  return {
    title: post.metaTitle || `${post.title} | WebServices Blog`,
    description,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    keywords: post.focusKeyword ? [post.focusKeyword] : undefined,
    openGraph: {
      type: "article",
      title: post.metaTitle || post.title,
      description,
      images: image ? [image] : [],
      authors: post.author ? [post.author] : [],
      publishedTime: (post.publishedAt || post.createdAt).toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  const related = await getRelatedPosts(post).catch(() => []);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt || "",
      image: post.ogImage || post.coverImage ? [post.ogImage || post.coverImage] : undefined,
      datePublished: (post.publishedAt || post.createdAt).toISOString(),
      dateModified: post.updatedAt.toISOString(),
      keywords: post.focusKeyword || undefined,
      articleSection: post.category || undefined,
      author: { "@type": "Person", name: post.author || "WebServices" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
        { "@type": "ListItem", position: 3, name: post.title, item: `/blog/${post.slug}` },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f3ff] px-4 pt-12 pb-12 text-neutral-950 md:px-8 md:pt-14 md:pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="mx-auto max-w-5xl rounded-2xl bg-white px-6 py-7 md:px-10 md:py-8 lg:px-14">
        <ArticleHeader post={post} />
        <ArticleContent content={post.content} />
        <SocialEngagementLoader postId={post.id} />

        {related.length > 0 && <ArticleRelatedPosts posts={related} />}
      </article>

      <ViewCounter id={post.id} />
    </main>
  );
}
