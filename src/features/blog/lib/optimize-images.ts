const SUPABASE_STORAGE_PATTERN = /\/storage\/v1\/object\/(public|sign)\//;

function transformSupabaseUrl(rawSrc: string): string {
  if (!SUPABASE_STORAGE_PATTERN.test(rawSrc)) return rawSrc;

  try {
    const url = new URL(rawSrc, "https://placeholder.local");
    if (url.searchParams.has("width")) return rawSrc;

    url.pathname = url.pathname.replace(
      "/storage/v1/object/",
      "/storage/v1/render/image/",
    );
    url.searchParams.set("width", "1200");
    url.searchParams.set("quality", "75");
    url.searchParams.set("resize", "contain");
    return url.toString();
  } catch {
    return rawSrc;
  }
}

function escapeAttr(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

export function optimizeArticleImages(html: string): string {
  return html.replace(/<img\b([^>]*)\/?>/gi, (_match, rawAttrs: string) => {
    const attrs = parseAttrs(rawAttrs);
    const src = attrs.src ?? "";
    if (!src) return "";

    attrs.src = transformSupabaseUrl(src);
    if (!attrs.loading) attrs.loading = "lazy";
    if (!attrs.decoding) attrs.decoding = "async";

    const serialized = Object.entries(attrs)
      .map(([key, value]) => `${key}="${escapeAttr(value)}"`)
      .join(" ");
    return `<img ${serialized} />`;
  });
}

function parseAttrs(raw: string): Record<string, string> {
  const out: Record<string, string> = {};
  const pattern = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("[^"]*"|'[^']*'|[^\s"'>]+)/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(raw))) {
    const name = match[1].toLowerCase();
    const value = match[2].replace(/^['"]|['"]$/g, "");
    out[name] = value;
  }
  return out;
}
