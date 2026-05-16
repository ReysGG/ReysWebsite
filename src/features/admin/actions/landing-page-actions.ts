"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/db";
import { requireAdmin } from "@/features/admin/lib/auth";
import { defaultSiteConfig, getSiteConfig, SITE_CONFIG_KEY, type SiteConfig } from "@/lib/site-config";
import { setLandingPageField } from "@/features/admin/lib/landing-page-edit";

export type LandingPageFieldState = {
  success: boolean;
  error?: string;
  message?: string;
};

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function getString(formData: FormData, key: string, fallback = "") {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function getNumber(formData: FormData, key: string, fallback = 0) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : fallback;
}

export async function saveLandingPage(formData: FormData) {
  await requireAdmin();
  const current = await getSiteConfig();

  const nextConfig: SiteConfig = {
    ...current,
    hero: {
      trustText: getString(formData, "hero.trustText", current.hero.trustText),
      headlinePrefix: getString(formData, "hero.headlinePrefix", current.hero.headlinePrefix),
      rotatingWords: lines(getString(formData, "hero.rotatingWords", current.hero.rotatingWords.join("\n"))),
      description: getString(formData, "hero.description", current.hero.description),
      primaryCta: getString(formData, "hero.primaryCta", current.hero.primaryCta),
      secondaryCta: getString(formData, "hero.secondaryCta", current.hero.secondaryCta),
      visualImage: getString(formData, "hero.visualImage", current.hero.visualImage),
      scopePreview: {
        eyebrow: getString(formData, "hero.scopePreview.eyebrow", current.hero.scopePreview.eyebrow),
        title: getString(formData, "hero.scopePreview.title", current.hero.scopePreview.title),
        projectLabel: getString(formData, "hero.scopePreview.projectLabel", current.hero.scopePreview.projectLabel),
        pages: getString(formData, "hero.scopePreview.pages", current.hero.scopePreview.pages),
        features: getString(formData, "hero.scopePreview.features", current.hero.scopePreview.features),
        timeline: getString(formData, "hero.scopePreview.timeline", current.hero.scopePreview.timeline),
        revisions: getString(formData, "hero.scopePreview.revisions", current.hero.scopePreview.revisions),
        deliverable: getString(formData, "hero.scopePreview.deliverable", current.hero.scopePreview.deliverable),
        status: getString(formData, "hero.scopePreview.status", current.hero.scopePreview.status),
      },
    },
    stats: current.stats.map((stat, index) => ({
      value: getNumber(formData, `stats.${index}.value`, stat.value),
      suffix: getString(formData, `stats.${index}.suffix`, stat.suffix),
      label: getString(formData, `stats.${index}.label`, stat.label),
      description: getString(formData, `stats.${index}.description`, stat.description),
    })),
    trustStrip: lines(getString(formData, "trustStrip", current.trustStrip.join("\n"))),
    problems: {
      eyebrow: getString(formData, "problems.eyebrow", current.problems.eyebrow),
      heading: getString(formData, "problems.heading", current.problems.heading),
      description: getString(formData, "problems.description", current.problems.description),
      items: current.problems.items.map((item, index) => ({
        title: getString(formData, `problems.items.${index}.title`, item.title),
        description: getString(formData, `problems.items.${index}.description`, item.description),
      })),
    },
    services: {
      eyebrow: getString(formData, "services.eyebrow", current.services.eyebrow),
      heading: getString(formData, "services.heading", current.services.heading),
      items: current.services.items.map((item, index) => ({
        number: getString(formData, `services.${index}.number`, item.number),
        title: getString(formData, `services.${index}.title`, item.title),
        description: getString(formData, `services.${index}.description`, item.description),
      })),
    },
    workflow: {
      eyebrow: getString(formData, "workflow.eyebrow", current.workflow.eyebrow),
      headingPrefix: getString(formData, "workflow.headingPrefix", current.workflow.headingPrefix),
      rotatingWords: lines(getString(formData, "workflow.rotatingWords", current.workflow.rotatingWords.join("\n"))),
      description: getString(formData, "workflow.description", current.workflow.description),
      steps: current.workflow.steps.map((step, index) => ({
        step: getString(formData, `workflow.${index}.step`, step.step),
        title: getString(formData, `workflow.${index}.title`, step.title),
        description: getString(formData, `workflow.${index}.description`, step.description),
      })),
    },
    pricing: {
      eyebrow: getString(formData, "pricing.eyebrow", current.pricing.eyebrow),
      heading: getString(formData, "pricing.heading", current.pricing.heading),
      description: getString(formData, "pricing.description", current.pricing.description),
      tiers: current.pricing.tiers.map((tier, index) => ({
        title: getString(formData, `pricing.${index}.title`, tier.title),
        price: getString(formData, `pricing.${index}.price`, tier.price),
        timeline: getString(formData, `pricing.${index}.timeline`, tier.timeline),
        description: getString(formData, `pricing.${index}.description`, tier.description),
        features: lines(getString(formData, `pricing.${index}.features`, tier.features.join("\n"))),
        buttonText: getString(formData, `pricing.${index}.buttonText`, tier.buttonText),
        popular: formData.has(`pricing.${index}.popular`)
          ? formData.get(`pricing.${index}.popular`) === "on"
          : tier.popular,
      })),
    },
    whatYouGet: {
      eyebrow: getString(formData, "whatYouGet.eyebrow", current.whatYouGet.eyebrow),
      heading: getString(formData, "whatYouGet.heading", current.whatYouGet.heading),
      description: getString(formData, "whatYouGet.description", current.whatYouGet.description),
      items: lines(getString(formData, "whatYouGet.items", current.whatYouGet.items.join("\n"))),
    },
    cta: {
      badge: getString(formData, "cta.badge", current.cta.badge),
      headingTop: getString(formData, "cta.headingTop", current.cta.headingTop),
      headingAccent: getString(formData, "cta.headingAccent", current.cta.headingAccent),
      description: getString(formData, "cta.description", current.cta.description),
      whatsappUrl: getString(formData, "cta.whatsappUrl", current.cta.whatsappUrl),
      primaryCta: getString(formData, "cta.primaryCta", current.cta.primaryCta),
      secondaryCta: getString(formData, "cta.secondaryCta", current.cta.secondaryCta),
      socialProof: getString(formData, "cta.socialProof", current.cta.socialProof),
      ratingText: getString(formData, "cta.ratingText", current.cta.ratingText),
    },
    faq: {
      eyebrow: getString(formData, "faq.eyebrow", current.faq.eyebrow),
      heading: getString(formData, "faq.heading", current.faq.heading),
      items: current.faq.items.map((item, index) => ({
        question: getString(formData, `faq.${index}.question`, item.question),
        answer: getString(formData, `faq.${index}.answer`, item.answer),
      })),
    },
  };

  await db.siteConfig.upsert({
    where: { key: SITE_CONFIG_KEY },
    update: { value: nextConfig },
    create: { key: SITE_CONFIG_KEY, value: nextConfig },
  });

  revalidatePath("/");
  revalidatePath("/admin/landing-page");
}

export async function saveLandingPageField(_prevState: LandingPageFieldState, formData: FormData): Promise<LandingPageFieldState> {
  try {
    await requireAdmin();
    const name = formData.get("name");
    const value = formData.get("value");

    if (typeof name !== "string" || !name.trim()) {
      return { success: false, error: "Nama field tidak valid." };
    }

    if (typeof value !== "string" || !value.trim()) {
      return { success: false, error: "Konten tidak boleh kosong." };
    }

    const current = await getSiteConfig();
    const nextConfig = setLandingPageField(current, name, value);

    await db.siteConfig.upsert({
      where: { key: SITE_CONFIG_KEY },
      update: { value: nextConfig },
      create: { key: SITE_CONFIG_KEY, value: nextConfig },
    });

    revalidatePath("/");
    revalidatePath("/admin/landing-page");
    revalidatePath(`/admin/landing-page/${name.split(".")[0]}`);

    return { success: true, message: "Konten berhasil disimpan." };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menyimpan konten landing page.",
    };
  }
}

export async function addLandingPageFaqItem(_prevState: LandingPageFieldState, formData: FormData): Promise<LandingPageFieldState> {
  try {
    await requireAdmin();
    const question = getString(formData, "question");
    const answer = getString(formData, "answer");

    if (!question || !answer) {
      return { success: false, error: "Pertanyaan dan jawaban wajib diisi." };
    }

    const current = await getSiteConfig();
    const nextConfig: SiteConfig = {
      ...current,
      faq: {
        ...current.faq,
        items: [...current.faq.items, { question, answer }],
      },
    };

    await db.siteConfig.upsert({
      where: { key: SITE_CONFIG_KEY },
      update: { value: nextConfig },
      create: { key: SITE_CONFIG_KEY, value: nextConfig },
    });

    revalidatePath("/");
    revalidatePath("/admin/landing-page");
    revalidatePath("/admin/landing-page/faq");

    return { success: true, message: "FAQ baru berhasil ditambahkan." };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menambahkan FAQ.",
    };
  }
}

export async function resetLandingPage() {
  await syncProfessionalLandingPageDefaults();
}

export async function syncProfessionalLandingPageDefaults() {
  await requireAdmin();
  await db.siteConfig.upsert({
    where: { key: SITE_CONFIG_KEY },
    update: { value: defaultSiteConfig },
    create: { key: SITE_CONFIG_KEY, value: defaultSiteConfig },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/landing-page");
  revalidatePath("/admin/landing-page/sync");
}
