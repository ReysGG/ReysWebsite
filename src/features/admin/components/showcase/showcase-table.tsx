'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Edit,
  ExternalLink,
  Eye,
  Filter,
  Loader2,
  RotateCcw,
  Search,
  Send,
  Trash2,
} from 'lucide-react';
import { deleteShowcase, toggleShowcasePublished } from '@/features/admin/actions/showcase-actions';

type ShowcaseStatus = 'all' | 'published' | 'draft';

type ShowcaseRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string | null;
  htmlUrl: string;
  tags: string[];
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

type ShowcaseCategory = {
  name: string;
  count: number;
};

type ShowcaseFilters = {
  q: string;
  status: ShowcaseStatus;
  category: string;
  page: number;
};

type ShowcasePagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type ShowcaseTableProps = {
  items: ShowcaseRow[];
  categories: ShowcaseCategory[];
  filters: ShowcaseFilters;
  pagination: ShowcasePagination;
};

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

function formatDate(date: Date) {
  return dateFormatter.format(new Date(date));
}

function pageHref(pathname: string, searchParams: URLSearchParams, page: number) {
  const params = new URLSearchParams(searchParams.toString());
  if (page <= 1) params.delete('page');
  else params.set('page', String(page));
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

function previewHref(slug: string) {
  return `/showcase/${slug}`;
}

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
    prev: pageHref(pathname, searchParams, pagination.page - 1),
    next: pageHref(pathname, searchParams, pagination.page + 1),
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
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase text-indigo-600">
              <Filter className="h-3.5 w-3.5" />
              Inventory Filter
            </div>
            <p className="mt-1 text-sm text-neutral-500">
              Menampilkan {items.length} dari {pagination.total} hasil.
            </p>
          </div>
          {hasFilters && (
            <Link
              href="/admin/showcase"
              className="inline-flex w-fit items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900"
            >
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
              className="h-11 w-full rounded-md border border-neutral-200 bg-neutral-50 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <select
            name="status"
            defaultValue={filters.status}
            className="h-11 rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">Semua status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            name="category"
            defaultValue={filters.category}
            className="h-11 rounded-md border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Semua kategori</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
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
        <div className="rounded-md border border-dashed border-neutral-300 bg-white p-12 text-center">
          <p className="text-sm font-semibold text-neutral-700">
            {hasFilters ? 'Tidak ada showcase yang cocok.' : 'Belum ada showcase.'}
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            {hasFilters ? 'Coba ubah filter atau reset pencarian.' : 'Upload prototype HTML pertama untuk mulai mengisi library.'}
          </p>
          <div className="mt-5 flex justify-center gap-2">
            {hasFilters && (
              <Link href="/admin/showcase" className="rounded-md border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
                Reset filter
              </Link>
            )}
            <Link href="/admin/showcase/new" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
              Showcase baru
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 lg:hidden">
            {items.map((item) => (
              <article key={item.id} className="rounded-md border border-neutral-200 bg-white p-4 shadow-none">
                <div className="flex gap-3">
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                    {item.thumbnail ? (
                      <Image src={item.thumbnail} alt={item.title} fill sizes="112px" className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] text-neutral-400">No image</div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h2 className="line-clamp-2 text-sm font-bold text-neutral-900">{item.title}</h2>
                        <p className="mt-1 truncate text-xs text-neutral-500">/showcase/{item.slug}</p>
                      </div>
                      <span className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-bold ${item.published ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-500'}`}>
                        {item.published ? 'Live' : 'Draft'}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-500">{item.description}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-700">{item.category}</span>
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-md bg-neutral-100 px-2 py-1 text-[11px] text-neutral-600">{tag}</span>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  <ActionLink href={previewHref(item.slug)} label="Preview" icon={<Eye className="h-3.5 w-3.5" />} />
                  <ActionAnchor href={item.htmlUrl} label="HTML" icon={<ExternalLink className="h-3.5 w-3.5" />} />
                  <ActionLink href={`/admin/showcase/${item.id}/edit`} label="Edit" icon={<Edit className="h-3.5 w-3.5" />} />
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id)}
                    disabled={pending && activeId === item.id}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition hover:bg-neutral-50 disabled:opacity-50"
                    aria-label={item.published ? 'Jadikan draft' : 'Publish'}
                  >
                    {pending && activeId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title)}
                    disabled={pending && activeId === item.id}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-rose-200 text-rose-500 transition hover:bg-rose-50 disabled:opacity-50"
                    aria-label="Hapus"
                  >
                    {pending && activeId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </article>
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
                    <tr key={item.id} className="transition hover:bg-neutral-50">
                      <td className="px-4 py-4 align-top font-mono text-xs text-neutral-400">{item.order}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-start gap-3">
                          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                            {item.thumbnail ? (
                              <Image src={item.thumbnail} alt={item.title} fill sizes="96px" className="object-cover" />
                            ) : (
                              <div className="flex h-full items-center justify-center text-[10px] text-neutral-400">No image</div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="line-clamp-1 font-bold text-neutral-900">{item.title}</p>
                            <p className="mt-1 truncate text-xs text-neutral-500">/showcase/{item.slug}</p>
                            <p className="mt-2 line-clamp-2 max-w-xl text-xs leading-5 text-neutral-500">{item.description}</p>
                            {item.tags.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {item.tags.slice(0, 4).map((tag) => (
                                  <span key={tag} className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600">{tag}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">{item.category}</span>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <button
                          type="button"
                          onClick={() => handleToggle(item.id)}
                          disabled={pending && activeId === item.id}
                          className={[
                            'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition disabled:opacity-50',
                            item.published
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'border-neutral-200 bg-neutral-100 text-neutral-600 hover:bg-neutral-200',
                          ].join(' ')}
                        >
                          {pending && activeId === item.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <span className={`h-1.5 w-1.5 rounded-full ${item.published ? 'bg-emerald-500' : 'bg-neutral-400'}`} />
                          )}
                          {item.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-4 py-4 align-top text-xs text-neutral-500">{formatDate(item.updatedAt)}</td>
                      <td className="px-4 py-4 align-top">
                        <div className="flex items-center justify-end gap-2">
                          <ActionLink href={previewHref(item.slug)} label="Preview" icon={<Eye className="h-3.5 w-3.5" />} />
                          <ActionAnchor href={item.htmlUrl} label="HTML" icon={<ExternalLink className="h-3.5 w-3.5" />} />
                          <ActionLink href={`/admin/showcase/${item.id}/edit`} label="Edit" icon={<Edit className="h-3.5 w-3.5" />} />
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.title)}
                            disabled={pending && activeId === item.id}
                            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-rose-200 px-3 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-50"
                          >
                            {pending && activeId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
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

function ActionLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <Link
      href={href}
      target={href.startsWith('/showcase') ? '_blank' : undefined}
      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-neutral-200 px-3 text-xs font-semibold text-neutral-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
      aria-label={label}
    >
      {icon}
      <span className="hidden xl:inline">{label}</span>
    </Link>
  );
}

function ActionAnchor({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-neutral-200 px-3 text-xs font-semibold text-neutral-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
      aria-label={label}
    >
      {icon}
      <span className="hidden xl:inline">{label}</span>
    </a>
  );
}
