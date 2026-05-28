import "server-only";

import db from "@/lib/db";
import { getTestimonialStats } from "@/features/admin/lib/testimonials";
import type { AdminTestimonialsData } from "@/features/admin/types/testimonials";

const testimonialSelect = {
  id: true,
  name: true,
  role: true,
  content: true,
  avatar: true,
  createdAt: true,
} as const;

export async function getAdminTestimonialsData(): Promise<AdminTestimonialsData> {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: { createdAt: "desc" },
      select: testimonialSelect,
    });
    const stats = getTestimonialStats(testimonials);

    return {
      testimonials,
      ...stats,
      databaseError: false,
    };
  } catch {
    return {
      testimonials: [],
      withAvatar: 0,
      avgLength: 0,
      featured: [],
      databaseError: true,
    };
  }
}

export async function getAdminTestimonialById(id: string) {
  return db.testimonial.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      role: true,
      content: true,
      avatar: true,
    },
  });
}
