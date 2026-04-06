"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Gift } from "lucide-react"

export function FloatingRewardButton() {
  const [showButton, setShowButton] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has claimed the reward
    const hasClaimedReward = localStorage.getItem("hasClaimedReward") === "true"
    setShowButton(hasClaimedReward)
  }, [])

  if (!showButton) return null

  const handleClick = () => {
    router.push("/checkout/step-5?reward=free_article")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Continue to claim your free article"
    >
      <div className="relative">
        {/* Pulsing ring animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-ping opacity-75" />

        {/* Main button */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 shadow-lg transition-transform hover:scale-110 active:scale-95">
          <Gift className="h-7 w-7 text-white" strokeWidth={2.5} />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
          <div className="whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-xl">
            Claim your free article
            <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-gray-900" />
          </div>
        </div>
      </div>
    </button>
  )
}
