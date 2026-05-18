"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import db from "@/lib/db";
import { requireAdmin } from "@/features/admin/lib/auth";
import { SITE_SETTINGS_KEY, SITE_SETTINGS_TAG, type SiteSettings } from "@/lib/site-settings";
import { normalizeSiteSettings } from "@/lib/contact-links";

export async function saveSiteSettings(formData: FormData) {
  await requireAdmin();

  const settings: SiteSettings = normalizeSiteSettings({
    siteName: (formData.get("siteName") as string)?.trim() || "WebServices",
    tagline: (formData.get("tagline") as string)?.trim() || "",
    contactEmail: (formData.get("contactEmail") as string)?.trim() || "",
    whatsapp: (formData.get("whatsapp") as string)?.trim() || "",
    instagram: (formData.get("instagram") as string)?.trim() || "",
    twitter: (formData.get("twitter") as string)?.trim() || "",
    linkedin: (formData.get("linkedin") as string)?.trim() || "",
    github: (formData.get("github") as string)?.trim() || "",
    description: (formData.get("description") as string)?.trim() || "",
  });

  await db.siteConfig.upsert({
    where: { key: SITE_SETTINGS_KEY },
    update: { value: settings },
    create: { key: SITE_SETTINGS_KEY, value: settings },
  });

  revalidateTag(SITE_SETTINGS_TAG, "max");
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/settings");
}
