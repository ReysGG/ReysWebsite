import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays } from "lucide-react";
import type { BlogPost } from "@/features/blog/data/posts";
import { formatBlogDate, getPostDate, getReadingTime } from "./blog-card";

export function ArticleHeader({ post }: { post: BlogPost }) {
  return <header><Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-neutral-600 dark:text-neutral-600 hover:text-indigo-700"><ArrowLeft className="h-4 w-4" />Kembali ke Blog</Link><div className="rounded-3xl border border-indigo-100 dark:border-indigo-100 bg-white/85 dark:bg-white/85 p-6 shadow-sm md:p-10"><div className="mb-5 flex flex-wrap gap-3 text-sm font-semibold text-neutral-500 dark:text-neutral-500">{post.category && <span className="rounded-full bg-indigo-50 dark:bg-indigo-50 px-3 py-1 text-indigo-700 dark:text-indigo-700">{post.category}</span>}<span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" />{formatBlogDate(getPostDate(post))}</span><span>{post.author || "Admin"}</span><span>{getReadingTime(post.content)}</span>{post.featured && <span className="text-indigo-600 dark:text-indigo-600">Featured</span>}</div><h1 className="text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-950 md:text-6xl">{post.title}</h1>{post.excerpt && <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-600">{post.excerpt}</p>}{post.coverImage && <div className="relative mt-8 h-[420px] overflow-hidden rounded-3xl border border-neutral-100 dark:border-neutral-100"><Image src={post.coverImage} alt={post.title} fill className="object-cover" /></div>}</div></header>;
}
