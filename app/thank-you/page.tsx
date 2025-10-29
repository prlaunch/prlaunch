"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, FileText, ArrowRight } from "lucide-react"

function ThankYouContent() {
  const searchParams = useSearchParams()

  const packageName = searchParams.get("package") || "Starter"
  const articles = Number.parseInt(searchParams.get("articles") || "1")
  const price = Number.parseInt(searchParams.get("price") || "47")
  const email = searchParams.get("email") || ""
  const fullName = searchParams.get("name") || ""
  const upsellStatus = searchParams.get("upsell") || null
  const upsellPrice = Number.parseInt(searchParams.get("upsellPrice") || "0")

  const totalPrice = upsellStatus === "accepted" ? price + upsellPrice : price

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

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-xl text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30 animate-in zoom-in-95 duration-500">
              <Check className="h-10 w-10 text-white stroke-[3]" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Thank You for Your Order!</h1>
          <p className="text-lg text-slate-600 mb-8">
            Your payment has been processed successfully. We've sent a confirmation email to{" "}
            <span className="font-semibold text-slate-900">{email}</span>
          </p>

          <div className="mb-8">
            <Link href="https://tally.so/r/nrzxWo" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button
                size="lg"
                className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] h-14 px-8"
              >
                <FileText className="mr-2 h-5 w-5" />
                Fill Out Questionnaire
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6 mb-8 text-left">
            <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                <span className="text-slate-600">Package:</span>
                <span className="font-semibold text-slate-900">{packageName}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                <span className="text-slate-600">Articles:</span>
                <span className="font-semibold text-slate-900">{articles}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                <span className="text-slate-600">Package Price:</span>
                <span className="font-semibold text-slate-900">${price}</span>
              </div>
              {upsellStatus === "accepted" && (
                <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                  <span className="text-slate-600">EverybodyWiki Page:</span>
                  <span className="font-semibold text-green-600">${upsellPrice}</span>
                </div>
              )}
              <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                <span className="text-slate-600">Customer:</span>
                <span className="font-semibold text-slate-900">{fullName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Total Paid:</span>
                <span className="text-2xl font-bold text-slate-900">${totalPrice}</span>
              </div>
            </div>
          </div>

          {upsellStatus === "accepted" && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-500 p-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 shrink-0">
                  <Check className="h-6 w-6 text-white stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">EverybodyWiki Page Added!</h3>
                  <p className="text-sm text-slate-700">
                    Your EverybodyWiki page will be created and delivered within 5-7 days. We'll include this in your
                    questionnaire.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-white rounded-2xl border-2 border-blue-500 p-6 mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">What Happens Next?</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-sm shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Fill out the questionnaire</p>
                  <p className="text-xs text-slate-600 mt-1">Complete a quick 5-minute form to tell us your story</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-sm shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Review your articles</p>
                  <p className="text-xs text-slate-600 mt-1">We'll send you articles for approval within 48 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-sm shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Go live!</p>
                  <p className="text-xs text-slate-600 mt-1">Your story will be published within 7 days</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-500 mt-6">
            Need help? Contact us at{" "}
            <a href="mailto:hello@prlaunch.io" className="text-blue-500 hover:underline font-semibold">
              hello@prlaunch.io
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-4 text-slate-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  )
}
