"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { PR_LOGOS } from "@/lib/quiz-constants"
import { Star, Users, Zap } from "lucide-react"

export default function FreePRQuizCLanding() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Article Logos Section */}
        <div className="mb-8 md:mb-12">
          <p className="text-center text-xs md:text-sm text-gray-600 mb-4 md:mb-6">
            Get Featured In Major Publications
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 items-center justify-items-center opacity-60">
            {PR_LOGOS.map((logo, index) => (
              <div
                key={index}
                className="relative w-20 h-12 md:w-24 md:h-14 grayscale hover:grayscale-0 transition-all"
              >
                <Image src={logo.src || "/placeholder.svg"} alt={logo.alt} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 md:mb-6 text-balance">
          Are You Eligible for Free Press?
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg lg:text-xl text-center text-gray-700 mb-6 md:mb-8 max-w-3xl mx-auto text-pretty">
          We're giving away <strong>FREE article placements</strong> in major publications to 50 qualified businesses
          this month.
        </p>
        <p className="text-sm md:text-base text-center text-gray-600 mb-8 md:mb-10">
          Take this 2-minute eligibility quiz to see if you qualify.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mb-8 md:mb-12">
          <Button
            size="lg"
            className="w-full max-w-md text-base md:text-lg px-8 md:px-16 py-4 md:py-5 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
            onClick={() => router.push("/free-pr-quiz-c/quiz")}
          >
            Check My Eligibility (2 Minutes) →
          </Button>
        </div>

        {/* Social Proof Bar */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mb-8 md:mb-12">
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm md:text-base font-medium">4.9/5 rating</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-sm md:text-base font-medium">3,421 businesses qualified</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border">
            <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-sm md:text-base font-medium">Only 13 spots left</span>
          </div>
        </div>

        {/* Value Clarification Section */}
        <Card className="bg-blue-50 border-2 border-blue-200 p-4 md:p-6 mb-8 md:mb-12">
          <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">What You Get (If Eligible):</h3>
          <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
              <span>
                <strong>FREE article placement</strong> in a major publication (worth $500-2,000)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
              <span>Your choice of publication (Forbes, Entrepreneur, USA Wire, and more)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
              <span>Published within 7 days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
              <span>Article stays live forever</span>
            </li>
          </ul>
          <p className="text-xs md:text-sm text-gray-600 mt-4 italic">
            *Article placement is 100% free. Optional professional writing services available.
          </p>
        </Card>
      </div>
    </div>
  )
}
