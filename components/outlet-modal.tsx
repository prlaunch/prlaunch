"use client"

import { X, Check } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Outlet {
  name: string
  logo_url: string
  screenshot_url: string
  domain_authority: number
  founded: number
  description: string
  industries: string[]
  sample_headlines: string[]
}

interface OutletModalProps {
  outlet: Outlet
  isOpen: boolean
  onClose: () => void
  variant?: "control" | "b"
  hideButton?: boolean
}

export function OutletModal({ outlet, isOpen, onClose, variant = "control", hideButton = false }: OutletModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleGetArticles = () => {
    setIsLoading(true)
    router.push("/payment?package=authority")
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div
        className="relative w-full max-w-[900px] max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-8 pb-11">
          {/* Header Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-full max-w-[200px] h-[100px] mb-4">
              <Image
                src={outlet.logo_url || "/placeholder.svg"}
                alt={`${outlet.name} logo`}
                fill
                className="object-contain"
              />
            </div>

            {/* Badge Pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium flex items-center gap-1">
                <Check className="w-4 h-4" />
                Domain Authority: {outlet.domain_authority}
              </span>
              <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium flex items-center gap-1">
                <Check className="w-4 h-4" />
                Founded: {outlet.founded}
              </span>
              <span className="px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-sm font-medium flex items-center gap-1">
                <Check className="w-4 h-4" />
                Google Indexed
              </span>
            </div>
          </div>

          {/* Screenshot Section */}
          <div className="mb-8">
            <div className="relative w-full aspect-[16/9] border border-gray-200 rounded-lg overflow-hidden">
              <Image
                src={outlet.screenshot_url || "/placeholder.svg"}
                alt={`${outlet.name} website screenshot`}
                fill
                className="object-cover object-top"
              />
            </div>
            <p className="text-sm text-gray-600 text-center mt-2">Example article showcase</p>
          </div>

          {/* About Section */}
          <div className="mb-8">
            <h3 id="modal-title" className="text-2xl font-bold text-gray-900 mb-3">
              About {outlet.name}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">{outlet.description}</p>
            <div>
              <p className="text-sm text-gray-600 mb-2">Trusted by:</p>
              <div className="flex flex-wrap gap-2">
                {outlet.industries.map((industry) => (
                  <span key={industry} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Why This Works Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Why This Outlet Works</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Ranks on Google for business searches</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Professional design prospects recognize</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">High domain authority = credibility signal</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Permanent placement (stays live forever)</span>
              </li>
            </ul>
          </div>

          {/* Sample Articles Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Articles on {outlet.name}</h3>
            <ul className="space-y-2">
              {outlet.sample_headlines.map((headline, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                    onClick={(e) => e.preventDefault()}
                  >
                    {headline}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Note */}
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 p-[2px] rounded-lg">
            <div className="bg-gray-50 rounded-lg p-4 py-4">
              <p className="text-sm text-gray-600 text-center">
                You'll select your outlets after purchase - no decision needed now
              </p>
            </div>
          </div>
        </div>

        {!hideButton && (
          <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg">
            <button
              onClick={handleGetArticles}
              disabled={isLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg disabled:cursor-not-allowed flex flex-col items-center justify-center gap-0.5"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span className="text-base font-semibold">Get 7 Articles for $197</span>
                  <span className="text-xs font-normal text-blue-100">Only $28 per each article</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
