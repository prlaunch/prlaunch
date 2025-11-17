"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Gift, Loader2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { mainReviews } from "@/lib/reviews-data"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function WinnerPage() {
  const router = useRouter()
  const { winnerNumber } = useQuiz()
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleClaim = () => {
    setIsLoading(true)
    router.push("/free-pr-quiz/lead-capture")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col relative overflow-hidden">
      <StickyLogoBanner />

      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              {["🎉", "🎊", "⭐", "✨"][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}

      <div className="flex-1 flex items-center justify-center p-4 relative z-20">
        <div className="max-w-2xl w-full text-center space-y-8">
          <Gift className="w-12 h-12 mx-auto text-yellow-500" />

          <div className="space-y-3">
            <h1 className="text-3xl font-bold">Congratulations!</h1>
            <h2 className="text-xl font-bold text-green-600">You've Won a FREE PR Article</h2>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto">
              <div className="relative aspect-video rounded-lg overflow-hidden border">
                <Image
                  src="/images/design-mode/010_thriveinsider.webp"
                  alt="Thrive Insider"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden border">
                <Image src="/images/design-mode/029_bossesmag.webp" alt="Bosses Mag" fill className="object-cover" />
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden border">
                <Image src="/images/outlets/057_hustleweekly.webp" alt="Hustle Weekly" fill className="object-cover" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
              <div className="relative aspect-video rounded-lg overflow-hidden border">
                <Image src="/images/outlets/054_usawire.webp" alt="USA Wire" fill className="object-cover" />
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden border">
                <Image src="/images/outlets/037_latabloid.webp" alt="LA Tabloid" fill className="object-cover" />
              </div>
            </div>
          </div>

          <div className="bg-card border-2 border-green-500 rounded-xl p-6 space-y-2">
            <p className="text-sm">We're giving away FREE articles to the first 50 people who take this quiz today.</p>
            <p className="text-lg font-bold text-green-600">You're winner #{winnerNumber} of 50</p>
            <p className="text-sm text-muted-foreground">Published in a professional USA-based publication</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="flex -space-x-2">
                {mainReviews.slice(0, 3).map((review, i) => (
                  <div key={i} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-background">
                    <Image src={review.image || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Join 4,847+ entrepreneurs</span>
            </div>
          </div>

          <Button
            size="lg"
            className="text-base md:text-lg px-8 md:px-12 py-5 md:py-6 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg w-full max-w-md mx-auto whitespace-normal text-center"
            onClick={handleClaim}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Claim My Free Article →"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
