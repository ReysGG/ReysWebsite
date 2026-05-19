import { NextRequest } from "next/server";
import { unstable_cache } from "next/cache";
import { getPublishedShowcaseItem, SHOWCASE_TAG } from "@/features/showcase/data";

const MAX_HTML_BYTES = 2 * 1024 * 1024;

type RouteContext = {
  params: Promise<{ slug: string }>;
};

class ShowcaseHtmlFetchError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
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
    throw new Error("Protocol HTML showcase tidak didukung.");
  }

  if (!isAllowedHtmlSource(sourceUrl, requestUrl)) {
    throw new Error("Domain HTML showcase tidak diizinkan.");
  }

  return sourceUrl;
}

function injectBaseHref(html: string, baseHref: string) {
  const baseTag = /<base\s/i.test(html) ? "" : `<base href="${baseHref}" target="_self">`;
  const interceptor = `<script>(function(){document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a');if(!a)return;var h=a.getAttribute('href');if(h&&h.charAt(0)==='#'&&h.length>1){e.preventDefault();try{var el=document.querySelector(h);if(el&&el.scrollIntoView)el.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'',h);}catch(_){}}},true);})();</script>`;
  const injection = `${baseTag}${interceptor}`;

  if (!injection) return html;

  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head([^>]*)>/i, `<head$1>${injection}`);
  }

  if (/<html[^>]*>/i.test(html)) {
    return html.replace(/<html([^>]*)>/i, `<html$1><head>${injection}</head>`);
  }

  return `<head>${injection}</head>${html}`;
}

const getCachedShowcaseHtml = unstable_cache(
  async (sourceHref: string) => {
    const sourceUrl = new URL(sourceHref);
    const upstream = await fetch(sourceUrl, {
      next: { revalidate: 3600, tags: [SHOWCASE_TAG] },
      redirect: "follow",
    }).catch(() => null);

    if (!upstream || !upstream.ok) {
      throw new ShowcaseHtmlFetchError("File HTML showcase tidak bisa diakses.", upstream?.status || 502);
    }

    const bytes = await upstream.arrayBuffer();
    if (bytes.byteLength > MAX_HTML_BYTES) {
      throw new ShowcaseHtmlFetchError("File HTML showcase terlalu besar.", 413);
    }

    return new TextDecoder("utf-8").decode(bytes);
  },
  ["showcase-embed-html"],
  { tags: [SHOWCASE_TAG], revalidate: 3600 },
);

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const item = await getPublishedShowcaseItem(slug);

  if (!item) {
    return new Response("Showcase tidak ditemukan.", { status: 404 });
  }

  let sourceUrl: URL;
  try {
    sourceUrl = resolveHtmlSourceUrl(item.htmlPath, req.nextUrl);
  } catch (error) {
    return new Response(error instanceof Error ? error.message : "URL showcase tidak valid.", { status: 400 });
  }

  if (sourceUrl.pathname === `/showcase/${slug}/embed`) {
    return new Response("URL showcase tidak boleh mengarah ke embed route sendiri.", { status: 400 });
  }

  let html: string;
  try {
    html = await getCachedShowcaseHtml(sourceUrl.href);
  } catch (error) {
    if (error instanceof ShowcaseHtmlFetchError) {
      return new Response(error.message, { status: error.status });
    }
    return new Response("File HTML showcase tidak bisa diakses.", { status: 502 });
  }

  // Base href dipoint ke embed URL (same-origin) supaya:
  // - Fragment link (#anchor) tetap di iframe yang sama, tidak navigate ke Supabase
  // - Relative asset (images/x.png) di-proxy via /showcase/[slug]/embed/x.png
  const baseHref = new URL(`/showcase/${slug}/embed/`, req.nextUrl.origin).toString();
  const finalHtml = injectBaseHref(html, baseHref);

  return new Response(finalHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Security-Policy": "frame-ancestors 'self'",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
}
