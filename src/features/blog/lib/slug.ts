import db from "@/lib/db";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugifyTitle(title: string) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-") || "post";
}

export function isValidSlug(slug: string) {
  return SLUG_PATTERN.test(slug);
}

export function buildKeywordSlug(title: string, focusKeyword?: string | null) {
  const keyword = focusKeyword?.trim();
  if (!keyword) return slugifyTitle(title);

  const keywordSlug = slugifyTitle(keyword);
  const titleSlug = slugifyTitle(title);

  if (titleSlug === keywordSlug || titleSlug.startsWith(`${keywordSlug}-`)) {
    return titleSlug;
  }

  return slugifyTitle(`${keywordSlug} ${title}`);
}

export async function ensureUniquePostSlug(baseSlug: string, excludePostId?: string) {
  const normalized = slugifyTitle(baseSlug);
  let candidate = normalized;
  let suffix = 2;

  while (true) {
    const existing = await db.post.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || existing.id === excludePostId) return candidate;

    candidate = `${normalized}-${suffix}`;
    suffix += 1;
  }
}
