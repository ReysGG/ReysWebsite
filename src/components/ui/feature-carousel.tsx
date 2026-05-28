"use client"

import { useEffect, useState, type MouseEvent } from "react"
import clsx from "clsx"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react"
import Balancer from "react-wrap-balancer"

import {
  defaultFeatureCarouselClasses,
  defaultFeatureCarouselSteps,
  FEATURE_CAROUSEL_ANIMATION_PRESETS,
  featureCarouselStepVariants,
} from "@/components/ui/feature-carousel-config"
import type { CardProps, FeatureCarouselProps, Step, WrapperStyle } from "@/components/ui/feature-carousel-types"
import { useIsMobile, useNumberCycler } from "@/components/ui/use-feature-carousel"
import { cn } from "@/lib/utils"

import { AnimatedStepImage, IconCheck } from "@/components/ui/feature-carousel-images"

/**
 * Main card component that handles mouse tracking for gradient effect.
 * Uses motion values to create an interactive gradient that follows the cursor.
 */
function FeatureCard({
  bgClass,
  children,
  step,
  steps,
}: CardProps & {
  children: React.ReactNode
  step: number
  steps: readonly Step[]
}) {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const getIsMobile = useIsMobile()

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (getIsMobile()) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      className="animated-cards relative w-full rounded-lg"
      onMouseMove={handleMouseMove}
      style={
        {
          "--x": useMotionTemplate`${mouseX}px`,
          "--y": useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      <div
        className={clsx(
          "group relative w-full overflow-hidden rounded-lg border border-black/10 bg-gradient-to-br from-neutral-950 via-neutral-900 to-[#ff8a00] transition duration-300",
          "md:hover:border-transparent",
          bgClass
        )}
      >
        <div className="m-4 min-h-[280px] md:m-6 md:min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex w-[78%] flex-col gap-3 sm:w-4/6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <motion.h2
                className="text-xl font-bold tracking-tight text-white md:text-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {steps[step]?.title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <p className="text-sm leading-5 text-neutral-300 sm:text-base sm:leading-5 dark:text-zinc-400">
                  <Balancer>{steps[step]?.description}</Balancer>
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {mounted ? children : null}
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Progress indicator component that shows current step and completion status.
 * Handles complex state transitions and animations for step indicators.
 */
function Steps({
  steps,
  current,
  onChange,
}: {
  steps: readonly Step[]
  current: number
  onChange: (index: number) => void
}) {
  return (
    <nav aria-label="Progress" className="flex justify-center px-4">
      <ol
        className="flex w-full flex-wrap items-start justify-start gap-2 sm:justify-center md:w-10/12 md:divide-y-0"
        role="list"
      >
        {steps.map((step, stepIdx) => {
          // Calculate step states for styling and animations
          const isCompleted = current > stepIdx
          const isCurrent = current === stepIdx
          const isFuture = !isCompleted && !isCurrent

          return (
            <motion.li
              key={`${step.name}-${stepIdx}`}
              initial="inactive"
              animate={isCurrent ? "active" : "inactive"}
              variants={featureCarouselStepVariants}
              transition={{ duration: 0.3 }}
              className={cn(
                "relative z-50 rounded-md px-3 py-1 transition-all duration-300 ease-in-out md:flex",
                isCompleted ? "bg-[#ff8a00]/20" : "bg-white/10"
              )}
            >
              <div
                className={cn(
                  "group flex w-full cursor-pointer items-center focus:outline-none focus-visible:ring-2",
                  (isFuture || isCurrent) && "pointer-events-none"
                )}
                onClick={() => onChange(stepIdx)}
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <motion.span
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                    }}
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full duration-300",
                      isCompleted &&
                        "bg-[#ff8a00] text-white",
                      isCurrent &&
                        "bg-[#ffcd80] text-neutral-950",
                      isFuture && "bg-white/20"
                    )}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <IconCheck className="h-3 w-3 stroke-white stroke-[3] text-white dark:stroke-black" />
                      </motion.div>
                    ) : (
                      <span
                        className={cn(
                          "text-xs",
                          !isCurrent && "text-[#fffcc9]"
                        )}
                      >
                        {stepIdx + 1}
                      </span>
                    )}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={clsx(
                      "text-sm font-medium duration-300",
                      isCompleted && "text-muted-foreground",
                      isCurrent && "text-[#fffcc9]",
                      isFuture && "text-neutral-500"
                    )}
                  >
                    {step.name}
                  </motion.span>
                </span>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </nav>
  )
}

/**
 * Main component that orchestrates the multi-step animation sequence.
 * Manages state transitions, handles animation timing, and prevents
 * animation conflicts through the isAnimating flag.
 */
export function FeatureCarousel({
  image,
  steps = defaultFeatureCarouselSteps,
  step1img1Class = defaultFeatureCarouselClasses.step1img1,
  step1img2Class = defaultFeatureCarouselClasses.step1img2,
  step2img1Class = defaultFeatureCarouselClasses.step2img1,
  step2img2Class = defaultFeatureCarouselClasses.step2img2,
  step3imgClass = defaultFeatureCarouselClasses.step3img,
  step4imgClass = defaultFeatureCarouselClasses.step4img,
  ...props
}: FeatureCarouselProps) {
  const { currentNumber: step, increment } = useNumberCycler()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleIncrement = () => {
    if (isAnimating) return
    setIsAnimating(true)
    increment()
  }

  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  const renderStepContent = () => {
    const content = () => {
      switch (step) {
        case 0:
          /**
           * Layout: Two images side by side
           * - Left image (step1img1): 50% width, positioned left
           * - Right image (step1img2): 60% width, positioned right
           * Animation:
           * - Left image slides in from left
           * - Right image slides in from right with 0.1s delay
           * - Both use spring animation for smooth motion
           */
          return (
            <motion.div
              className="relative w-full h-full"
              onAnimationComplete={handleAnimationComplete}
            >
              <AnimatedStepImage
                alt={image.alt}
                className={clsx(step1img1Class)}
                src={image.step1light1}
                preset="slideInLeft"
              />
              <AnimatedStepImage
                alt={image.alt}
                className={clsx(step1img2Class)}
                src={image.step1light2}
                preset="slideInRight"
                delay={0.1}
              />
            </motion.div>
          )
        case 1:
          /**
           * Layout: Two images with overlapping composition
           * - First image (step2img1): 50% width, positioned left
           * - Second image (step2img2): 40% width, overlaps first image
           * Animation:
           * - Both images fade in and scale up from 95%
           * - Second image has 0.1s delay for staggered effect
           * - Uses spring physics for natural motion
           */
          return (
            <motion.div
              className="relative w-full h-full"
              onAnimationComplete={handleAnimationComplete}
            >
              <AnimatedStepImage
                alt={image.alt}
                className={clsx(step2img1Class, "rounded-lg")}
                src={image.step2light1}
                preset="fadeInScale"
              />
              <AnimatedStepImage
                alt={image.alt}
                className={clsx(step2img2Class, "rounded-lg")}
                src={image.step2light2}
                preset="fadeInScale"
                delay={0.1}
              />
            </motion.div>
          )
        case 2:
          /**
           * Layout: Single centered image
           * - Full width image (step3img): 90% width, centered
           * Animation:
           * - Fades in and scales up from 95%
           * - Uses spring animation for smooth scaling
           * - Triggers animation complete callback
           */
          return (
            <AnimatedStepImage
              alt={image.alt}
              className={clsx(step3imgClass, "rounded-lg")}
              src={image.step3light}
              preset="fadeInScale"
              onAnimationComplete={handleAnimationComplete}
            />
          )
        case 3:
          /**
           * Layout: Final showcase layout
           * - Container: Centered, 60% width on desktop
           * - Image (cult): 90% width, positioned slightly up
           * Animation:
           * - Container fades in and scales up
           * - Image follows with 0.1s delay
           * - Both use spring physics for natural motion
           */
          return (
            <AnimatedStepImage
              alt={image.alt}
              className={clsx(step4imgClass)}
              src={image.step4light}
              preset="fadeInScale"
              onAnimationComplete={handleAnimationComplete}
            />
          )
        default:
          return null
      }
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          {...FEATURE_CAROUSEL_ANIMATION_PRESETS.fadeInScale}
          className="w-full h-full absolute"
        >
          {content()}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <FeatureCard {...props} step={step} steps={steps}>
      {renderStepContent()}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute left-4 right-4 top-5 z-50 cursor-pointer md:left-0 md:right-auto md:h-full md:w-full"
      >
        <Steps current={step} onChange={() => {}} steps={steps} />
      </motion.div>
      <motion.div
        className="absolute right-0 top-0 z-50 h-full w-full cursor-pointer md:left-0"
        onClick={handleIncrement}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      />
    </FeatureCard>
  )
}

export default FeatureCarousel