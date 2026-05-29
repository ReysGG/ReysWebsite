"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type RotatingSplitTextProps = {
  words: string[];
  className?: string;
  delay?: number;
  duration?: number;
  holdDuration?: number;
  ease?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  exit?: gsap.TweenVars;
};

export function RotatingSplitText({
  words,
  className,
  delay = 42,
  duration = 0.75,
  holdDuration = 1800,
  ease = "power3.out",
  from = { opacity: 0, y: 22 },
  to = { opacity: 1, y: 0 },
  exit = { opacity: 0, y: -18 },
}: RotatingSplitTextProps) {
  const safeWords = useMemo(() => words.filter(Boolean), [words]);
  const [activeIndex, setActiveIndex] = useState(0);
  const word = safeWords[activeIndex] ?? "rapi";
  const containerRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const chars = gsap.utils.toArray<HTMLElement>("[data-rotating-char]", container);
      timelineRef.current?.kill();

      timelineRef.current = gsap
        .timeline()
        .set(chars, from)
        .to(chars, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
        });

      return () => timelineRef.current?.kill();
    },
    { scope: containerRef, dependencies: [word, delay, duration, ease] },
  );

  useEffect(() => {
    if (safeWords.length <= 1) return;

    const totalEnterTime = duration * 1000 + word.length * delay;
    const timer = window.setTimeout(() => {
      const container = containerRef.current;
      const chars = container ? gsap.utils.toArray<HTMLElement>("[data-rotating-char]", container) : [];

      gsap.to(chars, {
        ...exit,
        duration: Math.min(duration * 0.65, 0.45),
        ease: "power2.in",
        stagger: delay / 2000,
        onComplete: () => {
          setActiveIndex((current) => (current + 1) % safeWords.length);
        },
      });
    }, totalEnterTime + holdDuration);

    return () => window.clearTimeout(timer);
  }, [safeWords.length, word, delay, duration, holdDuration, exit]);

  return (
    <span ref={containerRef} className={cn("inline-block whitespace-nowrap", className)} aria-label={word}>
      {Array.from(`${word}.`).map((char, index) => (
        <span
          key={`${word}-${char}-${index}`}
          data-rotating-char
          aria-hidden="true"
          className="inline-block will-change-transform"
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}
