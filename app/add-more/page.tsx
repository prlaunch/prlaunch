"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams, useRouter } from 'next/navigation'
import { Check, Clock, Loader2, Lock, AlertCircle } from 'lucide-react'
import { processAddMoreUpsell } from "@/app/actions/add-more-stripe"

function AddMoreContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const orderId = searchParams.get("order_id") || ""
  const packageName = searchParams.get("package") || ""
  const originalAmount = Number.parseInt(searchParams.get("amount") || "0")
  const email = searchParams.get("email") || ""
  const fullName = searchParams.get("name") || ""
  const originalArticles = Number.parseInt(searchParams.get("articles") || "1")
  const customerId = searchParams.get("customerId") || ""
  const paymentMethodType = searchParams.get("paymentMethodType") || "card"

  const [timeLeft, setTimeLeft] = useState(5 * 60) // 5 minutes
  const [isProcessing, setIsProcessing] = useState(false)

  const isExpressCheckout = paymentMethodType === "apple_pay" || paymentMethodType === "google_pay"
  const mayNotWork = paymentMethodType === "link" || isExpressCheckout

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            // Auto-redirect when timer expires
            router.push(
              `/thank-you?package=${packageName}&articles=${originalArticles}&price=${originalAmount}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&upsell=declined`,
            )
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft, router, packageName, originalArticles, originalAmount, email, fullName])

  useEffect(() => {
    console.log("[v0] Add-more page loaded")
    console.log("[v0] Customer ID:", customerId)
    console.log("[v0] Payment method type:", paymentMethodType)
    console.log("[v0] Button should be visible")
  }, [customerId, paymentMethodType])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAcceptUpsell = async () => {
    console.log("[v0] Accept button clicked")
    if (!customerId) {
      alert("Payment error: No customer ID found. Please contact support.")
      return
    }

    setIsProcessing(true)

    try {
      const result = await processAddMoreUpsell(customerId, 97, orderId)

      if (result.success) {
        // Successful payment - redirect to thank you with upsell accepted
        router.push(
          `/thank-you?package=${packageName}&articles=${originalArticles + 4}&price=${originalAmount + 97}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&upsell=accepted&upsellArticles=4&upsellPrice=97`,
        )
      } else {
        // Payment failed - show error and allow skip
        alert(result.error || "Payment failed. Please try again or skip to continue.")
        setIsProcessing(false)
      }
    } catch (error: any) {
      alert("Payment processing error. Please contact support@prlaunch.io")
      setIsProcessing(false)
    }
  }

  const handleSkipUpsell = () => {
    console.log("[v0] Skip button clicked")
    router.push(
      `/thank-you?package=${packageName}&articles=${originalArticles}&price=${originalAmount}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&upsell=declined`,
    )
  }

  const totalArticles = originalArticles + 4
  const newTotal = originalAmount + 97

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-6 py-5">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-slate-900">🎉 Special One-Time Offer</h1>
          <p className="text-lg font-bold text-blue-600">Add 4 More Articles for Only $97</p>
          
          {/* Timer - Compact */}
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg py-1.5 px-3">
            <Clock className="h-3 w-3 text-red-600" />
            <span className="text-xs text-slate-600">Expires in</span>
            <span className="font-mono font-bold text-sm text-red-600">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {mayNotWork && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800">
              <p className="font-semibold mb-1">Payment Method Notice</p>
              <p>
                {isExpressCheckout 
                  ? "One-click payment may require additional verification for Apple Pay/Google Pay. If it fails, please skip and purchase separately."
                  : "If one-click payment fails, please skip and contact support@prlaunch.io to add articles to your order."}
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          {/* Hero Image - Full Width */}
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eac11d0d-d1a0-4319-83f8-6e891303ce8e%20%281%29-PWtIal1g4QPs7R2SypQ4l3wzSWlwY2.jpg"
              alt="Premium article preview"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Title and Price */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">4 Additional Articles</h3>
                <p className="text-sm text-slate-500 line-through">Regular: $188</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-blue-600">$97</div>
                <div className="text-xs text-slate-500 mt-1">Only $24.25 each</div>
              </div>
            </div>

            {/* Savings Badge */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-green-700">Save $91 (48% OFF)</p>
            </div>
          </div>
        </div>
        {/* End of redesigned price card */}

        {/* Benefits */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900">Why Add More Articles?</h3>
          <div className="space-y-2">
            {[
              "Build instant trust - Prospects see extensive media coverage",
              "Better SEO rankings - More high-authority backlinks",
              "Lock in this price forever - Never offered at $24/article again",
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleAcceptUpsell}
            disabled={isProcessing}
            className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="inline-block h-5 w-5 animate-spin rounded-full border-3 border-solid border-white border-r-transparent"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Lock className="h-5 w-5" />
                <span>Yes! Add 4 Articles for $97</span>
              </>
            )}
          </button>

          <button
            onClick={handleSkipUpsell}
            disabled={isProcessing}
            className="w-full text-sm text-slate-500 hover:text-slate-700 py-2 transition-colors disabled:opacity-50"
          >
            No thanks, continue to my order
          </button>

          <p className="text-center text-xs text-slate-500 mt-2">
            🔒 Secure payment using your saved payment method • No additional info needed
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AddMorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-4" />
            <p className="text-slate-600">Loading your special offer...</p>
          </div>
        </div>
      }
    >
      <AddMoreContent />
    </Suspense>
  )
}
