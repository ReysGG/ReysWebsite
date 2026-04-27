import React from 'react';
import db from '@/lib/db';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { SocialEngagement } from '@/features/blog/components/frontend/social-engagement';

interface PageProps {
  params: {
    slug: string;
  };
}

// 1. DYNAMIC METADATA SETUP FOR SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await db.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return {
      title: 'Artikel Tidak Ditemukan',
    };
  }

  return {
    title: post.metaTitle || `${post.title} | StartDev Blog`,
    description: post.metaDesc || post.excerpt || `Membahas tentang ${post.title}`,
    openGraph: {
      type: 'article',
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt || '',
      images: post.coverImage ? [post.coverImage] : [],
      authors: post.author ? [post.author] : [],
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt || '',
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { userId } = await auth();

  const post = await db.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  // Fetch comments and likes concurrently
  const [likesCount, userLike, comments] = await Promise.all([
    db.like.count({ where: { postId: post.id } }),
    userId ? db.like.findUnique({
      where: { userId_postId: { userId, postId: post.id } }
    }) : null,
    db.comment.findMany({
      where: { postId: post.id },
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  const userHasLiked = !!userLike;

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 selection:bg-indigo-500/30">
      <article className="max-w-3xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Breadcrumb / Back Navigation */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-mono text-sm mb-8 transition-colors"
        >
          &larr; Kembali ke Blog
        </Link>

        {/* Header Area */}
        <header className="mb-12">
          <div className="flex items-center gap-4 text-neutral-500 font-mono text-sm mb-6">
            <time dateTime={post.createdAt.toISOString()}>
              {new Date(post.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>&bull;</span>
            <span>By {post.author || 'Admin'}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight">
            {post.title}
          </h1>

          {post.coverImage && (
            <div className="w-full h-[300px] md:h-[450px] relative rounded-3xl overflow-hidden mt-8 border border-white/5">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        {/* Content Area */}
        <div className="prose prose-invert prose-indigo lg:prose-lg xl:prose-xl max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tight
                        prose-a:text-indigo-400 hover:prose-a:text-indigo-300 transition-colors
                        prose-img:rounded-2xl prose-img:border prose-img:border-neutral-800">
          {/* We use dangerouslySetInnerHTML to render the Rich Text HTML from Quill Editor */}
          {/* Note: In a production CMS where authors are not fully trusted, use DOMPurify to sanitize `post.content` */}
          <div 
            className="text-neutral-300 leading-relaxed quill-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <SocialEngagement 
          postId={post.id}
          initialLikesCount={likesCount}
          userHasLiked={userHasLiked}
          comments={comments}
        />
      </article>

      {/* Decorative Blur */}
      <div className="absolute top-0 inset-x-0 h-96 bg-linear-to-b from-indigo-900/10 to-transparent pointer-events-none -z-10" />
    </main>
  );
}
