"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right";
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
};

export function SplitText({
  text,
  className,
  delay = 50,
  duration = 1,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 32 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "0px",
  textAlign = "left",
  onLetterAnimationComplete,
  showCallback = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  const parts = useMemo(() => {
    if (splitType === "words") {
      return text.split(/(\s+)/).map((part) => ({ value: part, isSpace: /^\s+$/.test(part) }));
    }

    return Array.from(text).map((part) => ({ value: part, isSpace: part === " " }));
  }, [splitType, text]);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const targets = gsap.utils.toArray<HTMLElement>("[data-split-part]", container);
      gsap.set(targets, from);

      const runAnimation = () => {
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        gsap.to(targets, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: () => {
            if (showCallback) {
              onLetterAnimationComplete?.();
            }
          },
        });
      };

      if (!("IntersectionObserver" in window)) {
        runAnimation();
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            runAnimation();
            observer.disconnect();
          }
        },
        { threshold, rootMargin },
      );

      observer.observe(container);
      return () => observer.disconnect();
    },
    { scope: containerRef, dependencies: [text, delay, duration, ease, splitType, threshold, rootMargin] },
  );

  return (
    <span
      ref={containerRef}
      className={cn("inline-block whitespace-normal", className)}
      style={{ textAlign }}
      aria-label={text}
    >
      {parts.map((part, index) => {
        if (part.isSpace) {
          return <span key={`${part.value}-${index}`}> </span>;
        }

        return (
          <span
            key={`${part.value}-${index}`}
            data-split-part
            aria-hidden="true"
            className="inline-block will-change-transform"
          >
            {part.value}
          </span>
        );
      })}
    </span>
  );
}
