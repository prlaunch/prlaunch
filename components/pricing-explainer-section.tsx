"use client"

import { ClipboardList, PenTool, Eye, Newspaper } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"

export function PricingExplainerSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      icon: ClipboardList,
      title: "You take a 5-7 minute questionnaire",
    },
    {
      icon: PenTool,
      title: "Our pro writers draft your story",
    },
    {
      icon: Eye,
      title: "You review it before publishing",
    },
    {
      icon: Newspaper,
      title: "We publish on reputable USA outlets",
    },
  ]

  return (
    <section id="how-it-works" ref={sectionRef} className="pt-12 pb-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container px-4 mx-auto">
        <div
          className={`text-center mb-16 max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="md:text-5xl font-bold mb-6 text-balance text-5xl">...but hold on, $47???</h2>
          <div className="flex items-center justify-center gap-2 flex-wrap text-xl text-muted-foreground text-balance">
            <span>Yes.</span>
            <span className="font-bold tracking-tight text-black">
              <span>{""}</span>
            </span>
            <span>
              {
                "PR Launch is designed for small entrepreneurs and companies that are just building out their first social proof."
              }
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className={`relative group transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-75 group-hover:opacity-100 transition duration-300" />

                {/* Card content - smaller and minimal */}
                <div className="relative bg-white rounded-xl p-4 h-full flex items-center justify-between gap-3">
                  {/* Icon and title on left */}
                  <div className="flex items-center gap-3 flex-1">
                    <Icon className="w-5 h-5 text-black flex-shrink-0" />
                    <h3 className="text-sm font-medium text-black text-balance leading-tight">{step.title}</h3>
                  </div>

                  {/* Large number on right */}
                  <div className="text-5xl font-bold text-black opacity-20 flex-shrink-0">{index + 1}</div>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm text-muted-foreground mb-6">
            Simple, transparent, and designed to get you results fast.
          </p>

          {/* Get Featured CTA button */}
          <div className="flex justify-center">
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
          </div>
        </div>
      </div>
    </section>
  )
}
