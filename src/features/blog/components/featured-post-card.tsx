import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/features/blog/data/posts";
import { formatBlogDate, getPostDate } from "./blog-card";

export function FeaturedPostCard({ post }: { post: BlogPost }) {
  return <section className="mb-8 overflow-hidden rounded-3xl border border-[#ffcd80] bg-white shadow-sm lg:grid lg:grid-cols-2">
    <div className="relative min-h-72 bg-gradient-to-br from-[#ff8a00] to-neutral-950">{post.coverImage && <Image src={post.coverImage} alt={post.title} fill className="object-cover" />}</div>
    <div className="p-7 md:p-10"><p className="mb-3 bg-gradient-to-r from-[#ff8a00] via-[#f4b738] to-[#ffcd80] bg-clip-text text-xs font-bold uppercase tracking-[0.24em] text-transparent">Featured</p><div className="flex flex-wrap gap-3 text-sm font-semibold text-neutral-500">{post.category && <span className="bg-gradient-to-r from-[#ff8a00] via-[#f4b738] to-[#ffcd80] bg-clip-text text-transparent">{post.category}</span>}<span>{formatBlogDate(getPostDate(post))}</span></div><h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">{post.title}</h2><p className="mt-4 text-neutral-600">{post.excerpt ?? ""}</p><Link href={`/blog/${post.slug}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-bold text-white hover:bg-[#ff8a00]">Baca featured <ArrowRight className="h-4 w-4" /></Link></div>
  </section>;
}
