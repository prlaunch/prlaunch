"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useEffect, useState } from "react"

export function WhatYouGetSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const mockups = [
    {
      id: 1,
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
      id: 3,
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
      label: "SuccessXL",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-18%2001.54.18-f3pEnvi2IzYKvwHdW6QEWYmrw0CM83.jpeg",
    },
    {
      id: 8,
      label: "Bosses Mag",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-18%2001.53.59-CkKBINglHYNIv16nNr0sohT1X1j3yI.jpeg",
    },
    {
      id: 9,
      label: "Rolling Hype",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-18%2001.53.49-hv3fePNp7J4dDSsCryV8FWmiC00U1T.jpeg",
    },
    {
      id: 10,
      label: "USA Wire",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-18%2001.54.01-UOJNnCO5LfuAwlQ8Qfgped2CNhxm63.jpeg",
    },
    {
      id: 11,
      label: "L.A. Tabloid",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-18%2001.53.58-VDucyqinusqkeQraAxkidBW67L57Z7.jpeg",
    },
    {
      id: 12,
      label: "SF Tribune",
      screenshot:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-18%2001.54.19-CD0OWrqqTDTFb9rZyxju4wckiFcQ6Q.jpeg",
    },
  ]

  const infiniteMockups = [...mockups, ...mockups, ...mockups]

  useEffect(() => {
    if (scrollContainerRef.current) {
      const itemWidth = 240 + 32 // width + gap (reduced from 280)
      const middlePosition = mockups.length * itemWidth
      scrollContainerRef.current.scrollLeft = middlePosition
    }
  }, [])

  useEffect(() => {
    if (!isAutoScrolling) return

    autoScrollIntervalRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const itemWidth = 240 + 32 // width + gap
        scrollContainerRef.current.scrollBy({ left: itemWidth, behavior: "smooth" })
      }
    }, 3000)

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }
    }
  }, [isAutoScrolling])

  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const itemWidth = 240 + 32 // Updated width
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
      scrollContainerRef.current.scrollBy({ left: -272, behavior: "smooth" }) // Updated scroll distance
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 272, behavior: "smooth" }) // Updated scroll distance
    }
  }

  const handleMouseEnter = () => setIsAutoScrolling(false)
  const handleMouseLeave = () => setIsAutoScrolling(true)

  return (
    <section id="what-you-get" className="bg-gradient-to-b from-background to-muted/20 py-0">
      

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
