"use client";

import { useActionState } from "react";
import { Trash2 } from "lucide-react";
import { deletePost, type BlogActionState } from "@/features/admin/actions/blog-actions";

export function DeletePostButton({ id }: { id: string }) {
  const [, formAction, pending] = useActionState(deletePost, {} as BlogActionState);
  return <form action={formAction} onSubmit={(e) => { if (!confirm("Hapus artikel ini?")) e.preventDefault(); }}><input type="hidden" name="id" value={id} /><button disabled={pending} className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50" title="Hapus"><Trash2 className="h-4 w-4" /></button></form>;
}
