'use client';

import Link from 'next/link';
import { useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Filter, RotateCcw, Search } from 'lucide-react';
import { deleteShowcase, toggleShowcasePublished } from '@/features/admin/actions/showcase-actions';
import {
  ShowcaseDesktopRow,
  ShowcaseEmptyState,
  ShowcaseMobileCard,
} from '@/features/admin/components/showcase/showcase-table-parts';
import { buildShowcasePageHref } from '@/features/admin/lib/showcase-table';
import type { ShowcaseTableProps } from '@/features/admin/types/showcase-table';

export function ShowcaseTable({ items: initial, categories, filters, pagination }: ShowcaseTableProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const hasFilters = Boolean(filters.q || filters.category || filters.status !== 'all');

  const paginationHref = useMemo(() => ({
    prev: buildShowcasePageHref(pathname, searchParams, pagination.page - 1),
    next: buildShowcasePageHref(pathname, searchParams, pagination.page + 1),
  }), [pagination.page, pathname, searchParams]);

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Hapus "${title}"?`)) return;
    const fd = new FormData();
    fd.append('id', id);
    setActionError(null);
    setActiveId(id);
    startTransition(async () => {
      const result = await deleteShowcase(fd);
      if (result?.error) {
        setActionError(result.error);
      } else {
        setItems((prev) => prev.filter((item) => item.id !== id));
        router.refresh();
      }
      setActiveId(null);
    });
  };

  const handleToggle = (id: string) => {
    const fd = new FormData();
    fd.append('id', id);
    setActionError(null);
    setActiveId(id);
    startTransition(async () => {
      const result = await toggleShowcasePublished(fd);
      if (result?.error) {
        setActionError(result.error);
      } else {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, published: !item.published } : item)),
        );
        router.refresh();
      }
      setActiveId(null);
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-neutral-200 bg-white p-4 shadow-none">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase text-[#ff8a00]">
              <Filter className="h-3.5 w-3.5" />
              Inventory Filter
            </div>
            <p className="mt-1 text-sm text-neutral-500">
              Menampilkan {items.length} dari {pagination.total} hasil.
            </p>
          </div>
          {hasFilters && (
            <Link href="/admin/showcase" className="inline-flex w-fit items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900">
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Link>
          )}
        </div>

        <form className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_220px_auto]" action="/admin/showcase" method="get">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              name="q"
              type="search"
              defaultValue={filters.q}
              placeholder="Cari judul, slug, kategori, atau deskripsi"
              className="h-11 w-full rounded-md border border-neutral-200 bg-neutral-50 pl-10 pr-3 text-sm outline-none transition focus:border-[#ff8a00] focus:bg-white focus:ring-2 focus:ring-[#fffcc9]"
            />
          </div>
          <select name="status" defaultValue={filters.status} className="h-11 rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-700 outline-none transition focus:border-[#ff8a00] focus:ring-2 focus:ring-[#fffcc9]">
            <option value="all">Semua status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select name="category" defaultValue={filters.category} className="h-11 rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-700 outline-none transition focus:border-[#ff8a00] focus:ring-2 focus:ring-[#fffcc9]">
            <option value="">Semua kategori</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
          <button type="submit" className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-bold text-white transition hover:bg-[#f4b738]">
            <Search className="h-4 w-4" />
            Terapkan
          </button>
        </form>
      </div>

      {actionError && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {actionError}
        </div>
      )}

      {items.length === 0 ? (
        <ShowcaseEmptyState hasFilters={hasFilters} />
      ) : (
        <>
          <div className="grid gap-4 lg:hidden">
            {items.map((item) => (
              <ShowcaseMobileCard key={item.id} item={item} pending={pending} activeId={activeId} onToggle={handleToggle} onDelete={handleDelete} />
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-md border border-neutral-200 bg-white shadow-none lg:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  <tr>
                    <th className="w-16 px-4 py-3">Order</th>
                    <th className="min-w-[360px] px-4 py-3">Showcase</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Updated</th>
                    <th className="min-w-[260px] px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {items.map((item) => (
                    <ShowcaseDesktopRow key={item.id} item={item} pending={pending} activeId={activeId} onToggle={handleToggle} onDelete={handleDelete} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-500">
          <span>
            Halaman {pagination.page} dari {pagination.totalPages}
          </span>
          <div className="flex gap-2">
            {pagination.hasPreviousPage && (
              <Link href={paginationHref.prev} className="rounded-md border border-neutral-200 px-3 py-1.5 font-semibold hover:bg-neutral-50">
                Prev
              </Link>
            )}
            {pagination.hasNextPage && (
              <Link href={paginationHref.next} className="rounded-md border border-neutral-200 px-3 py-1.5 font-semibold hover:bg-neutral-50">
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
