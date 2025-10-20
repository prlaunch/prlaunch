"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, Clock, Sparkles, TrendingUp, Globe, Star } from "lucide-react"
import { processMainUpsellPayment } from "@/app/actions/stripe"
import { loadStripe } from "@stripe/stripe-js"
import { ConfettiAnimation } from "@/components/confetti-animation"
import { UpsellTestimonials } from "@/components/upsell-testimonials"
import { WikiPageMockup } from "@/components/wiki-page-mockup"
import { Loader2 } from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function UpsellContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const packageName = searchParams.get("package") || "Starter"
  const articles = searchParams.get("articles") || "1"
  const price = searchParams.get("price") || "47"
  const email = searchParams.get("email") || ""
  const fullName = searchParams.get("name") || ""
  const customerId = searchParams.get("customerId") || "" // Get customer ID from URL

  const [timeLeft, setTimeLeft] = useState(10 * 60)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          router.push(
            `/thank-you?package=${packageName}&articles=${articles}&price=${price}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}`,
          )
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [packageName, articles, price, email, fullName, router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handlePurchase = async () => {
    if (!customerId) {
      console.error("[v0] No customer ID provided")
      router.push(
        `/thank-you?package=${packageName}&articles=${articles}&price=${price}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&upsell=declined`,
      )
      return
    }

    setIsProcessing(true)

    try {
      const result = await processMainUpsellPayment(customerId, 197)

      if (result.success) {
        router.push(
          `/thank-you?package=${packageName}&articles=${articles}&price=${price}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&upsell=accepted&upsellPrice=197`,
        )
      } else if (result.requiresAction) {
        setIsProcessing(false)
        alert("This payment method requires additional authentication. Please try again or decline the offer.")
      } else {
        console.error("[v0] Upsell payment failed")
        setIsProcessing(false)
        router.push(
          `/thank-you?package=${packageName}&articles=${articles}&price=${price}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&upsell=declined`,
        )
      }
    } catch (error) {
      console.error("[v0] Upsell error:", error)
      setIsProcessing(false)
      router.push(
        `/thank-you?package=${packageName}&articles=${articles}&price=${price}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&upsell=declined`,
      )
    }
  }

  const handleDecline = () => {
    router.push(
      `/thank-you?package=${packageName}&articles=${articles}&price=${price}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&upsell=declined`,
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ConfettiAnimation />

      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-2 max-w-2xl">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-4 w-4 text-red-600" />
            <span className="text-xs text-slate-600">Offer expires in</span>
            <span className="font-mono text-base font-semibold text-red-600">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-4">
          <div className="inline-flex items-center gap-1.5 bg-blue-500 text-white px-3 py-1 rounded-full font-semibold mb-4 text-xs">
            <Sparkles className="h-3 w-3" />
            ONE-TIME OFFER
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">
            🎉 Perfect Timing! Add Your EverybodyWiki Page Now for Just <span className="text-blue-600">$197</span>
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="text-xl text-slate-400 line-through font-light">$497</div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight">$197</div>
            <div className="px-2 py-0.5 bg-green-500 text-white font-semibold rounded-full text-xs">SAVE $300</div>
          </div>

          <div className="mb-4 rounded-xl overflow-hidden border border-slate-200">
            <Image
              src="/images/design-mode/Screenshot%202025-10-17%20at%2022.10.01%20%281%29.jpg"
              alt="EverybodyWiki Page Benefits"
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>

          <p className="text-slate-600 mb-4 leading-relaxed text-sm">
            Perfect for entrepreneurs, creators, and businesses looking to establish early-stage credibility before
            qualifying for a full Wikipedia entry.
          </p>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Preview: What Your Page Will Look Like</h3>
            <WikiPageMockup />
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-100 p-4 mb-4">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              What's Included
            </h3>
            <ul className="space-y-2">
              {[
                "Page creation and formatting on EverybodyWiki",
                "Includes biography, achievements, links, and media",
                "Indexed on Google within days",
                "Delivery in 5–7 days",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 rounded-xl border-2 border-amber-200 p-4 mb-6">
            <div className="flex items-start gap-2 mb-3">
              <span className="text-lg">⚠️</span>
              <p className="text-sm font-bold text-amber-900">Important: This one-time offer expires in 10 minutes.</p>
            </div>

            <p className="text-sm text-slate-700 mb-3 font-medium">If you skip this now, you'll have to:</p>

            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold shrink-0">❌</span>
                <span className="text-slate-700 text-sm">Pay $497 later (regular price)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold shrink-0">❌</span>
                <span className="text-slate-700 text-sm">Go through the entire ordering process again</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold shrink-0">❌</span>
                <span className="text-slate-700 text-sm">Wait another 7 days for delivery</span>
              </li>
            </ul>

            <div className="bg-white rounded-lg p-3 border border-amber-200">
              <p className="text-sm text-slate-900">
                <span className="font-bold">OR</span> you can add it right now for just{" "}
                <span className="font-bold text-blue-600">$197</span> (save $300) and get everything done at once.
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl border border-green-100 p-4 mb-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Key Benefits
            </h3>
            <ul className="space-y-2">
              {[
                "Ranked on Google for your name and brand",
                "Third-party validation and credibility",
                "Control how you appear online",
                "Step one toward future Wikipedia eligibility",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-green-600 shrink-0 mt-0.5 fill-green-600" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <UpsellTestimonials />

          <Button
            onClick={handlePurchase}
            disabled={isProcessing}
            className="w-full h-auto py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base rounded-xl shadow-sm transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed mb-3"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <span className="flex flex-col items-center gap-1">
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Add to My Order — $197 </span>
                </span>
                <span className="text-sm">(Save $300)</span>
              </span>
            )}
          </Button>

          <button
            onClick={handleDecline}
            disabled={isProcessing}
            className="w-full text-xs text-slate-500 hover:text-slate-700 transition-colors py-2 disabled:opacity-50"
          >
            No thank you, I'll pass on this offer
          </button>

          <div className="mt-4 pt-4 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900">100% Secure</span> • Same payment method • No additional
              information needed
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500">
          <p>Join 1,000+ entrepreneurs who have established their online presence with PR Launch</p>
        </div>
      </div>
    </div>
  )
}

export default function UpsellPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-4 text-slate-600">Loading offer...</p>
          </div>
        </div>
      }
    >
      <UpsellContent />
    </Suspense>
  )
}
