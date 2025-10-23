"use client"
import { Check, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Goal = "trust" | "sales" | "seo" | "reviews"

const goals = [
  {
    id: "trust" as Goal,
    icon: "✅",
    title: "Build Trust & Credibility",
    description: "Get featured on trusted news sites and look established",
    color: "purple",
  },
  {
    id: "sales" as Goal,
    icon: "🤑",
    title: "Increase Sales & Revenue",
    description: "Drive more customers and boost conversions",
    color: "cyan",
  },
  {
    id: "seo" as Goal,
    icon: "📈",
    title: "Boost Google Rankings",
    description: "Appear higher in search results and get found",
    color: "pink",
  },
  {
    id: "reviews" as Goal,
    icon: "⭐",
    title: "Overcome Bad Reviews",
    description: "Build positive online reputation and bury negativity",
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

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal)
    setTimeout(() => {
      router.push(`/checkout/step-2?goal=${goal}`)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
          style={{ width: "16.67%" }}
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
            <p className="text-sm text-slate-500 mb-2">Step 1 of 6 • Let's Get Started</p>
            <h2 className="text-3xl font-bold text-slate-900">What's your #1 goal with PR?</h2>
          </div>
          <div className="space-y-3">
            {goals.map((goal, index) => (
              <button
                key={goal.id}
                onClick={() => handleGoalSelect(goal.id)}
                className={`w-full min-h-[70px] p-4 rounded-xl border-2 ${getBorderColor(index)} bg-white hover:scale-[1.02] hover:shadow-lg transition-all duration-200 text-left flex items-center gap-4 ${
                  selectedGoal === goal.id ? "ring-2 ring-offset-2 ring-blue-500" : ""
                }`}
              >
                <div className="text-3xl">{goal.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-1">{goal.title}</h3>
                  <p className="text-sm text-slate-600">{goal.description}</p>
                </div>
                {selectedGoal === goal.id && <Check className="h-6 w-6 text-blue-600 flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
