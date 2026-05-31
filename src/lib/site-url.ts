const DEFAULT_SITE_URL = "https://buildwithreys.tech";

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
}

export function absoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function sameOriginCanonical(candidate: string | null | undefined, fallbackPath: string) {
  const fallback = absoluteUrl(fallbackPath);
  if (!candidate) return fallback;

  try {
    const site = new URL(getSiteUrl());
    const url = new URL(candidate);
    return url.hostname === site.hostname ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}
