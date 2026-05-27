import db from "@/lib/db";

export const PROMO_BANNER_KEY = "promo-banner";

export type PromoBanner = {
  enabled: boolean;
  message: string;
  ctaLabel: string;
  ctaHref: string;
  variant: "orange" | "amber" | "emerald" | "neutral";
  version: string;
  startAt: string; // ISO datetime or empty
  endAt: string;   // ISO datetime or empty
};

export const DEFAULT_PROMO_BANNER: PromoBanner = {
  enabled: false,
  message: "",
  ctaLabel: "",
  ctaHref: "",
  variant: "orange",
  version: "v1",
  startAt: "",
  endAt: "",
};

export async function getPromoBanner(): Promise<PromoBanner> {
  try {
    const config = await db.siteConfig.findUnique({ where: { key: PROMO_BANNER_KEY } });
    if (!config?.value) return DEFAULT_PROMO_BANNER;
    const value = config.value as Partial<PromoBanner>;
    return {
      ...DEFAULT_PROMO_BANNER,
      ...value,
    };
  } catch {
    return DEFAULT_PROMO_BANNER;
  }
}

/** Check if banner is within scheduled time range */
export function isBannerInSchedule(banner: PromoBanner): boolean {
  if (!banner.enabled || !banner.message) return false;
  const now = Date.now();
  if (banner.startAt) {
    const start = new Date(banner.startAt).getTime();
    if (now < start) return false;
  }
  if (banner.endAt) {
    const end = new Date(banner.endAt).getTime();
    if (now > end) return false;
  }
  return true;
}
