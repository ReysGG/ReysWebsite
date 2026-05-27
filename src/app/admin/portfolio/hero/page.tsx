import Link from "next/link";
import { ArrowLeft, ExternalLink, Info, Sparkles } from 'lucide-react';
import { PortfolioIntroForm } from "@/features/admin/components/portfolio/portfolio-intro-form";
import { getPortfolioIntro } from "@/lib/portfolio-config";

export default async function ManagePortfolioIntroPage() {
  const intro = await getPortfolioIntro();

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Portfolio Intro</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Edit Intro Portfolio</h1>
            <p className="mt-1 text-sm text-neutral-500">Atur copy pembuka section portfolio dari data real SiteConfig.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/portfolio" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
              <ArrowLeft size={16} />
              Kembali
            </Link>
            <Link href="/#portfolio" target="_blank" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
              <ExternalLink size={16} />
              Preview Website
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_440px]">
        <PortfolioIntroForm intro={intro} />

        <aside className="space-y-4">
          <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Preview Intro</p>
                <h2 className="mt-2 text-lg font-bold text-neutral-900">Tampilan di landing page</h2>
              </div>
              <span className="rounded-md bg-[#fffcc9] px-2.5 py-1 text-xs font-semibold text-[#ff8a00]">Real data</span>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-neutral-200 bg-[#fffcc9] p-6">
              <div className="rounded-2xl border border-white/70 bg-white/70 p-6 backdrop-blur">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#ff8a00]">{intro.eyebrow}</p>
                <h3 className="text-3xl font-bold tracking-tight text-neutral-900">{intro.heading}</h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{intro.description}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#ff8a00]">
                  <Sparkles size={15} />
                  {intro.featuredLabel}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-amber-200 bg-amber-50 p-5">
            <div className="flex gap-3">
              <Info className="mt-0.5 shrink-0 text-amber-600" size={18} />
              <div>
                <p className="text-sm font-bold text-amber-900">Data tersimpan real</p>
                <p className="mt-1 text-xs leading-relaxed text-amber-800">Intro portfolio disimpan di tabel SiteConfig dengan key portfolio-intro dan dipakai oleh landing page.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
