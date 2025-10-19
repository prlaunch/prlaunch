"use client"

import type React from "react"

import { useState, useEffect, Suspense, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Star, Check, Sparkles } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { createPaymentIntent, getPaymentIntentCustomer, getPaymentMethodType } from "@/app/actions/stripe"
import { PolicyModal } from "@/components/policy-modal"
import { getReviewsSubset } from "@/lib/reviews-data"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutForm({
  selectedPackage,
  email,
  fullName,
  companyName,
  companyNumber,
  emailError,
  fullNameError,
  setEmailError,
  setFullNameError,
  informationCardRef,
  onRecreatePaymentIntent,
  onPaymentComplete, // Added callback for payment completion
}: {
  selectedPackage: string
  email: string
  fullName: string
  companyName: string
  companyNumber: string
  emailError: string
  fullNameError: string
  setEmailError: (error: string) => void
  setFullNameError: (error: string) => void
  informationCardRef: React.RefObject<HTMLDivElement>
  onRecreatePaymentIntent: () => Promise<void>
  onPaymentComplete: (customerId: string, paymentMethodType: string) => void // Added callback
}) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  const packages = {
    starter: { name: "Starter", articles: 1, price: 47 },
    growth: { name: "Growth", articles: 3, price: 127 },
    authority: { name: "Authority", articles: 5, price: 197 },
    agency: { name: "Agency", articles: 40, price: 997 },
  }

  const currentPackage = packages[selectedPackage as keyof typeof packages]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    let hasError = false

    if (!email || !email.trim()) {
      setEmailError("Email is required")
      hasError = true
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address")
      hasError = true
    } else {
      setEmailError("")
    }

    if (!fullName || !fullName.trim()) {
      setFullNameError("Full name is required")
      hasError = true
    } else {
      setFullNameError("")
    }

    if (hasError) {
      // Smooth scroll to the Your Information card
      informationCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      console.log("[v0] Confirming payment with customer data:", { email, fullName })

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          receipt_email: email,
          payment_method_data: {
            billing_details: {
              name: fullName,
              email: email,
            },
          },
        },
      })

      if (error) {
        console.error("[v0] Payment confirmation error:", error)
        setErrorMessage(error.message || "An error occurred")
        setIsProcessing(false)
        return
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("[v0] Payment succeeded, retrieving customer ID and payment method type")

        try {
          // Retrieve customer ID and payment method type from server
          const [customerResult, paymentMethodResult] = await Promise.all([
            getPaymentIntentCustomer(paymentIntent.id),
            getPaymentMethodType(paymentIntent.id),
          ])

          console.log("[v0] Customer ID:", customerResult.customerId)
          console.log("[v0] Payment method type:", paymentMethodResult.paymentMethodType)

          // Call the completion callback with customer ID and payment method type
          onPaymentComplete(customerResult.customerId, paymentMethodResult.paymentMethodType)
        } catch (err) {
          console.error("[v0] Error retrieving customer data:", err)
          setErrorMessage("Payment succeeded but customer ID not found")
          setIsProcessing(false)
        }
      } else {
        console.error("[v0] Unexpected payment status:", paymentIntent?.status)
        setErrorMessage("Payment processing failed")
        setIsProcessing(false)
      }
    } catch (err) {
      console.error("[v0] Unexpected error during payment:", err)
      setErrorMessage("An unexpected error occurred")
      setIsProcessing(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          <PaymentElement />
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{errorMessage}</div>
        )}

        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <div className="inline-block h-5 w-5 animate-spin rounded-full border-3 border-solid border-white border-r-transparent mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-5 w-5" />
              Complete Secure Payment
            </>
          )}
        </Button>
        <p className="text-center text-xs text-slate-500 mt-4 leading-relaxed">
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

function PaymentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const packageParam = searchParams.get("package") || "starter"

  const [selectedPackage, setSelectedPackage] = useState(packageParam)
  const [showUpsell, setShowUpsell] = useState(true)
  const [showBenefits, setShowBenefits] = useState(false)
  const [isCompany, setIsCompany] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [upgradeApplied, setUpgradeApplied] = useState(false)
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [companyNumber, setCompanyNumber] = useState("")
  const [emailError, setEmailError] = useState("")
  const [fullNameError, setFullNameError] = useState("")
  const informationCardRef = useRef<HTMLDivElement>(null)

  const packages = {
    starter: { name: "Starter", articles: 1, price: 47, originalPrice: 94, perArticle: 47, upsellTo: "growth" },
    growth: { name: "Growth", articles: 3, price: 127, originalPrice: 254, perArticle: 42.33, upsellTo: "authority" },
    authority: { name: "Authority", articles: 5, price: 197, originalPrice: 394, perArticle: 39.4, upsellTo: null },
    agency: { name: "Agency", articles: 40, price: 997, originalPrice: 1994, perArticle: 24.93, upsellTo: null },
  }

  const currentPackage = packages[selectedPackage as keyof typeof packages]
  const upsellPackage = currentPackage.upsellTo ? packages[currentPackage.upsellTo as keyof typeof packages] : null
  const upsellDifference = upsellPackage ? upsellPackage.price - currentPackage.price : 0
  const upsellOriginalDifference = upsellPackage ? upsellPackage.originalPrice - currentPackage.originalPrice : 0

  useEffect(() => {
    console.log("[v0] Selected package changed:", selectedPackage, "Price:", currentPackage.price)
  }, [selectedPackage, currentPackage.price])

  const initializePayment = async () => {
    try {
      console.log("[v0] Creating payment intent for package:", currentPackage.name, "Price:", currentPackage.price)
      setClientSecret(null)

      const { clientSecret: newClientSecret } = await createPaymentIntent({
        amount: currentPackage.price,
        packageName: currentPackage.name,
        articles: currentPackage.articles,
        email: email || "pending@prlaunch.io",
        fullName: fullName || "Pending",
        companyName: companyName || undefined,
        companyNumber: companyNumber || undefined,
      })

      if (newClientSecret) {
        console.log("[v0] Payment intent created successfully with amount:", currentPackage.price)
        setClientSecret(newClientSecret)
      }
    } catch (error) {
      console.error("[v0] Error initializing payment:", error)
    }
  }

  useEffect(() => {
    initializePayment()
  }, [selectedPackage, currentPackage.price, currentPackage.name, currentPackage.articles])

  const handleUpgrade = () => {
    console.log("[v0] Upgrade clicked, current package:", selectedPackage, "upgrading to:", currentPackage.upsellTo)
    setShowCelebration(true)
    setTimeout(() => {
      const newPackage = currentPackage.upsellTo!
      console.log("[v0] Setting new package:", newPackage)
      setSelectedPackage(newPackage)
      setShowUpsell(false)
      setShowCelebration(false)
      setUpgradeApplied(true)
    }, 2000)
  }

  const handlePaymentComplete = (customerId: string, paymentMethodType: string) => {
    console.log("[v0] Payment complete, routing based on payment method type:", paymentMethodType)

    const packages = {
      starter: { name: "Starter", articles: 1, price: 47 },
      growth: { name: "Growth", articles: 3, price: 127 },
      authority: { name: "Authority", articles: 5, price: 197 },
      agency: { name: "Agency", articles: 40, price: 997 },
    }

    const currentPackage = packages[selectedPackage as keyof typeof packages]

    // Route based on payment method type
    if (paymentMethodType === "card") {
      // Card payment - show upsell with customer ID
      console.log("[v0] Card payment - redirecting to upsell")
      router.push(
        `/upsell?package=${currentPackage.name}&articles=${currentPackage.articles}&price=${currentPackage.price}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&customerId=${customerId}`,
      )
    } else {
      // Wallet payment (link, apple_pay, google_pay, etc.) - skip upsell
      console.log("[v0] Wallet payment - skipping upsell, redirecting to thank you")
      router.push(
        `/thank-you?package=${currentPackage.name}&articles=${currentPackage.articles}&price=${currentPackage.price}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&upsell=skipped`,
      )
    }
  }

  const reviews = getReviewsSubset(3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {showCelebration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-16 shadow-2xl text-center animate-in zoom-in-95 duration-500">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/50 animate-pulse">
                <Check className="h-12 w-12 text-white stroke-[3]" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Excellent Choice!</h2>
            <p className="text-lg text-slate-600">Upgrading your package...</p>
          </div>
        </div>
      )}

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

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div
              key={`order-summary-${selectedPackage}-${currentPackage.price}`}
              className={`bg-white rounded-2xl p-6 shadow-lg relative ${
                upgradeApplied ? "border-2" : "border-2 border-blue-500"
              }`}
              style={
                upgradeApplied
                  ? {
                      backgroundImage:
                        "linear-gradient(white, white), linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #a855f7 100%)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                      border: "2px solid transparent",
                    }
                  : {}
              }
            >
              {upgradeApplied && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-lg">
                  Upgrade Included
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">{currentPackage.name} Package</h2>
                  <p className="text-slate-600">
                    {currentPackage.articles} {currentPackage.articles === 1 ? "Article" : "Articles"}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg text-slate-400 line-through">${currentPackage.originalPrice}</div>
                  <div className="text-3xl font-bold text-slate-900">${currentPackage.price}</div>
                  <div className="text-sm text-slate-600">${currentPackage.perArticle.toFixed(2)}/article</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">
                <Check className="h-4 w-4" />
                <span className="font-semibold">
                  50% OFF Applied — Save ${currentPackage.originalPrice - currentPackage.price}
                </span>
              </div>
            </div>

            {showUpsell && upsellPackage && selectedPackage !== "agency" && (
              <div
                className="lg:hidden rounded-xl p-5 shadow-lg relative overflow-visible"
                style={{
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #9333EA 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  border: "2px solid transparent",
                }}
              >
                <div className="mb-4">
                  <h3 className="text-base font-bold text-slate-900 mb-2 text-center">
                    Upgrade to {upsellPackage.name}
                  </h3>
                  <p className="text-lg font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent text-center leading-snug">
                    Get {upsellPackage.articles}X More Results for{" "}
                    {(upsellPackage.price / currentPackage.price).toFixed(1)}X Price
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-200">
                  <div className="flex items-center justify-around gap-4">
                    <div className="text-center flex-1 bg-white border-2 border-green-500 rounded-lg p-3 shadow-sm">
                      <div className="text-xs font-bold text-green-700 mb-1.5">Better Deal ✓</div>
                      <div className="text-3xl font-bold text-slate-900">{upsellPackage.articles}</div>
                      <div className="text-xs text-slate-600 mt-1">articles</div>
                      <div className="text-sm font-bold text-green-700 mt-2 bg-green-50 rounded-md px-2 py-1">
                        ${upsellPackage.perArticle.toFixed(2)}/ea
                      </div>
                    </div>

                    <div className="text-slate-400 text-xl font-bold">vs</div>

                    <div className="text-center flex-1 bg-white border-2 border-red-400 rounded-lg p-3 shadow-sm">
                      <div className="text-xs font-bold text-red-600 mb-1.5">Current</div>
                      <div className="text-3xl font-bold text-slate-900">{currentPackage.articles}</div>
                      <div className="text-xs text-slate-600 mt-1">articles</div>
                      <div className="text-sm font-bold text-red-600 mt-2 bg-red-50 rounded-md px-2 py-1">
                        ${currentPackage.perArticle.toFixed(2)}/ea
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4 text-sm">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-slate-600">Current:</span>
                    <span className="font-semibold text-slate-900">
                      {currentPackage.articles} {currentPackage.articles === 1 ? "article" : "articles"} for $
                      {currentPackage.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Upgrade:</span>
                    <span className="font-bold text-blue-600">
                      {upsellPackage.articles} articles for ${upsellPackage.price}{" "}
                      <span className="text-slate-600">(+${upsellDifference})</span>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowBenefits(!showBenefits)}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-semibold mb-3 transition-colors"
                >
                  <span className="text-xs">{showBenefits ? "▲" : "▼"}</span>
                  <span>Why upgrade?</span>
                </button>

                {showBenefits && (
                  <div className="mb-4 pt-3 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        <span>
                          {upsellPackage.articles} articles = {upsellPackage.articles}X more search results for your
                          name
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        <span>{upsellPackage.articles} different outlets = broader credibility coverage</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        <span>
                          Better ROI: ${upsellPackage.perArticle.toFixed(2)}/article vs $
                          {currentPackage.perArticle.toFixed(2)}/article
                        </span>
                      </li>
                    </ul>
                  </div>
                )}

                <Button
                  onClick={handleUpgrade}
                  className="w-full h-12 text-white text-base font-bold rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #9333EA 100%)",
                  }}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Yes, Upgrade to {upsellPackage.name} — ${upsellPackage.price}
                </Button>
              </div>
            )}

            <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 animate-gradient-shift shadow-lg shadow-blue-500/20">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-3 text-center">Your Free Bonuses</h3>
                <ul className="space-y-2">
                  {[
                    "Consultation with our Pro PR Team",
                    "Exclusive access to our private marketplace",
                    "Fast track to Google Knowledge Panel",
                    "Backlinks from high-authority sites",
                    "Professional editing & unlimited revisions",
                  ].map((bonus, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{bonus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div ref={informationCardRef} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Your Information</h3>
              <div className="space-y-4 mb-8">
                <div>
                  <Label htmlFor="email" className="text-slate-700 font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (emailError) setEmailError("")
                    }}
                    className={`mt-1.5 h-11 rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500 ${
                      emailError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    required
                  />
                  {emailError && <p className="text-xs text-red-600 mt-1.5">{emailError}</p>}
                </div>
                <div>
                  <Label htmlFor="fullname" className="text-slate-700 font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="fullname"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value)
                      if (fullNameError) setFullNameError("")
                    }}
                    className={`mt-1.5 h-11 rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500 ${
                      fullNameError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    required
                  />
                  {fullNameError && <p className="text-xs text-red-600 mt-1.5">{fullNameError}</p>}
                </div>

                {isCompany && (
                  <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <Label htmlFor="companyname" className="text-slate-700 font-medium">
                        Company Name
                      </Label>
                      <Input
                        id="companyname"
                        type="text"
                        placeholder="Acme Inc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="mt-1.5 h-11 rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="companynumber" className="text-slate-700 font-medium">
                        Company Number (Optional)
                      </Label>
                      <Input
                        id="companynumber"
                        type="text"
                        placeholder="12345678"
                        value={companyNumber}
                        onChange={(e) => setCompanyNumber(e.target.value)}
                        className="mt-1.5 h-11 rounded-xl border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 my-6"></div>

              <h3 className="text-xl font-bold text-slate-900 mb-4">Payment</h3>
              {clientSecret && (
                <Elements
                  key={clientSecret} // Added key prop to force re-render when clientSecret changes
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
                    layout: {
                      type: "accordion",
                      defaultCollapsed: false,
                      radios: false,
                      spacedAccordionItems: true,
                    },
                  }}
                >
                  <CheckoutForm
                    selectedPackage={selectedPackage}
                    email={email}
                    fullName={fullName}
                    companyName={companyName}
                    companyNumber={companyNumber}
                    emailError={emailError}
                    fullNameError={fullNameError}
                    setEmailError={setEmailError}
                    setFullNameError={setFullNameError}
                    informationCardRef={informationCardRef}
                    onRecreatePaymentIntent={initializePayment}
                    onPaymentComplete={handlePaymentComplete} // Pass the callback
                  />
                </Elements>
              )}
              {!clientSecret && (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                  <p className="mt-4 text-slate-600">Loading payment form...</p>
                </div>
              )}
            </div>

            <div className="lg:hidden bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-base font-bold text-slate-700 mb-4 text-center tracking-wide">WE PUBLISH IN</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center justify-center">
                  <img
                    src="/images/logos/sf-tribune.png"
                    alt="The San Francisco Tribune"
                    className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="/images/logos/successxl.png"
                    alt="Success XL"
                    className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="/images/logos/usawire.png"
                    alt="USA Wire"
                    className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="/images/logos/la-tabloid.webp"
                    alt="L.A. Tabloid"
                    className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="/images/logos/bosses-mag.png"
                    alt="Bosses Mag"
                    className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src="/images/logos/medium.png"
                    alt="Medium"
                    className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
              <p className="text-center text-sm font-bold text-slate-700 tracking-wide">AND 100+ MORE...</p>
            </div>

            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4 text-center">What Happens After Purchase </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-[10px] shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-900">
                      Fill out a quick 5 minute questionnaire
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-0.5 pl-1.5">
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-[10px] shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-900">
                      Our writers send you articles for approval
                    </span>
                    <p className="text-[10px] text-slate-600 mt-0.5">(usually just 48 hours)</p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-0.5 pl-1.5">
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-[10px] shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-900">Your story goes live within 7 days</span>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-0.5 pl-1.5">
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-[10px] shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-900">
                      Your links and articles stay live forever
                    </span>
                    <p className="text-[10px] text-slate-600 mt-0.5">(unless you want to take them down)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {showUpsell && upsellPackage && selectedPackage !== "agency" && (
              <div
                className="hidden lg:block rounded-xl p-6 shadow-lg relative overflow-visible"
                style={{
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #9333EA 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  border: "2px solid transparent",
                }}
              >
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Upgrade to {upsellPackage.name}</h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent text-center leading-snug">
                    Get {upsellPackage.articles}X More Results for{" "}
                    {(upsellPackage.price / currentPackage.price).toFixed(1)}X Price
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-5 mb-5 border border-slate-200">
                  <div className="flex items-center justify-around gap-5">
                    <div className="text-center flex-1 bg-white border-2 border-green-500 rounded-lg p-4 shadow-sm">
                      <div className="text-sm font-bold text-green-700 mb-2">Better Deal ✓</div>
                      <div className="text-4xl font-bold text-slate-900">{upsellPackage.articles}</div>
                      <div className="text-sm text-slate-600 mt-1.5">articles</div>
                      <div className="text-base font-bold text-green-700 mt-2.5 bg-green-50 rounded-md px-3 py-1.5">
                        ${upsellPackage.perArticle.toFixed(2)}/article
                      </div>
                    </div>

                    <div className="text-slate-400 text-2xl font-bold">vs</div>

                    <div className="text-center flex-1 bg-white border-2 border-red-400 rounded-lg p-4 shadow-sm">
                      <div className="text-sm font-bold text-red-600 mb-2">Current</div>
                      <div className="text-4xl font-bold text-slate-900">{currentPackage.articles}</div>
                      <div className="text-sm text-slate-600 mt-1.5">articles</div>
                      <div className="text-base font-bold text-red-600 mt-2.5 bg-red-50 rounded-md px-3 py-1.5">
                        ${currentPackage.perArticle.toFixed(2)}/article
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-5 text-base">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600">Current:</span>
                    <span className="font-semibold text-slate-900">
                      {currentPackage.articles} {currentPackage.articles === 1 ? "article" : "articles"} for $
                      {currentPackage.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Upgrade:</span>
                    <span className="font-bold text-blue-600">
                      {upsellPackage.articles} articles for ${upsellPackage.price}{" "}
                      <span className="text-slate-600">(+${upsellDifference})</span>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowBenefits(!showBenefits)}
                  className="flex items-center gap-2 text-base text-blue-600 hover:text-blue-700 font-semibold mb-4 transition-colors"
                >
                  <span className="text-sm">{showBenefits ? "▲" : "▼"}</span>
                  <span>Why upgrade?</span>
                </button>

                {showBenefits && (
                  <div className="mb-5 pt-4 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
                    <ul className="space-y-2.5">
                      <li className="flex items-start gap-2.5 text-base text-slate-700">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>
                          {upsellPackage.articles} articles = {upsellPackage.articles}X more search results for your
                          name
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5 text-base text-slate-700">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>{upsellPackage.articles} different outlets = broader credibility coverage</span>
                      </li>
                      <li className="flex items-start gap-2.5 text-base text-slate-700">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>
                          Better ROI: ${upsellPackage.perArticle.toFixed(2)}/article vs $
                          {currentPackage.perArticle.toFixed(2)}/article
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5 text-base text-slate-700">
                        <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span>Recommended for: Founders pitching investors, consultants closing enterprise deals</span>
                      </li>
                    </ul>
                  </div>
                )}

                <Button
                  onClick={handleUpgrade}
                  className="w-full h-14 text-white text-lg font-bold rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #9333EA 100%)",
                  }}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Yes, Upgrade to {upsellPackage.name} — ${upsellPackage.price}
                </Button>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm">What Our Customers Say</h3>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#00B67A] text-[#00B67A]" />
                  ))}
                  <span className="ml-1 text-sm font-semibold text-slate-900">4.8/5</span>
                </div>
              </div>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={review.image || "/placeholder.svg"}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900">{review.name}</h4>
                        <p className="text-sm text-slate-600">{review.title}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-blue-500 text-blue-500" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">What Happens After Purchase </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-[10px] shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-900">
                      Fill out a quick 5 minute questionnaire
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-0.5 pl-1.5">
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-[10px] shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-900">
                      Our writers send you articles for approval
                    </span>
                    <p className="text-[10px] text-slate-600 mt-0.5">(usually just 48 hours)</p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-0.5 pl-1.5">
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-[10px] shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-900">Your story goes live within 7 days</span>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-0.5 pl-1.5">
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-[10px] shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-900">
                      Your links and articles stay live forever
                    </span>
                    <p className="text-[10px] text-slate-600 mt-0.5">(unless you want to take them down)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-4 text-slate-600">Loading payment page...</p>
          </div>
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  )
}
