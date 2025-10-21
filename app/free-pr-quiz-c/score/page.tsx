"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { QuizLogo } from "@/components/quiz-logo"

export default function ScoreCPage() {
  const router = useRouter()
  const { score } = useQuiz()

  // Fallback score if not set
  const displayScore = score || 85

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Logo */}
        <div className="flex justify-center mb-8 md:mb-12">
          <QuizLogo />
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 md:mb-6">
          🎉 Congratulations! You're Eligible!
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg text-center text-gray-700 mb-8 md:mb-12 max-w-2xl mx-auto">
          Based on your answers, you qualify for our free press program.
        </p>

        {/* Score Display */}
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <svg className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="50%" cy="50%" r="45%" stroke="#e5e7eb" strokeWidth="8" fill="none" />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray="283"
                strokeDashoffset={283 - (displayScore / 100) * 283}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="50%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
            </svg>
            {/* </CHANGE> */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl md:text-5xl font-bold">{displayScore}%</span>
            </div>
          </div>

          <p className="text-base md:text-lg font-semibold mt-4">Press Readiness Score</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-sm md:text-base text-gray-600">Qualified for Free Press</span>
          </div>
        </div>

        {/* Eligibility Confirmation Card */}
        <Card className="p-4 md:p-6 mb-8 md:mb-12 bg-green-50 border-2 border-green-200">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl flex-shrink-0">✅</span>
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-2">You're One of the 50!</h3>
              <p className="text-sm md:text-base text-gray-700">
                You're eligible for a <strong>FREE article placement</strong> in a major publication of your choice.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mt-4">
            <p className="text-xs md:text-sm font-semibold mb-2">What's Included (100% Free):</p>
            <ul className="space-y-2 text-xs md:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                <span>Article placement in Forbes, Entrepreneur, USA Wire, or similar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                <span>Published within 7 days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                <span>Article stays live forever</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                <span>Includes your contact info and website links</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* What Happens Next Section */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">What Happens Next</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-3">1️⃣</div>
              <h4 className="font-semibold mb-2 text-sm md:text-base">Choose Your Publication</h4>
              <p className="text-xs md:text-sm text-gray-600">Pick from 6+ major outlets</p>
            </div>

            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-3">2️⃣</div>
              <h4 className="font-semibold mb-2 text-sm md:text-base">Tell Us Your Story</h4>
              <p className="text-xs md:text-sm text-gray-600">Answer 4 quick questions</p>
            </div>

            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-3">3️⃣</div>
              <h4 className="font-semibold mb-2 text-sm md:text-base">Get Featured</h4>
              <p className="text-xs md:text-sm text-gray-600">Published in 7 days</p>
            </div>
          </div>
        </div>

        {/* Urgency Element */}
        <Card className="bg-yellow-50 border-2 border-yellow-200 p-4 mb-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <div>
              <p className="font-semibold text-sm md:text-base">Only 13 spots left this month</p>
              <p className="text-xs md:text-sm text-gray-600">Claim your free article before spots run out</p>
            </div>
          </div>
        </Card>

        {/* CTA Button */}
        <div className="flex justify-center mb-6">
          <Button
            size="lg"
            className="w-full max-w-md text-base md:text-lg px-8 md:px-16 py-4 md:py-5 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
            onClick={() => router.push("/free-pr-quiz/winner")}
          >
            Claim My Free Article →
          </Button>
        </div>

        {/* Social Proof */}
        <p className="text-xs md:text-sm text-gray-500 text-center">
          Businesses with your score got featured in Forbes, Entrepreneur, USA Wire
        </p>
      </div>
    </div>
  )
}
