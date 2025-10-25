"use client"
import { Check, ArrowLeft, Loader2, Gift } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

type Package = "starter" | "growth" | "authority"

const packages = [
  {
    id: "starter" as Package,
    name: "Starter",
    articles: 1,
    bonus: 0,
    price: 47,
    originalPrice: 94,
    savings: 47,
    description: "Perfect for: Testing PR",
    features: ["1 premium outlet of your choice", "Professional article writing", "48-hour publishing guaranteed"],
    borderColor: "border-purple-500",
  },
  {
    id: "growth" as Package,
    name: "Growth",
    articles: 3,
    bonus: 1,
    price: 127,
    originalPrice: 376,
    savings: 249,
    description: "Perfect for: Building credibility",
    features: ["4 premium outlets (3 + 1 bonus!)", "Professional article writing", "48-hour publishing guaranteed"],
    popular: true,
    borderColor: "border-cyan-500",
    rewardEligible: true,
  },
  {
    id: "authority" as Package,
    name: "Authority",
    articles: 5,
    bonus: 2,
    price: 197,
    originalPrice: 658,
    savings: 461,
    description: "Perfect for: Maximum exposure",
    features: [
      "7 premium outlets (5 + 2 bonus!)",
      "Professional article writing",
      "Dedicated PR consultant",
      "48-hour publishing guaranteed",
    ],
    borderColor: "border-pink-500",
    rewardEligible: true,
  },
]

const categories = [
  { id: "business", title: "Business & Entrepreneurship" },
  { id: "finance", title: "Finance & Economics" },
  { id: "lifestyle", title: "Lifestyle & Culture" },
  { id: "tech", title: "Technology & Digital Marketing" },
  { id: "health", title: "Health & Wellness" },
]

const goals = [
  { id: "trust", title: "Build Trust & Credibility" },
  { id: "sales", title: "Increase Sales & Revenue" },
  { id: "seo", title: "Boost Google Rankings" },
  { id: "reviews", title: "Overcome Bad Reviews" },
]

export default function Step5Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const goal = searchParams.get("goal")
  const category = searchParams.get("category")
  const hasReward = searchParams.get("reward") === "free_article"
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timerStart = localStorage.getItem("campaignTimerStart")
    if (timerStart) {
      const elapsed = Math.floor((Date.now() - Number.parseInt(timerStart)) / 1000)
      const remaining = Math.max(0, 15 * 60 - elapsed)
      setTimeLeft(remaining)
    }
  }, [])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg)
    setIsLoading(true)
    setTimeout(() => {
      router.push(`/payment?package=${pkg}`)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
          style={{ width: "83.33%" }}
        />
      </div>

      <div className="fixed top-14 left-0 right-0 z-40 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 py-2 px-4 text-center text-white text-sm font-semibold">
        🎁 Free Bonus Article claimed for: {formatTime(timeLeft)}
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl" style={{ marginTop: "48px" }}>
        <button
          onClick={() => router.push(`/checkout/step-4?goal=${goal}&category=${category}`)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="space-y-6">
          {hasReward && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 mb-6 animate-in slide-in-from-top duration-500">
              <div className="flex items-start gap-3">
                <Gift className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-green-900 mb-1">🎉 Your Free Article is Ready!</h3>
                  <p className="text-sm text-green-800">
                    Select a package of 4 or 7 articles below to claim your free bonus article (worth $94)
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mb-6">
            <p className="text-sm text-slate-500 mb-2">Step 5 of 6 • Choose Your Package</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">How many articles do you want?</h2>
            <p className="text-sm text-slate-600">Select more and pay less per each article.</p>
          </div>

          <div className="space-y-3">
            {packages.map((pkg) => {
              const totalArticles = pkg.articles + pkg.bonus
              const pricePerArticle = pkg.price / totalArticles

              return (
                <button
                  key={pkg.id}
                  onClick={() => handlePackageSelect(pkg.id)}
                  disabled={isLoading}
                  className={`w-full p-4 rounded-xl border-2 ${pkg.borderColor} ${
                    pkg.popular ? "bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50" : "bg-white"
                  } hover:scale-[1.02] hover:shadow-lg transition-all duration-200 text-left relative disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    selectedPackage === pkg.id ? "ring-2 ring-offset-2 ring-blue-500" : ""
                  } ${hasReward && pkg.rewardEligible ? "shadow-[0_0_0_8px_rgba(34,197,94,0.1)]" : ""}`}
                >
                  {pkg.bonus > 0 && (
                    <div
                      className={`absolute -top-3 ${
                        pkg.id === "authority" ? "left-1/2 -translate-x-1/2" : "right-4"
                      } bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1`}
                    >
                      🎁 Bonus
                    </div>
                  )}
                  {/* </CHANGE> */}

                  {hasReward && pkg.rewardEligible && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-0.5 rounded-full text-xs font-bold">
                      🎁 FREE ARTICLE
                    </div>
                  )}
                  {pkg.popular && !hasReward && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-0.5 rounded-full text-xs font-bold">
                      ⭐ MOST POPULAR
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">
                        {pkg.articles} Article{pkg.articles > 1 ? "s" : ""}
                        {pkg.bonus > 0 && ` + ${pkg.bonus} FREE`}
                      </h3>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-bold text-slate-900">${pkg.price}</span>
                        <span className="text-sm text-slate-400 line-through">${pkg.originalPrice}</span>
                      </div>
                      <div className="inline-block bg-blue-50 border border-blue-200 rounded-full px-2.5 py-0.5 mb-2">
                        <span className="text-xs font-semibold text-blue-700">
                          ${pricePerArticle.toFixed(2)} per article
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-2">{pkg.description}</p>
                      {pkg.savings > 0 && <p className="text-xs font-bold text-green-600">💰 Save ${pkg.savings}</p>}
                      {hasReward && pkg.rewardEligible && (
                        <p className="text-xs font-bold text-green-600">🎁 + $94 FREE from your reward!</p>
                      )}
                    </div>
                    {isLoading && selectedPackage === pkg.id ? (
                      <Loader2 className="h-5 w-5 text-blue-600 flex-shrink-0 animate-spin" />
                    ) : selectedPackage === pkg.id ? (
                      <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    ) : null}
                  </div>
                  <div className="space-y-1">
                    {pkg.features.map((feature, i) => (
                      <p key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <span className="text-green-600 text-sm">✓</span>
                        <span>{feature}</span>
                      </p>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
