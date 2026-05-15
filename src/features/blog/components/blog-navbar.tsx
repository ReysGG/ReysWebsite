'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MonitorSmartphone, Search, Menu, X, ArrowRight } from 'lucide-react';
import { Show, UserButton } from '@clerk/nextjs';

const NAV_LINKS = [
  { name: 'Beranda', href: '/' },
  { name: 'Layanan', href: '/#services' },
  { name: 'Portofolio', href: '/#portfolio' },
  { name: 'Harga', href: '/#pricing' },
];

const CATEGORIES = [
  'Semua',
  'Website Bisnis',
  'SEO',
  'Landing Page',
  'E-Commerce',
  'Company Profile',
  'UI/UX',
];

function BlogNavbarInner() {
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeCategory = searchParams.get('category') || 'Semua';


  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 w-full bg-white dark:bg-white border-b border-neutral-200">
        {/* Top bar */}
        <div className="flex h-14 items-center justify-between px-6 md:px-12 lg:px-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-neutral-900 dark:text-neutral-900"
          >
            <MonitorSmartphone className="h-5 w-5 text-indigo-600" />
            <span className="text-base font-bold tracking-tight">WebServices</span>
            <span className="ml-1 rounded bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
              Blog
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-600 dark:hover:text-neutral-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: search + CTA */}
          <div className="flex items-center gap-3">
            {/* Inline search — desktop only, always visible */}
            <form action="/blog" method="GET" className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
              <input
                name="q"
                placeholder="Cari artikel..."
                className="w-44 rounded-md border border-neutral-200 bg-neutral-50 py-1.5 pl-8 pr-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-indigo-400 focus:w-56 transition-all dark:bg-neutral-50 dark:text-neutral-900"
              />
            </form>

            <Show when="signed-in">
              <UserButton />
            </Show>

            <Link
              href="/#cta"
              className="hidden items-center gap-1.5 bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors sm:flex"
            >
              Konsultasi <ArrowRight className="h-3 w-3" />
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center text-neutral-600 hover:text-neutral-900 md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Category strip — desktop */}
        <div className="hidden h-10 items-center overflow-x-auto border-t border-neutral-100 px-6 md:flex md:px-12 lg:px-20">
          {CATEGORIES.map((cat, i) => {
            const href =
              cat === 'Semua' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`;
            const isActive =
              cat === activeCategory ||
              (cat === 'Semua' && !searchParams.get('category'));
            return (
              <Link
                key={cat}
                href={href}
                className={[
                  'relative shrink-0 px-4 h-full flex items-center text-sm font-medium transition-colors',
                  i > 0 ? 'border-l border-neutral-100' : '',
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-600 after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-indigo-600'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-900',
                ].join(' ')}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu */}
        <div
          className={[
            'absolute inset-x-0 top-14 bg-white dark:bg-white border-b border-neutral-200 transition-all duration-200 md:hidden',
            mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 overflow-hidden opacity-0',
          ].join(' ')}
        >
          <div className="flex flex-col px-6 py-4 gap-1">
            <form action="/blog" method="GET" className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
              <input
                name="q"
                placeholder="Cari artikel..."
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 py-2 pl-8 pr-3 text-sm outline-none focus:border-indigo-400"
              />
            </form>
            {[...NAV_LINKS, { name: 'Blog', href: '/blog' }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium text-neutral-700 hover:text-indigo-600"
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-2 flex flex-wrap gap-2 border-t border-neutral-100 pt-3">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={cat === 'Semua' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
                  className="text-xs font-medium text-neutral-600 hover:text-indigo-600"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer: h-14 top bar + h-10 category strip */}
      <div className="h-24" />
    </>
  );
}

export function BlogNavbar() {
  return (
    <Suspense fallback={<div className="h-24" />}>
      <BlogNavbarInner />
    </Suspense>
  );
}
