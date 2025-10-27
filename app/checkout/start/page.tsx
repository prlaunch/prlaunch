"use client"

import { useRouter } from "next/navigation"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import Image from "next/image"
import { Star, Loader2 } from "lucide-react"
import { mainReviews } from "@/lib/reviews-data"
import { useState } from "react"

export default function CheckoutStartPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const logos = [
    { src: "/images/logos/sf-tribune.png", alt: "The San Francisco Tribune" },
    { src: "/images/logos/successxl.png", alt: "Success XL" },
    { src: "/images/logos/usawire.png", alt: "USA Wire" },
    { src: "/images/logos/la-tabloid.webp", alt: "L.A. Tabloid" },
    { src: "/images/logos/bosses-mag.png", alt: "Bosses Mag" },
    { src: "/images/logos/medium.png", alt: "Medium" },
  ]

  const handleStart = () => {
    setIsLoading(true)
    router.push("/checkout/step-1")
  }

  const handleSkipToPricing = () => {
    router.push("/checkout/step-5")
  }

  return (
    <div className="min-h-screen bg-white flex items-start justify-center p-4 pt-4">
      <div className="text-center max-w-2xl">
        <div className="mb-6 inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
          <span className="text-xs">🔥</span>
          <span className="text-xs font-semibold text-slate-900">Only 12 spots left this week</span>
        </div>

        <div className="mb-12 w-full max-w-3xl mx-auto relative h-48 sm:h-64 lg:h-80">
          {/* Card 1 - Top Left */}
          <div className="absolute left-2 sm:left-4 lg:left-8 top-0 w-32 h-32 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-27%20at%2015.15.07%20%281%29-aMcqOS0fPEuijE3FJq5Y8HVW3n5SCu.jpg"
              alt="SuccessXL Article"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card 2 - Top Right (minimal corner overlap with card 1) */}
          <div className="absolute right-2 sm:right-4 lg:right-8 top-1 sm:top-2 lg:top-4 w-32 h-32 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white z-10">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-27%20at%2015.17.55%20%281%29-RQ9jnQiXtxRR5T1PAIPJ5zR1RU7R41.jpg"
              alt="USA Wire Article"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card 3 - Bottom Center (minimal corner overlap with cards 1 and 2) */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-32 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white z-20">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-27%20at%2015.18.55%20%281%29-IxWWb9yQ6xp3JWaynFahA7hYf3j1rM.jpg"
              alt="Top Hustler Article"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="md:text-5xl font-bold text-black mb-6 leading-tight text-3xl">
          Get Featured in 100+ Real Articles Online
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          {logos.map((logo, i) => (
            <div key={i} className="h-6 w-20 flex items-center justify-center">
              <img
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                className="h-full w-full object-contain grayscale opacity-70"
              />
            </div>
          ))}
        </div>

        <p className="text-xl text-black mb-8">Let&#39;s get you featured in real media! </p>

        <MovingBorderButton
          borderRadius="1.75rem"
          onClick={handleStart}
          disabled={isLoading}
          containerClassName="h-14 w-auto"
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          duration={3000}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading...
            </span>
          ) : (
            "Get My Article for $47"
          )}
        </MovingBorderButton>

        <div className="flex flex-col items-center gap-2 text-sm text-gray-600 mt-6">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {mainReviews.slice(0, 4).map((review, i) => (
                <div key={i} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <Image src={review.image || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
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
  )
}
