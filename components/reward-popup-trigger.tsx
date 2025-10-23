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

    let hasScrolled = false
    let scrollTimer: NodeJS.Timeout | null = null

    const handleScroll = () => {
      if (!hasScrolled) {
        hasScrolled = true
        // Start 8-second timer after first scroll
        scrollTimer = setTimeout(() => {
          setShowPopup(true)
        }, 8000)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [])

  if (!showPopup) return null

  return <RewardPopup onClose={() => setShowPopup(false)} />
}
