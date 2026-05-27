'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

type FloatingConsultProps = {
  whatsappUrl: string;
  siteName?: string;
};

export function FloatingConsult({ whatsappUrl, siteName = 'Build With Reys' }: FloatingConsultProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;
    const timer = setTimeout(() => setShouldShow(true), 1500);
    return () => clearTimeout(timer);
  }, [isAdmin]);

  if (isAdmin) return null;
  if (!whatsappUrl) return null;

  const message = encodeURIComponent(
    `Halo ${siteName}, saya tertarik konsultasi pembuatan website. Boleh dibantu?`,
  );
  const target = whatsappUrl.includes('?')
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
        <div className="w-72 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 animate-[fadeUp_240ms_ease-out]">
          <div className="bg-gradient-to-br from-[#ff8a00] to-[#f4b738] px-4 py-4 text-white">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#fffcc9]">Konsultasi Gratis</p>
                <h3 className="mt-1 text-base font-bold leading-tight">Halo, ada yang bisa kami bantu?</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Tutup"
                className="rounded-full bg-white/10 p-1 text-white transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="px-4 py-4">
            <p className="text-sm leading-6 text-neutral-700">
              Ceritakan kebutuhan website atau sistem digital kamu, kami bantu susun scope, timeline, dan estimasi.
            </p>
            <a
              href={target}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1ebe5d]"
            >
              <MessageCircle className="h-4 w-4" />
              Chat WhatsApp Sekarang
            </a>
            <p className="mt-2 text-center text-[11px] text-neutral-400">Respon di jam kerja, gratis tanpa komitmen.</p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Tutup konsultasi' : 'Buka konsultasi'}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105 hover:bg-[#1ebe5d]"
      >
        {!open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
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
