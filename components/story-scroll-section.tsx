"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export function StoryScrollSection() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastScrollTime = useRef(0)
  const rawProgressRef = useRef(0)
  const smoothingFrameRef = useRef<number | undefined>(undefined)
  const lastTickRef = useRef(0)

  const entrepreneurs = [
    { name: "Sarah Chen", title: "Tech Founder", image: "/asian-woman-entrepreneur-smiling.jpg" },
    { name: "Marcus Johnson", title: "E-commerce CEO", image: "/black-man-entrepreneur-confident.jpg" },
    { name: "Elena Rodriguez", title: "SaaS Founder", image: "/latina-woman-entrepreneur-professional.jpg" },
  ]

  const companies = [
    { name: "TechFlow", logo: "/tech-company-logo-blue.png" },
    { name: "GrowthLabs", logo: "/startup-company-logo-green.jpg" },
    { name: "CloudSync", logo: "/cloud-company-logo-purple.jpg" },
  ]


  const updateScrollProgress = useCallback(() => {
    if (!sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const sectionHeight = rect.height
    const viewportHeight = window.innerHeight


    const scrollStart = rect.top
    const maxScroll = sectionHeight - viewportHeight
    let progress = Math.max(0, Math.min(1, -scrollStart / maxScroll))


    progress = progress * progress * (3 - 2 * progress)

    rawProgressRef.current = progress
  }, [])

  useEffect(() => {
    const tick = (timestamp: number) => {
      const alpha = 0.18
      setScrollProgress((prev) => {
        const target = rawProgressRef.current
        const next = prev + (target - prev) * alpha
        // Snap when very close to avoid micro-jitter
        return Math.abs(next - target) < 0.0005 ? target : next
      })
      smoothingFrameRef.current = requestAnimationFrame(tick)
    }

    smoothingFrameRef.current = requestAnimationFrame(tick)
    return () => {
      if (smoothingFrameRef.current) cancelAnimationFrame(smoothingFrameRef.current)
    }
  }, [])

  const handleScroll = useCallback(() => {
    const now = Date.now()


    const throttleMs = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 32 : 16

    if (now - lastScrollTime.current < throttleMs) return

    lastScrollTime.current = now

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    animationFrameRef.current = requestAnimationFrame(updateScrollProgress)
  }, [updateScrollProgress])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    // Initial call
    updateScrollProgress()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [handleScroll, updateScrollProgress])

  const scrollToWhatYouGet = () => {
    const whatYouGetSection = document.getElementById("what-you-get")
    if (whatYouGetSection) {
      whatYouGetSection.scrollIntoView({ behavior: "smooth" })
    }
  }


  const getScreenTransform = (screenIndex: number): React.CSSProperties => {
    const totalProgress = scrollProgress * 4 // 4 screens total
    const screenProgress = totalProgress - screenIndex

    let opacity = 0
    if (screenProgress > 0 && screenProgress < 1) {
      const edge = 0.08
      if (screenProgress < edge) {
        const t = screenProgress / edge
        opacity = t * t * (3 - 2 * t)
      } else if (screenProgress > 1 - edge) {
        const t = (1 - screenProgress) / edge
        opacity = t * t * (3 - 2 * t)
      } else {
        opacity = 1
      }
    } else {
      opacity = 0
    }

    const scale = 0.98 + (opacity * 0.02)
    const translateY = (1 - opacity) * 24

    return {
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
      pointerEvents: opacity > 0.01 ? 'auto' : 'none' as React.CSSProperties['pointerEvents'],
      transition: 'opacity 180ms ease-out, transform 220ms ease-out',
      willChange: 'opacity, transform'
    }
  }

  const getCardTransform = (cardIndex: number, screenIndex: number): React.CSSProperties => {
    const totalProgress = scrollProgress * 4
    const screenProgress = totalProgress - screenIndex

    if (screenProgress < 0 || screenProgress > 1) {
      return {
        opacity: 0,
        transform: 'translateY(20px) scale(0.95)',
        zIndex: 0,
        pointerEvents: 'none' as React.CSSProperties['pointerEvents']
      }
    }

    const cards = screenIndex === 1 ? entrepreneurs : companies
    const cardProgress = screenProgress * cards.length
    const cardOffset = cardIndex - cardProgress


    if (Math.abs(cardOffset) > 1.5) {
      return {
        opacity: 0,
        transform: 'translateY(20px) scale(0.95)',
        zIndex: 0,
        pointerEvents: 'none' as React.CSSProperties['pointerEvents']
      }
    }


    let opacity = 0
    let translateY = 20
    let scale = 0.95
    let zIndex = 0

    if (Math.abs(cardOffset) <= 1) {
      if (Math.abs(cardOffset) <= 0.5) {
        opacity = 1
        translateY = 0
        scale = 1
        zIndex = 10
      } else {
        opacity = Math.max(0, 1 - (Math.abs(cardOffset) - 0.5) * 2)
        translateY = cardOffset * 20
        scale = 0.95 + (opacity * 0.05)
        zIndex = 5
      }
    }

    return {
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
      zIndex,
      pointerEvents: opacity > 0.8 ? 'auto' : 'none' as React.CSSProperties['pointerEvents'],
      transition: 'opacity 160ms ease-out, transform 200ms ease-out',
      willChange: 'opacity, transform'
    }
  }

  return (
    <section
      ref={sectionRef}
      id="story-scroll-section"
      className="relative min-h-[400vh] bg-gradient-to-b from-background via-blue-50/30 to-background"
      style={{
        WebkitOverflowScrolling: "touch",
        overscrollBehavior: "contain",
        touchAction: "pan-y",
      }}
    >
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden will-change-transform"
        style={{
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          transform: 'translateZ(0)',
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Screen 0: Intro */}
          <div
            className="absolute inset-0 flex items-center justify-center px-4"
            style={getScreenTransform(0)}
          >
            <div className="text-center max-w-4xl relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 blur-3xl opacity-20 -z-10" />
              <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
                  You Have a Story...
                </span>
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl lg:text-2xl max-w-2xl mx-auto text-balance">
                Whether it's your career, personal achievements, or a cause you support, you have a story we can publish
                for you.
              </p>
            </div>
          </div>

          {/* Screen 1: Entrepreneurs */}
          <div
            className="absolute inset-0 flex items-center justify-center px-4"
            style={getScreenTransform(1)}
          >
            <div className="flex flex-col items-center justify-center w-full max-w-6xl">
              <h3 className="mb-12 text-2xl font-bold text-foreground md:text-4xl lg:text-5xl text-center">
                We have helped{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  entrepreneurs
                </span>
              </h3>
              <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-[400px] md:h-[450px] flex items-center justify-center">
                {entrepreneurs.map((entrepreneur, index) => (
                  <div
                    key={entrepreneur.name}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      ...getCardTransform(index, 1),
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  >
                    <div className="rounded-2xl bg-white p-6 md:p-8 shadow-2xl border border-border w-full">
                      <div className="relative w-full aspect-[4/3] mb-4 rounded-xl overflow-hidden bg-muted">
                        <Image
                          src={entrepreneur.image || "/placeholder.svg"}
                          alt={entrepreneur.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-foreground mb-1 text-center">
                        {entrepreneur.name}
                      </h4>
                      <p className="text-base md:text-lg text-muted-foreground text-center">{entrepreneur.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Screen 2: Companies */}
          <div
            className="absolute inset-0 flex items-center justify-center px-4"
            style={getScreenTransform(2)}
          >
            <div className="flex flex-col items-center justify-center w-full max-w-6xl">
              <h3 className="mb-12 text-2xl font-bold text-foreground md:text-4xl lg:text-5xl text-center">
                We empower{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  companies
                </span>
              </h3>
              <div className="relative w-full max-w-sm md:max-w-md h-[400px] flex items-center justify-center">
                {companies.map((company, index) => (
                  <div
                    key={company.name}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      ...getCardTransform(index, 2),
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                  >
                    <div className="rounded-2xl bg-white p-8 md:p-12 shadow-2xl border border-border flex flex-col items-center justify-center aspect-square w-full">
                      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
                        <Image
                          src={company.logo || "/placeholder.svg"}
                          alt={company.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-foreground text-center">{company.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Screen 3: You */}
          <div
            className="absolute inset-0 flex items-center justify-center px-4"
            style={getScreenTransform(3)}
          >
            <div className="text-center">
              <h3 className="mb-8 text-2xl font-bold text-foreground md:text-4xl lg:text-5xl">
                And now it's time for{" "}
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
                  you
                </span>
              </h3>
              <div className="mb-8 text-7xl md:text-8xl">🫵😎</div>
              <button
                onClick={scrollToWhatYouGet}
                className="group inline-flex items-center gap-2 text-sm md:text-base font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-muted-foreground/30 hover:border-foreground pb-1"
              >
                see the stories we write
                <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
