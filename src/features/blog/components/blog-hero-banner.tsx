import Link from "next/link";
import { Search, Sparkles } from "lucide-react";

export function BlogHeroBanner({ totalPosts }: { totalPosts: number }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#ff8a00] via-[#f4b738] to-neutral-950 px-6 py-16 text-white md:px-12 md:py-20 lg:px-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.06),transparent_50%)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          {totalPosts} artikel tersedia
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Blog & Insights
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          Panduan teknis, studi kasus, dan insight pengembangan website untuk bisnis yang ingin tumbuh secara digital.
        </p>

        {/* Search form */}
        <form action="/blog" method="GET" className="mx-auto mt-8 flex max-w-xl items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              name="q"
              placeholder="Cari artikel, topik, atau keyword..."
              className="w-full rounded-full border border-white/20 bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder-white/50 outline-none backdrop-blur-sm transition-colors focus:border-white/40 focus:bg-white/15"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#ff8a00] transition-colors hover:bg-[#fffcc9]"
          >
            Cari
          </button>
        </form>

        {/* Quick category links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-white/50">Populer:</span>
          {["SEO", "Landing Page", "E-Commerce", "UI/UX"].map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
