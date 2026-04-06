"use client"
import { Check, ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Goal = "trust" | "sales" | "seo" | "reviews"

const goals = [
  {
    id: "trust" as Goal,
    icon: "✅",
    title: "Build Trust Online",
    description: "Appear on reputable news sites",
    color: "purple",
  },
  {
    id: "sales" as Goal,
    icon: "💰",
    title: "Make More Sales",
    description: "Close more customers and sales",
    color: "cyan",
  },
  {
    id: "seo" as Goal,
    icon: "📈",
    title: "Boost Google Rankings",
    description: "Show up higher in search",
    color: "pink",
  },
  {
    id: "reviews" as Goal,
    icon: "⭐",
    title: "Hide Bad Reviews",
    description: "Build positive online reputation",
    color: "purple",
  },
]

const getBorderColor = (index: number) => {
  const colors = ["border-purple-500", "border-cyan-500", "border-pink-500"]
  return colors[index % colors.length]
}

export default function Step1Page() {
  const router = useRouter()
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal)
    setIsLoading(true)
    setTimeout(() => {
      router.push(`/checkout/step-4?goal=${goal}`)
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
          onClick={() => router.push("/checkout/start")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="space-y-6">
          <div className="text-center mb-8">
            <p className="text-sm text-slate-500 mb-2">Step 1 of 3 • Let's Get Started</p>
            <h2 className="text-3xl font-bold text-slate-900">{"What's your main goal for this article?"}</h2>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-slate-900">100% Money-Back Guarantee</div>
                <div className="text-sm text-slate-600">48 hours or full refund</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {goals.map((goal, index) => (
              <button
                key={goal.id}
                onClick={() => handleGoalSelect(goal.id)}
                disabled={isLoading}
                className={`w-full min-h-[70px] p-4 rounded-xl border-2 ${getBorderColor(index)} bg-white hover:scale-[1.02] hover:shadow-lg transition-all duration-200 text-left flex items-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  selectedGoal === goal.id ? "ring-2 ring-offset-2 ring-blue-500" : ""
                }`}
              >
                <div className="text-3xl">{goal.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-1">{goal.title}</h3>
                  <p className="text-sm text-slate-600">{goal.description}</p>
                </div>
                {isLoading && selectedGoal === goal.id ? (
                  <Loader2 className="h-6 w-6 text-blue-600 flex-shrink-0 animate-spin" />
                ) : selectedGoal === goal.id ? (
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
