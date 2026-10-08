import "server-only";

/** Stock photo search (Unsplash + Pexels). Keys come from env; each source is optional. */
export type StockImage = {
  id: string; // "unsplash:<id>" | "pexels:<id>"
  source: "unsplash" | "pexels";
  url: string; // full-size download URL
  thumbUrl: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
  creditUrl: string;
  downloadLocation?: string; // Unsplash: must be pinged when the photo is used
};

type UnsplashPhoto = {
  id: string;
  alt_description: string | null;
  description: string | null;
  width: number;
  height: number;
  urls: { raw: string; small: string };
  user: { name: string; links: { html: string } };
  links: { download_location: string };
};

type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  alt: string;
  photographer: string;
  photographer_url: string;
  src: { large2x: string; medium: string };
};

export function getStockSources() {
  return {
    unsplash: Boolean(process.env.UNSPLASH_ACCESS_KEY),
    pexels: Boolean(process.env.PEXELS_API_KEY),
  };
}

async function searchUnsplash(query: string, perPage: number): Promise<StockImage[]> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return [];
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("content_filter", "high");
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${key}`, "Accept-Version": "v1" }, signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`Unsplash HTTP ${res.status}`);
  const json = (await res.json()) as { results?: UnsplashPhoto[] };
  return (json.results ?? []).map((photo) => ({
    id: `unsplash:${photo.id}`,
    source: "unsplash",
    url: `${photo.urls.raw}&w=1600&fm=jpg&q=80&fit=max`,
    thumbUrl: photo.urls.small,
    alt: photo.alt_description || photo.description || query,
    width: photo.width,
    height: photo.height,
    credit: `Foto oleh ${photo.user.name} di Unsplash`,
    creditUrl: `${photo.user.links.html}?utm_source=buildwithreys&utm_medium=referral`,
    downloadLocation: photo.links.download_location,
  }));
}

async function searchPexels(query: string, perPage: number): Promise<StockImage[]> {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return [];
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("orientation", "landscape");
  const res = await fetch(url, { headers: { Authorization: key }, signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`Pexels HTTP ${res.status}`);
  const json = (await res.json()) as { photos?: PexelsPhoto[] };
  return (json.photos ?? []).map((photo) => ({
    id: `pexels:${photo.id}`,
    source: "pexels",
    url: photo.src.large2x,
    thumbUrl: photo.src.medium,
    alt: photo.alt || query,
    width: photo.width,
    height: photo.height,
    credit: `Foto oleh ${photo.photographer} di Pexels`,
    creditUrl: photo.photographer_url,
  }));
}

export async function searchStockImages(query: string, limit = 6) {
  const perSource = Math.max(2, Math.ceil(limit / 2));
  const settled = await Promise.allSettled([searchUnsplash(query, perSource), searchPexels(query, perSource)]);
  const images = settled.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
  const errors = settled.flatMap((r) => (r.status === "rejected" ? [String(r.reason?.message ?? r.reason)] : []));
  return { images: images.slice(0, limit), errors };
}

/** Unsplash API guideline: trigger the download endpoint when a photo is actually used. */
export async function trackUnsplashDownload(downloadLocation?: string) {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key || !downloadLocation) return;
  await fetch(downloadLocation, { headers: { Authorization: `Client-ID ${key}` }, signal: AbortSignal.timeout(10_000) }).catch(() => undefined);
}
