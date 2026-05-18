import { unstable_cache } from "next/cache";
import db from "@/lib/db";

export const TESTIMONIALS_TAG = "public-testimonials";

export type PublicTestimonial = {
  quote: string;
  name: string;
  title: string;
  img?: string;
};

export const getPublicTestimonials = unstable_cache(
  async (limit = 8): Promise<PublicTestimonial[]> => {
    try {
      const testimonials = await db.testimonial.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
      });

      return testimonials.map((item) => ({
        quote: item.content,
        name: item.name,
        title: item.role,
        img: item.avatar || undefined,
      }));
    } catch {
      return [];
    }
  },
  ["public-testimonials"],
  { tags: [TESTIMONIALS_TAG], revalidate: 3600 },
);

export const getPublicTestimonialsCount = unstable_cache(
  async (): Promise<number> => {
    try {
      return await db.testimonial.count();
    } catch {
      return 0;
    }
  },
  ["public-testimonials-count"],
  { tags: [TESTIMONIALS_TAG], revalidate: 3600 },
);
