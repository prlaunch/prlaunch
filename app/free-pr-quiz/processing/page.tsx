"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function ProcessingPage() {
  const router = useRouter()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/free-pr-quiz/writing-offer")
    }, 2500)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <StickyLogoBanner />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Setting Up Your Article</h2>
            <p className="text-muted-foreground">Preparing your personalized options...</p>
          </div>
          <div className="space-y-3 text-left max-w-xs mx-auto">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-muted-foreground">Publication selected</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-muted-foreground">Article angle defined</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-muted-foreground">Finalizing details...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
