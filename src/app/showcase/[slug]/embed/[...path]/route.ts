import { NextRequest } from "next/server";
import { getPublishedShowcaseItem } from "@/features/showcase/data";

type RouteContext = {
  params: Promise<{ slug: string; path: string[] }>;
};

const MAX_ASSET_BYTES = 5 * 1024 * 1024;

const ALLOWED_CONTENT_TYPE_PREFIXES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
  "image/avif",
  "image/x-icon",
  "image/vnd.microsoft.icon",
  "text/css",
  "text/plain",
  "application/javascript",
  "text/javascript",
  "application/json",
  "font/",
  "application/font-woff",
  "application/font-woff2",
  "application/x-font-woff",
  "application/octet-stream",
];

function isAllowedContentType(contentType: string | null) {
  if (!contentType) return false;
  const normalized = contentType.split(";")[0].trim().toLowerCase();
  return ALLOWED_CONTENT_TYPE_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

function isAllowedHtmlSource(url: URL, requestUrl: URL) {
  if (url.origin === requestUrl.origin) return true;

  const projectRef = process.env.SUPABASE_PROJECT_REF;
  if (!projectRef) return false;

  return (
    url.hostname === `${projectRef}.supabase.co` ||
    url.hostname === `${projectRef}.storage.supabase.co`
  );
}

function resolveHtmlSourceUrl(rawUrl: string, requestUrl: URL) {
  const sourceUrl = rawUrl.startsWith("/")
    ? new URL(rawUrl, requestUrl.origin)
    : new URL(rawUrl);

  if (sourceUrl.protocol !== "https:" && sourceUrl.protocol !== "http:") {
    throw new Error("Protocol asset showcase tidak didukung.");
  }

  if (!isAllowedHtmlSource(sourceUrl, requestUrl)) {
    throw new Error("Domain asset showcase tidak diizinkan.");
  }

  return sourceUrl;
}

function hasTraversalSegment(segments: string[]) {
  return segments.some((segment) => {
    if (!segment) return true;
    let decoded = segment;
    try {
      decoded = decodeURIComponent(segment);
    } catch {
      return true;
    }
    if (decoded === "." || decoded === "..") return true;
    if (decoded.includes("/") || decoded.includes("\\")) return true;
    if (decoded.includes("\u0000")) return true;
    return false;
  });
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { slug, path } = await params;

  if (!Array.isArray(path) || path.length === 0 || hasTraversalSegment(path)) {
    return new Response("Path asset showcase tidak valid.", { status: 400 });
  }

  const item = await getPublishedShowcaseItem(slug);

  if (!item) {
    return new Response("Showcase tidak ditemukan.", { status: 404 });
  }

  let sourceUrl: URL;
  try {
    const htmlUrl = resolveHtmlSourceUrl(item.htmlPath, req.nextUrl);
    sourceUrl = new URL(path.map(encodeURIComponent).join("/"), htmlUrl);
  } catch (error) {
    return new Response(error instanceof Error ? error.message : "URL asset showcase tidak valid.", { status: 400 });
  }

  if (!isAllowedHtmlSource(sourceUrl, req.nextUrl)) {
    return new Response("Domain asset showcase tidak diizinkan.", { status: 400 });
  }

  // Pastikan path setelah resolve tidak naik keluar dari directory file HTML.
  const htmlSourceUrl = resolveHtmlSourceUrl(item.htmlPath, req.nextUrl);
  const allowedPathPrefix = htmlSourceUrl.pathname.replace(/\/[^/]*$/, "/");
  if (!sourceUrl.pathname.startsWith(allowedPathPrefix)) {
    return new Response("Path asset showcase tidak valid.", { status: 400 });
  }

  const upstream = await fetch(sourceUrl, {
    next: { revalidate: 3600 },
    redirect: "follow",
  }).catch(() => null);

  if (!upstream || !upstream.ok) {
    return new Response("Asset showcase tidak bisa diakses.", { status: upstream?.status || 502 });
  }

  const contentType = upstream.headers.get("content-type");
  if (!isAllowedContentType(contentType)) {
    return new Response("Tipe asset showcase tidak diizinkan.", { status: 415 });
  }

  const bytes = await upstream.arrayBuffer();
  if (bytes.byteLength > MAX_ASSET_BYTES) {
    return new Response("Asset showcase terlalu besar.", { status: 413 });
  }

  const headers = new Headers();
  headers.set("Content-Type", contentType ?? "application/octet-stream");
  headers.set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src data:; sandbox");
  headers.set("Content-Disposition", "inline");

  return new Response(bytes, { headers });
}

