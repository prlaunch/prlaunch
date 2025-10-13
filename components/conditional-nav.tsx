"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { FloatingNav } from "./floating-nav"

export function ConditionalNav() {
  const pathname = usePathname()
  const [isInStorySection, setIsInStorySection] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const storySection = document.getElementById("story-scroll-section")
      if (!storySection) return

      const rect = storySection.getBoundingClientRect()
      const isDeepInSection = rect.top < -300 && rect.bottom > window.innerHeight / 2

      setIsInStorySection(isDeepInSection)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (pathname === "/payment" || pathname === "/thank-you" || isInStorySection) {
    return null
  }

  return <FloatingNav />
}
