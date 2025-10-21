"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { QuizLogo } from "@/components/quiz-logo"

export default function CalculatingCPage() {
  const router = useRouter()
  const { setScore } = useQuiz()

  useEffect(() => {
    // Generate random score between 75-92%
    const randomScore = Math.floor(Math.random() * (92 - 75 + 1)) + 75
    setScore(randomScore)

    // Redirect after 4 seconds
    const timer = setTimeout(() => {
      router.push("/free-pr-quiz-c/score")
    }, 4000)

    return () => clearTimeout(timer)
  }, [router, setScore])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8 md:mb-12">
          <QuizLogo />
        </div>

        {/* Headline */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Checking Your Eligibility...</h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12">
          Analyzing your answers to see if you qualify for free press
        </p>

        {/* Animated Spinner */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="relative w-20 h-20 md:w-24 md:h-24">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3 md:space-y-4 text-left max-w-sm mx-auto mb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="text-sm md:text-base">Evaluating your business readiness</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="text-sm md:text-base">Matching you with ideal publications</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 animate-pulse flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">●</span>
            </div>
            <span className="text-sm md:text-base font-semibold">Checking eligibility status...</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
              <span className="text-gray-500 text-sm">○</span>
            </div>
            <span className="text-sm md:text-base text-gray-500">Calculating your press readiness score</span>
          </div>
        </div>

        {/* Social Proof */}
        <p className="text-xs md:text-sm text-gray-500 text-center mt-8">
          3,421 businesses have checked their eligibility. 2,847 qualified.
        </p>
      </div>
    </div>
  )
}
