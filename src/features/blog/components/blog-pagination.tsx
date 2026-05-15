import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function getVisiblePages(page: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, page, page - 1, page + 1]);
  return Array.from(pages)
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((a, b) => a - b);
}

export function BlogPagination({
  page,
  totalPages,
  query,
}: {
  page: number;
  totalPages: number;
  query: Record<string, string>;
}) {
  if (totalPages <= 1) return null;

  const href = (nextPage: number) => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    if (nextPage > 1) params.set("page", String(nextPage));

    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  const visiblePages = getVisiblePages(page, totalPages);
  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  return (
    <nav aria-label="Navigasi halaman blog" className="mt-10 flex justify-center">
      <div className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white/80 p-1 text-sm shadow-none backdrop-blur">
        <Link
          aria-disabled={!canGoPrevious}
          href={href(Math.max(1, page - 1))}
          className={cn(
            "inline-flex h-9 items-center gap-1.5 rounded-full px-3 font-semibold text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900",
            !canGoPrevious && "pointer-events-none text-neutral-300"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </Link>

        <div className="flex items-center gap-1 px-1">
          {visiblePages.map((item, index) => {
            const previous = visiblePages[index - 1];
            const showGap = previous !== undefined && item - previous > 1;
            const isActive = item === page;

            return (
              <div key={item} className="flex items-center gap-1">
                {showGap ? <span className="px-1 text-neutral-300">…</span> : null}
                <Link
                  href={href(item)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex h-9 min-w-9 items-center justify-center rounded-full px-3 font-semibold transition-colors",
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-neutral-500 hover:bg-indigo-50 hover:text-indigo-700"
                  )}
                >
                  {item}
                </Link>
              </div>
            );
          })}
        </div>

        <Link
          aria-disabled={!canGoNext}
          href={href(Math.min(totalPages, page + 1))}
          className={cn(
            "inline-flex h-9 items-center gap-1.5 rounded-full px-3 font-semibold text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900",
            !canGoNext && "pointer-events-none text-neutral-300"
          )}
        >
          <span className="hidden sm:inline">Berikutnya</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  );
}
