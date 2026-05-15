import Link from "next/link";
import { Tag } from "lucide-react";

export function ArticleTags({ tags }: { tags: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
        <Tag className="h-3.5 w-3.5" /> Tag
      </span>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/blog?tag=${encodeURIComponent(tag)}`}
          className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-700 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
