"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExitIntentPopupProps {
  cartCount: number
  onContinue: () => void
  onClose: () => void
}

export function ExitIntentPopup({ cartCount, onContinue, onClose }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && cartCount > 0 && !localStorage.getItem("exitIntentShown")) {
        setIsVisible(true)
        localStorage.setItem("exitIntentShown", "true")
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [cartCount])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
    onClose()
  }

  const handleContinue = () => {
    setIsVisible(false)
    onContinue()
  }

  if (!isVisible) return null

  const hasUnlockedFree = cartCount >= 4
  const itemsNeeded = hasUnlockedFree ? 0 : 4 - (cartCount % 4)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="text-5xl mb-4">✋</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Wait!</h2>

          {hasUnlockedFree ? (
            <>
              <p className="text-lg text-gray-700 mb-2 font-semibold">Your FREE article is waiting!</p>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                You've unlocked a free outlet worth $47. Complete checkout to claim it.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg text-gray-700 mb-2 font-semibold">You're close to a FREE article!</p>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Add {itemsNeeded} more outlet{itemsNeeded > 1 ? "s" : ""} to get your 4th FREE and save $47 on your
                order.
              </p>
            </>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleContinue}
              className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-base font-bold shadow-lg hover:scale-[1.02] transition-transform"
            >
              {hasUnlockedFree ? "Claim My Free Article →" : "Complete My Bundle →"}
            </Button>
            <button
              onClick={handleClose}
              className="w-full text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors"
            >
              No Thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
