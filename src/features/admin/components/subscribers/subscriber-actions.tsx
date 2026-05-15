"use client";

import { Power, Trash2 } from "lucide-react";
import { deleteSubscriber, toggleSubscriberStatus } from "@/features/admin/actions/subscriber-actions";

export function SubscriberActions({ id, active }: { id: string; active: boolean }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <form action={toggleSubscriberStatus}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="active" value={String(active)} />
        <button
          type="submit"
          className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
            active
              ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
              : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          }`}
        >
          <Power className="h-3.5 w-3.5" />
          {active ? "Nonaktifkan" : "Aktifkan"}
        </button>
      </form>
      <form
        action={deleteSubscriber}
        onSubmit={(e) => {
          if (!confirm("Hapus subscriber ini?")) e.preventDefault();
        }}
      >
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Hapus
        </button>
      </form>
    </div>
  );
}
