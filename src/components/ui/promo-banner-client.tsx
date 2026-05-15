"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { PromoBanner } from "@/lib/promo-banner";

const VARIANT_STYLES: Record<PromoBanner["variant"], string> = {
  indigo: "bg-indigo-600 text-white border-indigo-700/40",
  amber: "bg-amber-500 text-neutral-900 border-amber-600/40",
  emerald: "bg-emerald-600 text-white border-emerald-700/40",
  neutral: "bg-neutral-900 text-white border-neutral-950/40",
};

export function PromoBannerClient({ banner }: { banner: PromoBanner }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!banner.enabled || !banner.message) return;
    const frame = window.requestAnimationFrame(() => {
      try {
        const dismissed = window.localStorage.getItem("promo-banner-dismissed");
        if (dismissed !== banner.version) setVisible(true);
      } catch {
        setVisible(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [banner.enabled, banner.message, banner.version]);

  function handleDismiss() {
    try {
      window.localStorage.setItem("promo-banner-dismissed", banner.version);
    } catch {}
    setVisible(false);
  }

  if (!visible || !banner.enabled || !banner.message) return null;

  const cta =
    banner.ctaLabel && banner.ctaHref ? (
      <Link
        href={banner.ctaHref}
        className="ml-1 underline-offset-4 hover:underline"
      >
        {banner.ctaLabel}
      </Link>
    ) : null;

  return (
    <div
      role="region"
      aria-label="Pengumuman"
      className={`relative z-40 border-b text-sm ${VARIANT_STYLES[banner.variant]}`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 md:px-6">
        <p className="flex-1 text-center font-medium">
          {banner.message} {cta}
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Tutup pengumuman"
          className="shrink-0 rounded-full p-1 transition-colors hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
