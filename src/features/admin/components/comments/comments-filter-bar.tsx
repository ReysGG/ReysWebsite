"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export function CommentsFilterBar({
  initialQuery,
  initialSlug,
  initialFilter,
}: {
  initialQuery: string;
  initialSlug: string;
  initialFilter: string;
}) {
  const [q, setQ] = useState(initialQuery);
  const [slug, setSlug] = useState(initialSlug);
  const [filter, setFilter] = useState(initialFilter);

  return (
    <form className="flex flex-col gap-3 border-b border-neutral-200 px-5 py-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <input
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari komentar..."
          className="w-full rounded-md border border-neutral-200 bg-white py-2 pl-9 pr-3 text-sm text-neutral-900 outline-none transition-colors focus:border-[#ff8a00] focus:ring-2 focus:ring-[#fffcc9]"
        />
      </div>
      <input
        name="slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Slug artikel..."
        className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-[#ff8a00] focus:ring-2 focus:ring-[#fffcc9] md:w-56"
      />
      <select
        name="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-[#ff8a00] focus:ring-2 focus:ring-[#fffcc9] md:w-44"
      >
        <option value="all">Semua</option>
        <option value="top">Top-level</option>
        <option value="reply">Replies</option>
      </select>
      <button
        type="submit"
        className="rounded-md bg-[#ff8a00] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#f4b738] active:bg-[#e07a00] active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]"
      >
        Filter
      </button>
    </form>
  );
}
