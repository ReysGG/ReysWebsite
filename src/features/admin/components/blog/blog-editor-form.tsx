"use client";

import { useActionState } from "react";
import type { Post } from "@prisma/client";
import { createPost, updatePost, type BlogActionState } from "@/features/admin/actions/blog-actions";
import { BlogRichTextEditor } from "./blog-rich-text-editor";
import { BlogSeoPanel } from "./blog-seo-panel";
import { BlogPublishPanel } from "./blog-publish-panel";
import { BlogCoverImageField } from "./blog-cover-image-field";
import { BlogSlugField } from "./blog-slug-field";
import { BlogTagsField } from "./blog-tags-field";
import { BlogFormMessage } from "./blog-form-message";

export function BlogEditorForm({ initialData }: { initialData?: Post }) {
  const action = initialData ? updatePost : createPost;
  const [state, formAction, pending] = useActionState(action, {} as BlogActionState);
  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-6">
        {initialData ? <input type="hidden" name="id" value={initialData.id} /> : null}
        <BlogFormMessage message={state.message || state.error} ok={state.success} />
        <section className="rounded-md border border-neutral-200 bg-white dark:bg-white dark:border-neutral-200 p-5">
          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-800">Judul Artikel</span>
              <input name="title" defaultValue={initialData?.title || ""} placeholder="Tulis judul artikel..." className="w-full rounded-md border border-neutral-200 px-3 py-3 text-xl font-semibold outline-none focus:border-indigo-400 dark:bg-white dark:text-neutral-900 dark:border-neutral-200" />
            </label>
            <BlogSlugField defaultTitle={initialData?.title} defaultSlug={initialData?.slug} />
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-800">Excerpt</span>
              <textarea name="excerpt" defaultValue={initialData?.excerpt || ""} rows={3} className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm dark:bg-white dark:text-neutral-900 dark:border-neutral-200" placeholder="Ringkasan singkat artikel" />
            </label>
            <div>
              <div className="mb-2 text-sm font-semibold text-neutral-800 dark:text-neutral-800">Konten</div>
              <BlogRichTextEditor defaultValue={initialData?.content || ""} />
            </div>
          </div>
        </section>
      </div>
      <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
        <BlogPublishPanel published={initialData?.published} featured={initialData?.featured} publishedAt={initialData?.publishedAt} pending={pending} isEdit={Boolean(initialData)} slug={initialData?.slug} />
        <section className="rounded-md border border-neutral-200 bg-white dark:bg-white dark:border-neutral-200 p-5 space-y-4">
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-900">Media & Detail</h2>
          <BlogCoverImageField defaultValue={initialData?.coverImage} defaultOgImage={initialData?.ogImage} />
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-800">Category</span>
            <input name="category" defaultValue={initialData?.category || ""} list="blog-category-options" placeholder="Pilih atau tulis kategori" className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm dark:bg-white dark:text-neutral-900 dark:border-neutral-200" />
            <datalist id="blog-category-options">
              <option value="Web Development" />
              <option value="SEO" />
              <option value="Design" />
              <option value="Case Study" />
              <option value="Tutorial" />
            </datalist>
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-800">Author</span>
            <input name="author" defaultValue={initialData?.author || "Admin"} className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm dark:bg-white dark:text-neutral-900 dark:border-neutral-200" />
          </label>
          <BlogTagsField defaultValue={initialData?.tags || []} />
        </section>
        <BlogSeoPanel data={initialData} />
      </aside>
    </form>
  );
}
