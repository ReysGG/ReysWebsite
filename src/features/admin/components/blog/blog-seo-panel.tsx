export function BlogSeoPanel({ data }: { data?: { metaTitle?: string | null; metaDesc?: string | null; focusKeyword?: string | null; canonicalUrl?: string | null; ogImage?: string | null } }) {
  return (
    <section className="rounded-md border border-neutral-200 bg-white p-5">
      <h2 className="font-semibold text-neutral-900">SEO</h2>
      <div className="mt-4 space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700">SEO Title</span>
          <input name="metaTitle" defaultValue={data?.metaTitle || ""} className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8a00]/40 focus-visible:border-[#ffcd80]" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700">Meta Description</span>
          <textarea name="metaDesc" defaultValue={data?.metaDesc || ""} rows={4} className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8a00]/40 focus-visible:border-[#ffcd80]" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700">Focus Keyword</span>
          <input name="focusKeyword" defaultValue={data?.focusKeyword || ""} placeholder="Keyword utama artikel" className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8a00]/40 focus-visible:border-[#ffcd80]" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700">Canonical URL</span>
          <input name="canonicalUrl" defaultValue={data?.canonicalUrl || ""} placeholder="https://..." className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8a00]/40 focus-visible:border-[#ffcd80]" />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700">OG Image</span>
          <input name="ogImage" defaultValue={data?.ogImage || ""} placeholder="URL gambar Open Graph" className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8a00]/40 focus-visible:border-[#ffcd80]" />
        </label>
      </div>
    </section>
  );
}
