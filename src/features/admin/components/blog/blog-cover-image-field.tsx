export function BlogCoverImageField({ defaultValue = "", defaultOgImage = "" }: { defaultValue?: string | null; defaultOgImage?: string | null }) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-800">Cover Image URL</label>
        <input name="coverImage" defaultValue={defaultValue || ""} placeholder="https://images.unsplash.com/..." className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 dark:bg-white dark:text-neutral-900 dark:border-neutral-200" />
        <p className="text-xs text-neutral-400 dark:text-neutral-500">Gambar utama artikel di listing blog.</p>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-800">OG Image URL <span className="font-normal text-neutral-400 dark:text-neutral-500">(opsional)</span></label>
        <input name="ogImage" defaultValue={defaultOgImage || ""} placeholder="Sama dengan cover jika kosong" className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 dark:bg-white dark:text-neutral-900 dark:border-neutral-200" />
        <p className="text-xs text-neutral-400 dark:text-neutral-500">Gambar saat dibagikan di media sosial (1200x630).</p>
      </div>
    </div>
  );
}
