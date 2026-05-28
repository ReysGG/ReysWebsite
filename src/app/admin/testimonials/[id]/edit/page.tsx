import { notFound } from "next/navigation";
import { EditTestimonialView } from "@/features/admin/components/testimonials/edit-testimonial-view";
import { getAdminTestimonialById } from "@/features/admin/services/testimonial-service";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await getAdminTestimonialById(id);

  if (!testimonial) notFound();

  return <EditTestimonialView testimonial={testimonial} />;
}
