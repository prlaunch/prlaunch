"use client"
import { Check, Loader2, Gift, Star, ArrowUp } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { mainReviews } from "@/lib/reviews-data"
import { ScrollingLogos } from "@/components/scrolling-logos"
import { GuaranteeSection } from "@/components/guarantee-section"

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
    features: ["1 premium outlet of your choice", "Professional article writing"],
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
    features: ["4 premium outlets (3 + 1 bonus!)", "Professional article writing"],
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
    features: ["7 premium outlets (5 + 2 bonus!)", "Professional article writing", "Dedicated PR consultant"],
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
  const [showScrollTop, setShowScrollTop] = useState(false)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const packagesRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (timeLeft === 0) {
      // Reset timer to 15 minutes
      const newStartTime = Date.now()
      localStorage.setItem("campaignTimerStart", newStartTime.toString())
      setTimeLeft(15 * 60)
    }
  }, [timeLeft])

  useEffect(() => {
    const handleScroll = () => {
      if (reviewsRef.current) {
        const reviewsTop = reviewsRef.current.getBoundingClientRect().top
        setShowScrollTop(reviewsTop < window.innerHeight)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  const scrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const displayReviews = mainReviews.slice(0, 10)

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
          style={{ width: "100%" }}
        />
      </div>

      <div className="fixed top-14 left-0 right-0 z-40 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 py-2 px-4 text-center text-white text-sm font-semibold">
        🎁 Free Bonus Article claimed for: {formatTime(timeLeft)}
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl" style={{ marginTop: "48px" }}>
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

          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < 4
                        ? "fill-[#00B67A] text-[#00B67A]"
                        : i === 4
                          ? "fill-[#00B67A] text-[#00B67A] opacity-80"
                          : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <div className="h-3 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-foreground">4.8/5</span>
                <span className="text-xs text-muted-foreground">from 231+ reviews</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">How many articles do you want?</h2>
            <p className="text-sm text-slate-600">Select more and pay less per each article.</p>
          </div>

          <div ref={packagesRef} className="space-y-6">
            {packages.map((pkg) => {
              const totalArticles = pkg.articles + pkg.bonus
              const pricePerArticle = pkg.price / totalArticles

              return (
                <button
                  key={pkg.id}
                  onClick={() => handlePackageSelect(pkg.id)}
                  disabled={isLoading}
                  className={`w-full rounded-2xl border-2 ${pkg.borderColor} ${
                    pkg.popular ? "bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50" : "bg-white"
                  } hover:scale-[1.01] hover:shadow-xl transition-all duration-200 text-left relative disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    selectedPackage === pkg.id ? "ring-2 ring-offset-2 ring-blue-500" : ""
                  } ${hasReward && pkg.rewardEligible ? "shadow-[0_0_0_6px_rgba(34,197,94,0.1)] shadow-lg" : "shadow-lg"} overflow-visible`}
                >
                  {pkg.bonus > 0 && (
                    <div
                      className={`absolute -top-4 ${
                        pkg.id === "authority" ? "left-1/2 -translate-x-1/2" : "right-3"
                      } bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xl flex items-center gap-1 z-20`}
                    >
                      🎁 +{pkg.bonus} FREE
                    </div>
                  )}

                  {hasReward && pkg.rewardEligible && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xl z-20">
                      🎁 FREE ARTICLE
                    </div>
                  )}
                  {pkg.popular && !hasReward && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xl z-20">
                      ⭐ MOST POPULAR
                    </div>
                  )}

                  <div className="p-3.5">
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">
                          {totalArticles} Article{totalArticles > 1 ? "s" : ""}
                          {pkg.bonus > 0 && (
                            <span className="text-slate-700 font-normal text-sm">
                              {" "}
                              ({pkg.articles} + {pkg.bonus} Free Bonus)
                            </span>
                          )}
                        </h3>
                        <p className="text-[11px] text-slate-600 leading-tight">{pkg.description}</p>
                      </div>

                      <div className="flex flex-col items-end flex-shrink-0">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-bold text-slate-900 leading-none">${pkg.price}</span>
                          {isLoading && selectedPackage === pkg.id ? (
                            <Loader2 className="h-4 w-4 text-blue-600 animate-spin ml-1" />
                          ) : selectedPackage === pkg.id ? (
                            <Check className="h-4 w-4 text-blue-600 ml-1" />
                          ) : null}
                        </div>
                        <span className="text-[10px] text-slate-400 line-through leading-none mt-0.5">
                          ${pkg.originalPrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg px-2 py-1">
                        <span className="text-[11px] font-bold text-blue-700">
                          ${pricePerArticle.toFixed(2)}/article
                        </span>
                      </div>
                      <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-lg px-2 py-1">
                        <span className="text-[11px] font-bold text-green-700">Save ${pkg.savings}</span>
                      </div>
                    </div>

                    <div className="space-y-1 mb-2">
                      {pkg.features.map((feature, i) => (
                        <p key={i} className="text-[11px] text-slate-700 flex items-start gap-1.5 leading-tight">
                          <span className="text-green-600 text-xs flex-shrink-0">✓</span>
                          <span>{feature}</span>
                        </p>
                      ))}
                    </div>

                    {hasReward && pkg.rewardEligible && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg px-2 py-1.5 mt-2">
                        <p className="text-[11px] font-bold text-green-700 text-center">
                          🎁 Includes your $94 FREE bonus article!
                        </p>
                      </div>
                    )}
                  </div>

                  <div
                    className={`h-1 w-full rounded-b-2xl bg-gradient-to-r ${
                      pkg.id === "starter"
                        ? "from-purple-400 to-purple-600"
                        : pkg.id === "growth"
                          ? "from-cyan-400 to-blue-600"
                          : "from-pink-400 to-pink-600"
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <div ref={reviewsRef} className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">What Our Customers Say</h3>
            <div className="space-y-4">
              {displayReviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={review.image || "/placeholder.svg"}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900 text-sm">{review.name}</h4>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600">{review.title}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-3">{review.review}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{review.date}</span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <Check className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <ScrollingLogos />
      </div>

      <GuaranteeSection />

      {showScrollTop && (
        <button
          onClick={scrollToPackages}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 animate-in fade-in slide-in-from-bottom-4"
          aria-label="Scroll to packages"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
