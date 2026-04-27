"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type ShowcaseSlide = {
  id: string;
  imageSrc: string;
  alt: string;
};

const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: "young-hoop-1",
    imageSrc: "/images/homepage-slider-reference.png",
    alt: "Homepage showcase slide 1",
  },
  {
    id: "product-story-2",
    imageSrc: "/images/homepage-slider-reference.png",
    alt: "Homepage showcase slide 2",
  },
  {
    id: "editorial-landing-3",
    imageSrc: "/images/homepage-slider-reference.png",
    alt: "Homepage showcase slide 3",
  },
  {
    id: "young-hoop-4",
    imageSrc: "/images/homepage-slider-reference.png",
    alt: "Homepage showcase slide 4",
  },
  {
    id: "product-story-5",
    imageSrc: "/images/homepage-slider-reference.png",
    alt: "Homepage showcase slide 5",
  },
];

type SlidePosition = "left" | "center" | "right" | "hidden";

const SWIPE_THRESHOLD = 80;

const getSlidePosition = (
  index: number,
  activeIndex: number,
  totalSlides: number,
): SlidePosition => {
  const relative = (index - activeIndex + totalSlides) % totalSlides;

  if (relative === 0) return "center";
  if (relative === 1) return "right";
  if (relative === totalSlides - 1) return "left";
  return "hidden";
};

type HomepageShowcaseSectionProps = {
  className?: string;
};

export const HomepageShowcaseSection = ({
  className,
}: HomepageShowcaseSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = SHOWCASE_SLIDES.length;
  const isDraggingRef = useRef(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((previous) => (previous + 1) % totalSlides);
  }, [totalSlides]);

  const previousSlide = useCallback(() => {
    setActiveIndex((previous) => (previous - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") previousSlide();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextSlide, previousSlide]);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative mx-auto h-[14rem] sm:h-[18rem] w-full max-w-6xl md:h-[24rem] lg:h-[32rem]">
        {SHOWCASE_SLIDES.map((slide, index) => {
          const position = getSlidePosition(index, activeIndex, totalSlides);
          const isActive = position === "center";

          return (
            <motion.article
              key={slide.id}
              initial={false}
              animate={{
                x:
                  position === "left"
                    ? "-96%"
                    : position === "right"
                      ? "96%"
                      : 0,
                scale: position === "center" ? 1 : position === "hidden" ? 0.74 : 0.85,
                opacity: position === "hidden" ? 0 : 1,
                filter: "blur(0px)",
                zIndex:
                  position === "center" ? 30 : position === "hidden" ? 10 : 20,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              drag="x"
              dragListener={isActive}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragStart={() => {
                isDraggingRef.current = true;
              }}
              onDragEnd={(_, info) => {
                if (info.offset.x > SWIPE_THRESHOLD) previousSlide();
                if (info.offset.x < -SWIPE_THRESHOLD) nextSlide();

                window.setTimeout(() => {
                  isDraggingRef.current = false;
                }, 0);
              }}
              onClick={() => {
                if (isDraggingRef.current) return;
                if (position === "left") previousSlide();
                if (position === "right") nextSlide();
              }}
              className={cn(
                "absolute left-1/2 top-0 h-full w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl",
                isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
                position === "hidden" && "pointer-events-none",
              )}
            >
              <Image
                src={slide.imageSrc}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 80vw, 64vw"
                className="object-cover"
              />
            </motion.article>
          );
        })}

      </div>
    </div>
  );
};
