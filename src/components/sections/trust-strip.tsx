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
    <section className="w-full border-y border-slate-200 bg-[#f2f4f6] py-14">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className={`grid gap-5 ${colClass}`}>
          {safeItems.map((point) => (
            <div key={point} className="rounded-lg border border-slate-200 bg-white p-6">
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
                <Check className="h-5 w-5" />
              </span>
              <p className="text-base font-bold leading-snug text-slate-950">{point}</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                {DESCRIPTIONS[point] ?? "Detail project dibuat jelas dan mudah dipantau"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
