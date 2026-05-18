import type { SiteSettings } from "@/lib/site-settings";

type SocialPlatform = "instagram" | "twitter" | "linkedin" | "github";

const SOCIAL_BASE_URL: Record<SocialPlatform, string> = {
  instagram: "https://instagram.com/",
  twitter: "https://x.com/",
  linkedin: "https://linkedin.com/in/",
  github: "https://github.com/",
};

const SOCIAL_HOSTS: Record<SocialPlatform, string[]> = {
  instagram: ["instagram.com", "www.instagram.com"],
  twitter: ["x.com", "www.x.com", "twitter.com", "www.twitter.com"],
  linkedin: ["linkedin.com", "www.linkedin.com"],
  github: ["github.com", "www.github.com"],
};

function ensureProtocol(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function isProbablyDomain(value: string) {
  return /^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(value);
}

function cleanUsername(value: string, platform: SocialPlatform) {
  const trimmed = value.trim().replace(/^@+/, "");
  const withoutPlatformPath = trimmed
    .replace(/^\/+/, "")
    .replace(/^in\//i, "")
    .replace(/^company\//i, "company/");

  if (platform === "linkedin") {
    return withoutPlatformPath
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9._/-]/gi, "")
      .replace(/\/+/g, "/");
  }

  return withoutPlatformPath.replace(/\s+/g, "").replace(/[^a-z0-9._-]/gi, "");
}

export function normalizeSocialUrl(value: string | undefined, platform: SocialPlatform) {
  const raw = value?.trim();
  if (!raw) return "";

  if (/^mailto:/i.test(raw)) return "";

  if (/^https?:\/\//i.test(raw) || isProbablyDomain(raw)) {
    try {
      const url = new URL(ensureProtocol(raw));
      const hostAllowed = SOCIAL_HOSTS[platform].some((host) => url.hostname.toLowerCase() === host);
      if (hostAllowed) return url.toString();
    } catch {
      // Fall back to username handling below.
    }
  }

  const username = cleanUsername(raw, platform);
  if (!username) return "";

  if (platform === "linkedin" && username.startsWith("company/")) {
    return `https://linkedin.com/${username}`;
  }

  return `${SOCIAL_BASE_URL[platform]}${username}`;
}

export function normalizeWhatsappUrl(value: string | undefined) {
  const raw = value?.trim();
  if (!raw) return "";

  if (/^https?:\/\//i.test(raw)) return raw;

  const digits = raw.replace(/[^\d+]/g, "");
  if (!digits) return "";

  let phone = digits.replace(/^\+/, "");
  if (phone.startsWith("0")) phone = `62${phone.slice(1)}`;

  return `https://wa.me/${phone}`;
}

export function normalizeEmailLink(value: string | undefined) {
  const raw = value?.trim();
  if (!raw) return "";
  if (/^mailto:/i.test(raw)) return raw;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return "";
  return `mailto:${raw}`;
}

export function normalizeSiteSettings(settings: SiteSettings): SiteSettings {
  return {
    ...settings,
    whatsapp: normalizeWhatsappUrl(settings.whatsapp),
    instagram: normalizeSocialUrl(settings.instagram, "instagram"),
    twitter: normalizeSocialUrl(settings.twitter, "twitter"),
    linkedin: normalizeSocialUrl(settings.linkedin, "linkedin"),
    github: normalizeSocialUrl(settings.github, "github"),
  };
}
