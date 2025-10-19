"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useQuiz } from "@/lib/quiz-context"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function ThankYouPage() {
  const { leadData } = useQuiz()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <StickyLogoBanner />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="text-6xl">🎉</div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">You're All Set!</h1>
            <p className="text-2xl">Welcome to PRLaunch, {leadData.name.split(" ")[0]}!</p>
          </div>

          <div className="bg-card border rounded-xl p-8 text-left space-y-4">
            <h3 className="font-bold text-lg">Here's what happens next:</h3>
            <div className="space-y-3">
              
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Our team will reach out within 24 hours</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Your first article will be ready in 3-5 days</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>We'll send you drafts for approval</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Once approved, we'll publish & send you links</span>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl p-6 space-y-2">
            <p className="font-semibold">📧 Confirmation sent to: {leadData.email}</p>
            {leadData.phone && <p className="text-sm text-muted-foreground">📱 Updates sent to: {leadData.phone}</p>}
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Questions? Contact our support team via hello@prlaunch.io</p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
