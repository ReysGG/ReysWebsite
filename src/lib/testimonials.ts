import db from "@/lib/db";

export type PublicTestimonial = {
  quote: string;
  name: string;
  title: string;
  img?: string;
};

export async function getPublicTestimonials(limit = 8): Promise<PublicTestimonial[]> {
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
}

export async function getPublicTestimonialsCount(): Promise<number> {
  try {
    return await db.testimonial.count();
  } catch {
    return 0;
  }
}
