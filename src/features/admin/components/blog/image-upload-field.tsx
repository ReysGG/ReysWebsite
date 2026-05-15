'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, Link, X, Loader2 } from 'lucide-react';

interface ImageUploadFieldProps {
  name: string;
  label: string;
  defaultValue?: string | null;
  hint?: string;
  folder?: string;
}

export function ImageUploadField({ name, label, defaultValue = '', hint, folder = 'blog' }: ImageUploadFieldProps) {
  const [value, setValue] = useState(defaultValue || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError('');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setValue(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-neutral-800">{label}</span>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700"
        >
          <Link size={12} />
          {showUrlInput ? 'Upload file' : 'Pakai URL'}
        </button>
      </div>

      <input type="hidden" name={name} value={value} />

      {showUrlInput ? (
        <input
          type="url"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        />
      ) : (
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative rounded-md border-2 border-dashed transition ${
            dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-neutral-200 bg-neutral-50'
          }`}
        >
          {value ? (
            <div className="relative">
              <div className="relative h-40 w-full overflow-hidden rounded-md">
                <Image src={value} alt="preview" fill unoptimized className="object-cover" />
              </div>
              <button
                type="button"
                onClick={() => setValue('')}
                className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-neutral-600 shadow hover:bg-red-50 hover:text-red-600"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex w-full flex-col items-center gap-2 py-8 text-neutral-400 hover:text-indigo-600 disabled:opacity-50"
            >
              {uploading ? <Loader2 size={24} className="animate-spin" /> : <Upload size={24} />}
              <span className="text-xs font-medium">
                {uploading ? 'Mengupload...' : 'Klik atau drag foto ke sini'}
              </span>
              <span className="text-xs text-neutral-400">JPG, PNG, WebP — maks 5MB</span>
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
        </div>
      )}

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      {hint && !error && <p className="text-xs text-neutral-400">{hint}</p>}
    </div>
  );
}
