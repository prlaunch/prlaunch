"use client"

import type React from "react"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Lock, Loader2 } from "lucide-react"
import { createQuizPaymentIntent } from "@/app/actions/quiz-stripe"
import { PolicyModal } from "@/components/policy-modal"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface QuizCheckoutProps {
  productId: string
  leadData?: {
    email?: string
    fullName?: string
    publication?: string
    publicationLogo?: string
  }
  onPaymentComplete?: (customerId: string) => void
}

function CheckoutForm({ productId, leadData, onPaymentComplete }: QuizCheckoutProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      console.log("[v0] Confirming quiz payment")

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/free-pr-quiz/upsell`,
          receipt_email: leadData?.email || undefined,
          payment_method_data: {
            billing_details: {
              name: leadData?.fullName || undefined,
              email: leadData?.email || undefined,
            },
          },
        },
        redirect: "if_required",
      })

      if (error) {
        console.error("[v0] Payment confirmation error:", error)
        setErrorMessage(error.message || "An error occurred")
        setIsProcessing(false)
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("[v0] Payment succeeded, customer:", paymentIntent.customer)

        // Extract customer ID and call completion handler
        const customerId =
          typeof paymentIntent.customer === "string" ? paymentIntent.customer : paymentIntent.customer?.id

        if (customerId && onPaymentComplete) {
          onPaymentComplete(customerId)
        }
      }
    } catch (err) {
      console.error("[v0] Unexpected error during payment:", err)
      setErrorMessage("An unexpected error occurred")
      setIsProcessing(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <PaymentElement />
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{errorMessage}</div>
        )}

        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed whitespace-normal text-center py-3"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-5 w-5" />
              Complete Secure Payment
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground leading-relaxed">
          By completing your purchase, you agree to our{" "}
          <button
            type="button"
            onClick={() => setShowTermsModal(true)}
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Terms of Service
          </button>{" "}
          and{" "}
          <button
            type="button"
            onClick={() => setShowPrivacyModal(true)}
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Privacy Policy
          </button>
          .
        </p>
      </form>

      <PolicyModal open={showTermsModal} onOpenChange={setShowTermsModal} type="terms" />
      <PolicyModal open={showPrivacyModal} onOpenChange={setShowPrivacyModal} type="privacy" />
    </>
  )
}

export function QuizCheckout({ productId, leadData, onPaymentComplete }: QuizCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  // Initialize payment intent when component mounts
  useState(() => {
    const initPayment = async () => {
      try {
        const { clientSecret: newClientSecret } = await createQuizPaymentIntent(
          productId,
          leadData?.email || "pending@prlaunch.io",
          leadData?.fullName || "Pending",
        )
        setClientSecret(newClientSecret)
      } catch (error) {
        console.error("[v0] Error initializing payment:", error)
      }
    }
    initPayment()
  })

  if (!clientSecret) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="mt-4 text-muted-foreground">Loading payment form...</p>
      </div>
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#3b82f6",
            borderRadius: "12px",
          },
        },
      }}
    >
      <CheckoutForm productId={productId} leadData={leadData} onPaymentComplete={onPaymentComplete} />
    </Elements>
  )
}
