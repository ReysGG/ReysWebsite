import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, FileText } from "lucide-react";
import type { BlogPost } from "@/features/blog/data/posts";

export const formatBlogDate = (date: Date) => new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(date);
export const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
export const getReadingTime = (content: string) => `${Math.max(1, Math.ceil(stripHtml(content).split(/\s+/).filter(Boolean).length / 220))} min read`;
export const getPostDate = (post: BlogPost) => post.publishedAt || post.createdAt;

export function BlogCard({ post }: { post: BlogPost }) {
  return <Link href={`/blog/${post.slug}`} className="group flex min-h-[420px] flex-col overflow-hidden rounded-3xl border border-indigo-100 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    {post.coverImage ? <div className="relative h-52 overflow-hidden bg-indigo-50"><Image src={post.coverImage} alt={post.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /></div> : <div className="flex h-52 items-center justify-center bg-gradient-to-br from-indigo-600 to-violet-600 text-white"><FileText className="h-10 w-10" /></div>}
    <div className="flex flex-1 flex-col p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-neutral-500">{post.category && <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">{post.category}</span>}<span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{formatBlogDate(getPostDate(post))}</span><span>{getReadingTime(post.content)}</span>{post.featured && <span className="text-indigo-600">Featured</span>}</div>
      <h2 className="text-xl font-bold tracking-tight text-neutral-950 group-hover:text-indigo-700">{post.title}</h2>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">{post.excerpt || `${stripHtml(post.content).slice(0, 140)}...`}</p>
      <div className="mt-5 flex flex-wrap gap-2">{post.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{tag}</span>)}</div>
      <div className="mt-auto flex items-center justify-between pt-8 text-sm font-bold text-neutral-950">Baca artikel <ArrowUpRight className="h-4 w-4" /></div>
    </div>
  </Link>;
}
