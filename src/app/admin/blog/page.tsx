import React from "react";

export default function BlogAdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-neutral-500 mt-2">Manage your blog content, SEO, and images.</p>
        </div>
        <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-md hover:opacity-80 transition-opacity">
          Create Post
        </button>
      </div>

      <div className="p-12 text-center bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl border-dashed">
        <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
        <p className="text-sm text-neutral-500 mb-6">Create your first blog post with our Rich Text Editor.</p>
        <button className="px-4 py-2 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
          Write a Post
        </button>
      </div>
    </div>
  );
}
