"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Shield, Lock, Star } from "lucide-react"
import { outletsByCategory } from "@/lib/outlets-by-category"
import confetti from "canvas-confetti"

type Goal = "trust" | "sales" | "seo" | "reviews"
type Category = "business" | "finance" | "lifestyle" | "tech" | "health"
type Package = "starter" | "growth" | "scale"

const goals = [
  {
    id: "trust" as Goal,
    icon: "🎯",
    title: "Build Trust & Credibility",
    description: "Get featured on trusted news sites and look established",
    color: "purple",
  },
  {
    id: "sales" as Goal,
    icon: "📈",
    title: "Increase Sales & Revenue",
    description: "Drive more customers and boost conversions",
    color: "cyan",
  },
  {
    id: "seo" as Goal,
    icon: "🔍",
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

const categories = [
  {
    id: "business" as Category,
    icon: "💼",
    title: "Business & Entrepreneurship",
    description: "Perfect for: Startups, coaches, consultants, agencies",
    color: "purple",
  },
  {
    id: "finance" as Category,
    icon: "📈",
    title: "Finance & Economics",
    description: "Perfect for: Financial services, investing, fintech, accounting",
    color: "cyan",
  },
  {
    id: "lifestyle" as Category,
    icon: "✨",
    title: "Lifestyle & Culture",
    description: "Perfect for: Fashion, beauty, travel, food, entertainment",
    color: "pink",
  },
  {
    id: "tech" as Category,
    icon: "💻",
    title: "Technology & Digital Marketing",
    description: "Perfect for: SaaS, apps, tech products, digital agencies",
    color: "purple",
  },
  {
    id: "health" as Category,
    icon: "💪",
    title: "Health & Wellness",
    description: "Perfect for: Fitness, nutrition, mental health, medical",
    color: "cyan",
  },
]

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
    features: [
      "1 premium outlet of your choice",
      "Professional article writing",
      "Free media kit ($97 value)",
      "7-day guarantee",
    ],
    borderColor: "border-purple-500",
  },
  {
    id: "growth" as Package,
    name: "Growth",
    articles: 3,
    bonus: 1,
    price: 127,
    originalPrice: 252,
    savings: 125,
    description: "Perfect for: Building credibility",
    features: [
      "4 premium outlets (3 + 1 bonus!)",
      "Professional article writing",
      "Free media kit ($97 value)",
      "Priority outlet selection",
      "7-day guarantee",
    ],
    popular: true,
    borderColor: "border-cyan-500",
  },
  {
    id: "scale" as Package,
    name: "Scale",
    articles: 5,
    bonus: 1,
    price: 197,
    originalPrice: 470,
    savings: 273,
    description: "Perfect for: Maximum exposure",
    features: [
      "6 premium outlets (5 + 1 bonus!)",
      "Professional article writing",
      "Free media kit ($97 value)",
      "Priority outlet selection",
      "Dedicated PR consultant",
      "7-day guarantee",
    ],
    borderColor: "border-pink-500",
  },
]

export function CampaignBuilder() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [showRewardOverlay, setShowRewardOverlay] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [visibleLogos, setVisibleLogos] = useState<number>(0)

  // Progress calculation
  const progress = (currentScreen / 6) * 100

  // Countdown timer (starts at Screen 5)
  useEffect(() => {
    if (currentScreen >= 5 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentScreen, timeLeft])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Logo animation on Screen 3
  useEffect(() => {
    if (currentScreen === 3) {
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
    }
  }, [currentScreen])

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal)
    setTimeout(() => {
      setCurrentScreen(2)
    }, 500)
  }

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
    setTimeout(() => {
      setCurrentScreen(3)
    }, 500)
  }

  const handleContinueToReward = () => {
    setShowRewardOverlay(true)
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const handleClaimBonuses = () => {
    setShowRewardOverlay(false)
    setCurrentScreen(5)
  }

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg)
    setTimeout(() => {
      setCurrentScreen(6)
    }, 500)
  }

  const getDisplayOutlets = () => {
    if (!selectedCategory) return []
    return outletsByCategory[selectedCategory].slice(0, 6)
  }

  const getBorderColor = (index: number) => {
    const colors = ["border-purple-500", "border-cyan-500", "border-pink-500"]
    return colors[index % colors.length]
  }

  // Screen 0: Hype/Intro
  if (currentScreen === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="text-8xl mb-8 animate-bounce">🚀</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            You're About to Get Featured In:
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {["USA Wire", "Success XL", "SF Tribune", "LA Tabloid", "Yahoo"].map((outlet, i) => (
              <div
                key={i}
                className="text-white/90 font-semibold text-lg animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {outlet}
              </div>
            ))}
          </div>
          <p className="text-xl text-white/90 mb-8">Let's build your custom PR campaign!</p>
          <p className="text-white/80 mb-8">Join 500+ businesses featured this month</p>
          <Button
            onClick={() => setCurrentScreen(1)}
            className="h-14 px-8 text-lg font-semibold bg-white text-blue-600 hover:bg-white/90 rounded-lg shadow-xl"
          >
            Start Building My Campaign →
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Countdown Timer (Screen 5+) */}
      {currentScreen >= 5 && (
        <div className="fixed top-1 left-0 right-0 z-40 bg-red-500 py-2 px-4 text-center text-white text-sm font-semibold">
          ⏰ 50% OFF ends in: {formatTime(timeLeft)}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-2xl" style={{ marginTop: currentScreen >= 5 ? "48px" : "0" }}>
        {/* Screen 1: Goal Selection */}
        {currentScreen === 1 && (
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
        )}

        {/* Screen 2: Category Selection */}
        {currentScreen === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <p className="text-sm text-slate-500 mb-2">Step 2 of 6 • Building Your Campaign</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Which category best fits your business?</h2>
              <p className="text-sm text-slate-600">💡 This helps us recommend the perfect outlets for you</p>
            </div>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`w-full min-h-[70px] p-4 rounded-xl border-2 ${getBorderColor(index)} bg-white hover:scale-[1.02] hover:shadow-lg transition-all duration-200 text-left flex items-center gap-4 ${
                    selectedCategory === category.id ? "ring-2 ring-offset-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="text-3xl">{category.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1">{category.title}</h3>
                    <p className="text-sm text-slate-600">{category.description}</p>
                  </div>
                  {selectedCategory === category.id && <Check className="h-6 w-6 text-blue-600 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Screen 3: Outlet Preview + Education */}
        {currentScreen === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <p className="text-sm text-slate-500 mb-2">Step 3 of 6 • Your Perfect Outlets</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Based on {categories.find((c) => c.id === selectedCategory)?.title.split(" & ")[0]} +{" "}
                {goals.find((g) => g.id === selectedGoal)?.title.split(" & ")[0]}, you'll get featured in outlets like:
              </h2>
            </div>

            {/* Outlet Logos Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {getDisplayOutlets().map((outlet, index) => (
                <div
                  key={index}
                  className={`bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-center min-h-[80px] transition-all duration-300 ${
                    index < visibleLogos ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <span className="text-sm font-semibold text-slate-700 text-center">{outlet}</span>
                </div>
              ))}
            </div>

            {/* Educational Box */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 mb-4">💎 How It Works:</h3>
              <div className="space-y-3 text-slate-700">
                <p className="flex items-start gap-2">
                  <span className="font-semibold">1️⃣</span>
                  <span>You'll choose from 100+ premium outlets</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold">2️⃣</span>
                  <span>We write your custom article (included free)</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold">3️⃣</span>
                  <span>You review and approve before publishing</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold">4️⃣</span>
                  <span>Published in 7 days - guaranteed</span>
                </p>
              </div>
              <div className="border-t border-blue-200 pt-4 space-y-2 text-sm text-slate-700">
                <p>✓ You pick the exact outlets after purchase</p>
                <p>✓ Our team guides you through selection</p>
                <p>✓ Every article is professionally written</p>
                <p>✓ 100% money-back guarantee</p>
              </div>
            </div>

            <div className="text-center py-4">
              <p className="text-lg font-bold text-slate-900">📊 Campaign Value: $8,500+ in media exposure</p>
            </div>

            <Button
              onClick={handleContinueToReward}
              className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              This Sounds Perfect! Continue →
            </Button>
          </div>
        )}

        {/* Screen 4: Reward Unlock Overlay */}
        {showRewardOverlay && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full text-center space-y-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-slate-900">CONGRATULATIONS!</h2>
              <p className="text-xl text-slate-700 mb-6">You've unlocked exclusive bonuses:</p>
              <div className="space-y-4 text-left">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-bold text-slate-900 mb-1">🎁 FREE Professional Media Kit ($97 value)</p>
                  <p className="text-sm text-slate-600">→ Shareable graphics for social media</p>
                  <p className="text-sm text-slate-600">→ Press release template</p>
                  <p className="text-sm text-slate-600">→ Brand assets package</p>
                </div>
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
                  <p className="font-bold text-slate-900 mb-1">🎁 +1 BONUS Article (on 3+ article packages)</p>
                  <p className="text-sm text-slate-600">→ Get more coverage for free</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                  <p className="font-bold text-slate-900 mb-1">🎁 Priority Outlet Selection</p>
                  <p className="text-sm text-slate-600">→ Choose from premium outlets first</p>
                </div>
              </div>
              <Button
                onClick={handleClaimBonuses}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg"
              >
                Claim My Bonuses →
              </Button>
            </div>
          </div>
        )}

        {/* Screen 5: Package Selection */}
        {currentScreen === 5 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <p className="text-sm text-slate-500 mb-2">Step 5 of 6 • Choose Your Package</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">How many articles do you want?</h2>
              <p className="text-slate-600">
                Your campaign will feature {categories.find((c) => c.id === selectedCategory)?.title.split(" & ")[0]}{" "}
                outlets focused on {goals.find((g) => g.id === selectedGoal)?.title.split(" & ")[0]}
              </p>
            </div>

            {/* Social Proof */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center mb-6">
              <p className="text-sm text-slate-700">✓ 1,247 businesses chose Growth this month</p>
            </div>

            <div className="space-y-4">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => handlePackageSelect(pkg.id)}
                  className={`w-full p-6 rounded-xl border-2 ${pkg.borderColor} ${
                    pkg.popular ? "bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50" : "bg-white"
                  } hover:scale-[1.02] hover:shadow-lg transition-all duration-200 text-left relative ${
                    selectedPackage === pkg.id ? "ring-2 ring-offset-2 ring-blue-500" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                      ⭐ MOST POPULAR
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-1">
                        {pkg.articles} Article{pkg.articles > 1 ? "s" : ""}
                        {pkg.bonus > 0 && ` + ${pkg.bonus} FREE BONUS`}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl font-bold text-slate-900">${pkg.price}</span>
                        <span className="text-lg text-slate-400 line-through">${pkg.originalPrice}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{pkg.description}</p>
                      {pkg.savings > 0 && (
                        <p className="text-sm font-bold text-green-600">💰 You save ${pkg.savings} (50% OFF)</p>
                      )}
                    </div>
                    {selectedPackage === pkg.id && <Check className="h-6 w-6 text-blue-600 flex-shrink-0" />}
                  </div>
                  <div className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <p key={i} className="text-sm text-slate-700 flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{feature}</span>
                      </p>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Screen 6: Final Checkout */}
        {currentScreen === 6 && selectedPackage && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🎉</div>
              <p className="text-sm text-slate-500 mb-2">Final Step - Your Campaign Summary</p>
              <h2 className="text-3xl font-bold text-slate-900">🚀 YOUR CUSTOM PR CAMPAIGN</h2>
            </div>

            {/* Campaign Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 space-y-4">
              <div className="space-y-2 text-slate-700">
                <p>
                  <span className="font-semibold">Goal:</span> {goals.find((g) => g.id === selectedGoal)?.title}
                </p>
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {categories.find((c) => c.id === selectedCategory)?.title}
                </p>
                <p>
                  <span className="font-semibold">Package:</span> {packages.find((p) => p.id === selectedPackage)?.name}
                </p>
              </div>

              <div className="border-t border-blue-200 pt-4 space-y-2 text-sm">
                <p className="font-semibold text-slate-900 mb-2">You're getting:</p>
                {packages
                  .find((p) => p.id === selectedPackage)
                  ?.features.map((feature, i) => (
                    <p key={i} className="text-slate-700 flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>{feature}</span>
                    </p>
                  ))}
              </div>

              <div className="border-t border-blue-200 pt-4">
                <p className="text-sm text-slate-700 mb-2">You'll choose from outlets like:</p>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {getDisplayOutlets().map((outlet, i) => (
                    <div key={i} className="bg-white rounded p-2 text-xs text-center font-medium text-slate-700">
                      {outlet}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-600 text-center">+ 94 more premium outlets</p>
              </div>

              <div className="border-t border-blue-200 pt-4 space-y-1">
                <p className="text-lg font-bold text-slate-900">🎁 TOTAL VALUE: $8,500+</p>
                <p className="text-2xl font-bold text-blue-600">
                  💰 YOUR INVESTMENT: ${packages.find((p) => p.id === selectedPackage)?.price}
                </p>
                <p className="text-lg font-bold text-green-600">
                  🎉 YOU SAVE: ${packages.find((p) => p.id === selectedPackage)?.savings} (50% OFF)
                </p>
              </div>

              <div className="border-t border-blue-200 pt-4 space-y-1 text-xs text-slate-600">
                <p>✓ 100% money-back guarantee</p>
                <p>✓ Published in 7 days or full refund</p>
                <p>✓ Review articles before publishing</p>
              </div>
            </div>

            {/* Email Capture */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Where should we send your campaign details?
                </label>
                <Input
                  type="email"
                  placeholder="✉️ Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="👤 First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-xs text-slate-600">
              <p className="flex items-center gap-2">
                <Lock className="h-4 w-4" />🔒 Secure 256-bit encryption
              </p>
              <p className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-[#00B67A] text-[#00B67A]" />✓ 4.8/5 on Trustpilot (500+ reviews)
              </p>
              <p className="flex items-center gap-2">
                <Shield className="h-4 w-4" />✓ 100% money-back guarantee
              </p>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg animate-pulse"
            >
              <a
                href={`/payment?package=${selectedPackage}&email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstName)}&goal=${selectedGoal}&category=${selectedCategory}`}
              >
                Launch My Campaign - ${packages.find((p) => p.id === selectedPackage)?.price} →
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
