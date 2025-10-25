"use client"

import { MovingBorderButton } from "@/components/ui/moving-border"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Search, FileText, CheckCircle, Rocket, Loader2, ShieldCheck } from "lucide-react"

type Goal = "trust" | "sales" | "seo" | "reviews"

export default function Step3Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const goal = searchParams.get("goal") as Goal
  const category = searchParams.get("category")
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = () => {
    setIsLoading(true)
    router.push(`/checkout/step-4?goal=${goal}&category=${category}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
          style={{ width: "50%" }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <button
          onClick={() => router.push(`/checkout/step-2?goal=${goal}`)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="space-y-6">
          {/* Main Headline */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
          </div>

          {/* Educational Box */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 space-y-4">
            <div className="space-y-3 text-slate-700">
              <p className="flex items-start gap-3">
                <Search className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>You'll choose from 100+ premium outlets</span>
              </p>
              <p className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>We write your custom article (included free)</span>
              </p>
              <p className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>You review and approve before publishing</span>
              </p>
              <p className="flex items-start gap-3">
                <Rocket className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Published in 7 days - guaranteed</span>
              </p>
              <p className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>If you&#39;re not happy, we&#39;ll replace it or give you a refund</span>
              </p>
            </div>
          </div>

          <MovingBorderButton
            borderRadius="1.75rem"
            onClick={handleContinue}
            disabled={isLoading}
            containerClassName="h-14 w-full"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            duration={3000}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </span>
            ) : (
              "This Sounds Perfect! Continue →"
            )}
          </MovingBorderButton>
        </div>
      </div>
    </div>
  )
}
