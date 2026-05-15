"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { requireAdmin } from "@/features/admin/lib/auth";
import { PROMO_BANNER_KEY, type PromoBanner } from "@/lib/promo-banner";

function toIsoOrEmpty(value: FormDataEntryValue | null) {
  const raw = typeof value === "string" ? value.trim() : "";
  if (!raw) return "";
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function getSchedule(formData: FormData) {
  const preset = ((formData.get("schedulePreset") as string) || "custom").trim();
  const now = new Date();
  const end = new Date(now);

  if (preset === "always") return { startAt: "", endAt: "" };
  if (preset === "today") {
    end.setHours(23, 59, 59, 999);
    return { startAt: now.toISOString(), endAt: end.toISOString() };
  }
  if (preset === "7days") {
    end.setDate(end.getDate() + 7);
    return { startAt: now.toISOString(), endAt: end.toISOString() };
  }
  if (preset === "month") {
    end.setMonth(end.getMonth() + 1);
    return { startAt: now.toISOString(), endAt: end.toISOString() };
  }

  return {
    startAt: toIsoOrEmpty(formData.get("startAt")),
    endAt: toIsoOrEmpty(formData.get("endAt")),
  };
}

export async function savePromoBanner(formData: FormData) {
  await requireAdmin();

  const variantRaw = (formData.get("variant") as string) || "indigo";
  const variant: PromoBanner["variant"] =
    variantRaw === "amber" || variantRaw === "emerald" || variantRaw === "neutral"
      ? variantRaw
      : "indigo";

  const schedule = getSchedule(formData);

  const banner: PromoBanner = {
    enabled: formData.get("enabled") === "on",
    message: ((formData.get("message") as string) || "").trim(),
    ctaLabel: ((formData.get("ctaLabel") as string) || "").trim(),
    ctaHref: ((formData.get("ctaHref") as string) || "").trim(),
    variant,
    startAt: schedule.startAt,
    endAt: schedule.endAt,
    // bump version on every save so dismissed banner reappears for users
    version: `v-${Date.now()}`,
  };

  await db.siteConfig.upsert({
    where: { key: PROMO_BANNER_KEY },
    update: { value: banner },
    create: { key: PROMO_BANNER_KEY, value: banner },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/banner");
}
