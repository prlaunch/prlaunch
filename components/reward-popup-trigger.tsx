"use client"

import { useState, useEffect } from "react"
import { RewardPopup } from "./reward-popup"

export function RewardPopupTrigger() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const hasClaimed = localStorage.getItem("rewardPopupClaimed")

    // Don't show if already claimed
    if (hasClaimed) {
      return
    }

    // Show popup after 5 seconds on every visit
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!showPopup) return null

  return <RewardPopup onClose={() => setShowPopup(false)} />
}
