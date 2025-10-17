"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Clock, Sparkles, TrendingUp, Globe, Star } from "lucide-react"
import { createUpsellPaymentIntent } from "@/app/actions/stripe"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function UpsellContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const packageName = searchParams.get("package") || "Starter"
  const articles = searchParams.get("articles") || "1"
  const price = searchParams.get("price") || "47"
  const email = searchParams.get("email") || ""
  const fullName = searchParams.get("name") || ""

  const [timeLeft, setTimeLeft] = useState(10 * 60) // 10 minutes in seconds
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          // Redirect to thank you page when timer expires
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
    setIsProcessing(true)

    try {
      const stripe = await stripePromise

      if (!stripe) {
        throw new Error("Stripe failed to load")
      }

      // Create payment intent for the upsell
      const { clientSecret } = await createUpsellPaymentIntent({
        amount: 197,
        email,
        fullName,
        originalPackage: packageName,
        originalArticles: Number.parseInt(articles),
        originalPrice: Number.parseInt(price),
      })

      // Confirm the payment immediately (one-click)
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            token: "tok_visa", // This would be replaced with saved payment method
          },
        },
      })

      if (error) {
        console.error("[v0] Payment error:", error)
        setIsProcessing(false)
        // For now, redirect to thank you page even on error
        router.push(
          `/thank-you?package=${packageName}&articles=${articles}&price=${price}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&upsell=declined`,
        )
      } else {
        // Payment successful, redirect with upsell flag
        router.push(
          `/thank-you?package=${packageName}&articles=${articles}&price=${price}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&upsell=accepted&upsellPrice=197`,
        )
      }
    } catch (error) {
      console.error("[v0] Upsell error:", error)
      setIsProcessing(false)
      // Redirect to thank you page on error
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity text-black inline-block"
          >
            <span className="text-blue-500">pr</span>
            <span>launch.io</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Countdown Timer */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 border-2 border-red-500/30 rounded-2xl px-6 py-4 backdrop-blur-sm animate-pulse">
            <Clock className="h-6 w-6 text-red-600" />
            <div>
              <div className="text-sm text-slate-600 font-medium">This offer expires in</div>
              <div className="font-mono text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        {/* Main Offer Card */}
        <div className="bg-white rounded-3xl border-2 border-blue-500 p-8 md:p-12 shadow-2xl mb-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Sparkles className="h-4 w-4" />
            ONE-TIME OFFER FOR NEW CLIENTS
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Wait! Add an EverybodyWiki Page for Just{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              $197
            </span>
          </h1>

          {/* Price Comparison */}
          <div className="flex items-center gap-4 mb-6">
            <div className="text-3xl text-slate-400 line-through">$497</div>
            <div className="text-5xl font-bold text-slate-900">$197</div>
            <div className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">SAVE $300</div>
          </div>

          {/* Description */}
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Perfect for entrepreneurs, creators, and businesses looking to establish early-stage credibility before
            qualifying for a full Wikipedia entry.
          </p>

          {/* Includes Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Check className="h-6 w-6 text-green-600" />
              What's Included
            </h3>
            <ul className="space-y-3">
              {[
                "Page creation and formatting on EverybodyWiki",
                "Includes biography, achievements, links, and media",
                "Indexed on Google within days",
                "Delivery in 5–7 days",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              Key Benefits
            </h3>
            <ul className="space-y-3">
              {[
                "Ranked on Google for your name and brand",
                "Third-party validation and credibility",
                "Control how you appear online",
                "Step one toward future Wikipedia eligibility",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-green-600 shrink-0 mt-0.5 fill-green-600" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handlePurchase}
            disabled={isProcessing}
            className="w-full h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl rounded-2xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isProcessing ? (
              <>
                <div className="inline-block h-5 w-5 animate-spin rounded-full border-3 border-solid border-white border-r-transparent mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-6 w-6" />
                Yes! Add EverybodyWiki Page for $197
              </>
            )}
          </Button>

          {/* No Thanks Button */}
          <button
            onClick={handleDecline}
            disabled={isProcessing}
            className="w-full text-sm text-slate-500 hover:text-slate-700 transition-colors py-2 disabled:opacity-50"
          >
            No thank you, I'll pass on this offer
          </button>

          {/* Trust Badge */}
          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">100% Secure</span> • Same payment method • No additional
              information needed
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center text-sm text-slate-500">
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
