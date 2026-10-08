import { stripHtml } from "@/features/blog/lib/reading-time";

/** Deterministic on-page SEO checker. Pure function so both the AI tools and the UI can use it. */
export type SeoAuditInput = {
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  metaTitle?: string | null;
  metaDesc?: string | null;
  focusKeyword?: string | null;
  coverImage?: string | null;
  tags?: string[];
};

export type SeoAuditOptions = {
  minWords: number;
  maxWords: number;
  internalLinks: number;
  externalLinks: number;
  requireFaq: boolean;
  siteHost?: string;
};

export type SeoCheck = { id: string; label: string; passed: boolean; weight: number; detail: string };

export type SeoAuditResult = {
  score: number;
  wordCount: number;
  keywordDensity: number;
  checks: SeoCheck[];
  issues: string[];
};

function normalize(value: string) {
  return value.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}

function slugify(value: string) {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function countOccurrences(haystack: string, needle: string) {
  if (!needle) return 0;
  let count = 0;
  let index = haystack.indexOf(needle);
  while (index !== -1) {
    count += 1;
    index = haystack.indexOf(needle, index + needle.length);
  }
  return count;
}

function matchAll(html: string, pattern: RegExp) {
  return Array.from(html.matchAll(pattern));
}

export function auditSeo(input: SeoAuditInput, options: SeoAuditOptions): SeoAuditResult {
  const keyword = normalize(input.focusKeyword ?? "");
  const text = stripHtml(input.content);
  const normalizedText = normalize(text);
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const metaTitle = (input.metaTitle || input.title || "").trim();
  const metaDesc = (input.metaDesc || "").trim();

  const headings = matchAll(input.content, /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi).map((m) => ({ level: Number(m[1]), text: normalize(stripHtml(m[2])) }));
  const h2Count = headings.filter((h) => h.level === 2).length;
  const h1InContent = headings.some((h) => h.level === 1);
  const paragraphs = matchAll(input.content, /<p[^>]*>([\s\S]*?)<\/p>/gi).map((m) => stripHtml(m[1])).filter(Boolean);
  const firstParagraph = normalize(paragraphs[0] ?? words.slice(0, 120).join(" "));
  const longParagraphs = paragraphs.filter((p) => p.split(/\s+/).length > 150).length;

  const links = matchAll(input.content, /<a\s[^>]*href\s*=\s*["']([^"']+)["']/gi).map((m) => m[1]);
  const siteHost = options.siteHost?.toLowerCase();
  const isInternal = (href: string) => href.startsWith("/") || (siteHost ? href.toLowerCase().includes(siteHost) : false);
  const internalLinks = links.filter(isInternal).length;
  const externalLinks = links.filter((href) => /^https?:\/\//i.test(href) && !isInternal(href)).length;

  const images = matchAll(input.content, /<img\s[^>]*>/gi).map((m) => m[0]);
  const imagesWithoutAlt = images.filter((img) => !/\balt\s*=\s*["'][^"']+["']/i.test(img)).length;

  const keywordWords = keyword ? keyword.split(" ").length : 0;
  const keywordHits = countOccurrences(normalizedText, keyword);
  const keywordDensity = wordCount > 0 && keyword ? Math.round(((keywordHits * keywordWords) / wordCount) * 1000) / 10 : 0;
  const hasFaq = headings.some((h) => /faq|pertanyaan|tanya jawab|frequently asked/.test(h.text));

  const checks: SeoCheck[] = [];
  const add = (id: string, label: string, passed: boolean, weight: number, detail: string) => checks.push({ id, label, passed, weight, detail });

  add("keyword", "Focus keyword diisi", Boolean(keyword), 5, keyword ? `"${input.focusKeyword}"` : "Isi focusKeyword.");
  add("metaTitleLength", "Meta title 50–60 karakter", metaTitle.length >= 45 && metaTitle.length <= 62, 8, `${metaTitle.length} karakter.`);
  add("keywordInTitle", "Keyword ada di meta title", Boolean(keyword) && normalize(metaTitle).includes(keyword), 8, "Taruh keyword di awal meta title.");
  add("metaDescLength", "Meta description 140–160 karakter", metaDesc.length >= 130 && metaDesc.length <= 162, 8, `${metaDesc.length} karakter.`);
  add("keywordInMetaDesc", "Keyword ada di meta description", Boolean(keyword) && normalize(metaDesc).includes(keyword), 5, "Sebut keyword secara natural di meta description.");
  add("keywordInSlug", "Keyword ada di slug", Boolean(keyword) && input.slug.includes(slugify(keyword)), 5, `Slug: ${input.slug}`);
  add("keywordInIntro", "Keyword di paragraf pertama", Boolean(keyword) && firstParagraph.includes(keyword), 7, "Sebut keyword di 100 kata pertama.");
  add("keywordInHeading", "Keyword di minimal satu H2/H3", Boolean(keyword) && headings.some((h) => h.level <= 3 && h.text.includes(keyword)), 6, "Gunakan keyword (atau variasinya) di subjudul.");
  add("keywordDensity", "Keyword density 0.5–2.5%", keywordDensity >= 0.5 && keywordDensity <= 2.5, 6, `${keywordDensity}% (${keywordHits}x).`);
  add("wordCount", `Panjang ${options.minWords}–${options.maxWords} kata`, wordCount >= options.minWords && wordCount <= Math.round(options.maxWords * 1.2), 10, `${wordCount} kata.`);
  add("structure", "Minimal 3 H2 & tanpa H1 di konten", h2Count >= 3 && !h1InContent, 6, `${h2Count} H2${h1InContent ? ", ada H1 di konten (hapus — judul sudah H1)" : ""}.`);
  add("internalLinks", `Minimal ${options.internalLinks} internal link`, internalLinks >= options.internalLinks, 6, `${internalLinks} internal link.`);
  add("externalLinks", `Minimal ${options.externalLinks} external link otoritatif`, externalLinks >= options.externalLinks, 3, `${externalLinks} external link.`);
  add("imageAlt", "Semua gambar punya alt text", imagesWithoutAlt === 0, 4, imagesWithoutAlt ? `${imagesWithoutAlt} gambar tanpa alt.` : `${images.length} gambar OK.`);
  add("coverImage", "Cover image ada", Boolean(input.coverImage), 4, input.coverImage ? "OK" : "Tambahkan cover image.");
  add("paragraphs", "Paragraf pendek (≤150 kata)", longParagraphs === 0, 4, longParagraphs ? `${longParagraphs} paragraf terlalu panjang.` : "OK");
  if (options.requireFaq) add("faq", "Ada section FAQ", hasFaq, 3, hasFaq ? "OK" : "Tambahkan H2 FAQ dengan 3–5 pertanyaan.");
  add("excerpt", "Excerpt diisi", Boolean(input.excerpt?.trim()), 2, input.excerpt ? "OK" : "Isi excerpt 1–2 kalimat.");
  add("tags", "Minimal 3 tag", (input.tags?.length ?? 0) >= 3, 2, `${input.tags?.length ?? 0} tag.`);

  const total = checks.reduce((sum, c) => sum + c.weight, 0);
  const earned = checks.reduce((sum, c) => sum + (c.passed ? c.weight : 0), 0);

  return {
    score: Math.round((earned / total) * 100),
    wordCount,
    keywordDensity,
    checks,
    issues: checks.filter((c) => !c.passed).map((c) => `${c.label}: ${c.detail}`),
  };
}
