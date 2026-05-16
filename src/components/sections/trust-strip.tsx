import React from "react";
import { Check } from "lucide-react";
import type { SiteConfig } from "@/lib/site-config";

const DESCRIPTIONS: Record<string, string> = {
  "Scope jelas sebelum development": "Semua kebutuhan disepakati di awal",
  "Progress bisa dicek via staging link": "Pantau hasil secara real-time",
  "Mobile-first dan SEO-ready": "Optimasi performa & Google",
  "Handover akses penuh setelah launch": "Dokumentasi & pelatihan penggunaan",
};

const GRID_COLS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export const TrustStripSection = ({ items }: { items: SiteConfig["trustStrip"] }) => {
  const safeItems = Array.isArray(items) ? items.slice(0, 4) : [];

  if (safeItems.length === 0) return null;

  const colClass = GRID_COLS[safeItems.length] ?? "md:grid-cols-4";

  return (
    <section className="relative z-20 w-full bg-white pb-10">
      <div className="mx-auto -mt-8 w-full max-w-7xl px-6 md:px-12">
        <div className={`grid overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-[0_24px_80px_rgba(79,70,229,0.13)] ${colClass}`}>
          {safeItems.map((point) => (
            <div key={point} className="flex gap-4 border-b border-indigo-50 p-5 md:border-b-0 md:border-r md:last:border-r-0 lg:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
                <Check className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-black leading-snug text-neutral-950">{point}</p>
                <p className="mt-1.5 text-xs font-semibold leading-relaxed text-neutral-500">{DESCRIPTIONS[point] ?? "Detail project dibuat jelas dan mudah dipantau"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
