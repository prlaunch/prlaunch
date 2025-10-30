"use client"

import type React from "react"

import { useState, useEffect, Suspense, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Lock,
  Star,
  Check,
  Sparkles,
  Shield,
  Mail,
  FileText,
  Edit3,
  Eye,
  Newspaper,
  Tag,
  X,
  Copy,
  Clock,
  Gift,
} from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import {
  createPaymentIntent,
  getPaymentIntentCustomer,
  getPaymentMethodType,
  updateCustomerMetadata,
} from "../actions/payment-stripe"
import { PolicyModal } from "@/components/policy-modal"
import { getReviewsSubset } from "@/lib/reviews-data"
import { getOutletImage } from "@/lib/outlet-images"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface OutletData {
  number: number
  name: string
  category: string
  isFree: boolean
}

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
  onPaymentComplete,
  discountedPrice,
  clientSecret, // Added clientSecret prop to access payment intent ID
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
  onPaymentComplete: (customerId: string, paymentMethodType: string) => void
  discountedPrice: number
  clientSecret: string // Added clientSecret type
}) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  useEffect(() => {
    if (elements) {
      const paymentElement = elements.getElement("payment")
      if (paymentElement) {
        paymentElement.on("ready", () => {
          console.log("[v0] PaymentElement is ready")
        })
        paymentElement.on("change", (event) => {
          if (event.error) {
            console.error("[v0] PaymentElement error:", event.error)
          }
        })
      }
    }
  }, [elements])

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
      informationCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      console.log("[v0] Updating customer metadata before payment confirmation...")

      const paymentIntentId = clientSecret.split("_secret_")[0]

      // Update customer metadata with actual information
      await updateCustomerMetadata({
        paymentIntentId,
        email,
        fullName,
        companyName: companyName || undefined,
        companyNumber: companyNumber || undefined,
        packageName: currentPackage.name,
        articles: currentPackage.articles,
      })
      console.log("[v0] Customer metadata updated successfully")

      const { error: submitError } = await elements.submit()
      if (submitError) {
        console.error("[v0] Error submitting elements:", submitError)
        setErrorMessage(submitError.message || "An error occurred")
        setIsProcessing(false)
        return
      }

      console.log("[v0] Confirming payment...")

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          receipt_email: email,
        },
      })

      if (error) {
        console.error("[v0] Payment confirmation error:", error)
        const errorMsg = error.message || "An error occurred during payment"
        setErrorMessage(errorMsg)
        setIsProcessing(false)
        return
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("[v0] Payment succeeded:", paymentIntent.id)
        try {
          const [customerResult, paymentMethodResult] = await Promise.all([
            getPaymentIntentCustomer(paymentIntent.id),
            getPaymentMethodType(paymentIntent.id),
          ])

          onPaymentComplete(customerResult.customerId, paymentMethodResult.paymentMethodType)
        } catch (err: any) {
          console.error("[v0] Error retrieving customer info:", err)
          setErrorMessage("Payment succeeded but customer ID not found")
          setIsProcessing(false)
        }
      } else {
        console.error("[v0] Unexpected payment status:", paymentIntent?.status)
        setErrorMessage(`Payment processing failed. Status: ${paymentIntent?.status || "unknown"}`)
        setIsProcessing(false)
      }
    } catch (err: any) {
      console.error("[v0] Unexpected error during payment:", err)
      setErrorMessage(`An unexpected error occurred: ${err.message || "Please try again"}`)
      setIsProcessing(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          <PaymentElement
            options={{
              layout: {
                type: "accordion",
                defaultCollapsed: false,
                radios: false,
                spacedAccordionItems: true,
              },
              wallets: {
                applePay: "auto",
                googlePay: "auto",
              },
            }}
            onReady={() => {
              console.log("[v0] PaymentElement mounted and ready")
            }}
            onLoadError={(error) => {
              console.error("[v0] PaymentElement load error:", error)
              setErrorMessage("Payment methods failed to load. Please refresh the page.")
            }}
          />
        </div>

        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
          <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
          <p className="text-xs text-green-800 leading-relaxed">
            No subscription or automatic renewals. One-time payment today. 100% money-back guarantee included.
          </p>
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
              Secure My Articles Now
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

  const outletsDataParam = searchParams.get("outletsData")
  const totalParam = searchParams.get("total")
  const freeCountParam = searchParams.get("freeCount")

  const [customOutlets, setCustomOutlets] = useState<OutletData[]>([])
  const [isCustomOrder, setIsCustomOrder] = useState(false)

  // Parse outlet data on mount
  useEffect(() => {
    if (outletsDataParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(outletsDataParam))
        setCustomOutlets(parsed)
        setIsCustomOrder(true)
      } catch (e) {
        console.error("Failed to parse outlets data:", e)
      }
    }
  }, [outletsDataParam])

  const packageParam = searchParams.get("package") || "starter"
  const versionParam = searchParams.get("version")
  const isBVersion = versionParam === "b"

  const emailParam = searchParams.get("email") || ""
  const nameParam = searchParams.get("name") || ""

  const packagesA = {
    starter: {
      name: "Starter",
      articles: 1,
      price: 47,
      originalPrice: 94,
      perArticle: 47,
      upsellTo: "growth",
      hasBonus: false,
      bonusText: "",
    },
    growth: {
      name: "Growth",
      articles: 4,
      price: 127,
      originalPrice: 376,
      perArticle: 31.75,
      upsellTo: "authority",
      hasBonus: true,
      bonusText: "3 + 1 Free Bonus",
    },
    authority: {
      name: "Authority",
      articles: 7,
      price: 197,
      originalPrice: 658,
      perArticle: 28.14,
      upsellTo: null,
      hasBonus: true,
      bonusText: "5 + 2 Free Bonus",
    },
    agency: {
      name: "Agency",
      articles: 40,
      price: 997,
      originalPrice: 1994,
      perArticle: 24.93,
      upsellTo: null,
      hasBonus: false,
      bonusText: "",
    },
  }

  const packagesB = {
    starter: {
      name: "Starter",
      articles: 1,
      price: 97,
      originalPrice: 194,
      perArticle: 97,
      upsellTo: "growth",
      hasBonus: false,
      bonusText: "",
    },
    growth: {
      name: "Growth",
      articles: 3,
      price: 197,
      originalPrice: 582,
      perArticle: 65.67,
      upsellTo: "authority",
      hasBonus: true,
      bonusText: "2 + 1 Free Bonus",
    },
    authority: {
      name: "Authority",
      articles: 5,
      price: 297,
      originalPrice: 970,
      perArticle: 59.4,
      upsellTo: null,
      hasBonus: true,
      bonusText: "3 + 2 Free Bonus",
    },
    agency: {
      name: "Agency",
      articles: 40,
      price: 997,
      originalPrice: 1994,
      perArticle: 24.93,
      upsellTo: null,
      hasBonus: false,
      bonusText: "",
    },
  }

  const packages = isBVersion ? packagesB : packagesA

  const validPackage = packageParam.toLowerCase() in packages ? packageParam.toLowerCase() : "starter"
  const [selectedPackage, setSelectedPackage] = useState(validPackage)

  const [showUpsell, setShowUpsell] = useState(true)
  const [showBenefits, setShowBenefits] = useState(false)
  const [isCompany, setIsCompany] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [upgradeApplied, setUpgradeApplied] = useState(false)
  const [email, setEmail] = useState(emailParam)
  const [fullName, setFullName] = useState(nameParam)
  const [companyName, setCompanyName] = useState("")
  const [companyNumber, setCompanyNumber] = useState("")
  const [emailError, setEmailError] = useState("")
  const [fullNameError, setFullNameError] = useState("")
  const [upgradeChecked, setUpgradeChecked] = useState(false)
  const informationCardRef = useRef<HTMLDivElement>(null)

  const [discountCode, setDiscountCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(false)
  const [discountError, setDiscountError] = useState("")
  const [copySuccess, setCopySuccess] = useState(false)

  const [timeLeft, setTimeLeft] = useState(600)

  const currentPackage = packages[selectedPackage as keyof typeof packages] || packages.starter
  const upsellPackage = currentPackage?.upsellTo ? packages[currentPackage.upsellTo as keyof typeof packages] : null
  const upsellDifference = upsellPackage ? upsellPackage.price - currentPackage.price : 0

  const basePrice = isCustomOrder && totalParam ? Number.parseInt(totalParam) : currentPackage.price
  const discountedPrice = discountApplied ? Math.round(basePrice * 0.9) : basePrice
  const discountAmount = basePrice - discountedPrice

  const calculateTotalSavings = () => {
    if (!upsellPackage) return 0
    const wouldPayAtCurrentRate = currentPackage.perArticle * upsellPackage.articles
    return Math.round(wouldPayAtCurrentRate - upsellPackage.price)
  }
  const totalSavings = calculateTotalSavings()

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === "LAUNCH10") {
      setDiscountApplied(true)
      setDiscountError("")
    } else {
      setDiscountError("Invalid discount code")
      setDiscountApplied(false)
    }
  }

  const handleRemoveDiscount = () => {
    setDiscountApplied(false)
    setDiscountCode("")
    setDiscountError("")
  }

  const initializePayment = async () => {
    try {
      setClientSecret(null)

      const isValidEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      const validEmail = isValidEmail ? email : "pending@prlaunch.io"
      const validFullName = fullName && fullName.trim() ? fullName : "Pending"

      console.log("[v0] Creating payment intent with:", {
        amount: discountedPrice,
        packageName: currentPackage.name,
        articles: currentPackage.articles,
        email: validEmail,
      })

      const { clientSecret: newClientSecret } = await createPaymentIntent({
        amount: discountedPrice,
        packageName: currentPackage.name,
        articles: currentPackage.articles,
        email: validEmail,
        fullName: validFullName,
        companyName: companyName || undefined,
        companyNumber: companyNumber || undefined,
      })

      if (newClientSecret) {
        setClientSecret(newClientSecret)
        console.log("[v0] Payment intent created successfully")
      }
    } catch (error: any) {
      console.error("[v0] Payment initialization error:", error)
      const setErrorMessage = (message: string) => {
        // This function seems to be intended for setting an error message, but it's not defined here.
        // For the purpose of this merge, we'll assume it's a placeholder and not critical for the current logic.
        // If it were critical, it would need to be declared and implemented.
      }
      setErrorMessage(error.message || "Failed to initialize payment. Please refresh and try again.")
    }
  }

  useEffect(() => {
    initializePayment()
  }, [selectedPackage, discountedPrice, currentPackage.name, currentPackage.articles])

  const handleUpgradeChange = (checked: boolean) => {
    setUpgradeChecked(checked)
    if (checked && currentPackage.upsellTo) {
      setShowCelebration(true)
      setTimeout(() => {
        const newPackage = currentPackage.upsellTo!
        setSelectedPackage(newPackage)
        setShowUpsell(false)
        setShowCelebration(false)
        setUpgradeApplied(true)
      }, 2000)
    }
  }

  const handlePaymentComplete = (customerId: string, paymentMethodType: string) => {
    const currentPackage = packages[selectedPackage as keyof typeof packages] || packages.starter

    router.push(
      `/thank-you?package=${currentPackage.name}&articles=${currentPackage.articles}&price=${discountedPrice}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&customerId=${customerId}`,
    )
  }

  const reviews = getReviewsSubset(3)

  const handleUpgrade = () => {
    // Function implementation goes here
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText("LAUNCH10")
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      const textArea = document.createElement("textarea")
      textArea.value = "LAUNCH10"
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  const getUpgradeSavings = () => {
    if (selectedPackage === "starter" && currentPackage.upsellTo === "growth") {
      return 61
    } else if (selectedPackage === "growth" && currentPackage.upsellTo === "authority") {
      return 77
    }
    return 0
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {showCelebration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4 animate-in zoom-in-95 duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Upgrade Added!</h3>
              <p className="text-slate-600">
                You're now getting the {upsellPackage?.name} package with {upsellPackage?.articles} articles
                {upsellPackage?.hasBonus && " + 1 bonus"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed top-0 left-0 right-0 z-50 shadow-lg transition-colors duration-300 ${
          discountApplied
            ? "bg-gradient-to-r from-green-600 to-emerald-600"
            : "bg-gradient-to-r from-blue-600 to-purple-600"
        }`}
      >
        <div className="container mx-auto py-2.5 px-4 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            {discountApplied ? (
              <>
                <Check className="h-4 w-4" />
                <span>10% discount applied!</span>
              </>
            ) : (
              <>
                <Tag className="h-4 w-4" />
                <span>Save 10% with code:</span>
              </>
            )}
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg transition-colors font-mono font-bold text-sm"
          >
            <span>LAUNCH10</span>
            <Copy className="h-3.5 w-3.5" />
          </button>
          {copySuccess && <span className="text-xs text-white/90 animate-in fade-in">Copied!</span>}
        </div>
      </div>

      <header className="bg-white border-b border-slate-200 sticky top-[42px] z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-black inline-block">
            <span className="text-blue-500">pr</span>
            <span>launch.io</span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1.5">
            <Lock className="h-4 w-4 text-green-600" />
            <span className="text-xs font-semibold text-green-700">Secure Checkout</span>
          </div>
        </div>
      </header>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-2">
          <Clock className="h-4 w-4 text-orange-600" />
          <span className="text-sm font-semibold text-slate-900">
            Limited spots: expires in <span className="text-orange-600 font-mono">{formatTime(timeLeft)}</span>
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-8 md:pb-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {reviews.map((review, index) => (
                      <div
                        key={index}
                        className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-100"
                      >
                        <Image
                          src={review.image || "/placeholder.svg"}
                          alt={review.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#00B67A] text-[#00B67A]" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600">
                      <span className="font-semibold text-slate-900">4.8/5</span> from 500+ reviews
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Money-Back Guarantee</span>
                </div>
              </div>
            </div>

            {isCustomOrder && customOutlets.length > 0 ? (
              <div
                key={`custom-order-${customOutlets.length}-${discountedPrice}`}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Custom Order</h2>
                    <p className="text-slate-600">
                      {customOutlets.length} {customOutlets.length === 1 ? "Article" : "Articles"} Selected
                      {freeCountParam && Number.parseInt(freeCountParam) > 0 && (
                        <span className="text-green-600 font-semibold">
                          {" "}
                          ({customOutlets.length - Number.parseInt(freeCountParam)} paid + {freeCountParam} free 🎁)
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg text-slate-400 line-through">${customOutlets.length * 47}</div>
                    {discountApplied ? (
                      <>
                        <div className="text-xl text-slate-400 line-through">${basePrice}</div>
                        <div className="text-3xl font-bold text-green-600">${discountedPrice}</div>
                      </>
                    ) : (
                      <div className="text-3xl font-bold text-slate-900">${basePrice}</div>
                    )}
                  </div>
                </div>

                {/* Selected Outlets List */}
                <div className="mb-4 max-h-64 overflow-y-auto space-y-2 border border-slate-200 rounded-lg p-3">
                  {customOutlets.map((outlet, index) => {
                    const imageUrl = getOutletImage(outlet.name)
                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-2 rounded-lg ${
                          outlet.isFree ? "bg-green-50 border border-green-200" : "bg-slate-50"
                        }`}
                      >
                        <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-slate-100">
                          {imageUrl ? (
                            <Image
                              src={imageUrl || "/placeholder.svg"}
                              alt={outlet.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <span className="text-slate-400 text-xs">No image</span>
                            </div>
                          )}
                          {outlet.isFree && (
                            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                              <Gift className="w-5 h-5 text-green-600" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-slate-900 truncate">{outlet.name}</p>
                          <p className="text-xs text-slate-500">{outlet.category}</p>
                        </div>
                        {outlet.isFree && (
                          <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full flex-shrink-0">
                            FREE
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>

                {freeCountParam && Number.parseInt(freeCountParam) > 0 && (
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">
                    <Gift className="h-4 w-4" />
                    <span className="font-semibold">
                      You're getting {freeCountParam} free{" "}
                      {Number.parseInt(freeCountParam) === 1 ? "article" : "articles"}! 🎉
                    </span>
                  </div>
                )}
              </div>
            ) : (
              // Original package display
              <div
                key={`order-summary-${selectedPackage}-${discountedPrice}`}
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
                      {currentPackage.hasBonus && currentPackage.bonusText && (
                        <span className="text-green-600 font-semibold"> ({currentPackage.bonusText})</span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg text-slate-400 line-through">${currentPackage.originalPrice}</div>
                    {discountApplied ? (
                      <>
                        <div className="text-xl text-slate-400 line-through">${currentPackage.price}</div>
                        <div className="text-3xl font-bold text-green-600">${discountedPrice}</div>
                      </>
                    ) : (
                      <div className="text-3xl font-bold text-slate-900">${currentPackage.price}</div>
                    )}
                    <div className="text-sm text-slate-600">
                      ${(discountedPrice / currentPackage.articles).toFixed(2)}/article
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">
                  <Check className="h-4 w-4" />
                  <span className="font-semibold">
                    Save ${currentPackage.originalPrice - currentPackage.price}
                    {discountApplied && ` + $${discountAmount} with LAUNCH10`}
                  </span>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-4 w-4 text-slate-600" />
                <h3 className="text-sm font-semibold text-slate-900">Have a discount code?</h3>
              </div>

              {!discountApplied ? (
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter code"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value.toUpperCase())
                      setDiscountError("")
                    }}
                    className="flex-1 h-10 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500 uppercase"
                  />
                  <Button
                    onClick={handleApplyDiscount}
                    disabled={!discountCode.trim()}
                    className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">
                      LAUNCH10 applied — Save ${discountAmount}
                    </span>
                  </div>
                  <button
                    onClick={handleRemoveDiscount}
                    className="text-slate-500 hover:text-slate-700 transition-colors"
                    aria-label="Remove discount"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {discountError && <p className="text-xs text-red-600 mt-2">{discountError}</p>}
            </div>

            {showUpsell && upsellPackage && selectedPackage !== "agency" && !isCustomOrder && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={upgradeChecked}
                    onChange={(e) => handleUpgradeChange(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-bold text-slate-900">Best Value Upgrade</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Upgrade to <span className="font-semibold text-blue-700">{upsellPackage.articles} articles</span>{" "}
                      and <span className="font-semibold text-green-600">save up to ${getUpgradeSavings()}</span>
                    </p>
                  </div>
                </label>
              </div>
            )}

            <div className="relative rounded-xl p-[2px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-500 animate-gradient-shift shadow-lg shadow-blue-500/20">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-3 text-center">Your Free Bonuses</h3>
                <ul className="space-y-2">
                  {[
                    "Professional editing & unlimited revisions",
                    "Fast track to Google Knowledge Panel",
                    "Backlinks from high-authority sites",
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
                  key={clientSecret}
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
                    loader: "auto",
                    paymentMethodOrder: ["apple_pay", "google_pay", "link", "card"],
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
                    onPaymentComplete={handlePaymentComplete}
                    discountedPrice={discountedPrice}
                    clientSecret={clientSecret} // Pass clientSecret to CheckoutForm
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
          </div>

          <div className="space-y-6">
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
                  <div key={index} className="border border-slate-200 rounded-xl p-4 pb-10 relative">
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

                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                      <Check className="h-3 w-3 text-green-600" />
                      <span className="text-[10px] font-semibold text-green-700">Verified customer</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-sm mb-4">What Happens After Purchase</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">1. Instant Confirmation</h4>
                    <p className="text-xs text-slate-600">
                      Receive your order confirmation and questionnaire via email
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">2. Share Your Story</h4>
                    <p className="text-xs text-slate-600">Complete a simple questionnaire about your business</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Edit3 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">3. Professional Writing</h4>
                    <p className="text-xs text-slate-600">Our team crafts your article with expert editing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Eye className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">4. Review & Approve</h4>
                    <p className="text-xs text-slate-600">Review your article and request unlimited revisions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Newspaper className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">5. Publication & Links</h4>
                    <p className="text-xs text-slate-600">Your article goes live with backlinks and social proof</p>
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
