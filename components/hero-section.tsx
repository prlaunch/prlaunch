"use client"

import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative overflow-hidden bg-background pt-24 md:py-32 pb-0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 p-[2px] shadow-lg shadow-blue-500/20 animate-gradient-shift">
                <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5">
                  <span className="text-xs font-semibold text-black md:text-sm">
                    #1 Highest Rated PR Agency for Businesses & Professionals
                  </span>
                </div>
              </div>
            </div>

            {/* Trustpilot rating banner */}
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < 4
                          ? "fill-[#00B67A] text-[#00B67A]"
                          : i === 4
                            ? "fill-[#00B67A] text-[#00B67A] opacity-80"
                            : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <div className="h-3 w-px bg-border" />
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-foreground">4.8/5</span>
                  <span className="text-xs text-muted-foreground">on</span>
                  <svg className="h-3 w-auto" viewBox="0 0 90 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
                      fill="#00B67A"
                    />
                    <text x="22" y="15" fill="currentColor" className="text-[10px] font-bold">
                      Trustpilot
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Get PR and Boost Your Sales in 7 Days
            </h2>

            {/* Subheadline */}
            <p className="mb-8 text-pretty text-base text-muted-foreground md:text-lg lg:text-xl">
              Real placements in USA Wire, Success XL, LA Tabloid, and more. No $5,000 agency fees. No 3-month waits.
              Just results in 7 days.
            </p>

            {/* Primary CTA */}
            <div className="mb-10 flex justify-center">
              <Button
                size="lg"
                asChild
                className="h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
              >
                <a href="/checkout">Get Featured — $47</a>
              </Button>
            </div>

            <div className="flex flex-col items-center gap-2">
              {/* First row - 2 badges */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-lg bg-success/10 px-2.5 py-1.5">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-success">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-xs font-medium text-foreground">7-Day Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-success/10 px-2.5 py-1.5">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-success">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-xs font-medium text-foreground">500+ Articles Published</span>
                </div>
              </div>
              {/* Second row - 1 badge centered */}
              <div className="flex items-center gap-1.5 rounded-lg bg-success/10 px-2.5 py-1.5">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-success">
                  <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                </div>
                <span className="text-xs font-medium text-foreground">Money-Back Promise</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
