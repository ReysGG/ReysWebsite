'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import { Edit, ExternalLink, Eye, Loader2, Plus, Trash2 } from 'lucide-react';
import { deleteShowcase, toggleShowcasePublished } from '@/features/admin/actions/showcase-actions';

type ShowcaseRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  thumbnail: string | null;
  htmlUrl: string;
  published: boolean;
  order: number;
};

export function ShowcaseTable({ items: initial }: { items: ShowcaseRow[] }) {
  const [items, setItems] = useState(initial);
  const [pending, startTransition] = useTransition();

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Hapus "${title}"?`)) return;
    const fd = new FormData();
    fd.append('id', id);
    startTransition(async () => {
      await deleteShowcase(fd);
      setItems((prev) => prev.filter((i) => i.id !== id));
    });
  };

  const handleToggle = (id: string) => {
    const fd = new FormData();
    fd.append('id', id);
    startTransition(async () => {
      await toggleShowcasePublished(fd);
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, published: !i.published } : i)),
      );
    });
  };

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-16 text-center">
        <p className="text-sm text-neutral-500">
          Belum ada showcase.{' '}
          <Link href="/admin/showcase/new" className="font-semibold text-blue-600 hover:underline">
            Buat yang pertama
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-neutral-100">
        <thead>
          <tr className="bg-neutral-50">
            <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-neutral-400">#</th>
            <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-neutral-400">Showcase</th>
            <th className="hidden px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-neutral-400 md:table-cell">Kategori</th>
            <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-neutral-400">Status</th>
            <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-neutral-400">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-50">
          {items.map((item) => (
            <tr key={item.id} className={`transition hover:bg-neutral-50/60 ${pending ? 'opacity-60' : ''}`}>
              <td className="px-4 py-3 text-xs font-mono text-neutral-400">{item.order}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                    {item.thumbnail ? (
                      <Image src={item.thumbnail} alt={item.title} fill sizes="56px" className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[9px] text-neutral-400">No img</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-neutral-900">{item.title}</p>
                    <p className="truncate text-[11px] text-neutral-400">/showcase/{item.slug}</p>
                  </div>
                </div>
              </td>
              <td className="hidden px-4 py-3 text-sm text-neutral-600 md:table-cell">{item.category}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleToggle(item.id)}
                  disabled={pending}
                  className={[
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold transition',
                    item.published
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200',
                  ].join(' ')}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${item.published ? 'bg-emerald-500' : 'bg-neutral-400'}`} />
                  {item.published ? 'Published' : 'Draft'}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1.5">
                  <Link
                    href={`/showcase/${item.slug}`}
                    target="_blank"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-900"
                    aria-label="Preview"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={item.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-900"
                    aria-label="Buka HTML"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <Link
                    href={`/admin/showcase/${item.id}/edit`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition hover:bg-blue-50 hover:text-blue-700"
                    aria-label="Edit"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    disabled={pending}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-rose-200 text-rose-500 transition hover:bg-rose-50 hover:text-rose-700 disabled:opacity-40"
                    aria-label="Hapus"
                  >
                    {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
