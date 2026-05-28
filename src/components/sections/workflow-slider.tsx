"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import discoveryImage from "@/assets/workflow/workflow-discovery.webp";
import scopeImage from "@/assets/workflow/workflow-scope.webp";
import buildImage from "@/assets/workflow/workflow-build.webp";
import launchImage from "@/assets/workflow/workflow-launch.webp";
type WorkflowSlide = {
  step: string;
  title: string;
  description: string;
  image: StaticImageData;
  imageClassName?: string;
  overlayClassName?: string;
};

const AUTOPLAY_DELAY = 4500;

const workflowSlides = [
  {
    step: "01",
    title: "Discovery Call",
    description: "Bahas kebutuhan bisnis, target customer, fitur wajib, dan contoh referensi agar arah project jelas.",
    image: discoveryImage,
    imageClassName: "brightness-110 saturate-110",
    overlayClassName: "from-black/55 via-black/5 to-black/10",
  },
  {
    step: "02",
    title: "Scope & Estimate",
    description: "Halaman, fitur, timeline, harga, dan deliverable dirapikan supaya estimasi project lebih transparan.",
    image: scopeImage,
  },
  {
    step: "03",
    title: "Design & Build",
    description: "Desain dan development berjalan dengan preview staging link agar progress bisa dicek.",
    image: buildImage,
  },
  {
    step: "04",
    title: "Launch & Handover",
    description: "Deploy ke domain, serah terima akses admin, dokumentasi singkat, dan support awal.",
    image: launchImage,
  },
] satisfies WorkflowSlide[];

export function WorkflowImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sliderRef, { once: false, margin: "250px" });
  const shouldReduceMotion = useReducedMotion();
  const activeSlide = workflowSlides[activeIndex];
  const nextIndex = (activeIndex + 1) % workflowSlides.length;

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + workflowSlides.length) % workflowSlides.length);
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % workflowSlides.length);
  }, []);

  useEffect(() => {
    if (!isInView || isPaused || shouldReduceMotion) return;

    const timer = window.setInterval(goToNext, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [goToNext, isInView, isPaused, shouldReduceMotion]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.visibilityState !== "visible");
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const imageMotion = useMemo(
    () =>
      shouldReduceMotion
        ? {
            initial: { opacity: 1 },
            animate: { opacity: 1 },
            exit: { opacity: 1 },
          }
        : {
            initial: { opacity: 0, y: 10, filter: "blur(8px)", scale: 1.03 },
            animate: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
            exit: { opacity: 0, y: -40, x: 40, filter: "blur(8px)", scale: 1.06 },
          },
    [shouldReduceMotion],
  );

  const textMotion = shouldReduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        initial: { opacity: 0, y: 10, filter: "blur(8px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -40, x: 40, filter: "blur(8px)", scale: 1.08 },
      };

  return (
    <div
      ref={sliderRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      className="w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-sm md:p-4"
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-950">
        {isInView && (
          <Image
            src={workflowSlides[nextIndex].image}
            alt=""
            fill
            sizes="1px"
            className="pointer-events-none invisible object-cover"
            aria-hidden="true"
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.step}
            initial={imageMotion.initial}
            animate={imageMotion.animate}
            exit={imageMotion.exit}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.image}
              alt={`${activeSlide.title} - preview proses kerja Build With Reys`}
              fill
              sizes="(max-width: 768px) 100vw, 960px"
              className={[
                "object-cover",
                activeSlide.imageClassName ?? "",
              ].filter(Boolean).join(" ")}
            />
          </motion.div>
        </AnimatePresence>

        <div
          className={[
            "pointer-events-none absolute inset-0 z-10 bg-linear-to-t",
            activeSlide.overlayClassName ?? "from-black/72 via-black/10 to-black/20",
          ].join(" ")}
        />

        <div className="absolute left-4 top-4 z-20 rounded-md border border-white/15 bg-black/45 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#fffcc9] backdrop-blur md:left-5 md:top-5">
          {activeSlide.step} / {activeSlide.title}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeSlide.step}-copy`}
            initial={textMotion.initial}
            animate={textMotion.animate}
            exit={textMotion.exit}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="absolute bottom-5 left-5 z-20 max-w-2xl pr-16 md:bottom-7 md:left-7"
          >
            <h3 className="text-xl font-bold tracking-tight text-white md:text-3xl">
              {activeSlide.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/78 md:text-base">
              {activeSlide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Slide sebelumnya"
          className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md border border-white/15 bg-black/45 text-white transition hover:bg-[#ff8a00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcd80] md:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={goToNext}
          aria-label="Slide berikutnya"
          className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md border border-white/15 bg-black/45 text-white transition hover:bg-[#ff8a00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcd80] md:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-5 right-5 z-20 flex gap-2 rounded-md border border-white/10 bg-black/40 px-3 py-2 backdrop-blur md:bottom-7 md:right-7">
          {workflowSlides.map((slide, index) => (
            <button
              key={slide.step}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Tampilkan slide ${slide.step}`}
              className={[
                "h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcd80]",
                activeIndex === index ? "w-8 bg-[#ff8a00]" : "w-2.5 bg-white/45 hover:bg-[#ffcd80]",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
