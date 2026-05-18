import React from "react";
import Image from "next/image";
import type { PublicTestimonial } from "@/lib/testimonials";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const TestimonialsSection = ({ testimonials }: { testimonials: PublicTestimonial[] }) => {
  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="w-full bg-[#f7f9fb] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-blue-600">
            Testimoni
          </p>
          <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            Dipercaya Para Founder
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            Feedback dari klien yang mempercayakan website, dashboard, dan sistem bisnis mereka.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((item) => (
            <article key={`${item.name}-${item.title}`} className="rounded-lg border border-slate-200 bg-white p-7">
              <div className="mb-5 flex gap-1 text-amber-400" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-base leading-relaxed text-slate-700">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-7 flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-100 text-sm font-bold text-blue-600">
                  {item.img ? (
                    <Image src={item.img} alt={item.name} fill className="object-cover" sizes="44px" />
                  ) : (
                    getInitials(item.name)
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-950">{item.name}</p>
                  <p className="text-xs font-medium text-slate-500">{item.title}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
