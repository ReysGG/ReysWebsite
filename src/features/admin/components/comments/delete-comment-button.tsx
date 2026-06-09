"use client";

import { Trash2 } from "lucide-react";
import { deleteComment } from "@/features/admin/actions/comment-actions";
import { SubmitButton } from "@/features/admin/components/ui/submit-button";

export function DeleteCommentButton({ id, slug }: { id: string; slug: string }) {
  return (
    <form
      action={deleteComment}
      onSubmit={(e) => {
        if (!confirm("Hapus komentar ini?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="slug" value={slug} />
      <SubmitButton
        idleIcon={<Trash2 className="h-3.5 w-3.5" />}
        pendingLabel="Menghapus..."
        className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Hapus
      </SubmitButton>
    </form>
  );
}
