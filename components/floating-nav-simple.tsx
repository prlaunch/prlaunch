"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"

export function FloatingNavSimple() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const Logo = () => (
    <Link href="/" className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity text-black">
      <span className="text-blue-500">pr</span>
      <span>launch.io</span>
    </Link>
  )

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 hidden xl:block transition-all duration-700 ease-in-out ${
          isScrolled ? "top-6" : "top-0"
        }`}
      >
        <div
          className={`px-16 py-2 flex items-center justify-between transition-all duration-700 ease-in-out ${
            isScrolled
              ? "glass-nav rounded-full w-[90vw] max-w-[1400px]"
              : "bg-white/98 backdrop-blur-md rounded-none w-screen max-w-none"
          }`}
        >
          <Logo />

          <MovingBorderButton
            borderRadius="1.75rem"
            as={Link}
            href="/fast/pricing"
            containerClassName="h-10 w-auto"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 text-sm font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
            duration={3000}
          >
            Get Featured
          </MovingBorderButton>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 xl:hidden transition-all duration-500 ease-out ${
          isScrolled ? "top-4 w-[90%] max-w-sm md:max-w-lg lg:max-w-xl" : "top-0 w-full max-w-none"
        }`}
      >
        <div
          className={`px-4 py-2.5 flex items-center justify-between transition-all duration-500 ease-out ${
            isScrolled ? "glass-nav rounded-full" : "bg-white/98 backdrop-blur-md rounded-none"
          }`}
        >
          <Logo />

          <MovingBorderButton
            borderRadius="1.75rem"
            as={Link}
            href="/fast/pricing"
            containerClassName="h-8 w-auto"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-1.5 text-xs font-semibold shadow-lg shadow-blue-500/30"
            duration={3000}
          >
            Get Featured
          </MovingBorderButton>
        </div>
      </nav>
    </>
  )
}
