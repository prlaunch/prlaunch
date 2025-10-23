"use client"

import { useRouter } from "next/navigation"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import Image from "next/image"
import { Star, Loader2, ArrowRight } from "lucide-react"
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
        <div className="mb-8 w-full max-w-xl mx-auto">
          <img
            src="/images/design-mode/Screenshot%202025-10-22%20at%2000.19.43%20%281%29.jpg"
            alt="Campaign Builder Banner"
            className="w-full h-32 object-contain rounded-lg"
          />
        </div>

        <h1 className="md:text-5xl font-bold text-black mb-6 leading-tight text-3xl">
          Build Your Dream Google Presence in 48 Hours
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

        <p className="text-xl text-black mb-8">Let's build your custom PR campaign!</p>

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
            "Start Building My Campaign →"
          )}
        </MovingBorderButton>

        <button
          onClick={handleSkipToPricing}
          className="mt-3 text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 mx-auto group"
        >
          Skip to pricing
          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </button>

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
