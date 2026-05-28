'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Plus, Search, X } from 'lucide-react';

export function ChecklistItem({ ready, label }: { ready: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium">
      <span className={`h-2 w-2 rounded-full ${ready ? 'bg-emerald-500' : 'bg-neutral-300'}`} />
      <span className={ready ? 'text-neutral-700' : 'text-neutral-400'}>{label}</span>
    </div>
  );
}

export function CategoryCombobox({
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
            ? 'border-[#ff8a00] ring-2 ring-[#fffcc9]'
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
          <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180 text-[#ff8a00]' : ''}`} />
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
                        ? 'bg-[#fffcc9] text-[#ff8a00]'
                        : 'text-neutral-700 hover:bg-neutral-50',
                    ].join(' ')}
                  >
                    <span className="truncate">{option}</span>
                    {selected && <Check className="h-3.5 w-3.5 text-[#ff8a00]" />}
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
