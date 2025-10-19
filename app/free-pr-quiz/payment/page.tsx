"use client"

import { useEffect, useState } from "react"
import { Lock, Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { QuizCheckout } from "@/components/quiz-checkout"
import { StickyLogoBanner } from "@/components/quiz-logo"
import { mainReviews } from "@/lib/reviews-data"

export default function PaymentPage() {
  const router = useRouter()
  const { leadData, setCustomerId } = useQuiz()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handlePaymentComplete = (customerId: string) => {
    console.log("[v0] Payment complete! Storing customer ID and redirecting to upsell:", customerId)
    setIsRedirecting(true)
    setCustomerId(customerId)

    setTimeout(() => {
      console.log("[v0] Redirecting to upsell page...")
      router.push("/free-pr-quiz/upsell")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-4 px-4">
      <StickyLogoBanner />

      {isRedirecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 shadow-xl text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent mb-4"></div>
            <p className="text-lg font-semibold">Processing your order...</p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-8 pt-4">
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {mainReviews.slice(0, 4).map((review, i) => (
                <div key={i} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-background">
                  <Image src={review.image || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
          </div>
          <span>Taken by 4,847 entrepreneurs</span>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Claim Your Article</h2>
          <p className="text-lg">Free Article + Pro Writing</p>
        </div>

        <div className="bg-card border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Order Summary</h3>
          </div>

          <div className="space-y-3 pb-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {leadData.publicationLogo && (
                  <div className="relative w-16 h-8">
                    <Image
                      src={leadData.publicationLogo || "/placeholder.svg"}
                      alt={leadData.publication || ""}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium">FREE Article</p>
                  <p className="text-sm text-muted-foreground">{leadData.publication}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground line-through">$89.99</p>
                <p className="font-semibold text-green-600">FREE</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">Professional Writing Service</p>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground line-through">$89.99</p>
                  <p className="font-semibold">$44.99</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:justify-start justify-end">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full">
                  <span className="text-xs font-semibold text-green-600">50% OFF</span>
                </div>
                <p className="text-sm text-muted-foreground">Winner's Exclusive Discount</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-lg font-bold">
            <span>Total</span>
            <div className="text-right">
              <p className="text-sm text-muted-foreground line-through font-normal">$179.98</p>
              <p>$44.99</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <QuizCheckout
            productId="professional-writing"
            leadData={leadData}
            onPaymentComplete={handlePaymentComplete}
          />
        </div>

        <div className="text-center space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            <p>Secure checkout powered by Stripe</p>
          </div>
          <p>✓ Your information is encrypted & safe</p>
        </div>
      </div>
    </div>
  )
}
