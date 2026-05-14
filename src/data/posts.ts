import db from "@/lib/db";

export async function getAdminPosts() {
  return db.post.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getPostById(id: string) {
  return db.post.findUnique({ where: { id } });
}
