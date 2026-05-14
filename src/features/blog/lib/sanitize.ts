const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "s", "blockquote", "pre", "code",
  "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6", "a", "img", "figure",
  "figcaption", "hr", "span", "div",
]);

const ALLOWED_ATTRS = new Set(["href", "src", "alt", "title", "target", "rel", "class"]);

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sanitizeAttrs(attrs: string, tagName: string) {
  const cleaned: string[] = [];
  const attrPattern = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("[^"]*"|'[^']*'|[^\s"'>]+)/g;
  let match: RegExpExecArray | null;

  while ((match = attrPattern.exec(attrs))) {
    const name = match[1].toLowerCase();
    if (name.startsWith("on") || !ALLOWED_ATTRS.has(name)) continue;

    const raw = match[2].replace(/^['"]|['"]$/g, "").trim();
    if ((name === "href" || name === "src") && /^(javascript|data:text\/html)/i.test(raw)) continue;
    if (name === "src" && tagName === "img" && !/^(https?:|\/|data:image\/(png|jpe?g|gif|webp);base64,)/i.test(raw)) continue;

    const safeValue = raw.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
    cleaned.push(`${name}="${safeValue}"`);
  }

  if (tagName === "a") {
    cleaned.push('rel="noopener noreferrer"');
  }

  return cleaned.length ? ` ${Array.from(new Set(cleaned)).join(" ")}` : "";
}

/**
 * Conservative rich-text sanitizer for trusted admin-authored blog HTML.
 * This regex fallback removes active content and only keeps common formatting tags
 * plus a small attribute allowlist. Prefer a full HTML sanitizer if one is added.
 */
export function sanitizeRichText(html: string) {
  return html
    .replace(/<\/?(script|style|iframe|object|embed|form|input|button|textarea|select|link|meta)[\s\S]*?>/gi, "")
    .replace(/<!--([\s\S]*?)-->/g, "")
    .replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (full, tag: string, attrs: string) => {
      const tagName = tag.toLowerCase();
      if (!ALLOWED_TAGS.has(tagName)) return escapeHtml(full);
      const closing = full.startsWith("</");
      if (closing) return `</${tagName}>`;
      const selfClosing = full.endsWith("/>") || tagName === "br" || tagName === "hr" || tagName === "img";
      return `<${tagName}${sanitizeAttrs(attrs, tagName)}${selfClosing ? " /" : ""}>`;
    })
    .replace(/\s(on[a-z]+)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, "");
}
