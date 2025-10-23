"use client"

import { Check, ArrowLeft, Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

type Category = "business" | "finance" | "lifestyle" | "tech" | "health"

const categories = [
  {
    id: "business" as Category,
    icon: "💼",
    title: "Business & Entrepreneurship",
    description: "Perfect for: Personal brands, coaches, consultants, businesses",
    color: "purple",
  },
  {
    id: "finance" as Category,
    icon: "📈",
    title: "Finance & Economics",
    description: "Perfect for: Financial advisors, crypto/blockchain, fintech",
    color: "cyan",
  },
  {
    id: "lifestyle" as Category,
    icon: "✨",
    title: "Lifestyle & Culture",
    description: "Perfect for: Musicians & influencers, fashion brands, entertainment businesses",
    color: "pink",
  },
  {
    id: "tech" as Category,
    icon: "💻",
    title: "Technology & Digital Marketing",
    description: "Perfect for: SaaS companies, mobile apps, tech startups, agencies",
    color: "purple",
  },
  {
    id: "health" as Category,
    icon: "💪",
    title: "Health & Wellness",
    description: "Perfect for: Gyms, nutritionists, wellness coaches, medical practices",
    color: "cyan",
  },
]

const getBorderColor = (index: number) => {
  const colors = ["border-purple-500", "border-cyan-500", "border-pink-500"]
  return colors[index % colors.length]
}

export default function Step2Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const goal = searchParams.get("goal")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
    setIsLoading(true)
    setTimeout(() => {
      router.push(`/checkout/step-3?goal=${goal}&category=${category}`)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
          style={{ width: "33.33%" }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <button
          onClick={() => router.push(`/checkout/step-1`)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="space-y-6">
          <div className="text-center mb-8">
            <p className="text-sm text-slate-500 mb-2">Step 2 of 6 • Building Your Campaign</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Which category fits you?</h2>
          </div>
          <div className="space-y-3">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                disabled={isLoading}
                className={`w-full min-h-[70px] p-4 rounded-xl border-2 ${getBorderColor(index)} bg-white hover:scale-[1.02] hover:shadow-lg transition-all duration-200 text-left flex items-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedCategory === category.id ? "ring-2 ring-offset-2 ring-blue-500" : ""
                }`}
              >
                <div className="text-3xl">{category.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-1">{category.title}</h3>
                  <p className="text-sm text-slate-600">{category.description}</p>
                </div>
                {isLoading && selectedCategory === category.id ? (
                  <Loader2 className="h-6 w-6 text-blue-600 flex-shrink-0 animate-spin" />
                ) : selectedCategory === category.id ? (
                  <Check className="h-6 w-6 text-blue-600 flex-shrink-0" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
