import { unstable_cache } from "next/cache";
import db from "@/lib/db";
import { normalizeSiteSettings } from "@/lib/contact-links";

export const SITE_SETTINGS_KEY = "site-settings";
export const SITE_SETTINGS_TAG = "site-settings";

export type SiteSettings = {
  siteName: string;
  tagline: string;
  contactEmail: string;
  whatsapp: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  github: string;
  description: string;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: "WebServices",
  tagline: "Your Tech Partner",
  contactEmail: "",
  whatsapp: "",
  instagram: "",
  twitter: "",
  linkedin: "",
  github: "",
  description: "Dinamis & profesional web services, startups, and personal brands.",
};

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    try {
      const config = await db.siteConfig.findUnique({ where: { key: SITE_SETTINGS_KEY } });
      if (!config?.value) return DEFAULT_SITE_SETTINGS;

      const value = config.value as Partial<SiteSettings>;
      return normalizeSiteSettings({
        ...DEFAULT_SITE_SETTINGS,
        ...value,
      });
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  },
  ["site-settings"],
  { tags: [SITE_SETTINGS_TAG], revalidate: 3600 },
);
