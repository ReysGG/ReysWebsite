"use client";

import { Trash2 } from "lucide-react";
import { deleteTestimonial } from "@/features/admin/actions/testimonial-actions";

export function DeleteTestimonialButton({ id }: { id: string }) {
  return (
    <form
      action={deleteTestimonial}
      onSubmit={(event) => {
        if (!confirm("Hapus testimoni ini?")) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100">
        <Trash2 className="h-3.5 w-3.5" /> Hapus
      </button>
    </form>
  );
}
