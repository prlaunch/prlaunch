"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function CalculatingPage() {
  const router = useRouter()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/free-pr-quiz/score")
    }, 6000)
    return () => clearTimeout(timer)
  }, [router])

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
            <p className="text-lg text-muted-foreground">Calculating your PR readiness score...</p>
          </div>

          <div className="space-y-4 max-w-xs mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Evaluating business stage</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <span className="text-sm text-muted-foreground">Analyzing online presence</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: "1s" }}></div>
              <span className="text-sm text-muted-foreground">Matching ideal publications</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
              <span className="text-sm text-muted-foreground">Calculating readiness score</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
