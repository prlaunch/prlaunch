"use client"

import { MovingBorderButton } from "@/components/ui/moving-border"
import { getOutletImage } from "@/lib/outlet-images"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, ShieldCheck, Sparkles, Search, FileText, CheckCircle, Rocket, Loader2 } from "lucide-react"
import Image from "next/image"

type Category = "business" | "finance" | "lifestyle" | "tech" | "health"
type Goal = "trust" | "sales" | "seo" | "reviews"

const goals = [
  { id: "trust" as Goal, title: "Build Trust & Credibility" },
  { id: "sales" as Goal, title: "Increase Sales & Revenue" },
  { id: "seo" as Goal, title: "Boost Google Rankings" },
  { id: "reviews" as Goal, title: "Overcome Bad Reviews" },
]

const categories = [
  { id: "business" as Category, title: "Business & Entrepreneurship" },
  { id: "finance" as Category, title: "Finance & Economics" },
  { id: "lifestyle" as Category, title: "Lifestyle & Culture" },
  { id: "tech" as Category, title: "Technology & Digital Marketing" },
  { id: "health" as Category, title: "Health & Wellness" },
]

const categoryOutlets: Record<Category, string[]> = {
  business: ["USA Wire", "SUCCESS XL", "TopHustler", "Thrive Insider", "Bosses Mag", "Hustle Weekly"],
  finance: ["Time Business News", "Washington Guardian", "LA Tabloid", "USA Wire", "Medium", "NY Tech Media"],
  lifestyle: ["USA Wire", "Rolling Hype", "Fashion and Beauty World", "Medium", "The News Hub", "US Features"],
  tech: ["NY Tech Media", "Medium", "Info Tech Inc", "US Features", "Social Media Explorer", "LA Tabloid"],
  health: ["Humane Network", "Health Fitness Wire", "Harcourt Health", "SourceFed", "Medium", "USA Wire"],
}

export default function Step3Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const goal = searchParams.get("goal") as Goal
  const category = searchParams.get("category") as Category
  const [visibleLogos, setVisibleLogos] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setVisibleLogos(0)
    const interval = setInterval(() => {
      setVisibleLogos((prev) => {
        if (prev >= 6) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 300)
    return () => clearInterval(interval)
  }, [])

  const getDisplayOutlets = () => {
    if (!category) return []
    return categoryOutlets[category] || []
  }

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
          <div className="text-center mb-8">
            <p className="text-sm text-slate-500 mb-2">Step 3 of 6 • Your Perfect Outlets</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Based on {categories.find((c) => c.id === category)?.title.split(" & ")[0]} +{" "}
              {goals.find((g) => g.id === goal)?.title.split(" & ")[0]}, we recommend outlets like:
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {getDisplayOutlets().map((outlet, index) => {
              const imageUrl = getOutletImage(outlet)
              return (
                <div
                  key={index}
                  className={`bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex flex-col min-h-[120px] transition-all duration-300 ${
                    index < visibleLogos ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <p className="text-sm font-bold text-slate-900 text-center px-3 pt-3 pb-2">{outlet}</p>
                  {imageUrl && (
                    <div className="relative w-full flex-1 min-h-[64px]">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={outlet}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 33vw, 20vw"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-600 mb-6">
            <ShieldCheck className="h-4 w-4 flex-shrink-0 text-green-600" />
            <p>These are just examples. You'll choose your own outlets.</p>
          </div>

          {/* Educational Box */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              How It Works:
            </h3>
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
