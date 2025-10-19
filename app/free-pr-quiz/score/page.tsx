"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, TrendingUp, Target } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function ScorePage() {
  const router = useRouter()
  const { score } = useQuiz()
  const [isLoading, setIsLoading] = useState(false)

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
        <div className="max-w-2xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h2 className="text-2xl font-bold text-center">Your PR Readiness Score</h2>

            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
                  className="text-green-500 transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{score}%</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-semibold text-green-600">Highly Effective</span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-card border rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="font-semibold text-sm">Why PR Will Work for You</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Your business stage is ideal for media coverage</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Press coverage will directly boost your credibility
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm">Your PR Potential</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm text-muted-foreground">You're positioned to attract top-tier media</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Your story has strong news value</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="text-lg md:text-xl px-8 md:px-20 py-5 md:py-6 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg whitespace-normal text-center w-full md:w-auto"
              onClick={handleContinue}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Unlock My Reward →"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
