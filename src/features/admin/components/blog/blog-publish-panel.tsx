import Link from "next/link";

function toDateTimeLocal(value?: Date | string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export function BlogPublishPanel({ published, featured, publishedAt, pending, isEdit, slug }: { published?: boolean; featured?: boolean; publishedAt?: Date | string | null; pending?: boolean; isEdit?: boolean; slug?: string | null }) {
  return (
    <section className="rounded-md border border-neutral-200 bg-white p-5">
      <h2 className="font-semibold text-neutral-900">Publish</h2>
      <div className="mt-4 space-y-4">
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" name="published" defaultChecked={published} className="h-4 w-4 rounded border-neutral-300 text-[#ff8a00]" /> Published
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" name="featured" defaultChecked={featured} className="h-4 w-4 rounded border-neutral-300 text-[#ff8a00]" /> Featured post
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700">Published at</span>
          <input type="datetime-local" name="publishedAt" defaultValue={toDateTimeLocal(publishedAt)} className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8a00]/40 focus-visible:border-[#ffcd80]" />
          <span className="text-xs text-neutral-500">Kosongkan jika belum dijadwalkan/diterbitkan.</span>
        </label>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="submit" disabled={pending} className="flex-1 rounded-md bg-[#ff8a00] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#f4b738] disabled:opacity-60 active:bg-[#e07a00] active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]">
          {pending ? "Menyimpan..." : isEdit ? "Simpan" : "Terbitkan"}
        </button>
        <Link href="/admin/blog" className="rounded-md border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]">Batal</Link>
        {slug && (
          <a href={`/blog/${slug}`} target="_blank" rel="noopener noreferrer"
            className="rounded-md border border-neutral-200 px-3 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 inline-flex items-center gap-1 active:bg-neutral-100 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]">
            Preview ↗
          </a>
        )}
      </div>
    </section>
  );
}
