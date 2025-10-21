"use client"

import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import confetti from "canvas-confetti"

export default function Step4Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const goal = searchParams.get("goal")
  const category = searchParams.get("category")

  useEffect(() => {
    // Trigger confetti on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  const handleClaimBonuses = () => {
    const timerStart = Date.now()
    localStorage.setItem("campaignTimerStart", timerStart.toString())
    router.push(`/checkout/step-5?goal=${goal}&category=${category}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
          style={{ width: "66.67%" }}
        />
      </div>

      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-lg w-full text-center space-y-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-slate-900">CONGRATULATIONS!</h2>
          <p className="text-xl text-slate-700 mb-6">You've unlocked exclusive bonuses:</p>
          <div className="space-y-4 text-left">
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
              <p className="font-bold text-slate-900 mb-1">🎁 +1 BONUS Article (on 3+ article packages)</p>
              <p className="text-sm text-slate-600">→ Get more coverage for free</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
              <p className="font-bold text-slate-900 mb-1">🎁 Priority Outlet Selection</p>
              <p className="text-sm text-slate-600">→ Choose from premium outlets first</p>
            </div>
          </div>
          <MovingBorderButton
            borderRadius="1.75rem"
            onClick={handleClaimBonuses}
            containerClassName="h-14 w-full"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
            duration={3000}
          >
            Claim My Bonuses →
          </MovingBorderButton>
        </div>
      </div>
    </div>
  )
}
