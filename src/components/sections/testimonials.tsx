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

function TestimonialCard({ item }: { item: PublicTestimonial }) {
  return (
    <article className="w-[320px] shrink-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ffcd80] hover:shadow-xl hover:shadow-[#ffcd80]/30 md:w-[380px]">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex gap-1 text-[#f4b738]" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="rounded-md border border-[#ffcd80] bg-[#fffcc9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ff8a00]">
          Verified
        </span>
      </div>

      <p className="line-clamp-5 min-h-[140px] text-sm leading-7 text-slate-700 md:text-base">
        &ldquo;{item.quote}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-[#fffcc9] text-sm font-bold text-[#ff8a00]">
          {item.img ? (
            <Image src={item.img} alt={item.name} fill className="object-cover" sizes="44px" />
          ) : (
            getInitials(item.name)
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-950">{item.name}</p>
          <p className="truncate text-xs font-medium text-slate-500">{item.title}</p>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({ items, reverse = false }: { items: PublicTestimonial[]; reverse?: boolean }) {
  const loopItems = [...items, ...items];

  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={[
          "flex min-w-max gap-5 pr-5 motion-safe:animate-[testimonialMarquee_38s_linear_infinite] group-hover:[animation-play-state:paused]",
          reverse ? "[animation-direction:reverse]" : "",
        ].join(" ")}
      >
        {loopItems.map((item, index) => (
          <TestimonialCard key={`${item.name}-${item.title}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export const TestimonialsSection = ({ testimonials }: { testimonials: PublicTestimonial[] }) => {
  if (!testimonials.length) return null;

  const midpoint = Math.ceil(testimonials.length / 2);
  const firstRow = testimonials.slice(0, midpoint);
  const secondRow = testimonials.slice(midpoint).length ? testimonials.slice(midpoint) : testimonials;

  return (
    <section id="testimonials" className="w-full overflow-hidden bg-[#f7f9fb] py-20 md:py-28">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#ff8a00]">
            Testimoni
          </p>
          <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            Dipercaya Para Founder
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            Feedback dari klien yang mempercayakan website, dashboard, dan sistem bisnis mereka.
          </p>
        </div>

        <div className="relative rounded-lg border border-slate-200 bg-white/70 py-6 shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white via-white/80 to-transparent" />
          <div className="space-y-5">
            <MarqueeRow items={firstRow} />
            <MarqueeRow items={secondRow} reverse />
          </div>
        </div>
      </div>
    </section>
  );
};
