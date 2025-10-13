"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export function StoryScrollSection() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const lastScreenRef = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

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

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false
            return
          }

          const rect = sectionRef.current.getBoundingClientRect()
          const sectionHeight = rect.height
          const viewportHeight = window.innerHeight

          const scrollStart = rect.top
          const scrollEnd = rect.bottom - viewportHeight
          let progress = Math.max(0, Math.min(1, -scrollStart / (sectionHeight - viewportHeight)))

          if (progress < 0.02) progress = 0
          if (progress > 0.98) progress = 1

          setScrollProgress(progress)

          const totalProgress = progress * 4 // 4 screens total
          const newScreen = Math.min(3, Math.floor(totalProgress))

          const screenDiff = Math.abs(newScreen - lastScreenRef.current)
          if (screenDiff >= 1 || newScreen === 0 || newScreen === 3) {
            // Clear any pending timeout
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current)
            }

            scrollTimeoutRef.current = setTimeout(() => {
              setCurrentScreen(newScreen)
              lastScreenRef.current = newScreen
            }, 50)
          }

          // Calculate card index based on scroll progress within each screen
          const screenProgress = totalProgress % 1 // Progress within current screen (0-1)

          if (newScreen === 1) {
            // Entrepreneurs screen - divide progress by number of cards
            const cardProgress = screenProgress * entrepreneurs.length
            const cardIndex = Math.floor(cardProgress)
            setCurrentCardIndex(Math.min(cardIndex, entrepreneurs.length - 1))
          } else if (newScreen === 2) {
            // Companies screen - divide progress by number of cards
            const cardProgress = screenProgress * companies.length
            const cardIndex = Math.floor(cardProgress)
            setCurrentCardIndex(Math.min(cardIndex, companies.length - 1))
          } else {
            setCurrentCardIndex(0)
          }

          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [entrepreneurs.length, companies.length])

  const scrollToWhatYouGet = () => {
    const whatYouGetSection = document.getElementById("what-you-get")
    if (whatYouGetSection) {
      whatYouGetSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const getScreenOpacity = (screenIndex: number) => {
    const screenProgress = scrollProgress * 4 - screenIndex
    if (screenProgress < 0) return 0
    if (screenProgress > 1) return 0
    // Smoother fade in/out with longer transition zones
    if (screenProgress < 0.2) return screenProgress / 0.2
    if (screenProgress > 0.8) return (1 - screenProgress) / 0.2
    return 1
  }

  const getCardOpacity = (cardIndex: number) => {
    const diff = Math.abs(currentCardIndex - cardIndex)
    if (diff === 0) return 1
    if (diff === 1) return 0.3
    return 0
  }

  return (
    <section
      ref={sectionRef}
      id="story-scroll-section"
      className="relative min-h-[400vh] bg-gradient-to-b from-background via-blue-50/30 to-background touch-pan-y"
      style={{
        WebkitOverflowScrolling: "touch",
        overscrollBehavior: "contain",
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Screen 0: Intro */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000 px-4"
            style={{ opacity: getScreenOpacity(0), pointerEvents: currentScreen === 0 ? "auto" : "none" }}
          >
            <div
              className="text-center max-w-4xl transform transition-transform duration-700"
              style={{ transform: `translateY(${currentScreen === 0 ? 0 : -20}px)` }}
            >
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
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000 px-4"
            style={{ opacity: getScreenOpacity(1), pointerEvents: currentScreen === 1 ? "auto" : "none" }}
          >
            <div className="flex flex-col items-center justify-center w-full max-w-6xl">
              <h3
                className="mb-12 text-2xl font-bold text-foreground md:text-4xl lg:text-5xl text-center transform transition-all duration-1000"
                style={{ transform: `translateY(${currentScreen === 1 ? 0 : 20}px)` }}
              >
                We have helped{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  entrepreneurs
                </span>
              </h3>
              <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-[400px] md:h-[450px] flex items-center justify-center">
                {entrepreneurs.map((entrepreneur, index) => (
                  <div
                    key={entrepreneur.name}
                    className="absolute inset-0 flex items-center justify-center transform transition-all duration-700 ease-out"
                    style={{
                      opacity: getCardOpacity(index),
                      transform: `translateY(${currentCardIndex === index ? 0 : 20}px) scale(${currentCardIndex === index ? 1 : 0.95})`,
                      pointerEvents: currentCardIndex === index ? "auto" : "none",
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
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000 px-4"
            style={{ opacity: getScreenOpacity(2), pointerEvents: currentScreen === 2 ? "auto" : "none" }}
          >
            <div className="flex flex-col items-center justify-center w-full max-w-6xl">
              <h3
                className="mb-12 text-2xl font-bold text-foreground md:text-4xl lg:text-5xl text-center transform transition-all duration-1000"
                style={{ transform: `translateY(${currentScreen === 2 ? 0 : 20}px)` }}
              >
                We empower{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  companies
                </span>
              </h3>
              <div className="relative w-full max-w-sm md:max-w-md h-[400px] flex items-center justify-center">
                {companies.map((company, index) => (
                  <div
                    key={company.name}
                    className="absolute inset-0 flex items-center justify-center transform transition-all duration-700 ease-out"
                    style={{
                      opacity: getCardOpacity(index),
                      transform: `translateY(${currentCardIndex === index ? 0 : 20}px) scale(${currentCardIndex === index ? 1 : 0.95})`,
                      pointerEvents: currentCardIndex === index ? "auto" : "none",
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
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000 px-4"
            style={{ opacity: getScreenOpacity(3), pointerEvents: currentScreen === 3 ? "auto" : "none" }}
          >
            <div
              className="text-center transform transition-transform duration-700"
              style={{ transform: `translateY(${currentScreen === 3 ? 0 : 20}px)` }}
            >
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
