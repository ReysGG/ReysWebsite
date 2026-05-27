'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, LayoutGrid, Search, SlidersHorizontal, X } from 'lucide-react';
import type { ShowcaseItem } from '@/features/showcase/data';

type ShowcaseGridProps = {
  items: ShowcaseItem[];
  categories: string[];
};

export function ShowcaseGrid({ items, categories }: ShowcaseGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return counts;
  }, [items]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const categoryMatches = activeCategory ? item.category === activeCategory : true;
      if (!categoryMatches) return false;
      if (!normalizedQuery) return true;

      const searchable = [
        item.title,
        item.description,
        item.category,
        ...item.tags,
      ].join(' ').toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [items, activeCategory, query]);

  const hasFilters = Boolean(activeCategory || query.trim());

  const resetFilters = () => {
    setActiveCategory(null);
    setQuery('');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase text-[#ff8a00]">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Browse Library
            </div>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {filtered.length} dari {items.length} prototype tampil
            </p>
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Cari industri, fitur, atau judul"
              className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#ff8a00] focus:bg-white focus:ring-2 focus:ring-[#fffcc9]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Hapus pencarian"
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {categories.length > 1 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase text-slate-500">
              <LayoutGrid className="h-3.5 w-3.5" />
              Kategori
            </span>
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={[
                'rounded-md border px-3 py-2 text-xs font-bold transition',
                activeCategory === null
                  ? 'border-slate-950 bg-slate-950 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-950',
              ].join(' ')}
            >
              Semua ({items.length})
            </button>
            {categories.map((cat) => {
              const count = categoryCounts.get(cat) ?? 0;
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={[
                    'rounded-md border px-3 py-2 text-xs font-bold transition',
                    active
                      ? 'border-[#ff8a00] bg-[#ff8a00] text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-[#ffcd80] hover:text-[#ff8a00]',
                  ].join(' ')}
                >
                  {cat} <span className="ml-1 opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-sm font-semibold text-slate-700">Tidak ada prototype yang cocok.</p>
          <p className="mt-2 text-sm text-slate-500">Coba kata kunci lain atau tampilkan semua kategori.</p>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-[#ff8a00]"
            >
              Reset filter
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item, idx) => (
            <Link
              key={item.slug}
              href={`/showcase/${item.slug}`}
              className={[
                'group relative flex min-h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm outline-none transition duration-300 hover:-translate-y-1 hover:border-[#ffcd80] hover:shadow-xl hover:shadow-slate-200/80 focus-visible:ring-2 focus-visible:ring-[#ff8a00] focus-visible:ring-offset-2 motion-safe:animate-[fadeUp_500ms_cubic-bezier(0.22,1,0.36,1)_both]',
                idx === 0 && filtered.length > 3 ? 'xl:col-span-2' : '',
              ].join(' ')}
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-white/15 bg-slate-950/70 px-3 py-2 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-amber-300" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="ml-2 truncate text-[10px] font-semibold text-white/75">
                    /showcase/{item.slug}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase text-[#ff8a00] shadow-sm backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {item.category}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold leading-tight tracking-tight text-slate-950 transition group-hover:text-[#ff8a00]">
                  {item.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{item.description}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm font-bold text-slate-950">
                  <span>Buka preview</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition group-hover:border-[#ffcd80] group-hover:bg-[#fffcc9] group-hover:text-[#ff8a00]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
