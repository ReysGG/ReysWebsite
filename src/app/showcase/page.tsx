import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Grid3X3, MessageCircle, MonitorSmartphone } from "lucide-react";
import { getPublishedShowcaseItems } from "@/features/showcase/data";
import { ShowcaseGrid } from "@/features/showcase/components/showcase-grid";
import { SiteNavbar } from "@/components/ui/site-navbar";
import { Footer } from "@/components/ui/footer";
import { getSiteSettings } from "@/lib/site-settings";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Showcase | Build With Reys",
  description:
    "Koleksi prototipe website yang bisa kamu telusuri sebelum memulai project bersama kami.",
};

export default async function ShowcasePage() {
  const [settings, items] = await Promise.all([getSiteSettings(), getPublishedShowcaseItems()]);
  const whatsappUrl = settings.whatsapp;
  const categories = Array.from(new Set(items.map((item) => item.category)));
  const featuredItems = items.slice(0, 3);
  const tagCount = new Set(items.flatMap((item) => item.tags)).size;

  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-[#f8fafc] text-slate-950">
        <section className="border-b border-slate-200 bg-white px-5 pb-10 pt-28 md:px-10 md:pt-32 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="mb-7 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-indigo-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali ke beranda
            </Link>

            <div className="flex flex-col gap-8">
              <div className="max-w-4xl">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[11px] font-bold uppercase text-indigo-700">
                  <MonitorSmartphone className="h-3.5 w-3.5" />
                  Live Prototype Library
                </div>
                <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-6xl">
                  Telusuri prototype website sebelum masuk tahap build.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                  Pilih contoh tampilan yang paling dekat dengan kebutuhanmu. Setiap showcase bisa dibuka sebagai
                  preview interaktif untuk mengecek layout, flow, dan rasa visualnya.
                </p>
              </div>

              <div className="grid gap-3 border-y border-slate-200 py-5 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-white">
                    <Grid3X3 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-slate-950">{items.length}</p>
                    <p className="text-xs font-semibold text-slate-500">Prototype live</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-600 text-white">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-slate-950">{categories.length}</p>
                    <p className="text-xs font-semibold text-slate-500">Kategori project</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-600 text-white">
                    <MonitorSmartphone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-slate-950">{tagCount}</p>
                    <p className="text-xs font-semibold text-slate-500">Tag fitur</p>
                  </div>
                </div>
              </div>

              {featuredItems.length > 0 && (
                <div className="grid gap-4 md:grid-cols-3">
                  {featuredItems.map((item, index) => (
                    <Link
                      key={item.slug}
                      href={`/showcase/${item.slug}`}
                      className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-slate-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-white/15 bg-slate-950/70 px-3 py-2 backdrop-blur">
                          <span className="h-2 w-2 rounded-full bg-red-400" />
                          <span className="h-2 w-2 rounded-full bg-amber-300" />
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          <span className="ml-2 truncate text-[10px] font-semibold text-white/75">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3 p-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-950">{item.title}</p>
                          <p className="mt-1 text-xs font-medium text-slate-500">Preview #{index + 1}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Diskusi project serupa
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 md:px-10 md:py-16 lg:px-16">
          <div className="mx-auto max-w-7xl">
            {items.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
                <p className="text-sm text-slate-500">Belum ada showcase yang dipublikasikan.</p>
              </div>
            ) : (
              <ShowcaseGrid items={items} categories={categories} />
            )}
          </div>
        </section>

        <section className="border-t border-slate-800 bg-slate-950 px-5 py-16 text-white md:px-10 lg:px-16">
          <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase text-emerald-300">
                Punya project sendiri?
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                Mulai dari scope call singkat, kita rapikan prioritasnya.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300 md:text-base">
                Ceritakan kebutuhan bisnismu. Kami bantu susun scope, timeline, dan estimasi.
              </p>
            </div>
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-100"
              >
                <MessageCircle className="h-4 w-4" />
                Hubungi via WhatsApp
              </a>
            ) : (
              <Link
                href="/#cta"
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-100"
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
