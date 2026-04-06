"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const features = [
  {
    headline: "Look Instantly Established",
    subhead: "Even one media feature makes you look like a name people should know.",
    id: "effortless",
    imagePath: "/images/features/google-knowledge-panel.jpg",
  },
  {
    headline: "Built-In Social Proof",
    subhead: "Post it on your site or socials and let credibility speak for you.",
    id: "money-back",
    imagePath: "/images/features/social-proof-devices.jpg",
  },
  {
    headline: "Boost Your AI Search",
    subhead: "AI search is the new SEO. If you want to rank high, you will need mentions.",
    id: "seo",
    imagePath: "/images/features/search-ranking-interface.jpg",
  },
  {
    headline: "Kill Bad Reviews",
    subhead: "Burry bad reviews with positive PR articles and grow.",
    id: "credibility",
    imagePath: "/images/features/bad-press-to-positive-pr.jpg",
  },
]

export function FeatureCardsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)

  const infiniteFeatures = [...features, ...features, ...features]

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current || isScrolling) return

    setIsScrolling(true)
    const container = scrollContainerRef.current
    const cardWidth = container.querySelector(".feature-card")?.clientWidth || 0
    const gap = 32 // gap-8 = 32px
    const scrollAmount = cardWidth + gap // Scroll by 1 card

    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    })

    setTimeout(() => setIsScrolling(false), 500)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollLeft } = container
      const cardWidth = container.querySelector(".feature-card")?.clientWidth || 0
      const gap = 32
      const singleSetWidth = (cardWidth + gap) * features.length

      // Calculate which set we're in (0 = first, 1 = middle, 2 = last)
      const currentSet = Math.floor(scrollLeft / singleSetWidth)

      // If we're in the last set, jump back to middle set
      if (currentSet >= 2) {
        const offsetInSet = scrollLeft - singleSetWidth * 2
        container.scrollLeft = singleSetWidth + offsetInSet
      }
      // If we're in the first set, jump to middle set
      else if (currentSet < 1 && scrollLeft < singleSetWidth * 0.9) {
        const offsetInSet = scrollLeft
        container.scrollLeft = singleSetWidth + offsetInSet
      }
    }

    container.addEventListener("scroll", handleScroll)

    // Initialize scroll position to middle set
    const initializePosition = () => {
      const cardWidth = container.querySelector(".feature-card")?.clientWidth || 0
      const gap = 32
      const singleSetWidth = (cardWidth + gap) * features.length
      container.scrollLeft = singleSetWidth
    }

    // Wait for images to load before initializing
    setTimeout(initializePosition, 100)

    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background gradient accent */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #9333EA 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Benefits PR Articles Bring You</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real miracles start to happen when people know who you are.
          </p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            disabled={isScrolling}
            className="
              hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20
              w-12 h-12 items-center justify-center rounded-full
              bg-white shadow-lg border border-slate-200
              transition-all duration-300
              hover:bg-blue-50 hover:border-blue-300 hover:scale-110
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            disabled={isScrolling}
            className="
              hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20
              w-12 h-12 items-center justify-center rounded-full
              bg-white shadow-lg border border-slate-200
              transition-all duration-300
              hover:bg-blue-50 hover:border-blue-300 hover:scale-110
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-6 md:gap-8 pb-4">
              {infiniteFeatures.map((feature, index) => (
                <div
                  key={`${feature.id}-${index}`}
                  className="
                    feature-card group flex-shrink-0
                    w-[85vw] md:w-[380px]
                  "
                >
                  <div
                    className="
                    relative rounded-xl overflow-hidden
                    bg-white border-2 border-slate-200
                    transition-all duration-300
                    hover:border-blue-400 hover:shadow-lg
                    h-[420px] flex flex-col
                  "
                  >
                    {/* Image container with fixed height */}
                    <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                      <Image
                        src={feature.imagePath || "/placeholder.svg"}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 85vw, 380px"
                      />
                    </div>

                    {/* Content container with flex-grow to fill remaining space */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight text-center">
                        {feature.headline}
                      </h3>
                      <p className="text-base text-slate-600 leading-relaxed text-center">{feature.subhead}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
