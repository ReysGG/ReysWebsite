'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Edit, ExternalLink, Eye, Loader2, Send, Trash2 } from 'lucide-react';
import { formatShowcaseTableDate, getShowcasePreviewHref } from '@/features/admin/lib/showcase-table';
import type { ShowcaseRow } from '@/features/admin/types/showcase-table';

type RowActionHandlers = {
  pending: boolean;
  activeId: string | null;
  onToggle: (id: string) => void;
  onDelete: (id: string, title: string) => void;
};

export function ShowcaseEmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
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
        <Link href="/admin/showcase/new" className="rounded-md bg-[#ff8a00] px-4 py-2 text-sm font-semibold text-white hover:bg-[#f4b738]">
          Showcase baru
        </Link>
      </div>
    </div>
  );
}

export function ShowcaseStatusBadge({ published }: { published: boolean }) {
  return (
    <span className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-bold ${published ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-500'}`}>
      {published ? 'Live' : 'Draft'}
    </span>
  );
}

export function ShowcaseThumbnail({ item, size }: { item: ShowcaseRow; size: 'mobile' | 'desktop' }) {
  return (
    <div className={size === 'mobile' ? 'relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-neutral-100' : 'relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-neutral-100'}>
      {item.thumbnail ? (
        <Image src={item.thumbnail} alt={item.title} fill sizes={size === 'mobile' ? '112px' : '96px'} className="object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center text-[10px] text-neutral-400">No image</div>
      )}
    </div>
  );
}

export function ShowcaseMobileCard({ item, pending, activeId, onToggle, onDelete }: { item: ShowcaseRow } & RowActionHandlers) {
  return (
    <article className="rounded-md border border-neutral-200 bg-white p-4 shadow-none">
      <div className="flex gap-3">
        <ShowcaseThumbnail item={item} size="mobile" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="line-clamp-2 text-sm font-bold text-neutral-900">{item.title}</h2>
              <p className="mt-1 truncate text-xs text-neutral-500">/showcase/{item.slug}</p>
            </div>
            <ShowcaseStatusBadge published={item.published} />
          </div>
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-500">{item.description}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-md bg-[#fffcc9] px-2 py-1 text-[11px] font-semibold text-[#ff8a00]">{item.category}</span>
        {item.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-md bg-neutral-100 px-2 py-1 text-[11px] text-neutral-600">{tag}</span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        <ActionLink href={getShowcasePreviewHref(item.slug)} label="Preview" icon={<Eye className="h-3.5 w-3.5" />} />
        <ActionAnchor href={item.htmlUrl} label="HTML" icon={<ExternalLink className="h-3.5 w-3.5" />} />
        <ActionLink href={`/admin/showcase/${item.id}/edit`} label="Edit" icon={<Edit className="h-3.5 w-3.5" />} />
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          disabled={pending && activeId === item.id}
          className="inline-flex h-9 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition hover:bg-neutral-50 disabled:opacity-50"
          aria-label={item.published ? 'Jadikan draft' : 'Publish'}
        >
          {pending && activeId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
        </button>
        <button
          type="button"
          onClick={() => onDelete(item.id, item.title)}
          disabled={pending && activeId === item.id}
          className="inline-flex h-9 items-center justify-center rounded-md border border-rose-200 text-rose-500 transition hover:bg-rose-50 disabled:opacity-50"
          aria-label="Hapus"
        >
          {pending && activeId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
        </button>
      </div>
    </article>
  );
}

export function ShowcaseDesktopRow({ item, pending, activeId, onToggle, onDelete }: { item: ShowcaseRow } & RowActionHandlers) {
  return (
    <tr className="transition hover:bg-neutral-50">
      <td className="px-4 py-4 align-top font-mono text-xs text-neutral-400">{item.order}</td>
      <td className="px-4 py-4">
        <div className="flex items-start gap-3">
          <ShowcaseThumbnail item={item} size="desktop" />
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
        <span className="rounded-md bg-[#fffcc9] px-2.5 py-1 text-xs font-semibold text-[#ff8a00]">{item.category}</span>
      </td>
      <td className="px-4 py-4 align-top">
        <button
          type="button"
          onClick={() => onToggle(item.id)}
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
      <td className="px-4 py-4 align-top text-xs text-neutral-500">{formatShowcaseTableDate(item.updatedAt)}</td>
      <td className="px-4 py-4 align-top">
        <div className="flex items-center justify-end gap-2">
          <ActionLink href={getShowcasePreviewHref(item.slug)} label="Preview" icon={<Eye className="h-3.5 w-3.5" />} />
          <ActionAnchor href={item.htmlUrl} label="HTML" icon={<ExternalLink className="h-3.5 w-3.5" />} />
          <ActionLink href={`/admin/showcase/${item.id}/edit`} label="Edit" icon={<Edit className="h-3.5 w-3.5" />} />
          <button
            type="button"
            onClick={() => onDelete(item.id, item.title)}
            disabled={pending && activeId === item.id}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-rose-200 px-3 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-50"
          >
            {pending && activeId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Hapus
          </button>
        </div>
      </td>
    </tr>
  );
}

function ActionLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <Link
      href={href}
      target={href.startsWith('/showcase') ? '_blank' : undefined}
      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-neutral-200 px-3 text-xs font-semibold text-neutral-700 transition hover:border-[#ffcd80] hover:bg-[#fffcc9] hover:text-[#ff8a00]"
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
      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-neutral-200 px-3 text-xs font-semibold text-neutral-700 transition hover:border-[#ffcd80] hover:bg-[#fffcc9] hover:text-[#ff8a00]"
      aria-label={label}
    >
      {icon}
      <span className="hidden xl:inline">{label}</span>
    </a>
  );
}
