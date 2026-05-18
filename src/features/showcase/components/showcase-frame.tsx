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

type ShowcaseFrameProps = {
  title: string;
  htmlPath: string;
  category?: string;
};

export function ShowcaseFrame({ title, htmlPath, category }: ShowcaseFrameProps) {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [loaded, setLoaded] = useState(false);
  const [autoFitMobile, setAutoFitMobile] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [htmlPath, viewport]);

  useEffect(() => {
    const checkSize = () => setAutoFitMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const effectiveViewport: Viewport = autoFitMobile ? 'mobile' : viewport;
  const maxWidth = VIEWPORT_WIDTHS[effectiveViewport];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-neutral-100">
      <div
        className={[
          'absolute inset-0 flex items-stretch justify-center bg-neutral-100 transition-all duration-700 ease-out',
          loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-[0.98]',
        ].join(' ')}
      >
        <div
          className="relative h-full w-full bg-white shadow-2xl shadow-neutral-900/10"
          style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
        >
          <iframe
            key={`${htmlPath}-${effectiveViewport}`}
            src={htmlPath}
            title={title}
            loading="eager"
            sandbox="allow-same-origin allow-forms allow-scripts allow-popups"
            onLoad={() => setLoaded(true)}
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>

      {!loaded && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-blue-600" />
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Memuat prototipe…
            </p>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex items-start justify-between gap-3 p-3 md:p-5">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-neutral-200/60 bg-white/95 px-2 py-1.5 shadow-lg shadow-neutral-900/5 backdrop-blur animate-[slideDown_400ms_ease-out_both]">
          <Link
            href="/showcase"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Showcase</span>
          </Link>
          <span className="hidden h-4 w-px bg-neutral-200 sm:block" />
          <div className="hidden min-w-0 max-w-[240px] flex-col leading-tight sm:flex">
            {category && (
              <p className="truncate text-[9px] font-bold uppercase tracking-widest text-blue-600">
                {category}
              </p>
            )}
            <p className="truncate text-xs font-semibold text-neutral-900">{title}</p>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 animate-[slideDown_400ms_ease-out_both]" style={{ animationDelay: '80ms' }}>
          <div className="hidden items-center gap-0.5 rounded-full border border-neutral-200/60 bg-white/95 p-1 shadow-lg shadow-neutral-900/5 backdrop-blur md:flex">
            {(Object.keys(VIEWPORT_WIDTHS) as Viewport[]).map((v) => {
              const Icon = v === 'desktop' ? Monitor : v === 'tablet' ? Tablet : Smartphone;
              const active = viewport === v;
              return (
                <button
                  key={v}
                  onClick={() => setViewport(v)}
                  aria-label={`Tampilan ${v}`}
                  aria-pressed={active}
                  className={[
                    'inline-flex items-center justify-center rounded-full p-1.5 transition',
                    active ? 'bg-blue-600 text-white' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900',
                  ].join(' ')}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              );
            })}
          </div>
          <a
            href={htmlPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950 px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            <span className="hidden sm:inline">Tab baru</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {bannerOpen && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 flex justify-center p-3 md:p-5">
          <div className="pointer-events-auto flex max-w-md items-start gap-2.5 rounded-full border border-amber-200/70 bg-amber-50/95 px-3.5 py-2 shadow-lg shadow-amber-900/10 backdrop-blur animate-[slideUp_500ms_ease-out_120ms_both]">
            <div className="mt-0.5 shrink-0 rounded-full bg-amber-200/70 p-1 text-amber-700">
              <Info className="h-3 w-3" />
            </div>
            <p className="flex-1 text-[11px] leading-relaxed text-amber-900 sm:text-xs">
              <span className="font-semibold">Prototipe statis.</span>{' '}
              <span className="text-amber-900/80">Konten, link, dan form belum aktif.</span>
            </p>
            <button
              onClick={() => setBannerOpen(false)}
              aria-label="Tutup"
              className="shrink-0 rounded-full p-0.5 text-amber-700 transition hover:bg-amber-100"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
