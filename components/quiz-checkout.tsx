"use client"

import { useCallback } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startQuizCheckoutSession } from "@/app/actions/quiz-stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface QuizCheckoutProps {
  productId: string
  leadData?: {
    publication?: string
    publicationLogo?: string
  }
  onPaymentComplete?: () => void
}

export function QuizCheckout({ productId, leadData, onPaymentComplete }: QuizCheckoutProps) {
  const startCheckoutSessionForProduct = useCallback(() => startQuizCheckoutSession(productId), [productId])

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
