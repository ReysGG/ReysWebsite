import React from "react";
import { IconDeviceFloppy, IconUpload, IconSettings, IconPhoto, IconLink, IconListDetails, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function PostPublishSidebar({ isPending }: { isPending?: boolean }) {
  return (
    <div className="space-y-4">
      
      {/* Publikasi Action */}
      <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
          <IconUpload size={14} /> Publish
        </h3>
        <hr className="border-neutral-100 dark:border-neutral-900" />
        <div className="flex flex-col gap-2 pt-1">
          <input type="hidden" name="published" value="true" />
          <Button type="submit" disabled={isPending} className="w-full gap-2 font-semibold h-10" variant="default">
            {isPending ? <IconLoader2 className="animate-spin" size={16} /> : <IconUpload size={16} />}
            Publish Langsung
          </Button>
          <Button type="submit" name="action" value="draft" disabled={isPending} className="w-full gap-2 h-10" variant="secondary">
            <IconDeviceFloppy size={16} />
            Simpan Draft
          </Button>
        </div>
      </div>

      {/* Meta Deskripsi */}
      <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
          <IconListDetails size={14} /> Detail & Cuplikan
        </h3>
        <hr className="border-neutral-100 dark:border-neutral-900" />
        
        <div className="space-y-3 pt-1">
          <div className="space-y-2">
            <Label htmlFor="slug" className="text-xs font-semibold">Slug URL</Label>
            <div className="relative">
              <IconLink size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <Input id="slug" name="slug" placeholder="kisah-sukses-startup" required className="pl-9 h-9 text-sm bg-neutral-50 dark:bg-neutral-900" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt" className="text-xs font-semibold">Cuplikan Pendek</Label>
            <Textarea id="excerpt" name="excerpt" placeholder="Tuliskan 1-2 paragraf pendek ringkasan..." rows={3} className="bg-neutral-50 dark:bg-neutral-900 resize-none text-sm" />
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
          <IconPhoto size={14} /> Media
        </h3>
        <hr className="border-neutral-100 dark:border-neutral-900" />
        
        <div className="space-y-1 pt-1">
          <Label htmlFor="coverImage" className="text-xs font-semibold">URL Cover Image</Label>
          <Input id="coverImage" name="coverImage" placeholder="https://unsplash.com/..." className="h-9 text-sm bg-neutral-50 dark:bg-neutral-900" />
        </div>
      </div>

      {/* SEO Tambahan */}
      <div className="bg-white dark:bg-neutral-950 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
          <IconSettings size={14} /> SEO Lanjutan
        </h3>
        <hr className="border-neutral-100 dark:border-neutral-900" />
        
        <div className="space-y-3 pt-1">
          <div className="space-y-1">
            <Label htmlFor="metaTitle" className="text-xs font-semibold">SEO Title</Label>
            <Input id="metaTitle" name="metaTitle" placeholder="Opsional" className="h-9 text-sm bg-neutral-50 dark:bg-neutral-900" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="metaDesc" className="text-xs font-semibold">SEO Desc</Label>
            <Textarea id="metaDesc" name="metaDesc" placeholder="Opsional untuk Google" rows={2} className="bg-neutral-50 dark:bg-neutral-900 resize-none text-sm" />
          </div>
        </div>
      </div>

    </div>
  );
}
