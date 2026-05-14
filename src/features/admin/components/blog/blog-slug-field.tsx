"use client";

import { useEffect, useState } from "react";

const slugify = (v: string) => v.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

export function BlogSlugField({ defaultTitle = "", defaultSlug = "", error }: { defaultTitle?: string; defaultSlug?: string; error?: string }) {
  const [slug, setSlug] = useState(defaultSlug || slugify(defaultTitle));
  useEffect(() => {
    const title = document.querySelector<HTMLInputElement>('input[name="title"]');
    if (!title || defaultSlug) return;
    const onInput = () => setSlug(slugify(title.value));
    title.addEventListener("input", onInput);
    return () => title.removeEventListener("input", onInput);
  }, [defaultSlug]);
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-800">Slug</label>
      <input name="slug" value={slug} onChange={(e) => setSlug(slugify(e.target.value))} className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 dark:bg-white dark:text-neutral-900 dark:border-neutral-200" />
      <p className="text-xs text-neutral-500 dark:text-neutral-500">Preview: /blog/{slug || "judul-artikel"}</p>
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
