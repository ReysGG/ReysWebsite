import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Halaman Tidak Ditemukan',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen justify-center bg-white px-6 py-24 text-neutral-900 md:px-12 lg:px-20">
      <div className="flex w-full max-w-3xl flex-col items-center justify-center text-center">
        <p className="text-8xl font-black tracking-tight text-neutral-950 md:text-9xl">404</p>
        <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
          Maaf, halaman yang Anda cari tidak tersedia, sudah dipindahkan, atau alamat yang dimasukkan tidak tepat.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            <Home className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
          >
            <BookOpen className="h-4 w-4" />
            Lihat Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
