"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { FEATURE_CAROUSEL_INTERVAL_MS, TOTAL_FEATURE_CAROUSEL_STEPS } from "@/components/ui/feature-carousel-config"

export function useNumberCycler(
  totalSteps: number = TOTAL_FEATURE_CAROUSEL_STEPS,
  interval: number = FEATURE_CAROUSEL_INTERVAL_MS
) {
  const [currentNumber, setCurrentNumber] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [])

  const setupTimer = useCallback(() => {
    clearTimer()
    timerRef.current = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps)
    }, interval)
  }, [clearTimer, interval, totalSteps])

  const increment = useCallback(() => {
    setCurrentNumber((prev) => (prev + 1) % totalSteps)
    setupTimer()
  }, [setupTimer, totalSteps])

  useEffect(() => {
    setupTimer()
    return clearTimer
  }, [clearTimer, currentNumber, setupTimer])

  return {
    currentNumber,
    increment,
  }
}

export function useIsMobile() {
  const isMobileRef = useRef(false)

  useEffect(() => {
    const updateIsMobile = () => {
      const userAgent = navigator.userAgent
      const isSmall = window.matchMedia("(max-width: 768px)").matches
      const isMobileUserAgent = Boolean(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.exec(
          userAgent
        )
      )

      isMobileRef.current = isSmall || isMobileUserAgent
    }

    updateIsMobile()
    window.addEventListener("resize", updateIsMobile)

    return () => window.removeEventListener("resize", updateIsMobile)
  }, [])

  return useCallback(() => isMobileRef.current, [])
}
