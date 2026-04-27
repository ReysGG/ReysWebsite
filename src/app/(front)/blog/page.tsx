import React from "react";
import db from "@/lib/db";
import Link from "next/link";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";

export const metadata = {
  title: "Blog & Insights | StartDev",
  description: "Dapatkan wawasan terbaru tentang teknologi, desain, dan pengembangan produk digital dari tim kami.",
};

export default async function PublicBlogPage() {
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="relative min-h-screen bg-black w-full overflow-hidden pt-32 pb-20">
      <BackgroundBeams />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center justify-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Our <span className="text-indigo-400">Insights</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl text-lg relative z-20">
            Temukan panduan teknis, studi kasus, dan pembaruan terbaru seputar dunia teknologi dan inovasi produk digital.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-neutral-500">
            Belum ada artikel yang dipublikasikan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group relative block">
                <div className="h-full flex flex-col bg-white/2 border border-white/5 rounded-3xl overflow-hidden hover:bg-white/4 transition-colors duration-500">
                  {post.coverImage ? (
                    <div className="h-48 w-full overflow-hidden bg-neutral-900">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-linear-to-br from-neutral-900 to-black flex items-center justify-center border-b border-white/5">
                      <span className="text-neutral-700 text-4xl font-serif opacity-30">News</span>
                    </div>
                  )}
                  
                  <div className="p-6 md:p-8 flex flex-col grow">
                    <div className="flex justify-between items-center mb-4 text-xs text-indigo-400/80 font-mono">
                      <span>{new Date(post.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric'})}</span>
                      <span>{post.author || "Admin"}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt || post.content.substring(0, 120) + "..."}
                    </p>
                    <div className="mt-6 flex items-center text-sm font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                      Baca Selengkapnya &rarr;
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
