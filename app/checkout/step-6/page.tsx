"use client"

import type React from "react"

import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import { Input } from "@/components/ui/input"
import { Lock, Shield, Star, ArrowLeft } from "lucide-react"
import { getOutletsWithImages } from "@/lib/outlets-by-category"
import { getOutletImage } from "@/lib/outlet-images"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"

type Category = "business" | "finance" | "lifestyle" | "tech" | "health"
type Goal = "trust" | "sales" | "seo" | "reviews"
type Package = "starter" | "growth" | "authority"

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

const packages = [
  {
    id: "starter" as Package,
    name: "Starter",
    articles: 1,
    bonus: 0,
    price: 47,
    originalPrice: 94,
    savings: 47,
    features: ["1 premium outlet of your choice", "Professional article writing", "7-day guarantee"],
  },
  {
    id: "growth" as Package,
    name: "Growth",
    articles: 3,
    bonus: 1,
    price: 127,
    originalPrice: 252,
    savings: 125,
    features: [
      "4 premium outlets (3 + 1 bonus!)",
      "Professional article writing",
      "Priority outlet selection",
      "7-day guarantee",
    ],
  },
  {
    id: "authority" as Package,
    name: "Authority",
    articles: 5,
    bonus: 1,
    price: 197,
    originalPrice: 470,
    savings: 273,
    features: [
      "6 premium outlets (5 + 1 bonus!)",
      "Professional article writing",
      "Priority outlet selection",
      "Dedicated PR consultant",
      "7-day guarantee",
    ],
  },
]

export default function Step6Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const goal = searchParams.get("goal") as Goal
  const category = searchParams.get("category") as Category
  const packageId = searchParams.get("package") as Package
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [timeLeft, setTimeLeft] = useState(15 * 60)

  const selectedPackage = packages.find((p) => p.id === packageId)

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

  const getDisplayOutlets = () => {
    if (!category) return []
    return getOutletsWithImages(category).slice(0, 6)
  }

  const isFormValid = () => {
    return email.trim() !== "" && firstName.trim() !== ""
  }

  const handleLaunchCampaign = (e: React.MouseEvent) => {
    if (!isFormValid()) {
      e.preventDefault()
      alert("Please fill in both your email and first name to continue.")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
          style={{ width: "100%" }}
        />
      </div>

      {/* Countdown Timer */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-red-500 py-2 px-4 text-center text-white text-sm font-semibold">
        ⏰ 50% OFF ends in: {formatTime(timeLeft)}
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl" style={{ marginTop: "72px" }}>
        {/* Back Button */}
        <button
          onClick={() => router.push(`/checkout/step-5?goal=${goal}&category=${category}&package=${packageId}`)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="space-y-6">
          <div className="text-center mb-8">
            <p className="text-sm text-slate-500 mb-2">Final Step - Your Campaign Summary</p>
            <h2 className="text-3xl font-bold text-slate-900">🚀 YOUR CUSTOM PR CAMPAIGN</h2>
          </div>

          {/* Campaign Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 space-y-4">
            <div className="space-y-2 text-slate-700">
              <p>
                <span className="font-semibold">Goal:</span> {goals.find((g) => g.id === goal)?.title}
              </p>
              <p>
                <span className="font-semibold">Category:</span> {categories.find((c) => c.id === category)?.title}
              </p>
              <p>
                <span className="font-semibold">Package:</span> {selectedPackage?.name}
              </p>
            </div>

            <div className="border-t border-blue-200 pt-4 space-y-2 text-sm">
              <p className="font-semibold text-slate-900 mb-2">You're getting:</p>
              {selectedPackage?.features.map((feature, i) => (
                <p key={i} className="text-slate-700 flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>{feature}</span>
                </p>
              ))}
            </div>

            <div className="border-t border-blue-200 pt-4">
              <p className="text-sm text-slate-700 mb-2">You'll choose from outlets like:</p>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {getDisplayOutlets().map((outlet, i) => {
                  const imageUrl = getOutletImage(outlet)
                  return (
                    <div
                      key={i}
                      className="bg-white rounded p-2 flex flex-col items-center justify-center min-h-[60px]"
                    >
                      <p className="text-[10px] font-medium text-slate-700 text-center mb-1">{outlet}</p>
                      {imageUrl && (
                        <div className="relative w-full h-8">
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
              <p className="text-xs text-slate-600 text-center">+ 94 more premium outlets</p>
            </div>

            <div className="border-t border-blue-200 pt-4 space-y-1">
              <p className="text-lg font-bold text-slate-900">🎁 TOTAL VALUE: $8,500+</p>
              <p className="text-2xl font-bold text-blue-600">💰 YOUR INVESTMENT: ${selectedPackage?.price}</p>
              <p className="text-lg font-bold text-green-600">🎉 YOU SAVE: ${selectedPackage?.savings} (50% OFF)</p>
            </div>

            {/* Email Capture */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Where should we send your campaign details? <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="✉️ Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  First name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="👤 First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-12 text-base"
                  required
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

            <MovingBorderButton
              borderRadius="1.75rem"
              as="a"
              href={`/payment?package=${packageId}&email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstName)}&goal=${goal}&category=${category}`}
              onClick={handleLaunchCampaign}
              containerClassName="h-14 w-full"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
              duration={3000}
            >
              Launch My Campaign →
            </MovingBorderButton>
          </div>
        </div>
      </div>
    </div>
  )
}
