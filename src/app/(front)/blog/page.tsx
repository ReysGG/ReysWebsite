import React from "react";
import db from "@/lib/db";
import Link from "next/link";
import type { Post } from "@prisma/client";
import { ArrowUpRight, CalendarDays, FileText } from "lucide-react";

export const metadata = {
  title: "Blog & Insights | WebServices",
  description:
    "Dapatkan wawasan terbaru tentang teknologi, desain, dan pengembangan produk digital dari tim kami.",
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

export default async function PublicBlogPage() {
  let databaseError = false;
  let posts: Post[] = [];

  try {
    posts = await db.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    databaseError = true;
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#EFECE6] pt-32 pb-24 text-neutral-950">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div className="absolute -left-24 top-48 h-72 w-72 rounded-full border border-neutral-950" />
        <div className="absolute right-0 top-0 h-[420px] w-[420px] border border-neutral-950" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {databaseError && (
          <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
            Database sedang tidak bisa diakses. Artikel akan muncul kembali setelah koneksi Postgres/Supabase diperbaiki.
          </div>
        )}

        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
              Blog & Insights
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-neutral-950 md:text-6xl">
              Catatan praktis untuk membangun web yang cepat dan menjual.
            </h1>
          </div>
          <p className="max-w-xl text-base font-medium leading-relaxed text-neutral-600 md:text-lg">
            Panduan teknis, studi kasus, dan keputusan desain yang membantu
            bisnis kecil sampai startup bergerak lebih rapi di digital.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-lg border border-neutral-200 bg-white/70 p-12 text-center shadow-sm">
            <FileText className="mx-auto mb-4 h-10 w-10 text-neutral-400" />
            <h2 className="text-xl font-bold text-neutral-950">Belum ada artikel</h2>
            <p className="mt-2 text-sm text-neutral-500">
              Artikel yang sudah dipublikasikan akan muncul di halaman ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex min-h-[430px] flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl"
              >
                {post.coverImage ? (
                  <div className="relative h-52 w-full overflow-hidden bg-neutral-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex h-52 w-full items-center justify-center bg-neutral-950 text-white">
                    <div className="text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                        <FileText className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                        Insight {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center justify-between gap-4 text-xs font-semibold text-neutral-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(post.createdAt)}
                    </span>
                    <span>{post.author || "Admin"}</span>
                  </div>
                  <h2 className="text-xl font-bold leading-tight tracking-tight text-neutral-950 transition-colors group-hover:text-neutral-700 md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                    {post.excerpt ||
                      `${post.content.replace(/<[^>]+>/g, "").substring(0, 120)}...`}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-8">
                    <span className="text-sm font-bold text-neutral-950">Baca artikel</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-950 transition-colors group-hover:bg-neutral-950 group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16 rounded-lg border border-neutral-200 bg-white/75 p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-neutral-950">50+</p>
              <p className="mt-1 text-sm font-medium text-neutral-500">project reference</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-neutral-950">98</p>
              <p className="mt-1 text-sm font-medium text-neutral-500">performance target</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-neutral-950">14d</p>
              <p className="mt-1 text-sm font-medium text-neutral-500">typical launch sprint</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
