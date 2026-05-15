"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { requireAdmin } from "@/features/admin/lib/auth";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function toggleSubscriberStatus(formData: FormData) {
  await requireAdmin();

  const id = getString(formData, "id");
  const active = getString(formData, "active") === "true";
  if (!id) return;

  await db.subscriber.update({ where: { id }, data: { active: !active } });
  revalidatePath("/admin/subscribers");
}

export async function deleteSubscriber(formData: FormData) {
  await requireAdmin();

  const id = getString(formData, "id");
  if (!id) return;

  await db.subscriber.delete({ where: { id } });
  revalidatePath("/admin/subscribers");
}
