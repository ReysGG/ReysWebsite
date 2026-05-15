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
import { Settings2 } from "lucide-react";

export function BlogEditorForm({ initialData }: { initialData?: Post }) {
  const action = initialData ? updatePost : createPost;
  const [state, formAction, pending] = useActionState(action, {} as BlogActionState);
  return (
    <form action={formAction} className="grid gap-6 pb-32 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      {/* Main editor column */}
      <div className="space-y-0">
        {initialData && <input type="hidden" name="id" value={initialData.id} />}
        <BlogFormMessage message={state.message || state.error} ok={state.success} />

        {/* Title + meta area */}
        <div className="rounded-t-xl border border-neutral-200 bg-white dark:bg-white dark:border-neutral-200 px-8 pt-8 pb-4">
          <input
            name="title"
            defaultValue={initialData?.title || ""}
            placeholder="Judul artikel..."
            className="w-full border-0 bg-transparent text-4xl font-bold text-neutral-900 dark:text-neutral-900 placeholder:text-neutral-300 outline-none leading-tight"
          />
          <textarea
            name="excerpt"
            defaultValue={initialData?.excerpt || ""}
            rows={2}
            placeholder="Tulis ringkasan singkat artikel..."
            className="mt-4 w-full resize-none border-0 bg-transparent text-base italic text-neutral-500 dark:text-neutral-500 placeholder:text-neutral-300 outline-none leading-relaxed"
          />
          <div className="mt-3 border-t border-neutral-100 pt-3">
            <BlogSlugField defaultTitle={initialData?.title} defaultSlug={initialData?.slug} />
          </div>
        </div>

        {/* Rich text editor — seamlessly connected */}
        <div className="rounded-b-xl border-x border-b border-neutral-200 bg-white dark:bg-white dark:border-neutral-200 overflow-hidden">
          <BlogRichTextEditor defaultValue={initialData?.content || ""} />
        </div>
      </div>

      {/* Sidebar */}
      <aside className="space-y-4 lg:sticky lg:top-16 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto">
        <BlogPublishPanel
          published={initialData?.published}
          featured={initialData?.featured}
          publishedAt={initialData?.publishedAt}
          pending={pending}
          isEdit={Boolean(initialData)}
          slug={initialData?.slug}
        />

        <section className="rounded-xl border border-neutral-200 bg-white dark:bg-white dark:border-neutral-200 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Settings2 size={14} className="text-indigo-500" />
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-900">Media & Detail</h2>
          </div>
          <BlogCoverImageField defaultValue={initialData?.coverImage} defaultOgImage={initialData?.ogImage} />
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">Kategori</span>
            <input
              name="category"
              defaultValue={initialData?.category || ""}
              list="blog-category-options"
              placeholder="Pilih atau tulis kategori"
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm dark:bg-white dark:text-neutral-900 dark:border-neutral-200 outline-none focus:border-indigo-400 transition-colors"
            />
            <datalist id="blog-category-options">
              <option value="Web Development" />
              <option value="SEO" />
              <option value="Design" />
              <option value="Case Study" />
              <option value="Tutorial" />
              <option value="Website Bisnis" />
              <option value="Landing Page" />
              <option value="E-Commerce" />
              <option value="Company Profile" />
              <option value="UI/UX" />
            </datalist>
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">Author</span>
            <input
              name="author"
              defaultValue={initialData?.author || "Admin"}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm dark:bg-white dark:text-neutral-900 dark:border-neutral-200 outline-none focus:border-indigo-400 transition-colors"
            />
          </label>
          <BlogTagsField defaultValue={initialData?.tags || []} />
        </section>

        <BlogSeoPanel data={initialData} />
      </aside>
    </form>
  );
}
