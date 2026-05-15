"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { requireAdmin } from "@/features/admin/lib/auth";
import { PORTFOLIO_INTRO_KEY, type PortfolioIntroConfig } from "@/lib/portfolio-config";

export type PortfolioActionState = {
  success: boolean;
  error?: string;
  message?: string;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function revalidatePortfolio() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/portfolio");
}

export async function savePortfolioIntro(_prevState: PortfolioActionState, formData: FormData): Promise<PortfolioActionState> {
  try {
    await requireAdmin();

    const nextIntro: PortfolioIntroConfig = {
      eyebrow: getString(formData, "eyebrow"),
      heading: getString(formData, "heading"),
      description: getString(formData, "description"),
      featuredLabel: getString(formData, "featuredLabel"),
    };

    if (!nextIntro.eyebrow || !nextIntro.heading || !nextIntro.description || !nextIntro.featuredLabel) {
      return { success: false, error: "Semua field intro wajib diisi." };
    }

    await db.siteConfig.upsert({
      where: { key: PORTFOLIO_INTRO_KEY },
      update: { value: nextIntro },
      create: { key: PORTFOLIO_INTRO_KEY, value: nextIntro },
    });

    revalidatePortfolio();
    revalidatePath("/admin/portfolio/hero");
    return { success: true, message: "Intro portfolio berhasil disimpan." };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Gagal menyimpan intro portfolio." };
  }
}

export async function createProject(formData: FormData) {
  await requireAdmin();

  const title = getString(formData, "title");
  const description = getString(formData, "description");
  const imageUrl = getString(formData, "imageUrl");
  const gifUrl = getString(formData, "gifUrl");
  const link = getString(formData, "link");

  if (!title || !description || !imageUrl) {
    throw new Error("Judul, deskripsi, dan cover image wajib diisi.");
  }

  await db.project.create({
    data: {
      title,
      description,
      imageUrl,
      gifUrl: gifUrl || null,
      link: link || null,
    },
  });

  revalidatePortfolio();
  redirect("/admin/portfolio");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();

  const title = getString(formData, "title");
  const description = getString(formData, "description");
  const imageUrl = getString(formData, "imageUrl");
  const gifUrl = getString(formData, "gifUrl");
  const link = getString(formData, "link");

  if (!title || !description || !imageUrl) {
    throw new Error("Judul, deskripsi, dan cover image wajib diisi.");
  }

  await db.project.update({
    where: { id },
    data: {
      title,
      description,
      imageUrl,
      gifUrl: gifUrl || null,
      link: link || null,
    },
  });

  revalidatePortfolio();
  redirect("/admin/portfolio");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();

  const id = getString(formData, "id");
  if (!id) return;

  await db.project.delete({ where: { id } });
  revalidatePortfolio();
}
