"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { requireAdmin } from "@/features/admin/lib/auth";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function deleteComment(formData: FormData) {
  await requireAdmin();

  const id = getString(formData, "id");
  const slug = getString(formData, "slug");
  if (!id) return;

  await db.comment.delete({ where: { id } });

  revalidatePath("/admin/comments");
  if (slug) revalidatePath(`/blog/${slug}`);
}
