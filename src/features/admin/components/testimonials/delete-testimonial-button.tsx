"use client";

import { Trash2 } from "lucide-react";
import { deleteTestimonial } from "@/features/admin/actions/testimonial-actions";
import { SubmitButton } from "@/features/admin/components/ui/submit-button";

export function DeleteTestimonialButton({ id }: { id: string }) {
  return (
    <form
      action={deleteTestimonial}
      onSubmit={(event) => {
        if (!confirm("Hapus testimoni ini?")) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <SubmitButton
        idleIcon={<Trash2 className="h-3.5 w-3.5" />}
        pendingLabel="Menghapus..."
        className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Hapus
      </SubmitButton>
    </form>
  );
}
