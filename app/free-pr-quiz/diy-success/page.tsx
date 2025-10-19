"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { StickyLogoBanner } from "@/components/quiz-logo"
import { useQuiz } from "@/lib/quiz-context"

export default function DIYSuccessPage() {
  const router = useRouter()
  const { leadData } = useQuiz()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleUpgrade = () => {
    setIsLoading(true)
    router.push("/free-pr-quiz/payment")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-4 px-4">
      <StickyLogoBanner />

      <div className="max-w-2xl mx-auto space-y-8 pb-24 pt-8">
        <div className="bg-card border rounded-xl p-8 space-y-6">
          <div className="text-center space-y-4 border-b pb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">✅ DIY Article Confirmed</h1>
            <p className="text-lg">
              We'll send your article template and guidelines to:
              <br />
              <span className="font-semibold text-foreground">{leadData.email}</span>
            </p>
            <p className="text-muted-foreground">Check your inbox within 24 hours.</p>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-center flex items-center justify-center gap-2">
              <span>⚠️</span> Important Reminders
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold mb-2">Timeline:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Template arrives: Within 24 hours</li>
                  <li>• Your deadline: 14 days to write and submit</li>
                  <li>• Our review: 3-5 days</li>
                  <li>• Revisions: 2-3 rounds (average)</li>
                  <li>• Publication: 30-45 days total</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Requirements:</p>
                <ul className="space-y-1 ml-4">
                  <li>• 500-1000 words</li>
                  <li>• AP Style or journalistic format</li>
                  <li>• Proper sources and citations</li>
                  <li>• Meets publication editorial standards</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2 text-red-600">What Happens If:</p>
                <ul className="space-y-1 ml-4 text-red-600">
                  <li>• You miss the 14-day deadline → You lose your free article spot</li>
                  <li>• Your topic is rejected → You need to choose new topic & rewrite</li>
                  <li>• You don't complete revisions → Article won't be published</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <p className="font-semibold text-center">Need Help?</p>
            <p className="text-sm text-center">
              If you realize DIY is too challenging, you can upgrade to professional writing anytime for $44.99.
            </p>
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              onClick={handleUpgrade}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Upgrade to Professional Writing Now - $44.99"
              )}
            </Button>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <Button size="lg" variant="outline" className="w-full bg-transparent" onClick={() => router.push("/")}>
              Continue with DIY
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
