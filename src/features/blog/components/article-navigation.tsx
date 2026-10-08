import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type NavPost = { slug: string; title: string } | null;

export function ArticleNavigation({ prev, next }: { prev: NavPost; next: NavPost }) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Navigasi artikel" className="mt-10 grid gap-4 md:grid-cols-2">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col rounded-2xl border border-neutral-200 bg-white/90 p-5 transition-colors hover:border-brand-soft hover:bg-brand-tint/50"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand">
            <ArrowLeft className="h-3.5 w-3.5" /> Sebelumnya
          </span>
          <span className="mt-2 line-clamp-2 text-base font-semibold text-neutral-900 group-hover:text-brand">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="hidden md:block" />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col items-end rounded-2xl border border-neutral-200 bg-white/90 p-5 text-right transition-colors hover:border-brand-soft hover:bg-brand-tint/50"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand">
            Selanjutnya <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="mt-2 line-clamp-2 text-base font-semibold text-neutral-900 group-hover:text-brand">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="hidden md:block" />
      )}
    </nav>
  );
}
