export function BlogTagsField({ defaultValue = [] }: { defaultValue?: string[] }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-neutral-800 dark:text-neutral-800">Tags</label>
      <input name="tags" defaultValue={defaultValue.join(", ")} placeholder="nextjs, seo, design" className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 dark:bg-white dark:text-neutral-900 dark:border-neutral-200" />
      <p className="text-xs text-neutral-500 dark:text-neutral-500">Pisahkan tag dengan koma.</p>
    </div>
  );
}
