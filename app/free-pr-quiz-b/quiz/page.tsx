"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Gift, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { StickyLogoBanner } from "@/components/quiz-logo"
import { Button } from "@/components/ui/button"

export default function QuizBQuestionsPage() {
  const router = useRouter()
  const { currentQuestion, setCurrentQuestion, mysteryRewardClaimed, setMysteryRewardClaimed } = useQuiz()
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showMysteryPopup, setShowMysteryPopup] = useState(false)

  const progressPercentage = (currentQuestion / 6) * 100

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)

    if (currentQuestion === 4 && !showMysteryPopup && !mysteryRewardClaimed) {
      setShowMysteryPopup(true)
      return
    }

    if (currentQuestion < 6) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer("")
      }, 300)
    } else {
      setTimeout(() => {
        router.push("/free-pr-quiz-b/calculating")
      }, 300)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    } else {
      router.push("/free-pr-quiz-b")
    }
  }

  const handleClaimMystery = () => {
    setMysteryRewardClaimed(true)
    setShowMysteryPopup(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col pb-24">
      <StickyLogoBanner />

      {/* Progress Bar */}
      <div className="sticky top-[57px] z-40 w-full py-6 px-4 space-y-6 bg-background/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion}/6</span>
            <span>{Math.round(progressPercentage)}% complete</span>
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

          <div className="space-y-6">
            {/* Question 1 */}
            {currentQuestion === 1 && (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-center px-4">
                  Have you ever been featured in the news or media?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto px-4">
                  <button
                    onClick={() => handleAnswer("yes")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">📰</div>
                    <div className="font-semibold text-sm md:text-base mb-1">YES</div>
                    <div className="text-xs md:text-sm text-gray-600">I want more exposure</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("not-yet")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">❌</div>
                    <div className="font-semibold text-sm md:text-base mb-1">NOT YET</div>
                    <div className="text-xs md:text-sm text-gray-600">But I'm ready to be</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("no")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">💭</div>
                    <div className="font-semibold text-sm md:text-base mb-1">NO</div>
                    <div className="text-xs md:text-sm text-gray-600">Always wanted to</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("never")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">✨</div>
                    <div className="font-semibold text-sm md:text-base mb-1">NEVER</div>
                    <div className="text-xs md:text-sm text-gray-600">Didn't think I could</div>
                  </button>
                </div>
                <p className="text-xs md:text-sm text-gray-500 text-center mt-6 px-4">
                  4,847 people have taken this quiz
                </p>
              </>
            )}

            {/* Question 2 */}
            {currentQuestion === 2 && (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-center px-4">
                  If you could leave one mark on the world, what would it be?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto px-4">
                  <button
                    onClick={() => handleAnswer("impact")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">🎯</div>
                    <div className="font-semibold text-sm md:text-base mb-1">IMPACT</div>
                    <div className="text-xs md:text-sm text-gray-600">Be remembered for my impact</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("inspire")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">💡</div>
                    <div className="font-semibold text-sm md:text-base mb-1">INSPIRE</div>
                    <div className="text-xs md:text-sm text-gray-600">Inspire others with my story</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("matter")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">✅</div>
                    <div className="font-semibold text-sm md:text-base mb-1">MATTER</div>
                    <div className="text-xs md:text-sm text-gray-600">Prove I mattered</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("legacy")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">⏰</div>
                    <div className="font-semibold text-sm md:text-base mb-1">LEGACY</div>
                    <div className="text-xs md:text-sm text-gray-600">My work outlives me</div>
                  </button>
                </div>
              </>
            )}

            {/* Question 3 */}
            {currentQuestion === 3 && (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-center px-4">
                  When people Google your name, what do they find?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto px-4">
                  <button
                    onClick={() => handleAnswer("not-much")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">🔍</div>
                    <div className="font-semibold text-sm md:text-base mb-1">NOT MUCH</div>
                    <div className="text-xs md:text-sm text-gray-600">Just social media profiles</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("some-things")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">📱</div>
                    <div className="font-semibold text-sm md:text-base mb-1">SOME THINGS</div>
                    <div className="text-xs md:text-sm text-gray-600">But nothing impressive</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("mentions")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">📰</div>
                    <div className="font-semibold text-sm md:text-base mb-1">MENTIONS</div>
                    <div className="text-xs md:text-sm text-gray-600">A few, but I want more</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("building")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">🚀</div>
                    <div className="font-semibold text-sm md:text-base mb-1">BUILDING</div>
                    <div className="text-xs md:text-sm text-gray-600">I'm already building presence</div>
                  </button>
                </div>
                <p className="text-xs md:text-sm text-gray-500 text-center mt-6 px-4">
                  87% of successful people have a strong Google presence
                </p>
              </>
            )}

            {/* Question 4 */}
            {currentQuestion === 4 && (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-center px-4">
                  What would change if you were featured in Forbes, Entrepreneur, or a major publication?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto px-4">
                  <button
                    onClick={() => handleAnswer("everything")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">🎉</div>
                    <div className="font-semibold text-sm md:text-base mb-1">EVERYTHING</div>
                    <div className="text-xs md:text-sm text-gray-600">Instant credibility</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("business")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">📈</div>
                    <div className="font-semibold text-sm md:text-base mb-1">BUSINESS</div>
                    <div className="text-xs md:text-sm text-gray-600">My business would explode</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("respect")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">✨</div>
                    <div className="font-semibold text-sm md:text-base mb-1">RESPECT</div>
                    <div className="text-xs md:text-sm text-gray-600">People would take me seriously</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("attract")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">🤝</div>
                    <div className="font-semibold text-sm md:text-base mb-1">ATTRACT</div>
                    <div className="text-xs md:text-sm text-gray-600">Better clients, partners, investors</div>
                  </button>
                </div>
              </>
            )}

            {/* Question 5 */}
            {currentQuestion === 5 && (
              <>
                <div className="flex justify-center mb-4 px-4">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-xs md:text-sm font-semibold">
                    Almost there! 🎉
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-center px-4">
                  When you see others getting featured in the news, how do you feel?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto px-4">
                  <button
                    onClick={() => handleAnswer("jealous")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">😤</div>
                    <div className="font-semibold text-sm md:text-base mb-1">JEALOUS</div>
                    <div className="text-xs md:text-sm text-gray-600">That should be me</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("frustrated")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">😠</div>
                    <div className="font-semibold text-sm md:text-base mb-1">FRUSTRATED</div>
                    <div className="text-xs md:text-sm text-gray-600">I've accomplished just as much</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("motivated")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">💪</div>
                    <div className="font-semibold text-sm md:text-base mb-1">MOTIVATED</div>
                    <div className="text-xs md:text-sm text-gray-600">If they can, so can I</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("curious")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">🤔</div>
                    <div className="font-semibold text-sm md:text-base mb-1">CURIOUS</div>
                    <div className="text-xs md:text-sm text-gray-600">How did they get featured?</div>
                  </button>
                </div>
              </>
            )}

            {/* Question 6 */}
            {currentQuestion === 6 && (
              <>
                <div className="flex justify-center mb-4 px-4">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full text-xs md:text-sm font-semibold">
                    Last question! 🎯
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-center px-4">
                  Are you ready to step into the spotlight?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto px-4">
                  <button
                    onClick={() => handleAnswer("yes")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">🔥</div>
                    <div className="font-semibold text-sm md:text-base mb-1">YES</div>
                    <div className="text-xs md:text-sm text-gray-600">I've been ready for years</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("almost")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">⏰</div>
                    <div className="font-semibold text-sm md:text-base mb-1">ALMOST</div>
                    <div className="text-xs md:text-sm text-gray-600">Just need the right opportunity</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("think-so")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">💭</div>
                    <div className="font-semibold text-sm md:text-base mb-1">I THINK SO</div>
                    <div className="text-xs md:text-sm text-gray-600">But I need guidance</div>
                  </button>

                  <button
                    onClick={() => handleAnswer("not-yet")}
                    className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px]"
                  >
                    <div className="text-3xl md:text-4xl mb-2">🌱</div>
                    <div className="font-semibold text-sm md:text-base mb-1">NOT YET</div>
                    <div className="text-xs md:text-sm text-gray-600">But I want to be</div>
                  </button>
                </div>
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
