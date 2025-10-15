"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useEffect } from "react"

export function WhatYouGetSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const mockups = [
    {
      id: 3,
      label: "SF Tribune",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9028%20%281%29%281%29-JD7TegIHS4A8rgzUdnIOyNi1BdaXyh.jpg",
    },
    {
      id: 2,
      label: "SuccessXL",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9031%20%281%29%281%29-h2PB3GoMuQaW2oIjAgedltYa1lx355.jpg",
    },
    {
      id: 1,
      label: "New York Tech",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9027%20%281%29%281%29-3izT3a7mEaIVM1xID1qeWOGTH2XQF1.jpg",
    },
    {
      id: 4,
      label: "Bosses Mag",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9032%20%281%29%281%29-0cCGxtKZKdJ4akLj7wIUPOYsVhXAdp.jpg",
    },
    {
      id: 5,
      label: "NewsHub",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9030%20%281%29%281%29-HB8HvdZlP7VLDqI2iu808tUJr7qE7W.jpg",
    },
    {
      id: 6,
      label: "Time Business News",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9026%20%281%29%281%29-E7HhLCJq7zcXTHfM88bsNFdmd9c1oS.jpg",
    },
    {
      id: 7,
      label: "Point News",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/050_thepointnews-oxnhVwikZ0leHVk97K11MKoacD0aV8.webp",
    },
    {
      id: 8,
      label: "Bomb Report",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/043_bombreport-XCiLIdfmdp2dPvdIB6BhpY7Qb9x3JU.webp",
    },
    {
      id: 9,
      label: "Faith Family America",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/048_faithfamilyamerica-OfmzNZzWlPJoStRqo6og5iVy6ZAh9j.webp",
    },
    {
      id: 10,
      label: "Article Rich",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/047_articlerich-viGoeBG7KXPncYxOKOrKEt1nrKPfjc.webp",
    },
    {
      id: 11,
      label: "Harcourt Health",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/044_harcourthealth-0AECRtcwJ7aM3LWP5xvxm04wqE21Fe.webp",
    },
    {
      id: 12,
      label: "Ribbon Co.",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/049_ribbon-wyqJXLkw0CrRIJU6Lx2q8UQZFbCobj.webp",
    },
    {
      id: 13,
      label: "Street Register",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/046_streetregister-YmAlKyJOTEyGbzyP5fiGDBJwneIHCk.webp",
    },
    {
      id: 14,
      label: "The Daily Haze",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/042_thedailyhaze-ENjQdSW9EAZi0EvJzwzLEepU22k3O0.webp",
    },
    {
      id: 15,
      label: "Washington Guardian",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/041_washingtonguardian-Spij7XMgp4v4RrN09HOmpc7FAEt56M.webp",
    },
    {
      id: 16,
      label: "Brights Future",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/045_brightsfuture-6Kc0k46nznip9V9B2SHoNXx5MijZa8.webp",
    },
    {
      id: 17,
      label: "Rolling Hype",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/055_rollinghype-OJC4Ke50ISd0aIyDVekplaK6DOJgh5.webp",
    },
    {
      id: 18,
      label: "New York Business Now",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/051_newyorkbusinessnow-SjD7FLK76PpeqY7eQ09Cj9FIR5MkwP.webp",
    },
    {
      id: 19,
      label: "Hustle Weekly",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/057_hustleweekly-J8QXJkiN4l64pGp2Rkdj2Mk54OtdUQ.webp",
    },
    {
      id: 20,
      label: "USA Wire",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/054_usawire-vp84Xws61SMzSwTbgHrNuc8J2CiHQN.webp",
    },
    {
      id: 21,
      label: "Medium",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/053_medium-3CYFD6uPXvlB2tPKyDbHxCLlB82trF.webp",
    },
    {
      id: 22,
      label: "The US Times",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/052_theustimes-xR2xTNNoRFWNMQ3zdwknsA8ZLtn93J.webp",
    },
    {
      id: 23,
      label: "New York Tech",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/056_nytech-QLYCxSA1HiC82vWsKrQq1Zs3NVWLcX.webp",
    },
  ]

  const infiniteMockups = [...mockups, ...mockups, ...mockups]

  useEffect(() => {
    if (scrollContainerRef.current) {
      const itemWidth = 280 + 32 // width + gap
      const middlePosition = mockups.length * itemWidth
      scrollContainerRef.current.scrollLeft = middlePosition
    }
  }, [])

  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const itemWidth = 280 + 32 // width + gap
    const setWidth = mockups.length * itemWidth
    const scrollLeft = container.scrollLeft

    if (scrollLeft >= setWidth * 2) {
      container.scrollLeft = scrollLeft - setWidth
    } else if (scrollLeft < setWidth) {
      container.scrollLeft = scrollLeft + setWidth
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" })
    }
  }

  return (
    <section id="what-you-get" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">The Stories We Write </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Editorials, features, and success stories that position you as the expert.
          </p>
        </div>

        {/* Scrollable iPhone mockups */}
        <div className="relative">
          {/* Gradient overlays for scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg hover:bg-slate-50 transition-colors border border-slate-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-slate-900" />
          </button>

          <button
            onClick={scrollRight}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg hover:bg-slate-50 transition-colors border border-slate-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-slate-900" />
          </button>

          <div ref={scrollContainerRef} onScroll={handleScroll} className="overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex gap-8 px-4 min-w-max">
              {infiniteMockups.map((mockup, index) => (
                <div key={`${mockup.id}-${index}`} className="flex-shrink-0">
                  {/* iPhone 15 Pro mockup */}
                  <div className="relative w-[280px]">
                    {/* Phone frame */}
                    <div className="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl">
                      {/* Dynamic Island */}
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />

                      {/* Screen */}
                      <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                        {/* Status bar */}
                        <div className="absolute top-0 left-0 right-0 h-12 bg-white z-10 flex items-center justify-between px-8 pt-2">
                          <span className="text-xs font-semibold">9:41</span>
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-3 border border-black rounded-sm" />
                          </div>
                        </div>

                        <div className="absolute inset-0 top-12 bg-white overflow-hidden">
                          <img
                            src={mockup.screenshot || "/placeholder.svg"}
                            alt={mockup.label}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        {/* Home indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full z-10" />
                      </div>
                    </div>

                    {/* Label below phone */}
                    <p className="text-center mt-4 font-medium text-sm">{mockup.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12 md:hidden">
          <p className="text-sm text-muted-foreground">Scroll to see all publication placements →</p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
