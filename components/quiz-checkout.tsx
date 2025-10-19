"use client"

import { useCallback, useEffect, useState } from "react"
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
  const [hasProcessedPayment, setHasProcessedPayment] = useState(false)
  const startCheckoutSessionForProduct = useCallback(() => startQuizCheckoutSession(productId), [productId])

  useEffect(() => {
    if (hasProcessedPayment) return

    const checkPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const sessionId = urlParams.get("session_id")

      if (sessionId && onPaymentComplete) {
        try {
          console.log("[v0] Checking payment status for session:", sessionId)
          const { customerId } = await getCheckoutSession(sessionId)
          if (customerId) {
            console.log("[v0] Payment completed, customer ID:", customerId)
            setHasProcessedPayment(true)
            onPaymentComplete(customerId)
          }
        } catch (error) {
          console.error("[v0] Error checking payment status:", error)
        }
      }
    }

    checkPaymentStatus()
  }, [onPaymentComplete, hasProcessedPayment])

  return (
    <div id="quiz-checkout" className="w-full">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret: startCheckoutSessionForProduct,
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
