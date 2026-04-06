"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function ScrollToTop() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Use both immediate and delayed scroll to handle different browser behaviors
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })

    // Additional scroll after a brief delay to handle cases where DOM isn't fully ready
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }, 0)

    // Also scroll after a slightly longer delay for slower devices
    const delayedTimeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }, 10)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(delayedTimeoutId)
    }
  }, [pathname, searchParams])

  return null
}
