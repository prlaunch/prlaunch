"use client"

import { useState } from "react"
import { X, Newspaper } from "lucide-react"
import confetti from "canvas-confetti"
import { useRouter } from "next/navigation"

interface RewardPopupProps {
  onClose?: () => void
}

const articleCards = [1, 2, 3, 4]

export function RewardPopup({ onClose }: RewardPopupProps) {
  const router = useRouter()
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [showReward, setShowReward] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)

  const handleCardSelect = (cardId: number) => {
    setSelectedCard(cardId)

    const cardElement = document.getElementById(`card-${cardId}`)
    if (cardElement) {
      cardElement.classList.add("animate-[ping_0.5s_ease-in-out]")
    }

    // Trigger confetti animation
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#3b82f6", "#06b6d4", "#8b5cf6", "#ec4899"],
    })

    // Additional confetti burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#3b82f6", "#06b6d4", "#8b5cf6", "#ec4899"],
      })
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#3b82f6", "#06b6d4", "#8b5cf6", "#ec4899"],
      })
    }, 200)

    setTimeout(() => {
      setShowReward(true)
    }, 600)
  }

  const handleClaimReward = () => {
    setIsClaiming(true)

    // Store in localStorage that user claimed the reward
    localStorage.setItem("rewardPopupClaimed", "true")
    localStorage.setItem("rewardPopupClaimedAt", Date.now().toString())

    // Redirect to step-5 with reward parameter
    setTimeout(() => {
      router.push("/checkout/step-5?reward=free_article")
    }, 500)
  }

  const handleClose = () => {
    // Mark as seen even if not claimed
    localStorage.setItem("rewardPopupSeen", "true")
    onClose?.()
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300 relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="h-5 w-5 text-slate-600" />
        </button>

        {!showReward ? (
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🎁</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Pick an article and win</h2>
              <p className="text-sm text-slate-600">Choose any card below to reveal your reward</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {articleCards.map((cardId) => (
                <button
                  key={cardId}
                  id={`card-${cardId}`}
                  onClick={() => handleCardSelect(cardId)}
                  disabled={selectedCard !== null}
                  className="group relative aspect-[3/4] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                >
                  {/* Card pattern background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-8 group-hover:scale-110 transition-transform duration-300">
                      <Newspaper className="h-20 w-20 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Card number badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-sm font-bold text-slate-900">{cardId}</span>
                  </div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                  {/* Border glow */}
                  <div className="absolute inset-0 rounded-xl ring-2 ring-white/50 group-hover:ring-white/80 transition-all duration-300" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 text-center">
            <div className="mb-4 text-4xl">✨</div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Congratulations!</h2>
            <p className="text-lg text-slate-700 mb-6">You've won:</p>

            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">1 FREE Article</h3>
              <p className="text-sm text-slate-700 mb-3">On packages of 3 or 5 articles</p>
              <div className="inline-block bg-green-100 border border-green-300 rounded-full px-4 py-1">
                <p className="text-sm font-bold text-green-700">Worth $94 - Yours FREE!</p>
              </div>
            </div>

            <button
              onClick={handleClaimReward}
              disabled={isClaiming}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isClaiming ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Claiming...
                </>
              ) : (
                <>Claim free article →</>
              )}
            </button>

            <p className="text-xs text-slate-500 mt-4">This offer is only available once per visitor</p>
          </div>
        )}
      </div>
    </div>
  )
}
