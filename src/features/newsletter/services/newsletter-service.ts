import "server-only";

import db from "@/lib/db";

const NEWSLETTER_SOURCE = "blog-sidebar";

export async function subscribeToNewsletter(email: string) {
  return db.subscriber.upsert({
    where: { email },
    update: { active: true },
    create: { email, source: NEWSLETTER_SOURCE },
  });
}
