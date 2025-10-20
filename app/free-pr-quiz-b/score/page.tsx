"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function ScoreBPage() {
  const router = useRouter()
  const { score } = useQuiz()
  const [isLoading, setIsLoading] = useState(false)

  const badge =
    score >= 90 ? "Ready for Major Recognition" : score >= 82 ? "Ready for the Spotlight" : "Recognition Ready"

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleContinue = () => {
    setIsLoading(true)
    router.push("/free-pr-quiz/winner")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <StickyLogoBanner />

      <div className="flex-1 flex items-center justify-center p-4 pt-8">
        <div className="max-w-4xl w-full space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Score Display */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center">Your Recognition Score</h2>

            <div
              className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              {score}%
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="font-semibold text-sm md:text-base">{badge}</span>
            </div>

            <p className="text-sm md:text-base text-gray-600 text-center my-6 md:my-8 px-4">
              You're in the top 13% of applicants. Here's what that means:
            </p>
          </div>

          {/* Two Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto px-4 mb-8">
            <Card className="p-4 md:p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">✨</span>
                <h3 className="font-semibold text-base md:text-lg">Why You're Ready</h3>
              </div>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Your story has impact and meaning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>You've accomplished something worth sharing</span>
                </li>
              </ul>
            </Card>

            <Card className="p-4 md:p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">🎯</span>
                <h3 className="font-semibold text-base md:text-lg">What Happens Next</h3>
              </div>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Choose your ideal publication (we'll guide you)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>We write your article (you approve it)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>You get featured in 7 days</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Social Proof and CTA */}
          <div className="text-center space-y-6">
            <p className="text-xs md:text-sm text-gray-500 px-4">
              People with your score got featured in Forbes, Entrepreneur, USA Wire
            </p>

            <Button
              size="lg"
              className="w-full max-w-md mx-4 md:mx-auto h-12 md:h-14 text-base md:text-lg rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
              onClick={handleContinue}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Unlock Your Free Article →"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
