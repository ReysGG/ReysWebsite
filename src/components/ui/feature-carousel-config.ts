import type { Variants } from "motion/react"
import type { Step } from "@/components/ui/feature-carousel-types"

export const TOTAL_FEATURE_CAROUSEL_STEPS = 4
export const FEATURE_CAROUSEL_INTERVAL_MS = 3000

export const defaultFeatureCarouselSteps = [
  {
    id: "1",
    name: "Step 1",
    title: "Feature 1",
    description: "Feature 1 description  ",
  },
  {
    id: "2",
    name: "Step 2",
    title: "Feature 2",
    description: "Feature 2 description",
  },
  {
    id: "3",
    name: "Step 3",
    title: "Feature 3",
    description: "Feature 3 description",
  },
  {
    id: "4",
    name: "Step 4",
    title: "Feature 4",
    description: "Feature 4 description",
  },
] as const satisfies readonly Step[]

export const FEATURE_CAROUSEL_ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
  },
} as const

export type FeatureCarouselAnimationPreset = keyof typeof FEATURE_CAROUSEL_ANIMATION_PRESETS

export const featureCarouselStepVariants: Variants = {
  inactive: {
    scale: 0.8,
    opacity: 0.5,
  },
  active: {
    scale: 1,
    opacity: 1,
  },
}

export const defaultFeatureCarouselClasses = {
  step1img1:
    "pointer-events-none w-[50%] border border-border-100/10 transition-all duration-500 dark:border-border-700/50 rounded-lg",
  step1img2:
    "pointer-events-none w-[60%] border border-border-100/10 dark:border-border-700/50 transition-all duration-500 overflow-hidden rounded-lg",
  step2img1:
    "pointer-events-none w-[50%] border border-border-100/10 transition-all duration-500 dark:border-border-700 rounded-lg overflow-hidden",
  step2img2:
    "pointer-events-none w-[40%] border border-border-100/10 dark:border-border-700 transition-all duration-500 rounded-lg overflow-hidden",
  step3img:
    "pointer-events-none w-[90%] border border-border-100/10 dark:border-border-700 rounded-lg transition-all duration-500 overflow-hidden",
  step4img:
    "pointer-events-none w-[90%] border border-border-100/10 dark:border-border-700 rounded-lg transition-all duration-500 overflow-hidden",
} as const
