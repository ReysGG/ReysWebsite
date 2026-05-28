export const DEFAULT_SHOWCASE_CATEGORIES = [
  'Company Profile',
  'Landing Page',
  'Dashboard',
  'E-Commerce',
  'Portfolio',
  'Blog',
];

export const SHOWCASE_TITLE_MIN_LENGTH = 3;
export const SHOWCASE_DESCRIPTION_MIN_LENGTH = 10;
export const SHOWCASE_MAX_SLUG_LENGTH = 80;
export const SHOWCASE_MAX_TAGS = 10;
export const SHOWCASE_HTML_UPLOAD_ENDPOINT = '/api/upload/showcase';
export const SHOWCASE_IMAGE_UPLOAD_ENDPOINT = '/api/upload';
export const SHOWCASE_THUMBNAIL_FOLDER = 'showcase-thumb';

export function slugifyShowcase(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, SHOWCASE_MAX_SLUG_LENGTH);
}

export function parseShowcaseTags(value: string) {
  return Array.from(new Set(value.split(',').map((tag) => tag.trim()).filter(Boolean))).slice(0, SHOWCASE_MAX_TAGS);
}

export function looksLikeShowcaseHtml(content: string) {
  const head = content.slice(0, 2000).toLowerCase();
  return head.includes('<!doctype html') || /<html[\s>]/.test(head) || /<body[\s>]/.test(head);
}

export function getShowcaseCategoryOptions(categories: string[] = []) {
  return Array.from(new Set([...categories, ...DEFAULT_SHOWCASE_CATEGORIES].filter(Boolean))).sort((a, b) => a.localeCompare(b));
}
