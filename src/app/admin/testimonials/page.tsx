import { TestimonialsAdminView } from "@/features/admin/components/testimonials/testimonials-admin-view";
import { getAdminTestimonialsData } from "@/features/admin/services/testimonial-service";

export default async function ManageTestimonialsPage() {
  const data = await getAdminTestimonialsData();

  return <TestimonialsAdminView data={data} />;
}
