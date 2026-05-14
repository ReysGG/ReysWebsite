"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import {
  defaultPortfolioIntro,
  PORTFOLIO_INTRO_KEY,
  type PortfolioIntroConfig,
} from "@/lib/portfolio-config";

export type PortfolioActionState = {
  success: boolean;
  error?: string;
  message?: string;
};

function getString(formData: FormData, key: string, fallback = "") {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export async function savePortfolioIntro(_prevState: PortfolioActionState, formData: FormData): Promise<PortfolioActionState> {
  try {
    const nextIntro: PortfolioIntroConfig = {
      eyebrow: getString(formData, "eyebrow", defaultPortfolioIntro.eyebrow),
      heading: getString(formData, "heading", defaultPortfolioIntro.heading),
      description: getString(formData, "description", defaultPortfolioIntro.description),
      featuredLabel: getString(formData, "featuredLabel", defaultPortfolioIntro.featuredLabel),
    };

    await db.siteConfig.upsert({
      where: { key: PORTFOLIO_INTRO_KEY },
      update: { value: nextIntro },
      create: { key: PORTFOLIO_INTRO_KEY, value: nextIntro },
    });

    revalidatePath("/");
    revalidatePath("/admin/portfolio");
    revalidatePath("/admin/portfolio/hero");

    return { success: true, message: "Intro portfolio berhasil disimpan." };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menyimpan intro portfolio.",
    };
  }
}
