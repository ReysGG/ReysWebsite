import "server-only";

import db from "@/lib/db";

export async function getAdminPortfolioProjectById(id: string) {
  return db.project.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      gifUrl: true,
      link: true,
    },
  });
}
