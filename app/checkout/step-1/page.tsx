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
      router.push(`/checkout/step-3?goal=${goal}`)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
          style={{ width: "20%" }}
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
            <p className="text-sm text-slate-500 mb-2">Step 1 of 4 • Let's Get Started</p>
            <h2 className="text-3xl font-bold text-slate-900">{"What's your main goal for this article?"}</h2>
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
