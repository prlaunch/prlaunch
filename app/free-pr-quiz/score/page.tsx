"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function ScorePage() {
  const router = useRouter()
  const { score } = useQuiz()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <StickyLogoBanner />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Your PR Readiness Score</h2>

            <div className="inline-flex items-center justify-center">
              <div className="relative w-24 h-24">
                <svg className="transform -rotate-90 w-24 h-24">
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={`${2 * Math.PI * 42 * (1 - score / 100)}`}
                    className="text-green-500 transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{score}%</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-semibold text-green-600">Highly Effective</span>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 space-y-3">
            <h3 className="font-semibold text-sm">Why PR Will Work for You:</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm">Your business stage is ideal for media coverage</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm">Press coverage will directly boost your credibility</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm">You're ready to start getting featured now</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="text-xl px-20 py-6 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
              onClick={() => router.push("/free-pr-quiz/winner")}
            >
              Unlock My Reward →
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
