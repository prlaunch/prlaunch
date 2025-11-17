"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollPositionManager() {
  const pathname = usePathname()

  useEffect(() => {
    // Save scroll position before navigating away
    const saveScrollPosition = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString())
    }

    // Restore scroll position when returning to a page
    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem(`scroll-${pathname}`)
      if (savedPosition) {
        // Use setTimeout to ensure DOM is fully loaded
        setTimeout(() => {
          window.scrollTo({
            top: Number.parseInt(savedPosition, 10),
            behavior: "instant" as ScrollBehavior,
          })
        }, 0)
      }
    }

    // Restore position on mount
    restoreScrollPosition()

    // Save position on scroll
    window.addEventListener("scroll", saveScrollPosition)

    // Save position before unload
    window.addEventListener("beforeunload", saveScrollPosition)

    return () => {
      window.removeEventListener("scroll", saveScrollPosition)
      window.removeEventListener("beforeunload", saveScrollPosition)
    }
  }, [pathname])

  return null
}
