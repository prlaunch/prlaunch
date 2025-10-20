"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { StickyLogoBanner } from "@/components/quiz-logo"
import { processUpsellPayment } from "@/app/actions/quiz-stripe"
import { Loader2 } from "lucide-react"

export default function UpsellPage() {
  const router = useRouter()
  const { leadData, customerId } = useQuiz()
  const [upsellTimeLeft, setUpsellTimeLeft] = useState(10 * 60)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  useEffect(() => {
    if (upsellTimeLeft > 0) {
      const timer = setInterval(() => {
        setUpsellTimeLeft((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [upsellTimeLeft])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleUpsellAccept = async () => {
    if (!customerId) {
      router.push("/free-pr-quiz/thank-you")
      return
    }

    setIsProcessing(true)

    try {
      const result = await processUpsellPayment(customerId, 1.0)

      if (result.success) {
        router.push("/free-pr-quiz/thank-you?upsell=accepted")
      } else {
        router.push("/free-pr-quiz/thank-you?upsell=declined")
      }
    } catch (error) {
      router.push("/free-pr-quiz/thank-you?upsell=declined")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleUpsellDecline = () => {
    router.push("/free-pr-quiz/thank-you?upsell=declined")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-4 px-4">
      <StickyLogoBanner />

      <div className="max-w-3xl mx-auto space-y-8 pt-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-red-600">⏰ WAIT! Don't Close This Page...</h1>
          <p className="text-2xl">{leadData.name.split(" ")[0]}, I have something special for you.</p>
        </div>

        <div className="bg-card border rounded-xl p-8 space-y-6">
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Since you just covered our customer acquisition cost, I can offer you something we normally never do...
            </p>
            <p>
              We have <strong> a few &quot;back inventory&quot; article slots</strong> that we need to fill this month.
              They're already paid for by our publication partners, so we're basically giving them away at cost.
            </p>
            <p className="font-semibold">
              This is NOT a sales pitch. This is me being real with you because you're already a customer.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500 rounded-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">🎯 MEMBERS-ONLY BACK INVENTORY DEAL</h3>
            <p className="text-xl font-semibold">Add 2 More Articles</p>
          </div>

          <div className="text-center space-y-2 py-4 border-t border-b">
            <p className="text-sm text-muted-foreground line-through">Regular Price: $179.98 ($89.99 each)</p>
            <p className="text-4xl font-bold">$1.00</p>
            <p className="text-lg font-semibold text-green-600">YOU SAVE: $178.98</p>
          </div>

          <div className="grid md:grid-cols-2 gap-3 text-sm">
            {[
              "Same professional writing",
              "Same unlimited revisions",
              "Same USA-based publications",
              'Same "As Seen On" badges',
              "Same forever backlinks",
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-muted-foreground">This offer expires in</span>
              <span>⏰</span>
              <span className="font-mono font-bold text-red-600">{formatTime(upsellTimeLeft)}</span>
            </div>

            <p className="text-center text-sm">🚨 This page will NEVER be shown again</p>
          </div>

          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full text-lg px-24 py-5 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg disabled:opacity-50"
              onClick={handleUpsellAccept}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "YES! Add 2 Articles for $1.00 →"
              )}
            </Button>
            <button
              onClick={handleUpsellDecline}
              disabled={isProcessing}
              className="w-full text-sm text-muted-foreground hover:text-foreground underline disabled:opacity-50"
            >
              No thanks, I'm good with 1 article
            </button>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-lg">Why am I offering this?</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong>Honest answer:</strong> You already covered our ad costs ($44.99 profit). These 2 slots are
              pre-paid by our partners, so we're just filling inventory.
            </p>
            <p>
              If you don't take them, we'll offer them to the next customer. But since you're here now, and you already
              trust us, I wanted to give you first dibs.
            </p>
            <p className="font-medium text-foreground">No pressure. Just a real deal from our back office.</p>
            <p className="text-right">- The PRLaunch Team</p>
          </div>
        </div>
      </div>
    </div>
  )
}
