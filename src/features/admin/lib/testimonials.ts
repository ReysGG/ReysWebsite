import type { AdminTestimonial } from "@/features/admin/types/testimonials";

export const FEATURED_TESTIMONIAL_LIMIT = 3;

export function getTestimonialInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function formatTestimonialDate(date: Date) {
  return new Date(date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export function getTestimonialStats(testimonials: AdminTestimonial[]) {
  const withAvatar = testimonials.filter((item) => Boolean(item.avatar)).length;
  const avgLength = testimonials.length ? Math.round(testimonials.reduce((sum, item) => sum + item.content.length, 0) / testimonials.length) : 0;
  const featured = testimonials.slice(0, FEATURED_TESTIMONIAL_LIMIT);

  return { withAvatar, avgLength, featured };
}
