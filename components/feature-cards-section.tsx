"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

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
    headline: "Strengthen Your Online Presence",
    subhead: "Helps your name surface more on Google and AI platforms.",
    id: "seo",
    imagePath: "/images/features/search-ranking-interface.jpg",
  },
  {
    headline: "Open Doors to Bigger Media",
    subhead: "Small press builds the foundation that major outlets look for.",
    id: "credibility",
    imagePath: "/images/features/bad-press-to-positive-pr.jpg",
  },
]

export function FeatureCardsSection() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set(prev).add(index))
            }
          })
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -50px 0px",
        },
      )

      observer.observe(card)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
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

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Benefits PR Articles Bring You</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real miracles start to happen when people know who you are.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-8 items-center">
          {features.map((feature, index) => {
            const isVisible = visibleCards.has(index)

            return (
              <div
                key={feature.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className={`
                  group w-full max-w-md
                  transition-all duration-700 ease-out
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                  hover:scale-[1.03]
                `}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 animate-gradient-shift bg-[length:200%_200%] overflow-hidden">
                  <div className="relative rounded-xl bg-white h-full transition-shadow duration-500 group-hover:shadow-2xl overflow-hidden">
                    <div className="transition-transform duration-500 relative h-48 w-full overflow-hidden">
                      <Image
                        src={feature.imagePath || "/placeholder.svg"}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>

                    <div className="p-6 md:p-8">
                      {/* Content */}
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-tight text-center">
                        {feature.headline}
                      </h3>
                      <p className="text-base md:text-lg text-slate-600 leading-relaxed text-center">
                        {feature.subhead}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
