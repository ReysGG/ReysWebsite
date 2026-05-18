'use client';

import { useActionState, useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, Upload, Save, ExternalLink, ArrowLeft, CheckCircle2 } from 'lucide-react';
import {
  createShowcase,
  updateShowcase,
  type ShowcaseActionState,
} from '@/features/admin/actions/showcase-actions';

type Mode = 'create' | 'edit';

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

export function ShowcaseForm({ mode, defaultValue }: { mode: Mode; defaultValue?: ShowcaseFormData }) {
  const router = useRouter();
  const action = mode === 'edit' && defaultValue?.id
    ? updateShowcase.bind(null, defaultValue.id)
    : createShowcase;

  const [state, formAction, pending] = useActionState(action, initialState);

  const [title, setTitle] = useState(defaultValue?.title ?? '');
  const [slug, setSlug] = useState(defaultValue?.slug ?? '');
  const [slugManual, setSlugManual] = useState(mode === 'edit');
  const [htmlUrl, setHtmlUrl] = useState(defaultValue?.htmlUrl ?? '');
  const [thumbnail, setThumbnail] = useState(defaultValue?.thumbnail ?? '');
  const [uploadingHtml, startHtmlUpload] = useTransition();
  const [uploadingThumb, startThumbUpload] = useTransition();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [htmlUploaded, setHtmlUploaded] = useState(false);

  useEffect(() => {
    if (!slugManual && title) {
      setSlug(slugify(title));
    }
  }, [title, slugManual]);

  const handleHtmlUpload = (file: File | null) => {
    if (!file) return;
    setUploadError(null);
    setHtmlUploaded(false);
    startHtmlUpload(async () => {
      const fd = new FormData();
      fd.append('file', file);
      if (slug) fd.append('slug', slug);
      const res = await fetch('/api/upload/showcase', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) {
        setUploadError(json.error ?? 'Upload gagal.');
        return;
      }
      setHtmlUrl(json.url);
      setHtmlUploaded(true);
    });
  };

  const handleThumbnailUpload = (file: File | null) => {
    if (!file) return;
    setUploadError(null);
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
    });
  };

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="htmlUrl" value={htmlUrl} />
      <input type="hidden" name="thumbnail" value={thumbnail} />
      <input type="hidden" name="slug" value={slug} />

      {/* Basic info */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-bold text-neutral-900">Informasi Dasar</h3>
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
              onChange={(e) => setTitle(e.target.value)}
              placeholder="PT Inovasi Kerja Digital"
              className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-neutral-500">
              <span>Slug (URL)</span>
              {!slugManual && (
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                  Auto dari judul
                </span>
              )}
            </label>
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-xs text-neutral-400">/showcase/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlugManual(true);
                  setSlug(slugify(e.target.value));
                }}
                placeholder="nama-prototype"
                className="flex-1 rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              {slugManual && (
                <button
                  type="button"
                  onClick={() => { setSlugManual(false); setSlug(slugify(title)); }}
                  className="shrink-0 text-[11px] font-semibold text-neutral-500 hover:text-blue-600"
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
              <input
                name="category"
                type="text"
                required
                defaultValue={defaultValue?.category}
                placeholder="Company Profile"
                list="category-suggestions"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <datalist id="category-suggestions">
                <option value="Company Profile" />
                <option value="Landing Page" />
                <option value="Dashboard" />
                <option value="E-Commerce" />
                <option value="Portfolio" />
                <option value="Blog" />
              </datalist>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Tags <span className="text-neutral-400 normal-case font-normal">(pisah koma)</span>
              </label>
              <input
                name="tags"
                type="text"
                defaultValue={defaultValue?.tags?.join(', ')}
                placeholder="Corporate, Light Mode, Material"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Deskripsi <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="description"
              defaultValue={defaultValue?.description}
              required
              rows={3}
              placeholder="Deskripsi singkat yang muncul di card showcase..."
              className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
          </div>
        </div>
      </div>

      {/* HTML file */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h3 className="mb-1 text-sm font-bold text-neutral-900">File HTML Prototipe</h3>
        <p className="mb-4 text-xs text-neutral-500">Upload file .html dari komputer, atau tempel URL langsung.</p>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <label className={[
              'inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition',
              htmlUrl
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                : 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100',
              uploadingHtml ? 'opacity-60 pointer-events-none' : '',
            ].join(' ')}>
              {uploadingHtml
                ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                : htmlUrl
                  ? <CheckCircle2 className="h-3.5 w-3.5" />
                  : <Upload className="h-3.5 w-3.5" />}
              {uploadingHtml ? 'Mengupload…' : htmlUrl ? 'Ganti file HTML' : 'Upload .html'}
              <input
                type="file"
                accept=".html,text/html"
                onChange={(e) => handleHtmlUpload(e.target.files?.[0] ?? null)}
                disabled={uploadingHtml}
                className="hidden"
              />
            </label>
            {htmlUrl && (
              <a
                href={htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-blue-700"
              >
                <ExternalLink className="h-3 w-3" />
                Buka file
              </a>
            )}
            {htmlUploaded && (
              <span className="text-xs font-semibold text-emerald-600">✓ Upload berhasil</span>
            )}
          </div>
          <input
            type="text"
            value={htmlUrl}
            onChange={(e) => { setHtmlUrl(e.target.value); setHtmlUploaded(false); }}
            placeholder="atau tempel URL: https://... atau /showcase/nama.html"
            className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
          <p className="text-[11px] text-neutral-400">Maks 2MB. Bisa upload dari komputer atau tempel URL eksternal/lokal.</p>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h3 className="mb-1 text-sm font-bold text-neutral-900">Thumbnail</h3>
        <p className="mb-4 text-xs text-neutral-500">Gambar yang muncul di card showcase. Rasio 4:3 ideal.</p>
        <div className="flex items-start gap-4">
          <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
            {thumbnail ? (
              <Image src={thumbnail} alt="Thumbnail" fill sizes="128px" className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-[10px] text-neutral-400">No image</div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <label className={[
              'inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition',
              thumbnail
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                : 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100',
              uploadingThumb ? 'opacity-60 pointer-events-none' : '',
            ].join(' ')}>
              {uploadingThumb ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
              {uploadingThumb ? 'Mengupload…' : thumbnail ? 'Ganti gambar' : 'Upload gambar'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => handleThumbnailUpload(e.target.files?.[0] ?? null)}
                disabled={uploadingThumb}
                className="hidden"
              />
            </label>
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="atau tempel URL gambar"
              className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-bold text-neutral-900">Pengaturan</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Order (urutan tampil)
            </label>
            <input
              name="order"
              type="number"
              defaultValue={defaultValue?.order ?? 0}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <p className="mt-1 text-[11px] text-neutral-400">Angka kecil tampil duluan.</p>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-neutral-500">Status</label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 px-3 py-2.5 transition hover:bg-neutral-50">
              <input
                type="checkbox"
                name="published"
                defaultChecked={defaultValue?.published ?? true}
                className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <p className="text-sm font-semibold text-neutral-900">Publish ke /showcase</p>
                <p className="text-[11px] text-neutral-500">Tampil di halaman publik</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {(state.error || uploadError) && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.error || uploadError}
        </div>
      )}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={pending || uploadingHtml || uploadingThumb || !htmlUrl}
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {mode === 'edit' ? 'Simpan perubahan' : 'Buat showcase'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/showcase')}
          className="rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
        >
          Batal
        </button>
        {!htmlUrl && (
          <p className="text-xs text-amber-600 font-semibold">Upload file HTML dulu sebelum menyimpan.</p>
        )}
      </div>
    </form>
  );
}
