import db from "@/lib/db";

export const PORTFOLIO_INTRO_KEY = "portfolio-intro";

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

export async function getPortfolioIntro(): Promise<PortfolioIntroConfig> {
  try {
    const row = await db.siteConfig.findUnique({ where: { key: PORTFOLIO_INTRO_KEY } });
    if (row && isPortfolioIntroConfig(row.value)) return row.value;
  } catch {
    // Keep public pages usable when database is unavailable.
  }

  return defaultPortfolioIntro;
}

export async function getPortfolioProjects() {
  try {
    return await db.project.findMany({ orderBy: { updatedAt: "desc" } });
  } catch {
    return [];
  }
}
