import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Artikel Tidak Ditemukan',
  robots: { index: false },
};

export default function BlogPostNotFound() {
  return (
    <main className="flex min-h-screen justify-center bg-white px-6 py-24 text-neutral-900 md:px-12 lg:px-20">
      <div className="flex w-full max-w-2xl flex-col items-center justify-center text-center">
        <p className="text-7xl font-black tracking-tight text-neutral-950 md:text-8xl">404</p>
        <h1 className="mt-6 text-2xl font-bold tracking-tight md:text-4xl">
          Artikel tidak ditemukan
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
          Artikel yang Anda cari mungkin sudah dihapus atau tidak pernah ada. Coba telusuri artikel lain di halaman blog kami.
        </p>
        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            <BookOpen className="h-4 w-4" />
            Kembali ke Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
