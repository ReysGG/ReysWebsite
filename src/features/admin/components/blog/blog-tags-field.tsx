export function BlogTagsField({ defaultValue = [] }: { defaultValue?: string[] }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-neutral-800">Tags</label>
      <input name="tags" defaultValue={defaultValue.join(", ")} placeholder="nextjs, seo, design" className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[#ff8a00]" />
      <p className="text-xs text-neutral-500">Pisahkan tag dengan koma.</p>
    </div>
  );
}
