export function stripHtml(content: string) {
  return content
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function calculateReadingTime(content: string) {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getExcerptFromHtml(content: string, max = 160) {
  const text = stripHtml(content);
  if (text.length <= max) return text;

  const truncated = text.slice(0, max).replace(/\s+\S*$/, "").trim();
  return `${truncated || text.slice(0, max).trim()}…`;
}
