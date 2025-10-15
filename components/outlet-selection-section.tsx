"use client"

import { Clock, Sparkles, FileText } from "lucide-react"

const industries = [
  { name: "Business", count: "25+ outlets", icon: "💼" },
  { name: "Technology", count: "20+ outlets", icon: "💻" },
  { name: "Finance", count: "18+ outlets", icon: "💰" },
  { name: "Lifestyle", count: "15+ outlets", icon: "✨" },
  { name: "Real Estate", count: "12+ outlets", icon: "🏠" },
  { name: "Health & Wellness", count: "10+ outlets", icon: "🏥" },
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
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
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
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="p-6 rounded-xl border-2 border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-300"
              >
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">{industry.name}</h4>
                <p className="text-sm text-slate-600">{industry.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">5-Minute Selection</h4>
            <p className="text-slate-600 leading-relaxed">
              Choose your outlets right after ordering. Quick, simple, and guided every step.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Clean Brands Only</h4>
            <p className="text-slate-600 leading-relaxed">
              Every outlet in our network maintains high editorial standards and brand reputation.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-cyan-600" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Free Writing Included</h4>
            <p className="text-slate-600 leading-relaxed">
              Professional article writing is completely free and included with every order.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
