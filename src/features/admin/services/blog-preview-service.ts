import "server-only";

import db from "@/lib/db";
import { getRelatedPosts } from "@/features/blog/data/posts";

export async function getAdminBlogPreviewData(slug: string) {
  const post = await db.post.findUnique({ where: { slug } });
  const related = post ? await getRelatedPosts(post).catch(() => []) : [];

  return { post, related };
}
