import React from "react";

export default function ManageHeroPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <h1 className="text-3xl font-bold tracking-tight">Ganti Hero Section</h1>
        <p className="text-neutral-500 mt-2">Update the main headline and background on your landing page.</p>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Headlines (One per line)</label>
          <textarea 
            rows={3}
            className="w-full px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:border-black dark:focus:border-white transition-colors"
            defaultValue={"Elevating\nDigital\nExperiences"}
          />
          <p className="text-xs text-neutral-500">These words will flip sequentially if using FlipWords component.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Subheadline</label>
          <input 
            type="text"
            className="w-full px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:border-black dark:focus:border-white transition-colors"
            defaultValue="We build beautiful and fast websites."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Hero Image / Background Video URL</label>
          <input 
            type="text"
            className="w-full px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md outline-none focus:border-black dark:focus:border-white transition-colors"
            placeholder="https://..."
          />
        </div>

        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <button type="button" className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-md hover:opacity-80 transition-opacity">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
