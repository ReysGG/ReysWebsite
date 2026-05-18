'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Layers } from 'lucide-react';
import type { ShowcaseItem } from '@/features/showcase/data';

type ShowcaseGridProps = {
  items: ShowcaseItem[];
  categories: string[];
};

export function ShowcaseGrid({ items, categories }: ShowcaseGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeCategory ? items.filter((i) => i.category === activeCategory) : items),
    [items, activeCategory],
  );

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-500">
            <Layers className="h-3 w-3" />
            Filter
          </span>
          <button
            onClick={() => setActiveCategory(null)}
            className={[
              'rounded-full border px-3 py-1.5 text-xs font-semibold transition',
              activeCategory === null
                ? 'border-neutral-950 bg-neutral-950 text-white'
                : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400',
            ].join(' ')}
          >
            Semua ({items.length})
          </button>
          {categories.map((cat) => {
            const count = items.filter((i) => i.category === cat).length;
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  'rounded-full border px-3 py-1.5 text-xs font-semibold transition',
                  active
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-blue-300 hover:text-blue-700',
                ].join(' ')}
              >
                {cat} <span className="ml-1 opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
          <p className="text-sm text-neutral-500">Tidak ada prototipe di kategori ini.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, idx) => (
            <Link
              key={item.slug}
              href={`/showcase/${item.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm outline-none transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 motion-safe:animate-[fadeUp_500ms_cubic-bezier(0.22,1,0.36,1)_both]"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-700 shadow-sm backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  {item.category}
                </div>
                <div className="absolute bottom-3 right-3 translate-y-2 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-neutral-900 opacity-0 shadow-sm backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100">
                  Klik untuk preview
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold leading-tight tracking-tight text-neutral-950 transition group-hover:text-blue-700">
                  {item.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-600">{item.description}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-bold text-neutral-950">
                  Lihat preview
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
