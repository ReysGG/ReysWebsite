'use client';

import { useActionState, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  ExternalLink,
  FileCode2,
  ImageIcon,
  Loader2,
  Plus,
  Save,
  Search,
  Upload,
  X,
} from 'lucide-react';
import {
  createShowcase,
  updateShowcase,
  type ShowcaseActionState,
} from '@/features/admin/actions/showcase-actions';

type Mode = 'create' | 'edit';
type HtmlSourceMode = 'upload' | 'editor';

export type ShowcaseFormData = {
  id?: string;
  slug?: string;
  title?: string;
  description?: string;
  category?: string;
  htmlUrl?: string;
  thumbnail?: string;
  tags?: string[];
  published?: boolean;
  order?: number;
};

export type ShowcaseFormOptions = {
  categories: string[];
  nextOrder: number;
};

const initialState: ShowcaseActionState = {};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function parseTags(value: string) {
  return Array.from(new Set(value.split(',').map((tag) => tag.trim()).filter(Boolean))).slice(0, 10);
}

function looksLikeHtmlClient(content: string) {
  const head = content.slice(0, 2000).toLowerCase();
  return head.includes('<!doctype html') || /<html[\s>]/.test(head) || /<body[\s>]/.test(head);
}

export function ShowcaseForm({ mode, defaultValue, options }: { mode: Mode; defaultValue?: ShowcaseFormData; options?: ShowcaseFormOptions }) {
  const router = useRouter();
  const action = mode === 'edit' && defaultValue?.id
    ? updateShowcase.bind(null, defaultValue.id)
    : createShowcase;

  const [state, formAction, pending] = useActionState(action, initialState);
  const [title, setTitle] = useState(defaultValue?.title ?? '');
  const [description, setDescription] = useState(defaultValue?.description ?? '');
  const categoryOptions = useMemo(() => Array.from(new Set([...(options?.categories ?? []), 'Company Profile', 'Landing Page', 'Dashboard', 'E-Commerce', 'Portfolio', 'Blog'].filter(Boolean))).sort((a, b) => a.localeCompare(b)), [options?.categories]);
  const [category, setCategory] = useState(defaultValue?.category ?? '');
  const [tags, setTags] = useState(defaultValue?.tags?.join(', ') ?? '');
  const [slug, setSlug] = useState(defaultValue?.slug ?? '');
  const [slugManual, setSlugManual] = useState(mode === 'edit');
  const [htmlUrl, setHtmlUrl] = useState(defaultValue?.htmlUrl ?? '');
  const [htmlSourceMode, setHtmlSourceMode] = useState<HtmlSourceMode>('upload');
  const [htmlSource, setHtmlSource] = useState('');
  const [thumbnail, setThumbnail] = useState(defaultValue?.thumbnail ?? '');
  const [published, setPublished] = useState(defaultValue?.published ?? true);
  const [order, setOrder] = useState(mode === 'edit' && defaultValue?.order !== undefined ? String(defaultValue.order) : '');
  const [uploadingHtml, startHtmlUpload] = useTransition();
  const [uploadingThumb, startThumbUpload] = useTransition();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [htmlUploaded, setHtmlUploaded] = useState(false);
  const [thumbUploaded, setThumbUploaded] = useState(false);

  const effectiveSlug = slugManual ? slug : slugify(title);
  const tagList = useMemo(() => parseTags(tags), [tags]);
  const orderPreview = order.trim() || String(options?.nextOrder ?? 1);
  const editorHtmlLooksValid = useMemo(() => looksLikeHtmlClient(htmlSource), [htmlSource]);
  const editorHtmlReady = Boolean(htmlSource.trim() && editorHtmlLooksValid);
  const htmlReady = htmlSourceMode === 'editor' ? editorHtmlReady : Boolean(htmlUrl);
  const canSubmit = Boolean(title.trim().length >= 3 && description.trim().length >= 10 && category.trim() && htmlReady);

  const handleHtmlUpload = (file: File | null) => {
    if (!file) return;
    setUploadError(null);
    setHtmlUploaded(false);
    startHtmlUpload(async () => {
      const fd = new FormData();
      fd.append('file', file);
      if (effectiveSlug) fd.append('slug', effectiveSlug);
      const res = await fetch('/api/upload/showcase', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) {
        setUploadError(json.error ?? 'Upload gagal.');
        return;
      }
      setHtmlSourceMode('upload');
      setHtmlUrl(json.url);
      setHtmlUploaded(true);
    });
  };

  const handleThumbnailUpload = (file: File | null) => {
    if (!file) return;
    setUploadError(null);
    setThumbUploaded(false);
    startThumbUpload(async () => {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'showcase-thumb');
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) {
        setUploadError(json.error ?? 'Upload gambar gagal.');
        return;
      }
      setThumbnail(json.url);
      setThumbUploaded(true);
    });
  };

  return (
    <form action={formAction} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <input type="hidden" name="htmlUrl" value={htmlUrl} />
      <input type="hidden" name="htmlSourceMode" value={htmlSourceMode} />
      <input type="hidden" name="thumbnail" value={thumbnail} />
      <input type="hidden" name="slug" value={effectiveSlug} />

      <div className="space-y-5">
        <section className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
          <div className="mb-5">
            <h2 className="text-sm font-bold text-neutral-900">Informasi Dasar</h2>
            <p className="mt-1 text-xs text-neutral-500">Data ini akan muncul di card showcase publik.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Judul <span className="text-rose-500">*</span>
              </label>
              <input
                name="title"
                type="text"
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="PT Inovasi Kerja Digital"
                className="w-full rounded-md border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-neutral-500">
                <span>Slug URL</span>
                {!slugManual && (
                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
                    Auto
                  </span>
                )}
              </label>
              <div className="flex items-center gap-2">
                <span className="shrink-0 text-xs text-neutral-400">/showcase/</span>
                <input
                  type="text"
                  value={effectiveSlug}
                  onChange={(event) => {
                    setSlugManual(true);
                    setSlug(slugify(event.target.value));
                  }}
                  placeholder="nama-prototype"
                  className="min-w-0 flex-1 rounded-md border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
                {slugManual && (
                  <button
                    type="button"
                    onClick={() => {
                      setSlugManual(false);
                      setSlug('');
                    }}
                    className="shrink-0 text-[11px] font-semibold text-neutral-500 hover:text-indigo-600"
                  >
                    Reset
                  </button>
                )}
              </div>
              <p className="mt-1 text-[11px] text-neutral-400">Hanya huruf kecil, angka, dan tanda hubung.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Kategori <span className="text-rose-500">*</span>
                </label>
                <CategoryCombobox
                  value={category}
                  onChange={setCategory}
                  options={categoryOptions}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Tags <span className="font-normal normal-case text-neutral-400">(pisah koma)</span>
                </label>
                <input
                  name="tags"
                  type="text"
                  value={tags}
                  onChange={(event) => setTags(event.target.value)}
                  placeholder="Corporate, Light Mode, Material"
                  className="w-full rounded-md border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Deskripsi <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                rows={4}
                placeholder="Deskripsi singkat yang muncul di card showcase..."
                className="w-full resize-none rounded-md border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
        </section>

        <section className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
          <div className="mb-5 flex items-start gap-3">
            <span className="rounded-md bg-indigo-50 p-2 text-indigo-600">
              <FileCode2 className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-neutral-900">HTML Prototype</h2>
              <p className="mt-1 text-xs text-neutral-500">
                Upload file .html atau tulis langsung. Saat disimpan, backend membuat file HTML di storage.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="inline-flex rounded-md border border-neutral-200 bg-neutral-50 p-1">
              <button
                type="button"
                aria-pressed={htmlSourceMode === 'upload'}
                onClick={() => setHtmlSourceMode('upload')}
                className={[
                  'inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-bold transition',
                  htmlSourceMode === 'upload' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-500 hover:text-neutral-800',
                ].join(' ')}
              >
                <Upload className="h-3.5 w-3.5" />
                Upload
              </button>
              <button
                type="button"
                aria-pressed={htmlSourceMode === 'editor'}
                onClick={() => setHtmlSourceMode('editor')}
                className={[
                  'inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-bold transition',
                  htmlSourceMode === 'editor' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-500 hover:text-neutral-800',
                ].join(' ')}
              >
                <Code2 className="h-3.5 w-3.5" />
                Editor
              </button>
            </div>

            {htmlSourceMode === 'upload' ? (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <label className={[
                    'inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-xs font-semibold transition',
                    htmlUrl
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
                    uploadingHtml ? 'pointer-events-none opacity-60' : '',
                  ].join(' ')}
                  >
                    {uploadingHtml
                      ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      : htmlUrl
                        ? <CheckCircle2 className="h-3.5 w-3.5" />
                        : <Upload className="h-3.5 w-3.5" />}
                    {uploadingHtml ? 'Mengupload...' : htmlUrl ? 'Ganti file HTML' : 'Upload .html'}
                    <input
                      type="file"
                      accept=".html,text/html"
                      onChange={(event) => handleHtmlUpload(event.target.files?.[0] ?? null)}
                      disabled={uploadingHtml}
                      className="hidden"
                    />
                  </label>
                  {htmlUrl && (
                    <a
                      href={htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-indigo-700"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Buka file
                    </a>
                  )}
                  {htmlUploaded && <span className="text-xs font-semibold text-emerald-600">Upload berhasil</span>}
                </div>
                <input
                  type="text"
                  value={htmlUrl}
                  onChange={(event) => {
                    setHtmlUrl(event.target.value);
                    setHtmlUploaded(false);
                  }}
                  placeholder="https://... atau /showcase/nama.html"
                  className="w-full rounded-md border border-neutral-200 px-3 py-2.5 text-xs outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  name="htmlSource"
                  value={htmlSource}
                  onChange={(event) => setHtmlSource(event.target.value)}
                  rows={16}
                  spellCheck={false}
                  placeholder={'<!doctype html>\n<html>\n  <head>\n    <title>Prototype</title>\n  </head>\n  <body>\n    ...\n  </body>\n</html>'}
                  className="min-h-72 w-full resize-y rounded-md border border-neutral-200 bg-neutral-950 px-3 py-3 font-mono text-xs leading-5 text-neutral-100 outline-none transition placeholder:text-neutral-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
                {htmlSource.trim() ? (
                  <p className={editorHtmlLooksValid ? 'text-xs font-semibold text-emerald-600' : 'text-xs font-semibold text-amber-600'}>
                    {editorHtmlLooksValid
                      ? 'HTML siap disimpan sebagai file .html.'
                      : 'Tambahkan doctype, tag html, atau tag body supaya validasi backend lolos.'}
                  </p>
                ) : (
                  <p className="text-xs text-neutral-500">Konten editor akan diupload sebagai file .html saat form disimpan.</p>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
          <div className="mb-5 flex items-start gap-3">
            <span className="rounded-md bg-indigo-50 p-2 text-indigo-600">
              <ImageIcon className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-neutral-900">Thumbnail</h2>
              <p className="mt-1 text-xs text-neutral-500">Rasio 16:10 atau 4:3 paling aman untuk card showcase.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 sm:w-44">
              {thumbnail ? (
                <Image src={thumbnail} alt="Thumbnail" fill sizes="176px" className="object-cover object-top" />
              ) : (
                <div className="flex h-full items-center justify-center text-[10px] text-neutral-400">No image</div>
              )}
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <label className={[
                'inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-xs font-semibold transition',
                thumbnail
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  : 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
                uploadingThumb ? 'pointer-events-none opacity-60' : '',
              ].join(' ')}>
                {uploadingThumb ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                {uploadingThumb ? 'Mengupload...' : thumbnail ? 'Ganti gambar' : 'Upload gambar'}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(event) => handleThumbnailUpload(event.target.files?.[0] ?? null)}
                  disabled={uploadingThumb}
                  className="hidden"
                />
              </label>
              {thumbUploaded && <span className="ml-2 text-xs font-semibold text-emerald-600">Upload berhasil</span>}
              <input
                type="text"
                value={thumbnail}
                onChange={(event) => {
                  setThumbnail(event.target.value);
                  setThumbUploaded(false);
                }}
                placeholder="atau tempel URL gambar"
                className="w-full rounded-md border border-neutral-200 px-3 py-2.5 text-xs outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
        </section>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <section className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-none">
          <div className="border-b border-neutral-200 px-4 py-3">
            <h2 className="text-sm font-bold text-neutral-900">Preview Card</h2>
            <p className="mt-1 text-xs text-neutral-500">Gambaran item saat muncul di library publik.</p>
          </div>
          <div className="p-4">
            <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
              <div className="relative aspect-[16/10] bg-neutral-100">
                {thumbnail ? (
                  <Image src={thumbnail} alt={title || 'Showcase preview'} fill sizes="320px" className="object-cover object-top" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs font-semibold text-neutral-400">
                    Thumbnail preview
                  </div>
                )}
                <div className="absolute bottom-3 left-3 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase text-indigo-700 shadow-sm">
                  {category || 'Kategori'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 text-base font-bold text-neutral-950">{title || 'Judul showcase'}</h3>
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-neutral-500">
                  {description || 'Deskripsi singkat prototype akan muncul di sini.'}
                </p>
                {tagList.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {tagList.slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded-md bg-neutral-100 px-2 py-1 text-[11px] text-neutral-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
          <h2 className="text-sm font-bold text-neutral-900">Pengaturan Publish</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Order
              </label>
              <input
                name="order"
                type="number"
                value={order}
                onChange={(event) => setOrder(event.target.value)}
                placeholder={String(options?.nextOrder ?? 1)}
                className="w-full rounded-md border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              <p className="mt-1 text-[11px] text-neutral-400">
                Kosongkan untuk auto order berikutnya ({orderPreview}). Angka kecil tampil duluan.
              </p>
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-md border border-neutral-200 px-3 py-2.5 transition hover:bg-neutral-50">
              <input
                type="checkbox"
                name="published"
                checked={published}
                onChange={(event) => setPublished(event.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <p className="text-sm font-semibold text-neutral-900">Publish ke /showcase</p>
                <p className="text-[11px] text-neutral-500">Nonaktifkan jika masih draft.</p>
              </div>
            </label>

            <div className="space-y-2 rounded-md bg-neutral-50 p-3">
              <ChecklistItem ready={Boolean(title.trim().length >= 3)} label="Judul minimal 3 karakter" />
              <ChecklistItem ready={Boolean(description.trim().length >= 10)} label="Deskripsi minimal 10 karakter" />
              <ChecklistItem ready={Boolean(category.trim())} label="Kategori terisi" />
              <ChecklistItem ready={htmlReady} label="HTML prototype tersedia" />
            </div>
          </div>
        </section>

        {(state.error || uploadError) && (
          <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {state.error || uploadError}
          </div>
        )}

        <section className="rounded-md border border-neutral-200 bg-white p-4 shadow-none">
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={pending || uploadingHtml || uploadingThumb || !canSubmit}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {mode === 'edit' ? 'Simpan perubahan' : 'Buat showcase'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/showcase')}
              className="rounded-md border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
            >
              Batal
            </button>
          </div>
          {!htmlReady && (
            <p className="mt-3 text-xs font-semibold text-amber-600">
              {htmlSourceMode === 'editor' ? 'Isi HTML editor dulu sebelum menyimpan.' : 'Upload file HTML dulu sebelum menyimpan.'}
            </p>
          )}
        </section>
      </aside>
    </form>
  );
}

function ChecklistItem({ ready, label }: { ready: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium">
      <span className={`h-2 w-2 rounded-full ${ready ? 'bg-emerald-500' : 'bg-neutral-300'}`} />
      <span className={ready ? 'text-neutral-700' : 'text-neutral-400'}>{label}</span>
    </div>
  );
}

function CategoryCombobox({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const trimmedQuery = query.trim();
  const filtered = useMemo(() => {
    const needle = trimmedQuery.toLowerCase();
    if (!needle) return options;
    return options.filter((option) => option.toLowerCase().includes(needle));
  }, [options, trimmedQuery]);

  const exactMatch = useMemo(
    () =>
      options.some((option) => option.toLowerCase() === trimmedQuery.toLowerCase()) ||
      value.toLowerCase() === trimmedQuery.toLowerCase(),
    [options, trimmedQuery, value],
  );

  const showCreateOption = trimmedQuery.length > 0 && !exactMatch;

  const commit = (next: string) => {
    onChange(next);
    setQuery('');
    setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (filtered.length > 0) {
        commit(filtered[0]);
      } else if (trimmedQuery) {
        commit(trimmedQuery);
      }
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      setQuery('');
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name="category" value={value} />
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className={[
          'flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2.5 text-left text-sm outline-none transition',
          open
            ? 'border-indigo-500 ring-2 ring-indigo-100'
            : 'border-neutral-200 hover:border-neutral-300',
          value ? 'text-neutral-900' : 'text-neutral-400',
        ].join(' ')}
      >
        <span className="truncate">{value || 'Pilih atau ketik kategori baru'}</span>
        <span className="flex shrink-0 items-center gap-1 text-neutral-400">
          {value && (
            <span
              role="button"
              tabIndex={-1}
              onClick={(event) => {
                event.stopPropagation();
                onChange('');
                setQuery('');
              }}
              className="rounded p-0.5 hover:bg-neutral-100 hover:text-neutral-700"
              aria-label="Hapus kategori"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
          <ChevronDown
            className={`h-4 w-4 transition ${open ? 'rotate-180 text-indigo-500' : ''}`}
          />
        </span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg">
          <div className="relative border-b border-neutral-100">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Cari atau ketik kategori baru..."
              className="w-full bg-transparent py-2.5 pl-9 pr-3 text-sm outline-none"
            />
          </div>

          <ul className="max-h-60 overflow-y-auto py-1 text-sm">
            {filtered.length === 0 && !showCreateOption && (
              <li className="px-3 py-2 text-xs text-neutral-400">Tidak ada kategori yang cocok.</li>
            )}
            {filtered.map((option) => {
              const selected = option === value;
              return (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => commit(option)}
                    className={[
                      'flex w-full items-center justify-between gap-2 px-3 py-2 text-left transition',
                      selected
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-neutral-700 hover:bg-neutral-50',
                    ].join(' ')}
                  >
                    <span className="truncate">{option}</span>
                    {selected && <Check className="h-3.5 w-3.5 text-indigo-500" />}
                  </button>
                </li>
              );
            })}
            {showCreateOption && (
              <li>
                <button
                  type="button"
                  onClick={() => commit(trimmedQuery)}
                  className="flex w-full items-center gap-2 border-t border-neutral-100 bg-emerald-50/50 px-3 py-2 text-left font-semibold text-emerald-700 hover:bg-emerald-50"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span className="truncate">
                    Buat kategori baru: <span className="text-emerald-900">&quot;{trimmedQuery}&quot;</span>
                  </span>
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
