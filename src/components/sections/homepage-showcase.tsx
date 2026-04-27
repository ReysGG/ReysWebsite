"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ShowcaseSlide = { id: string; imageSrc: string; alt: string };

// Replace with your actual portfolio screenshots
const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  { id: "slide-1", imageSrc: "/images/homepage-slider-reference.png", alt: "Portfolio 1" },
  { id: "slide-2", imageSrc: "/images/homepage-slider-reference.png", alt: "Portfolio 2" },
  { id: "slide-3", imageSrc: "/images/homepage-slider-reference.png", alt: "Portfolio 3" },
];

// ─── White screen area inside macbook-mockup.png (1024×1024 source) ───────
// Measured from the generated image: the white screen occupies this region.
// Values are % of the PNG's width/height.
const SCREEN = { left: "10%", top: "8%", width: "82%", height: "57%" };

type Props = { className?: string };

export const HomepageShowcaseSection = ({ className }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const goTo = useCallback((i: number) => {
    setDir(i > activeIndex ? 1 : -1);
    setActiveIndex(i);
  }, [activeIndex]);

  const next = useCallback(() => {
    setDir(1);
    setActiveIndex(p => (p + 1) % SHOWCASE_SLIDES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className={cn("relative w-full select-none", className)}>
      {/* Outer: fixed aspect ratio matching macbook-mockup.png (1:1 square) */}
      <div className="relative w-full" style={{ paddingBottom: "100%" }}>

        {/* MacBook PNG frame — on top (z-10) so it overlaps the screen edges */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/macbook-mockup.png"
          alt="MacBook mockup"
          className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
          draggable={false}
        />

        {/* Slider — behind the PNG (z-0) but visible through the white screen */}
        <div
          className="absolute z-0 overflow-hidden"
          style={{
            left:   SCREEN.left,
            top:    SCREEN.top,
            width:  SCREEN.width,
            height: SCREEN.height,
          }}
        >
          <AnimatePresence custom={dir} initial={false} mode="popLayout">
            <motion.div
              key={SHOWCASE_SLIDES[activeIndex].id}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SHOWCASE_SLIDES[activeIndex].imageSrc}
                alt={SHOWCASE_SLIDES[activeIndex].alt}
                className="w-full h-full object-cover object-top"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {SHOWCASE_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  activeIndex === i ? "w-4 bg-white" : "w-1 bg-white/50 hover:bg-white/70"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
