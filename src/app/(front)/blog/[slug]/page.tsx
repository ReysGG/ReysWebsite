import React from "react";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, CalendarDays, MessageCircle } from "lucide-react";
import { SocialEngagement } from "@/features/blog/components/frontend/social-engagement";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug },
  }).catch(() => null);

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  return {
    title: post.metaTitle || `${post.title} | WebServices Blog`,
    description: post.metaDesc || post.excerpt || `Membahas tentang ${post.title}`,
    openGraph: {
      type: "article",
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt || "",
      images: post.coverImage ? [post.coverImage] : [],
      authors: post.author ? [post.author] : [],
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt || "",
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const { userId } = await auth();

  const post = await db.post.findUnique({
    where: { slug },
  }).catch(() => null);

  if (!post) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#EFECE6] pt-32 pb-24 text-neutral-950">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-8 text-amber-800">
            <h1 className="text-2xl font-bold">Artikel belum bisa dimuat</h1>
            <p className="mt-3 text-sm leading-relaxed">
              Database sedang tidak bisa diakses. Coba lagi setelah koneksi Postgres/Supabase diperbaiki.
            </p>
            <Link href="/blog" className="mt-6 inline-flex text-sm font-bold underline">
              Kembali ke Blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!post.published) {
    notFound();
  }

  let likesCount = 0;
  let userLike = null;
  let comments: {
    id: string;
    content: string;
    createdAt: Date;
    userId: string;
    parentId: string | null;
  }[] = [];

  try {
    [likesCount, userLike, comments] = await Promise.all([
      db.like.count({ where: { postId: post.id } }),
      userId
        ? db.like.findUnique({
            where: { userId_postId: { userId, postId: post.id } },
          })
        : null,
      db.comment.findMany({
        where: { postId: post.id },
        orderBy: { createdAt: "asc" },
      }),
    ]);
  } catch {
    likesCount = 0;
    userLike = null;
    comments = [];
  }

  const userHasLiked = !!userLike;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#EFECE6] pt-32 pb-24 text-neutral-950 selection:bg-neutral-300">
      <div className="pointer-events-none absolute inset-0 opacity-[0.045]">
        <div className="absolute -left-20 top-44 h-72 w-72 rounded-full border border-neutral-950" />
        <div className="absolute right-0 top-0 h-[420px] w-[420px] border border-neutral-950" />
      </div>

      <article className="relative z-10 mx-auto w-full max-w-4xl px-6 md:px-12">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-neutral-600 transition-colors hover:text-neutral-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Blog
        </Link>

        <header className="rounded-lg border border-neutral-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-10">
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-neutral-500">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
            </span>
            <span>By {post.author || "Admin"}</span>
            <span className="inline-flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              {comments.length} komentar
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-6xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">{post.excerpt}</p>
          )}

          {post.coverImage && (
            <div className="mt-8 h-[300px] w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 md:h-[450px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </header>

        <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <div
            className="quill-content text-base leading-8 text-neutral-700 md:text-lg [&_a]:font-semibold [&_a]:text-neutral-950 [&_blockquote]:border-l-4 [&_blockquote]:border-neutral-300 [&_blockquote]:pl-5 [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:font-bold [&_img]:rounded-lg [&_li]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-5 [&_ul]:list-disc [&_ul]:pl-6"
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
    </main>
  );
}
