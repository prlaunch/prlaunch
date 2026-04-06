"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { StickyLogoBanner } from "@/components/quiz-logo"
import { useQuiz } from "@/lib/quiz-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function DIYRecommendationPage() {
  const router = useRouter()
  const { diyQualification } = useQuiz()
  const [isLoadingPro, setIsLoadingPro] = useState(false)
  const [isLoadingDIY, setIsLoadingDIY] = useState(false)
  const [showFirstPopup, setShowFirstPopup] = useState(false)
  const [showSecondPopup, setShowSecondPopup] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const isStrongRecommendation =
    diyQualification.writingComfort === "not-comfortable" ||
    diyQualification.timeAvailable === "no-time" ||
    diyQualification.timeAvailable === "maybe-time"

  const handleSwitchToPro = () => {
    setIsLoadingPro(true)
    router.push("/free-pr-quiz/payment")
  }

  const handleContinueDIY = () => {
    setShowFirstPopup(true)
  }

  const handleFirstPopupContinue = () => {
    setShowFirstPopup(false)
    setShowSecondPopup(true)
  }

  const handleSecondPopupContinue = () => {
    setIsLoadingDIY(true)
    setShowSecondPopup(false)
    router.push("/free-pr-quiz/diy-success")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-4 px-4">
      <StickyLogoBanner />

      <div className="max-w-2xl mx-auto space-y-8 pb-24 pt-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {isStrongRecommendation ? (
          <div className="bg-card border rounded-xl p-8 space-y-6">
            <div className="text-center space-y-4 border-b pb-6">
              <h1 className="text-3xl font-bold">Based on Your Answers, We Strongly Recommend Professional Writing</h1>
              <p className="text-lg text-muted-foreground">
                You mentioned you're not comfortable with writing or don't have much time.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-3">Here's what typically happens with DIY:</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { icon: "⏱️", text: "Average time to complete: 15-20 hours (not 8-13)" },
                    { icon: "📝", text: "Average revisions required: 3-4 rounds" },
                    { icon: "⏰", text: "Average time to publication: 30-45 days" },
                    { icon: "❌", text: "Rejection rate: 23% (topics don't meet publication standards)" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-0.5">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">Compare to Professional Writing:</h3>
                <div className="space-y-2 text-sm">
                  {[
                    "15-minute interview (we do all the work)",
                    "Published in 3-5 days",
                    "0% rejection rate (we know what publications accept)",
                    "Unlimited revisions included",
                    "Only $44.99 (saves you $750-1,000 in time value)",
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✅</span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Button
                size="lg"
                className="w-full text-sm md:text-base px-4 md:px-6 py-3 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white whitespace-normal text-center leading-tight"
                onClick={handleSwitchToPro}
                disabled={isLoadingPro}
              >
                {isLoadingPro ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  "Switch to Professional Writing - $44.99"
                )}
              </Button>

              <button
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={handleContinueDIY}
                disabled={isLoadingDIY}
              >
                I Understand the Risks, Continue with DIY
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-card border rounded-xl p-8 space-y-6">
            <div className="text-center space-y-4 border-b pb-6">
              <h1 className="text-3xl font-bold">You're Qualified for DIY, But Consider This</h1>
              <p className="text-lg text-muted-foreground">You have writing experience, which is great!</p>
            </div>

            <div className="space-y-6">
              <div>
                <p className="mb-4">However, even experienced writers face these challenges:</p>
                <div className="space-y-2 text-sm">
                  {[
                    { icon: "📋", text: "Publication-specific requirements (AP Style, word count, formatting)" },
                    { icon: "🔍", text: "Editorial standards (fact-checking, source requirements)" },
                    { icon: "⏰", text: "Revision cycles (average 3-4 rounds, 2-3 days each)" },
                    { icon: "📝", text: "Topic approval (23% of DIY submissions need topic changes)" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-0.5">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 font-semibold">Total realistic timeline: 4-6 weeks</p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">With Professional Writing:</h3>
                <div className="space-y-2 text-sm">
                  {[
                    "We handle all publication requirements",
                    "Published in 3-5 days",
                    "No revision cycles needed",
                    "Topic pre-approved",
                    "Only $44.99",
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">✅</span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-center">
                  <span className="font-semibold">Even if you're a strong writer, is your time worth $50/hour?</span>
                  <br />
                  15 hours × $50 = $750 saved by choosing professional
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Button
                size="lg"
                className="w-full text-sm md:text-base px-4 md:px-6 py-3 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white whitespace-normal text-center leading-tight"
                onClick={handleSwitchToPro}
                disabled={isLoadingPro}
              >
                {isLoadingPro ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  "Get Professional Writing - $44.99"
                )}
              </Button>

              <button
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={handleContinueDIY}
                disabled={isLoadingDIY}
              >
                Continue with DIY
              </button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={showFirstPopup} onOpenChange={setShowFirstPopup}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              Important: Please Read
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <p className="font-semibold">Before you proceed with DIY, please understand:</p>

            <div>
              <p className="font-semibold mb-2">Timeline:</p>
              <ul className="space-y-1 ml-4">
                <li>• DIY articles take 30-45 days to publish (vs 3-5 days)</li>
                <li>• You'll need 15-20 hours of work</li>
                <li>• Average 3-4 revision rounds required</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Requirements:</p>
              <ul className="space-y-1 ml-4">
                <li>• Must meet publication editorial standards</li>
                <li>• Must be written in AP Style or journalistic format</li>
                <li>• Must include proper sources and citations</li>
                <li>• Must be 500-1000 words, properly formatted</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Important:</p>
              <ul className="space-y-1 ml-4">
                <li>• 23% of DIY submissions are rejected (topic doesn't fit)</li>
                <li>• If rejected, you'll need to choose a new topic & rewrite</li>
                <li>• We cannot guarantee your free article will be published</li>
                <li>• You can upgrade to professional writing anytime for $44.99</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-center font-semibold">
                Most people (89%) choose professional writing to avoid these challenges and get published faster.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              size="lg"
              className="w-full text-sm md:text-base px-4 md:px-6 py-3 h-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white whitespace-normal text-center leading-tight"
              onClick={handleSwitchToPro}
              disabled={isLoadingPro}
            >
              {isLoadingPro ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Yes, Switch to Professional - $44.99"
              )}
            </Button>

            <button
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={handleFirstPopupContinue}
            >
              I Understand, Continue with DIY
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSecondPopup} onOpenChange={setShowSecondPopup}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Final Confirmation
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <p className="font-semibold">We want to make sure you understand what you're choosing:</p>

            <div>
              <p className="font-semibold mb-2">With DIY, you are responsible for:</p>
              <ul className="space-y-1 ml-4">
                <li>✓ Writing 500-1000 words in journalistic format</li>
                <li>✓ Meeting editorial and publication standards</li>
                <li>✓ Completing within 14 days (or lose your spot)</li>
                <li>✓ Making revisions (average 3-4 rounds)</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">We will provide:</p>
              <ul className="space-y-1 ml-4">
                <li>✓ Article template and guidelines</li>
                <li>✓ Topic ideas and research</li>
                <li>✓ Review and feedback on your draft</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2 text-red-600">We cannot guarantee:</p>
              <ul className="space-y-1 ml-4 text-red-600">
                <li>✗ Your article will be accepted</li>
                <li>✗ Your topic will meet publication standards</li>
                <li>✗ Timeline (depends on your writing speed & revisions)</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-semibold mb-2">If your article is rejected or you don't complete it:</p>
              <ul className="space-y-1 ml-2">
                <li>• You lose your free article placement</li>
                <li>• You can purchase professional writing for $44.99</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-center font-semibold">This is why 89% of winners choose professional writing.</p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              size="lg"
              className="w-full text-sm md:text-base px-4 md:px-6 py-3 h-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white whitespace-normal text-center leading-tight"
              onClick={handleSwitchToPro}
              disabled={isLoadingPro}
            >
              {isLoadingPro ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Last Chance: Get Professional Writing - $44.99"
              )}
            </Button>

            <button
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={handleSecondPopupContinue}
              disabled={isLoadingDIY}
            >
              {isLoadingDIY ? "Loading..." : "I Accept the Risks, Proceed with DIY"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
