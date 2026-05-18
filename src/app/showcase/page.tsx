import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, MessageCircle } from "lucide-react";
import { getPublishedShowcaseItems } from "@/features/showcase/data";
import { ShowcaseGrid } from "@/features/showcase/components/showcase-grid";
import { SiteNavbar } from "@/components/ui/site-navbar";
import { Footer } from "@/components/ui/footer";
import { getSiteSettings } from "@/lib/site-settings";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Showcase | Build With Reys",
  description:
    "Koleksi prototipe website yang bisa kamu telusuri sebelum memulai project bersama kami.",
};

export default async function ShowcasePage() {
  const [settings, items] = await Promise.all([getSiteSettings(), getPublishedShowcaseItems()]);
  const whatsappUrl = settings.whatsapp;
  const categories = Array.from(new Set(items.map((item) => item.category)));

  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-gradient-to-b from-[#f7f7f8] via-white to-white text-neutral-950">
        <section className="relative overflow-hidden px-5 pb-12 pt-32 md:px-10 md:pt-36 lg:px-16">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/60 blur-[100px]" />
          <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-violet-100/60 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl">
            <Link
              href="/"
              className="mb-6 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-neutral-500 transition hover:text-blue-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali ke beranda
            </Link>

            <div className="grid gap-10 md:grid-cols-[1fr_320px] md:items-end">
              <div className="flex flex-col gap-4">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-blue-700 shadow-sm">
                  <Sparkles className="h-3 w-3" />
                  Live Prototype Library
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  Showcase{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    Prototipe
                  </span>
                </h1>
                <p className="max-w-2xl text-base leading-7 text-neutral-600 md:text-lg md:leading-8">
                  Telusuri preview desain interaktif sebelum memulai project. Setiap prototipe adalah representasi
                  visual dari produk; konten, link, dan form belum aktif.
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                    Statistik
                  </p>
                  <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-3xl font-bold tracking-tight text-neutral-900">{items.length}</p>
                    <p className="mt-1 text-xs text-neutral-500">Prototipe live</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold tracking-tight text-neutral-900">{categories.length}</p>
                    <p className="mt-1 text-xs text-neutral-500">Kategori</p>
                  </div>
                </div>
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-neutral-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Diskusi project serupa
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-12 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            {items.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-16 text-center">
                <p className="text-sm text-neutral-500">Belum ada showcase yang dipublikasikan.</p>
              </div>
            ) : (
              <ShowcaseGrid items={items} categories={categories} />
            )}
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-gradient-to-br from-blue-600 to-violet-700 px-5 py-16 md:px-10 lg:px-16">
          <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-widest text-blue-200">
                Punya project sendiri?
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                Mulai dari scope call singkat, kita rapikan prioritasnya.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100/90 md:text-base">
                Ceritakan kebutuhan bisnismu. Kami bantu susun scope, timeline, dan estimasi.
              </p>
            </div>
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-lg transition hover:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                Hubungi via WhatsApp
              </a>
            ) : (
              <Link
                href="/#cta"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-lg transition hover:scale-95"
              >
                Konsultasi Sekarang
              </Link>
            )}
          </div>
        </section>

        <Footer settings={settings} />
      </main>
    </>
  );
}
