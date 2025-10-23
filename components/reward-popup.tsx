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
      cardElement.classList.add("scale-110", "opacity-50")
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
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300 relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-slate-100 transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="h-4 w-4 text-slate-400" />
        </button>

        {!showReward ? (
          <div className="p-6">
            {/* Header */}
            <div className="text-center mb-5">
              <h2 className="text-xl font-semibold text-slate-900 mb-1">Pick an article and win</h2>
              <p className="text-xs text-slate-500">Choose any card to reveal your reward</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {articleCards.map((cardId) => (
                <button
                  key={cardId}
                  id={`card-${cardId}`}
                  onClick={() => handleCardSelect(cardId)}
                  disabled={selectedCard !== null}
                  className="group relative aspect-[4/5] bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:shadow-none"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Newspaper
                      className="h-12 w-12 text-slate-400 group-hover:text-blue-500 transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Card number badge */}
                  <div className="absolute top-2 left-2 bg-white border border-slate-200 rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-xs font-medium text-slate-600">{cardId}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="mb-3 text-3xl">✨</div>

            <h2 className="text-xl font-semibold text-slate-900 mb-2">Congratulations!</h2>
            <p className="text-sm text-slate-600 mb-4">You've won:</p>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-5">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">1 FREE Article</h3>
              <p className="text-xs text-slate-600 mb-2">On packages of 3 or 5 articles</p>
              <div className="inline-block bg-green-50 border border-green-200 rounded-full px-3 py-1">
                <p className="text-xs font-medium text-green-700">Worth $94</p>
              </div>
            </div>

            <button
              onClick={handleClaimReward}
              disabled={isClaiming}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isClaiming ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
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
          </div>
        )}
      </div>
    </div>
  )
}
