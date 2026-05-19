"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/features/admin/lib/auth";
import { SHOWCASE_TAG } from "@/features/showcase/data";
import {
  createShowcaseRecord,
  deleteShowcaseRecord,
  parseShowcaseFormData,
  toggleShowcasePublishedById,
  updateShowcaseRecord,
} from "@/features/admin/services/showcase-service";

export type ShowcaseActionState = {
  success?: boolean;
  error?: string;
  message?: string;
};

function revalidateShowcase() {
  revalidateTag(SHOWCASE_TAG, "max");
  revalidatePath("/showcase");
  revalidatePath("/showcase/[slug]", "page");
  revalidatePath("/admin/showcase");
}

export async function createShowcase(_state: ShowcaseActionState, formData: FormData): Promise<ShowcaseActionState> {
  try {
    await requireAdmin();
    await createShowcaseRecord(parseShowcaseFormData(formData));
    revalidateShowcase();
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Gagal membuat showcase." };
  }
  redirect("/admin/showcase");
}

export async function updateShowcase(id: string, _state: ShowcaseActionState, formData: FormData): Promise<ShowcaseActionState> {
  try {
    await requireAdmin();
    await updateShowcaseRecord(id, parseShowcaseFormData(formData));
    revalidateShowcase();
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Gagal memperbarui showcase." };
  }
  redirect("/admin/showcase");
}

export async function deleteShowcase(formData: FormData) {
  try {
    await requireAdmin();
    const id = getFormString(formData, "id");
    if (!id) return { success: false, error: "ID showcase tidak valid." };
    await deleteShowcaseRecord(id);
    revalidateShowcase();
    return { success: true, message: "Showcase berhasil dihapus." };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Gagal menghapus showcase." };
  }
}

export async function toggleShowcasePublished(formData: FormData) {
  try {
    await requireAdmin();
    const id = getFormString(formData, "id");
    if (!id) return { success: false, error: "ID showcase tidak valid." };
    const updated = await toggleShowcasePublishedById(id);
    if (!updated) return { success: false, error: "Showcase tidak ditemukan." };
    revalidateShowcase();
    return { success: true, message: "Status showcase diperbarui." };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Gagal memperbarui status showcase." };
  }
}

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}
