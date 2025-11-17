"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Star, Loader2, Users, Zap, CheckCircle, FileText, Sparkles } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { StickyLogoBanner } from "@/components/quiz-logo"
import { mainReviews } from "@/lib/reviews-data"
import { PR_LOGOS } from "@/lib/quiz-constants"

export default function QuizBLandingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleStartQuiz = () => {
    setIsLoading(true)
    router.push("/free-pr-quiz-b/quiz")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <StickyLogoBanner />

      <div className="flex-1 flex items-start justify-center p-4 pt-8">
        <div className="max-w-3xl w-full text-center space-y-8">
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

          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Should the World Know Your Name?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance">
              Get featured in major publications—easier than you think.
              <br />
              Join 4,847 people who got recognized.
            </p>

            <Button
              size="lg"
              className="text-base md:text-lg px-8 md:px-16 py-4 md:py-5 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg whitespace-normal text-center"
              onClick={handleStartQuiz}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Start Free Quiz"
              )}
            </Button>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 py-4">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5 rating</span>
              </div>

              {/* People featured with avatars */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {mainReviews.slice(0, 4).map((review, i) => (
                    <div key={i} className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-background">
                      <Image src={review.image || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">4,847 featured</span>
              </div>

              {/* Takes 2 minutes */}
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Takes 2 minutes</span>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}
