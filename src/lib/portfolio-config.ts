import { unstable_cache } from "next/cache";
import db from "@/lib/db";

export const PORTFOLIO_INTRO_KEY = "portfolio-intro";
export const PORTFOLIO_INTRO_TAG = "portfolio-intro";
export const PORTFOLIO_PROJECTS_TAG = "portfolio-projects";

export type PortfolioIntroConfig = {
  eyebrow: string;
  heading: string;
  description: string;
  featuredLabel: string;
};

export const defaultPortfolioIntro: PortfolioIntroConfig = {
  eyebrow: "Portfolio",
  heading: "Contoh solusi yang bisa dibangun",
  description:
    "Beberapa bentuk website dan sistem yang paling sering dibutuhkan bisnis lokal untuk tampil rapi, menjual, dan mudah dikelola.",
  featuredLabel: "Showcase terkurasi",
};

function isPortfolioIntroConfig(value: unknown): value is PortfolioIntroConfig {
  if (!value || typeof value !== "object") return false;
  const maybe = value as Partial<PortfolioIntroConfig>;
  return Boolean(maybe.eyebrow && maybe.heading && maybe.description && maybe.featuredLabel);
}

export const getPortfolioIntro = unstable_cache(
  async (): Promise<PortfolioIntroConfig> => {
    try {
      const row = await db.siteConfig.findUnique({ where: { key: PORTFOLIO_INTRO_KEY } });
      if (row && isPortfolioIntroConfig(row.value)) return row.value;
    } catch {
      // Keep public pages usable when database is unavailable.
    }

    return defaultPortfolioIntro;
  },
  ["portfolio-intro"],
  { tags: [PORTFOLIO_INTRO_TAG], revalidate: 3600 },
);

export const getPortfolioProjects = unstable_cache(
  async () => {
    try {
      return await db.project.findMany({ orderBy: { updatedAt: "desc" } });
    } catch {
      return [];
    }
  },
  ["portfolio-projects"],
  { tags: [PORTFOLIO_PROJECTS_TAG], revalidate: 3600 },
);
