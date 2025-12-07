"use client"

import { Clock, Sparkles, FileText } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import { usePathname } from "next/navigation"

interface Outlet {
  number: number
  name: string
  url: string
  category: string
  description: string
}

const industries = [
  { name: "Business & Entrepreneurship", count: 0, icon: "💼", href: "/outlets/business-entrepreneurship" },
  { name: "Finance & Economics", count: 0, icon: "📈", href: "/outlets/finance-economics" },
  { name: "Lifestyle & Culture", count: 0, icon: "✨", href: "/outlets/lifestyle-culture" },
  {
    name: "Technology & Digital Marketing",
    count: 0,
    icon: "💻",
    href: "/outlets/technology-digital-marketing",
  },
  { name: "Health & Wellness", count: 0, icon: "🧘‍♂️", href: "/outlets/health-wellness" },
  { name: "Buy Article Credits", count: 0, icon: "🎯", href: "/checkout", isCheckout: true },
]

const logos = [
  { src: "/images/logos/sf-tribune.png", alt: "The San Francisco Tribune" },
  { src: "/images/logos/successxl.png", alt: "Success XL" },
  { src: "/images/logos/usawire.png", alt: "USA Wire" },
  { src: "/images/logos/la-tabloid.webp", alt: "L.A. Tabloid" },
  { src: "/images/logos/bosses-mag.png", alt: "Bosses Mag" },
  { src: "/images/logos/medium.png", alt: "Medium" },
]

export function OutletSelectionSection() {
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  const isFastPage = pathname?.startsWith("/fast")
  const ctaLink = isFastPage ? "/fast/pricing" : "/checkout/step-5"

  useEffect(() => {
    fetch("/api/outlets")
      .then((res) => res.json())
      .then((data: Outlet[]) => {
        const counts: Record<string, number> = {}
        data.forEach((outlet) => {
          counts[outlet.category] = (counts[outlet.category] || 0) + 1
        })
        setCategoryCounts(counts)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }, [])

  return (
    <section
      id="outlet-selection"
      className="py-16 md:py-24 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            You're In Control
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Pick Your Perfect Outlets
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Choose from <span className="font-bold text-blue-600">100+ premium USA news outlets</span> across every
            industry. Every article is custom-written and included free.
          </p>
        </div>

        {/* Logo Showcase */}
        <div className="mb-12 md:mb-16">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
            <p className="text-center text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wide">
              Featured Outlets in Our Network
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300 group"
                >
                  <img
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    className="h-8 w-full object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
            <p className="text-center text-slate-500 mt-6 text-sm">and 100+ more premium outlets...</p>
          </div>
        </div>

        {/* Industry Categories */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">Browse Outlets by Industry</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {industries.map((industry) => {
              const realCount = categoryCounts[industry.name] || 0
              const displayCount = industry.isCheckout
                ? "Start your campaign"
                : loading
                  ? "Loading..."
                  : `${realCount} outlets`

              // Use /fast/pricing for checkout button on /fast page
              const linkHref = industry.isCheckout && isFastPage ? ctaLink : industry.href

              return (
                <Link
                  key={industry.name}
                  href={linkHref}
                  className={`group p-4 rounded-xl border-2 transition-all duration-300 ${
                    industry.isCheckout
                      ? "bg-gradient-to-br from-blue-600 to-blue-700 border-blue-600 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
                      : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  <div className="text-3xl mb-2">{industry.icon}</div>
                  <h4 className={`text-base font-bold mb-1 ${industry.isCheckout ? "text-white" : "text-slate-900"}`}>
                    {industry.name}
                  </h4>
                  <p className={`text-sm mb-3 ${industry.isCheckout ? "text-blue-100" : "text-slate-600"}`}>
                    {displayCount}
                  </p>
                  <span
                    className={`text-sm font-medium underline transition-colors duration-200 ${
                      industry.isCheckout ? "text-white hover:text-blue-100" : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    {industry.isCheckout ? "Get Started →" : "View Outlets"}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          <div className="p-4">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <h4 className="text-base font-semibold text-slate-900 mb-1">5-Minute Selection</h4>
            <p className="text-sm text-slate-500">Quick and simple outlet selection.</p>
          </div>

          <div className="p-4">
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <h4 className="text-base font-semibold text-slate-900 mb-1">Clean Brands Only</h4>
            <p className="text-sm text-slate-500">High editorial standards maintained.</p>
          </div>

          <div className="p-4">
            <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center mb-3">
              <FileText className="w-4 h-4 text-cyan-600" />
            </div>
            <h4 className="text-base font-semibold text-slate-900 mb-1">Free Writing Included</h4>
            <p className="text-sm text-slate-500">Professional articles at no extra cost.</p>
          </div>
        </div>

        {/* Get Featured CTA button */}
        <div className="flex justify-center">
          <MovingBorderButton
            borderRadius="1.75rem"
            as="a"
            href={ctaLink}
            containerClassName="h-14 w-auto"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
            duration={3000}
          >
            Get Featured — $67
          </MovingBorderButton>
        </div>
      </div>
    </section>
  )
}
