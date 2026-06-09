"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { saveLandingPageField } from "@/features/admin/actions/landing-page-actions";
import type { InlineEditField, SectionMeta } from "@/features/admin/lib/landing-page-edit";
import { SECTION_ICONS } from "@/features/admin/components/landing-page/landing-page-section-icons";
import { cn } from "@/lib/utils";

export function EditableFrame({ section, active, editMode, children }: { section: SectionMeta; active: boolean; editMode: boolean; children: React.ReactNode }) {
  return (
    <section id={`preview-${section.key}`} className={cn("group relative overflow-hidden rounded-md border bg-white shadow-none transition-colors", active && editMode ? "border-[#ff8a00] ring-2 ring-[#ffcd80]/50" : "border-neutral-200")}>
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-200 bg-white/95 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
          <span className={cn("text-neutral-400", active && "text-[#ff8a00]")}>{SECTION_ICONS[section.key]}</span>
          <span>{section.label}</span>
        </div>
        <p className="text-xs text-neutral-400">{editMode ? "Klik elemen untuk edit" : "Preview mode"}</p>
      </div>
      <div className={cn("relative bg-white", editMode && "cursor-pointer")}>{children}</div>
    </section>
  );
}

export function InlineEditModal({ field, onClose }: { field: InlineEditField; onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(saveLandingPageField, { success: false });
  const router = useRouter();

  useEffect(() => {
    if (!state.success) return;
    const timeout = window.setTimeout(() => {
      router.refresh();
      onClose();
    }, 700);
    return () => window.clearTimeout(timeout);
  }, [onClose, router, state.success]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-xl rounded-md border border-neutral-200 bg-white p-5 shadow-none">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Inline Edit</p>
            <h3 className="mt-2 text-lg font-bold text-neutral-900">{field.label}</h3>
            <p className="mt-1 text-sm text-neutral-500">Field: {field.name}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]">Tutup</button>
        </div>
        <form action={formAction} className="mt-5 space-y-4">
          <input type="hidden" name="name" value={field.name} />
          <label className="block text-sm font-semibold text-neutral-700" htmlFor={`inline-${field.name}`}>Konten</label>
          {field.textarea ? (
            <textarea id={`inline-${field.name}`} name="value" defaultValue={field.value} rows={6} className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-[#ff8a00] focus:ring-2 focus:ring-[#ffcd80]/50" />
          ) : (
            <input id={`inline-${field.name}`} name="value" defaultValue={field.value} className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-[#ff8a00] focus:ring-2 focus:ring-[#ffcd80]/50" />
          )}
          {state.error ? <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{state.error}</p> : null}
          {state.success && state.message ? <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{state.message}</p> : null}
          <div className="flex justify-end gap-2 border-t border-neutral-200 pt-4">
            <button type="button" onClick={onClose} className="rounded-md border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]">Batal</button>
            <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-md bg-[#ff8a00] px-4 py-2 text-sm font-semibold text-white shadow-none transition-colors hover:bg-[#f4b738] disabled:cursor-not-allowed disabled:bg-[#ffcd80] active:bg-[#e07a00] active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]">
              <Save className="h-4 w-4" />
              {isPending ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export const LANDING_EDIT_STYLE = `
  [data-landing-edit="true"] :is(h1, h2, h3, h4, h5, h6, p, a, button, li, img, [data-edit-field]):hover {
    outline: 2px solid #ff8a00;
    outline-offset: 4px;
    border-radius: 6px;
    cursor: pointer;
  }
`;
