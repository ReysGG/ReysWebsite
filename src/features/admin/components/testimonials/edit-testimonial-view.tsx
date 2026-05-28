import Link from "next/link";
import { ArrowLeft, MessageSquareQuote } from "lucide-react";
import { updateTestimonial } from "@/features/admin/actions/testimonial-actions";
import { TestimonialForm } from "@/features/admin/components/testimonials/testimonial-form";

type EditTestimonialViewProps = {
  testimonial: {
    id: string;
    name: string;
    role: string;
    content: string;
    avatar: string | null;
  };
};

export function EditTestimonialView({ testimonial }: EditTestimonialViewProps) {
  const action = updateTestimonial.bind(null, testimonial.id);

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <Link href="/admin/testimonials" className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-[#ff8a00]">
          <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Testimoni
        </Link>
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#fffcc9] text-[#ff8a00]">
            <MessageSquareQuote className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Social Proof</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Edit Testimoni</h1>
            <p className="mt-1 text-sm text-neutral-500">Perbarui detail testimoni dari {testimonial.name}.</p>
          </div>
        </div>
      </div>

      <TestimonialForm
        action={action}
        submitLabel="Update Testimoni"
        defaultValue={{
          name: testimonial.name,
          role: testimonial.role,
          content: testimonial.content,
          avatar: testimonial.avatar,
        }}
      />
    </div>
  );
}
