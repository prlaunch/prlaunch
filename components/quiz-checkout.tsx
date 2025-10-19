"use client"

import { useCallback, useEffect } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startQuizCheckoutSession, getCheckoutSession } from "@/app/actions/quiz-stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface QuizCheckoutProps {
  productId: string
  leadData?: {
    publication?: string
    publicationLogo?: string
  }
  onPaymentComplete?: (customerId: string) => void
}

export function QuizCheckout({ productId, leadData, onPaymentComplete }: QuizCheckoutProps) {
  const startCheckoutSessionForProduct = useCallback(() => startQuizCheckoutSession(productId), [productId])

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const sessionId = urlParams.get("session_id")

      if (sessionId && onPaymentComplete) {
        try {
          const { customerId } = await getCheckoutSession(sessionId)
          if (customerId) {
            console.log("[v0] Payment completed, customer ID:", customerId)
            onPaymentComplete(customerId)
          }
        } catch (error) {
          console.error("[v0] Error checking payment status:", error)
        }
      }
    }

    checkPaymentStatus()
  }, [onPaymentComplete])

  return (
    <div id="quiz-checkout" className="w-full">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret: startCheckoutSessionForProduct,
          onComplete: async () => {
            console.log("[v0] Checkout completed")
          },
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
