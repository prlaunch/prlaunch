"use client"

import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import { useSearchParams } from "next/navigation"
import { mainReviews } from "@/lib/reviews-data"
import Image from "next/image"

const HEADLINE_VARIANTS = {
  a: {
    headline: (
      <>
        <span className="relative inline-block pb-1">
          Get Featured and Boost
          <svg
            className="absolute left-0 bottom-0 w-full h-3 pointer-events-none"
            viewBox="0 0 400 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="squiggleGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            <path
              d="M 5 8 Q 20 6, 40 9 Q 55 10, 70 7 Q 90 5, 110 9 Q 130 11, 150 7 Q 170 4, 190 8 Q 210 10, 230 7 Q 250 5, 270 8 Q 290 10, 310 7 Q 330 5, 350 9 Q 370 11, 390 8 Q 380 5, 395 8"
              stroke="url(#squiggleGradient1)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              className="animate-draw-squiggle"
            />
          </svg>
        </span>
        <br />
        <span className="relative inline-block pb-1">
          Your Brand in 48 Hours
          <svg
            className="absolute left-0 bottom-0 w-full h-3 pointer-events-none"
            viewBox="0 0 400 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="squiggleGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            <path
              d="M 5 7 Q 25 10, 45 6 Q 60 4, 80 8 Q 100 11, 120 7 Q 140 4, 160 8 Q 180 10, 200 7 Q 220 5, 240 9 Q 260 11, 280 7 Q 300 4, 320 8 Q 340 10, 360 7 Q 380 5, 395 8"
              stroke="url(#squiggleGradient2)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              className="animate-draw-squiggle"
              style={{ animationDelay: "0.3s" }}
            />
          </svg>
        </span>
      </>
    ),
    subheadline:
      "Elevate your brand and own your Google search. When they Google you, they'll know you're the real deal.",
  },
  b: {
    headline: "The PR Tool Rich Founders Use—Now $47",
    subheadline:
      "Get featured in USA Wire, Success XL, LA Tabloid, SF Tribune, Bosses Mag, Medium, and 100+ online publications. Real press coverage that builds real credibility. Same service, accessible price. Published in 48 hours or your money back.",
  },
}

export function HeroSection() {
  const searchParams = useSearchParams()
  const variant = searchParams?.get("headline") || "a"

  const currentVariant = HEADLINE_VARIANTS[variant as keyof typeof HEADLINE_VARIANTS] || HEADLINE_VARIANTS.a

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
                    #1 Highest Rated PR House for Businesses &amp; Professionals
                  </span>
                </div>
              </div>
            </div>

            {/* Rating banner */}
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
                  <span className="text-xs text-muted-foreground">from 231+ reviews</span>
                </div>
              </div>
            </div>

            <h2 className="mb-6 text-balance font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl text-3xl">
              {currentVariant.headline}
            </h2>

            <p className="mb-8 text-pretty text-base text-muted-foreground md:text-lg lg:text-xl">
              {currentVariant.subheadline}
            </p>

            {/* Primary and Secondary CTAs */}
            <div className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MovingBorderButton
                borderRadius="1.75rem"
                as="a"
                href="/checkout"
                containerClassName="h-14 w-auto"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
                duration={3000}
              >
                Get Featured — $47
              </MovingBorderButton>
              <Button
                size="default"
                variant="ghost"
                asChild
                className="h-11 rounded-full bg-white hover:bg-slate-50 border-2 border-blue-600 hover:border-blue-700 text-slate-700 hover:text-blue-600 px-6 text-base font-medium transition-all duration-200 shadow-sm"
              >
                <a href="/pr-quiz">Free PR Check - See If You Qualify</a>
              </Button>
            </div>

            <div className="flex flex-col items-center gap-2">
              {/* First row - 2 badges */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-lg bg-success/10 px-2.5 py-1.5">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-success">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-xs font-medium text-foreground">48-Hour Guarantee</span>
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

              {/* Trust badge below the secondary CTA button */}
              <div className="flex flex-col items-center gap-2 text-sm text-gray-600 mt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {mainReviews.slice(0, 4).map((review, i) => (
                      <div key={i} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                        <Image
                          src={review.image || "/placeholder.svg"}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <span className="font-medium text-slate-700">Trusted by 4,847+ entrepreneurs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
