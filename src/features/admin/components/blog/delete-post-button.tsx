"use client";

import { useActionState } from "react";
import { Trash2 } from "lucide-react";
import { deletePost, type BlogActionState } from "@/features/admin/actions/blog-actions";

export function DeletePostButton({ id }: { id: string }) {
  const [, formAction, pending] = useActionState(deletePost, {} as BlogActionState);
  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!confirm("Hapus artikel ini?")) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit"
        disabled={pending}
        className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Hapus
      </button>
    </form>
  );
}
