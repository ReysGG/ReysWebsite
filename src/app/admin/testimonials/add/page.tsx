import React from "react";
import Link from "next/link";

export default function AddTestimonialPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <Link href="/admin/testimonials" className="p-2 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md">
          &larr;
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Testimonial</h1>
          <p className="text-neutral-500 mt-1">Insert a new client review into the system.</p>
        </div>
      </div>

      <form className="space-y-6 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Client Name</label>
            <input 
              type="text"
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:border-black dark:focus:border-white transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Client Role / Company</label>
            <input 
              type="text"
              placeholder="e.g. CEO at Acme Corp"
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:border-black dark:focus:border-white transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Avatar URL</label>
          <input 
            type="url"
            placeholder="https://example.com/avatar.jpg"
            className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:border-black dark:focus:border-white transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Testimonial Content</label>
          <textarea 
            rows={5}
            placeholder="What did the client say about your service?"
            className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:border-black dark:focus:border-white transition-colors"
          />
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Link href="/admin/testimonials" className="px-6 py-2 border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-700 dark:text-neutral-300 font-semibold rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
            Cancel
          </Link>
          <button type="button" className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-md hover:opacity-80 transition-opacity">
            Save Testimonial
          </button>
        </div>
      </form>
    </div>
  );
}
