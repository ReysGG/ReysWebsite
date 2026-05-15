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
          <input type="checkbox" name="published" defaultChecked={published} className="h-4 w-4 rounded border-neutral-300 text-indigo-600" /> Published
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" name="featured" defaultChecked={featured} className="h-4 w-4 rounded border-neutral-300 text-indigo-600" /> Featured post
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700">Published at</span>
          <input type="datetime-local" name="publishedAt" defaultValue={toDateTimeLocal(publishedAt)} className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm" />
          <span className="text-xs text-neutral-500">Kosongkan jika belum dijadwalkan/diterbitkan.</span>
        </label>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <button disabled={pending} className="flex-1 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
          {pending ? "Menyimpan..." : isEdit ? "Simpan" : "Terbitkan"}
        </button>
        <Link href="/admin/blog" className="rounded-md border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">Batal</Link>
        {slug && (
          <a href={`/blog/${slug}`} target="_blank" rel="noopener noreferrer"
            className="rounded-md border border-neutral-200 px-3 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 inline-flex items-center gap-1">
            Preview ↗
          </a>
        )}
      </div>
    </section>
  );
}
