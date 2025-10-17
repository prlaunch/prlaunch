"use client"

import { useState, useEffect } from "react"
import { Menu, X, Briefcase, TrendingUp, Sparkles, Laptop, Activity, ChevronDown } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"

export function FloatingNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isOutletsOpen, setIsOutletsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Wait for page to fully load before scrolling
      setTimeout(() => {
        const id = hash.replace("#", "")
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }, [pathname])

  if (pathname === "/checkout" || pathname === "/upsell") {
    return null
  }

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      // Navigate instantly to home page with hash
      router.push(`/#${id}`)
      setIsMobileMenuOpen(false)
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const outletCategories = [
    { name: "Business & Entrepreneurship", icon: Briefcase, href: "/outlets/business-entrepreneurship" },
    { name: "Finance & Economics", icon: TrendingUp, href: "/outlets/finance-economics" },
    { name: "Lifestyle & Culture", icon: Sparkles, href: "/outlets/lifestyle-culture" },
    { name: "Technology & Digital Marketing", icon: Laptop, href: "/outlets/technology-digital-marketing" },
    { name: "Health & Wellness", icon: Activity, href: "/outlets/health-wellness" },
  ]

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
        className={`fixed left-1/2 -translate-x-1/2 z-50 hidden lg:block transition-all duration-700 ease-in-out ${
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
          <div className="flex items-center gap-8">
            <Logo />

            <div className="h-6 w-px bg-black/20" />

            <button
              onClick={() => scrollToSection("how-it-works")}
              className="px-4 py-2 rounded-full text-sm font-medium text-black transition-all duration-300 hover:scale-110 hover:text-blue-500"
            >
              How It Works
            </button>
            <Link
              href="/pricing"
              className="px-4 py-2 rounded-full text-sm font-medium text-black transition-all duration-300 hover:scale-110 hover:text-blue-500"
            >
              Pricing
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsOutletsOpen(true)}
              onMouseLeave={() => setIsOutletsOpen(false)}
            >
              <button className="px-4 py-2 rounded-full text-sm font-medium text-black transition-all duration-300 hover:scale-110 hover:text-blue-500 flex items-center gap-1">
                See Outlets
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isOutletsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOutletsOpen && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="glass-nav rounded-2xl p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {outletCategories.map((category) => {
                      const Icon = category.icon
                      return (
                        <Link
                          key={category.name}
                          href={category.href}
                          onClick={() => setIsOutletsOpen(false)}
                          className="w-full px-4 py-3 rounded-xl text-sm font-medium text-black transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-500 hover:scale-105 text-left flex items-center gap-3"
                        >
                          <Icon className="w-4 h-4" />
                          {category.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("reviews")}
              className="px-4 py-2 rounded-full text-sm font-medium text-black transition-all duration-300 hover:scale-110 hover:text-blue-500"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="px-4 py-2 rounded-full text-sm font-medium text-black transition-all duration-300 hover:scale-110 hover:text-blue-500"
            >
              FAQ
            </button>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-full text-sm font-medium text-black transition-all duration-300 hover:scale-110 hover:text-blue-500"
            >
              Contact Us
            </Link>
          </div>

          <MovingBorderButton
            borderRadius="1.75rem"
            as={Link}
            href="/checkout"
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
        className={`fixed left-1/2 -translate-x-1/2 z-50 lg:hidden transition-all duration-500 ease-out ${
          isScrolled ? "top-4 w-[90%] max-w-sm" : "top-0 w-full max-w-none"
        }`}
      >
        <div
          className={`px-4 py-2.5 flex items-center justify-between transition-all duration-500 ease-out ${
            isScrolled ? "glass-nav rounded-full" : "bg-white/98 backdrop-blur-md rounded-none"
          }`}
        >
          <Logo />

          <div className="flex items-center gap-2">
            <MovingBorderButton
              borderRadius="1.75rem"
              as={Link}
              href="/checkout"
              containerClassName="h-8 w-auto"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-1.5 text-xs font-semibold shadow-lg shadow-blue-500/30"
              duration={3000}
            >
              Get Featured
            </MovingBorderButton>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-blue-500/20 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="glass-nav rounded-3xl mt-2 p-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="px-4 py-3 rounded-2xl text-sm font-medium text-black transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-500 hover:scale-105 text-left"
            >
              How It Works
            </button>
            <Link
              href="/pricing"
              className="px-4 py-3 rounded-2xl text-sm font-medium text-black transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-500 hover:scale-105 text-left"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>

            <div>
              <button
                onClick={() => setIsOutletsOpen(!isOutletsOpen)}
                className="w-full px-4 py-3 rounded-2xl text-sm font-medium text-black transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-500 hover:scale-105 text-left flex items-center justify-between"
              >
                See Outlets
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isOutletsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOutletsOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {outletCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsOutletsOpen(false)
                        }}
                        className="w-full px-4 py-2 rounded-xl text-xs font-medium text-black/70 transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-500 text-left flex items-center gap-2"
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {category.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("reviews")}
              className="px-4 py-3 rounded-2xl text-sm font-medium text-black transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-500 hover:scale-105 text-left"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="px-4 py-3 rounded-2xl text-sm font-medium text-black transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-500 hover:scale-105 text-left"
            >
              FAQ
            </button>
            <Link
              href="/contact"
              className="px-4 py-3 rounded-2xl text-sm font-medium text-black transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-500 hover:scale-105 text-left"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}
