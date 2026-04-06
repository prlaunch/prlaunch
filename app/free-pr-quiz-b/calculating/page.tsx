"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function CalculatingBPage() {
  const router = useRouter()
  const { setScore } = useQuiz()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  useEffect(() => {
    const randomScore = Math.floor(Math.random() * (92 - 75 + 1)) + 75
    setScore(randomScore)

    const timer = setTimeout(() => {
      router.push("/free-pr-quiz-b/score")
    }, 5000)
    return () => clearTimeout(timer)
  }, [router, setScore])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <StickyLogoBanner />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-12">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-muted/20"></div>
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
              style={{
                borderTopColor: "#2563EB",
                borderRightColor: "#06B6D4",
                borderBottomColor: "#9333EA",
                animationDuration: "1s",
              }}
            ></div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Analyzing Your Results</h2>
            <p className="text-lg text-muted-foreground">Discovering if you're ready for recognition...</p>
          </div>

          <div className="space-y-4 max-w-xs mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Evaluating your story</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <span className="text-sm text-muted-foreground">Analyzing your visibility</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: "1s" }}></div>
              <span className="text-sm text-muted-foreground">Matching ideal media outlets</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
              <span className="text-sm text-muted-foreground">Calculating your recognition score</span>
            </div>
          </div>

          <p className="text-xs md:text-sm text-gray-500 text-center mt-8 px-4">
            4,847 people have completed this analysis
          </p>
        </div>
      </div>
    </div>
  )
}
