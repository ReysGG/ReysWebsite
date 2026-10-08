'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SupportChat } from '@/features/support/components/support-chat';

type FloatingConsultProps = {
  whatsappUrl: string;
  siteName?: string;
};

export function FloatingConsult({ whatsappUrl, siteName = 'Build With Reys' }: FloatingConsultProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  const isAdmin = pathname?.startsWith('/admin');
  const isAuthPage = pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up');

  useEffect(() => {
    if (isAdmin) return;
    const timer = setTimeout(() => setShouldShow(true), 1500);
    return () => clearTimeout(timer);
  }, [isAdmin]);

  if (isAdmin || isAuthPage) return null;

  const message = encodeURIComponent(
    `Halo ${siteName}, saya tertarik konsultasi pembuatan website. Boleh dibantu?`,
  );
  const target = !whatsappUrl
    ? null
    : whatsappUrl.includes('?')
      ? `${whatsappUrl}&text=${message}`
      : `${whatsappUrl}?text=${message}`;

  return (
    <div
      className={[
        'fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 transition-all duration-500',
        shouldShow ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 pointer-events-none',
      ].join(' ')}
    >
      {open && (
        <div className="w-[22rem] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 animate-[fadeUp_240ms_ease-out]">
          <div className="bg-gradient-to-br from-brand to-brand-cyan px-4 py-4 text-white">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-tint">Konsultasi Gratis</p>
                <h3 className="mt-1 text-base font-bold leading-tight">Halo, ada yang bisa kami bantu?</h3>
              </div>
              <button type="button"
                onClick={() => setOpen(false)}
                aria-label="Tutup"
                className="rounded-full bg-white/10 p-1 text-white transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <SupportChat whatsappTarget={target} />
        </div>
      )}

      <button type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Tutup konsultasi' : 'Buka konsultasi'}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-cyan to-brand text-white shadow-lg shadow-brand/30 transition hover:scale-105"
      >
        {!open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-30" />
        )}
        {open ? <X className="relative h-6 w-6" /> : <MessageCircle className="relative h-7 w-7" />}
      </button>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
