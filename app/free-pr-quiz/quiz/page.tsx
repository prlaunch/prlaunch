"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { X, Gift, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function QuizQuestionsPage() {
  const router = useRouter()
  const { answers, setAnswers, currentQuestion, setCurrentQuestion, mysteryRewardClaimed, setMysteryRewardClaimed } =
    useQuiz()
  const [showMysteryPopup, setShowMysteryPopup] = useState(false)

  const progressPercentage = (currentQuestion / 6) * 100

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleQuizAnswer = (answer: string, key: keyof typeof answers) => {
    setAnswers({ ...answers, [key]: answer })

    if (currentQuestion === 4 && !showMysteryPopup && !mysteryRewardClaimed) {
      setShowMysteryPopup(true)
      return
    }

    if (currentQuestion < 6) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      setTimeout(() => {
        router.push("/free-pr-quiz/calculating")
      }, 300)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      router.push("/free-pr-quiz")
    }
  }

  const handleClaimMystery = () => {
    setMysteryRewardClaimed(true)
    setShowMysteryPopup(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col pb-8">
      <StickyLogoBanner />

      <div className="sticky top-[57px] z-40 w-full py-6 px-4 space-y-6 bg-background/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion} of 6</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
                background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #9333EA 100%)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-6">
          {currentQuestion >= 4 && !mysteryRewardClaimed && (
            <div className="fixed bottom-6 right-6 z-50 cursor-pointer group" onClick={() => setShowMysteryPopup(true)}>
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
                <Gift className="w-12 h-12 text-yellow-500 relative animate-bounce" />
              </div>
            </div>
          )}

          {showMysteryPopup && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-card border-2 border-yellow-500 rounded-xl p-8 max-w-md w-full space-y-6 relative animate-in fade-in zoom-in duration-300">
                <button
                  onClick={() => setShowMysteryPopup(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-2xl animate-pulse"></div>
                    <Gift className="w-20 h-20 mx-auto text-yellow-500 relative" />
                  </div>
                  <h3 className="text-2xl font-bold">MYSTERY REWARD UNLOCKED!</h3>
                  <p className="text-muted-foreground">
                    You've unlocked a special surprise! Complete the quiz to reveal your reward.
                  </p>
                  <Button
                    size="lg"
                    className="w-full text-2xl px-16 py-5 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                    onClick={handleClaimMystery}
                  >
                    Claim & Continue →
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentQuestion > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          <div className="bg-card border rounded-xl p-8 space-y-6">
            {currentQuestion === 1 && (
              <>
                <h2 className="text-2xl font-bold">What's your main goal for getting press coverage?</h2>
                <RadioGroup
                  onValueChange={(value) => handleQuizAnswer(value, "goal")}
                  value={answers.goal}
                  className="space-y-3"
                >
                  {[
                    { value: "customers", label: "🚀 Attract more customers" },
                    { value: "fundraising", label: "💰 Build credibility for fundraising" },
                    { value: "leadership", label: "🎯 Establish thought leadership" },
                    { value: "talent", label: "👥 Hire better talent" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      htmlFor={option.value}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleQuizAnswer(option.value, "goal")}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <span className="flex-1 cursor-pointer">{option.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </>
            )}

            {currentQuestion === 2 && (
              <>
                <h2 className="text-2xl font-bold">Where is your business right now?</h2>
                <RadioGroup
                  onValueChange={(value) => handleQuizAnswer(value, "stage")}
                  value={answers.stage}
                  className="space-y-3"
                >
                  {[
                    { value: "pre-revenue", label: "💡 Pre-revenue (just starting)" },
                    { value: "under-100k", label: "📈 Under $100K annual revenue" },
                    { value: "100k-500k", label: "🎯 $100K - $500K annual revenue" },
                    { value: "over-500k", label: "🚀 Over $500K annual revenue" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      htmlFor={option.value}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleQuizAnswer(option.value, "stage")}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <span className="flex-1 cursor-pointer">{option.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </>
            )}

            {currentQuestion === 3 && (
              <>
                <h2 className="text-2xl font-bold">How would you describe your online presence?</h2>
                <RadioGroup
                  onValueChange={(value) => handleQuizAnswer(value, "presence")}
                  value={answers.presence}
                  className="space-y-3"
                >
                  {[
                    { value: "strong", label: "🌟 Strong (website, social media, content)" },
                    { value: "moderate", label: "📱 Moderate (website + one social platform)" },
                    { value: "minimal", label: "🌱 Minimal (just getting started)" },
                    { value: "none", label: "❌ Non-existent (need to build it)" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      htmlFor={option.value}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleQuizAnswer(option.value, "presence")}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <span className="flex-1 cursor-pointer">{option.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </>
            )}

            {currentQuestion === 4 && (
              <>
                <h2 className="text-2xl font-bold">What's your biggest challenge with PR?</h2>
                <RadioGroup
                  onValueChange={(value) => handleQuizAnswer(value, "challenge")}
                  value={answers.challenge}
                  className="space-y-3"
                >
                  {[
                    { value: "start", label: "🤔 Don't know where to start" },
                    { value: "time", label: "⏰ Don't have time to pitch journalists" },
                    { value: "story", label: "📝 Don't know what makes a good story" },
                    { value: "afford", label: "💸 Can't afford traditional PR agencies" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      htmlFor={option.value}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleQuizAnswer(option.value, "challenge")}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <span className="flex-1 cursor-pointer">{option.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </>
            )}

            {currentQuestion === 5 && (
              <>
                <h2 className="text-2xl font-bold">How soon do you need press coverage?</h2>
                <RadioGroup
                  onValueChange={(value) => handleQuizAnswer(value, "urgency")}
                  value={answers.urgency}
                  className="space-y-3"
                >
                  {[
                    { value: "immediate", label: "🔥 Immediately (within 1 month)" },
                    { value: "soon", label: "⚡ Soon (1-3 months)" },
                    { value: "planning", label: "📅 Planning ahead (3-6 months)" },
                    { value: "exploring", label: "🔍 Just exploring options" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      htmlFor={option.value}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleQuizAnswer(option.value, "urgency")}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <span className="flex-1 cursor-pointer">{option.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </>
            )}

            {currentQuestion === 6 && (
              <>
                <h2 className="font-bold text-xl">Have you ever been featured in any publications?</h2>
                <RadioGroup
                  onValueChange={(value) => handleQuizAnswer(value, "featured")}
                  value={answers.featured}
                  className="space-y-3"
                >
                  {[
                    { value: "multiple", label: "✅ Yes, multiple times" },
                    { value: "once", label: "📰 Yes, once or twice" },
                    { value: "tried", label: "🚫 No, but I've tried" },
                    { value: "new", label: "🆕 No, I don't know how to start" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      htmlFor={option.value}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleQuizAnswer(option.value, "featured")}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <span className="flex-1 cursor-pointer">{option.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </>
            )}
          </div>
        </div>
      </div>

      {mysteryRewardClaimed && (
        <div className="fixed bottom-0 left-0 right-0 z-40 w-full bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-t-2 border-amber-200/50 shadow-lg backdrop-blur-sm">
          <div className="max-w-2xl mx-auto py-3 px-4">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="font-semibold text-amber-900 text-xs">🎁 Mystery Gift Unlocked!</p>
                <p className="text-[11px] text-amber-700">Complete the quiz to claim your special reward</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
