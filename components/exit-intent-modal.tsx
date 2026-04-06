"use client"

import { useState, useEffect } from "react"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExitIntentModalProps {
  onClose: () => void
  onClaim: () => void
}

export function ExitIntentModal({ onClose, onClaim }: ExitIntentModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText("LAUNCH10")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Wait! Before You Go...</h2>

          <p className="text-lg text-gray-700 mb-6">Take 10% off your first PR campaign</p>

          <div
            onClick={handleCopyCode}
            className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-4 mb-6 cursor-pointer hover:border-blue-300 transition-colors"
          >
            <p className="text-sm text-gray-600 mb-1">Use code at checkout:</p>
            <p className="text-2xl font-bold text-blue-600 font-mono tracking-wider">LAUNCH10</p>
            {copied && (
              <p className="text-xs text-green-600 mt-2 flex items-center justify-center gap-1">
                <Check className="w-3 h-3" />
                Copied to clipboard!
              </p>
            )}
          </div>

          <div className="space-y-2 mb-6 text-left">
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Still get 48-hour guarantee</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Professional article writing</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">4.8/5 rating from 231+ customers</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={onClaim}
              size="lg"
              className="w-full h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold"
            >
              Claim My Discount →
            </Button>
            <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function useExitIntent(onExitIntent: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    let hasShown = false

    const handleMouseLeave = (e: MouseEvent) => {
      if (hasShown) return

      // Desktop: cursor moves to top of screen
      if (e.clientY <= 0) {
        hasShown = true
        onExitIntent()
      }
    }

    const handlePopState = () => {
      if (hasShown) return

      // Mobile: back button
      hasShown = true
      onExitIntent()
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("popstate", handlePopState)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [onExitIntent, enabled])
}
