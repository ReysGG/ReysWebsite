'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Info, Monitor, Smartphone, Tablet, X } from 'lucide-react';

type Viewport = 'desktop' | 'tablet' | 'mobile';

const VIEWPORT_WIDTHS: Record<Viewport, number | null> = {
  desktop: null,
  tablet: 820,
  mobile: 390,
};

const VIEWPORT_LABELS: Record<Viewport, string> = {
  desktop: 'Desktop',
  tablet: 'Tablet',
  mobile: 'Mobile',
};

type ShowcaseFrameProps = {
  slug: string;
  title: string;
  htmlPath: string;
  category?: string;
};

export function ShowcaseFrame({ slug, title, htmlPath, category }: ShowcaseFrameProps) {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [loaded, setLoaded] = useState(false);
  const [autoFitMobile, setAutoFitMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setAutoFitMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const handleViewportChange = (nextViewport: Viewport) => {
    if (nextViewport === viewport) return;
    setLoaded(false);
    setViewport(nextViewport);
  };

  const effectiveViewport: Viewport = autoFitMobile ? 'mobile' : viewport;
  const maxWidth = VIEWPORT_WIDTHS[effectiveViewport];
  const previewPath = `/showcase/${slug}/embed`;

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-slate-950 text-white">
      <header className="absolute inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="flex min-h-16 items-center justify-between gap-3 px-3 py-3 md:px-5">
          <div className="flex min-w-0 items-center gap-2">
            <Link
              href="/showcase"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Kembali ke showcase"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                {category && (
                  <span className="hidden rounded-md bg-emerald-400/10 px-2 py-1 text-[10px] font-bold uppercase text-emerald-300 sm:inline-flex">
                    {category}
                  </span>
                )}
                <p className="truncate text-sm font-bold text-white md:text-base">{title}</p>
              </div>
              <p className="mt-0.5 hidden text-xs font-medium text-slate-400 sm:block">
                Preview statis untuk review layout dan flow.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-1 rounded-md border border-white/10 bg-white/5 p-1 md:flex">
              {(Object.keys(VIEWPORT_WIDTHS) as Viewport[]).map((v) => {
                const Icon = v === 'desktop' ? Monitor : v === 'tablet' ? Tablet : Smartphone;
                const active = effectiveViewport === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleViewportChange(v)}
                    aria-label={`Tampilan ${VIEWPORT_LABELS[v]}`}
                    aria-pressed={active}
                    className={[
                      'inline-flex h-8 w-8 items-center justify-center rounded-md transition',
                      active ? 'bg-white text-slate-950' : 'text-slate-400 hover:bg-white/10 hover:text-white',
                    ].join(' ')}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
            <a
              href={previewPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-3 text-xs font-bold text-slate-950 transition hover:bg-emerald-100"
            >
              <span className="hidden sm:inline">Tab baru</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <div
        className={[
          'absolute inset-x-0 bottom-0 top-16 flex items-stretch justify-center p-2 transition-all duration-700 ease-out md:p-4',
          loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-[0.98]',
        ].join(' ')}
      >
        <div
          className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white shadow-2xl shadow-black/40"
          style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
        >
          <div className="hidden h-10 shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-3 md:flex">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="max-w-[50%] truncate rounded-md border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-500">
              {VIEWPORT_LABELS[effectiveViewport]} preview
            </div>
            <div className="text-[11px] font-semibold text-slate-400">
              {maxWidth ? `${maxWidth}px` : 'Responsive'}
            </div>
          </div>
          <div className="relative min-h-0 flex-1 bg-white">
            <iframe
              key={`${htmlPath}-${effectiveViewport}`}
              src={previewPath}
              title={title}
              loading="eager"
              sandbox="allow-forms allow-scripts allow-popups"
              onLoad={() => setLoaded(true)}
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>

      {!loaded && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-16 z-20 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-emerald-300" />
            <p className="text-xs font-semibold uppercase text-slate-400">
              Memuat prototype...
            </p>
          </div>
        </div>
      )}

      {bannerOpen && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 flex justify-center p-3 md:p-5">
          <div className="pointer-events-auto flex max-w-lg items-start gap-2.5 rounded-lg border border-amber-300/40 bg-amber-50/95 px-3.5 py-3 text-amber-950 shadow-lg shadow-black/15 backdrop-blur animate-[slideUp_500ms_ease-out_120ms_both]">
            <div className="mt-0.5 shrink-0 rounded-md bg-amber-200/70 p-1 text-amber-800">
              <Info className="h-3.5 w-3.5" />
            </div>
            <p className="flex-1 text-xs leading-relaxed">
              <span className="font-semibold">Prototipe statis.</span>{' '}
              <span className="text-amber-950/80">Konten, link, dan form belum aktif.</span>
            </p>
            <button
              type="button"
              onClick={() => setBannerOpen(false)}
              aria-label="Tutup"
              className="shrink-0 rounded-md p-1 text-amber-800 transition hover:bg-amber-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
