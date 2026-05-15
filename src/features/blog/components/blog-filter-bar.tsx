import Link from 'next/link';
import { Search } from 'lucide-react';

export function BlogFilterBar({
  q = '',
  tag = '',
  category = '',
  year = '',
  tags = [],
  categories = [],
  years = [],
}: {
  q?: string;
  tag?: string;
  category?: string;
  year?: string;
  tags?: string[];
  categories?: string[];
  years?: number[];
}) {
  const hasFilter = !!(q || tag || category || year);

  return (
    <form action="/blog" className="mb-6 border-b border-neutral-200 pb-5">
      <div className="flex flex-wrap gap-3">
        {/* Search input */}
        <div className="relative min-w-48 flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Cari artikel..."
            className="w-full rounded-md border border-neutral-200 bg-white dark:bg-white py-2 pl-8 pr-3 text-sm text-neutral-900 dark:text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-indigo-400 transition"
          />
        </div>

        {/* Category */}
        <select
          name="category"
          defaultValue={category}
          className="rounded-md border border-neutral-200 bg-white dark:bg-white px-3 py-2 text-sm text-neutral-700 dark:text-neutral-700 outline-none focus:border-indigo-400"
        >
          <option value="">Semua kategori</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Tag */}
        <select
          name="tag"
          defaultValue={tag}
          className="rounded-md border border-neutral-200 bg-white dark:bg-white px-3 py-2 text-sm text-neutral-700 dark:text-neutral-700 outline-none focus:border-indigo-400"
        >
          <option value="">Semua tag</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Year */}
        <select
          name="year"
          defaultValue={year}
          className="rounded-md border border-neutral-200 bg-white dark:bg-white px-3 py-2 text-sm text-neutral-700 dark:text-neutral-700 outline-none focus:border-indigo-400"
        >
          <option value="">Semua tahun</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
        >
          Cari
        </button>
      </div>

      {hasFilter && (
        <Link
          href="/blog"
          className="mt-2 inline-block text-xs font-semibold text-indigo-600 hover:underline"
        >
          × Reset filter
        </Link>
      )}
    </form>
  );
}
