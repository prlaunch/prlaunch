"use client"

import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { mainReviews } from "@/lib/reviews-data"
import { PR_LOGOS } from "@/lib/quiz-constants"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function QuizLandingPage() {
  const router = useRouter()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <StickyLogoBanner />

      <div className="flex-1 flex items-start justify-center p-4 pt-8">
        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              You Could Get Published In:
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
              {PR_LOGOS.map((logo, i) => (
                <div key={i} className="flex items-center justify-center h-6">
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    width={70}
                    height={24}
                    className="object-contain grayscale opacity-60"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic">and 100+ more...</p>
          </div>

          <div className="space-y-4 pt-2">
            <h1 className="text-5xl md:text-6xl font-bold text-balance">Is PR Right for Your Business?</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Take this 2-minute quiz to discover your PR Readiness Score and unlock a special reward
            </p>
          </div>

          <Button
            size="lg"
            className="text-lg px-16 py-5 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
            onClick={() => router.push("/free-pr-quiz/quiz")}
          >
            Start Free Quiz →
          </Button>

          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {mainReviews.slice(0, 4).map((review, i) => (
                  <div key={i} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-background">
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
            <span>Taken by 4,847 entrepreneurs</span>
          </div>
        </div>
      </div>
    </div>
  )
}
