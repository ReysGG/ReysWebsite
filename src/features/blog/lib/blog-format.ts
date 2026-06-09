/**
 * Presentation helpers shared across blog card/list components.
 * Kept in a non-component module so files importing them stay Fast-Refresh friendly.
 */

export const formatBlogDate = (date: Date) =>
  new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(date);

export const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

export const getReadingTime = (post: { readingTime: number }) =>
  `${Math.max(1, post.readingTime)} min read`;

export const getPostDate = (post: { publishedAt: Date | null; createdAt: Date }) =>
  post.publishedAt || post.createdAt;
