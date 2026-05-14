export function BlogSeoPanel({ data }: { data?: { metaTitle?: string | null; metaDesc?: string | null; focusKeyword?: string | null; canonicalUrl?: string | null; ogImage?: string | null } }) {
  return (
    <section className="rounded-md border border-neutral-200 bg-white dark:bg-white dark:border-neutral-200 p-5">
      <h2 className="font-semibold text-neutral-900 dark:text-neutral-900">SEO</h2>
      <div className="mt-4 space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-700">SEO Title</span>
          <input name="metaTitle" defaultValue={data?.metaTitle || ""} className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm dark:bg-white dark:text-neutral-900 dark:border-neutral-200" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-700">Meta Description</span>
          <textarea name="metaDesc" defaultValue={data?.metaDesc || ""} rows={4} className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm dark:bg-white dark:text-neutral-900 dark:border-neutral-200" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-700">Focus Keyword</span>
          <input name="focusKeyword" defaultValue={data?.focusKeyword || ""} placeholder="Keyword utama artikel" className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm dark:bg-white dark:text-neutral-900 dark:border-neutral-200" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-700">Canonical URL</span>
          <input name="canonicalUrl" defaultValue={data?.canonicalUrl || ""} placeholder="https://..." className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm dark:bg-white dark:text-neutral-900 dark:border-neutral-200" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-700">OG Image</span>
          <input name="ogImage" defaultValue={data?.ogImage || ""} placeholder="URL gambar Open Graph" className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm dark:bg-white dark:text-neutral-900 dark:border-neutral-200" />
        </label>
      </div>
    </section>
  );
}
