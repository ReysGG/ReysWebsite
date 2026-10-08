"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/features/admin/lib/auth";
import { isProviderType } from "@/features/ai/lib/provider-catalog";
import {
  createProvider,
  deleteProvider,
  fetchProviderModels,
  reorderProviders,
  saveProviderModels,
  setProviderEnabled,
  testProvider,
  updateProvider,
} from "@/features/ai/services/provider-service";

export type AiActionState = { ok?: boolean; message?: string; error?: string };

const str = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

function revalidateAi() {
  revalidatePath("/admin/ai");
  revalidatePath("/admin/ai/providers");
}

export async function saveProviderAction(_prev: AiActionState, formData: FormData): Promise<AiActionState> {
  try {
    await requireAdmin();
    const type = str(formData, "type");
    if (!isProviderType(type)) return { error: "Tipe provider tidak valid." };
    const input = {
      name: str(formData, "name"),
      type,
      baseUrl: str(formData, "baseUrl"),
      apiKey: str(formData, "apiKey"),
      models: str(formData, "models").split(/[\n,]/),
      defaultModel: str(formData, "defaultModel"),
      imageModel: str(formData, "imageModel"),
      enabled: formData.get("enabled") === "on",
    };
    const id = str(formData, "id");
    if (id) await updateProvider(id, input);
    else await createProvider(input);
    revalidateAi();
    return { ok: true, message: id ? "Provider diperbarui." : "Provider ditambahkan." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal menyimpan provider." };
  }
}

export async function deleteProviderAction(id: string): Promise<AiActionState> {
  try {
    await requireAdmin();
    await deleteProvider(id);
    revalidateAi();
    return { ok: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal menghapus provider." };
  }
}

export async function toggleProviderAction(id: string, enabled: boolean): Promise<AiActionState> {
  try {
    await requireAdmin();
    await setProviderEnabled(id, enabled);
    revalidateAi();
    return { ok: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal mengubah status provider." };
  }
}

export async function reorderProvidersAction(orderedIds: string[]): Promise<AiActionState> {
  try {
    await requireAdmin();
    await reorderProviders(orderedIds.filter((id) => typeof id === "string").slice(0, 100));
    revalidateAi();
    return { ok: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal mengubah urutan." };
  }
}

export async function testProviderAction(id: string) {
  await requireAdmin();
  const result = await testProvider(id);
  revalidateAi();
  return result;
}

export async function fetchModelsAction(id: string): Promise<AiActionState & { models?: string[] }> {
  try {
    await requireAdmin();
    const models = await fetchProviderModels(id);
    if (models.length) await saveProviderModels(id, models);
    revalidateAi();
    return { ok: true, models, message: `${models.length} model ditemukan.` };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal mengambil daftar model." };
  }
}
