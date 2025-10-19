"use client"

import { useEffect } from "react"
import { Lock } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { QuizCheckout } from "@/components/quiz-checkout"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function PaymentPage() {
  const router = useRouter()
  const { leadData } = useQuiz()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handlePaymentComplete = () => {
    router.push("/free-pr-quiz/upsell")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-4 px-4">
      <StickyLogoBanner />

      <div className="max-w-2xl mx-auto space-y-8 pt-4">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Complete Your Order</h2>
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

        <div className="text-center pt-4">
          <button
            onClick={() => router.push("/free-pr-quiz/upsell")}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Demo: Skip to upsell page
          </button>
        </div>
      </div>
    </div>
  )
}
