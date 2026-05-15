"use client";

import { Trash2 } from "lucide-react";
import { deleteProject } from "@/features/admin/actions/portfolio-actions";

export function DeleteProjectButton({ id }: { id: string }) {
  return (
    <form
      action={deleteProject}
      onSubmit={(event) => {
        if (!confirm("Hapus project portfolio ini?")) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100">
        <Trash2 className="h-3.5 w-3.5" /> Hapus
      </button>
    </form>
  );
}
