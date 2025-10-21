"use client"

import { useRouter } from "next/navigation"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import Image from "next/image"
import { Star } from "lucide-react"
import { mainReviews } from "@/lib/reviews-data"

export default function CheckoutStartPage() {
  const router = useRouter()

  const logos = [
    { src: "/images/logos/sf-tribune.png", alt: "The San Francisco Tribune" },
    { src: "/images/logos/successxl.png", alt: "Success XL" },
    { src: "/images/logos/usawire.png", alt: "USA Wire" },
    { src: "/images/logos/la-tabloid.webp", alt: "L.A. Tabloid" },
    { src: "/images/logos/bosses-mag.png", alt: "Bosses Mag" },
    { src: "/images/logos/medium.png", alt: "Medium" },
  ]

  return (
    <div className="min-h-screen bg-white flex items-start justify-center p-4 pt-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8 w-full max-w-xl mx-auto">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-22%20at%2000.19.43%20%281%29-nTupYWBN5BX8YIeDKeEOwSXSTpVDBc.jpg"
            alt="Campaign Builder Banner"
            className="w-full h-32 object-contain rounded-lg"
          />
        </div>

        <h1 className="md:text-5xl font-bold text-black mb-6 leading-tight text-3xl">
          Build Your Dream Google Presence in 7 Days
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
          onClick={() => router.push("/checkout/step-1")}
          containerClassName="h-14 w-auto"
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
          duration={3000}
        >
          Start Building My Campaign →
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
          <span className="font-medium text-slate-700">Taken by 4,847 entrepreneurs</span>
        </div>
      </div>
    </div>
  )
}
