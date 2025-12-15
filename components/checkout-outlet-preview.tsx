"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Check } from "lucide-react"
import outletsData from "@/data/outlets.json"

export function CheckoutOutletPreview() {
  const [isExpanded, setIsExpanded] = useState(false)

  const priorityOutlets = ["USA Wire", "Bosses Mag", "SuccessXL"]
  const reorderedOutlets = [
    ...outletsData.filter((outlet) => priorityOutlets.includes(outlet.name)),
    ...outletsData.filter((outlet) => !priorityOutlets.includes(outlet.name)),
  ]

  const displayedLogos = isExpanded ? reorderedOutlets : reorderedOutlets.slice(0, 3)

  const benefits = ["100% money-back guarantee", "Fast-track 48 hour publishing", "Unlimited free revisions"]

  return (
    <div className="border-t border-slate-200 pt-4 mt-4">
      {/* Benefits Reassurance */}
      <div className="space-y-2.5 mb-3">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2.5">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="h-3 w-3 text-white stroke-[3]" />
            </div>
            <span className="text-sm font-medium text-slate-700">{benefit}</span>
          </div>
        ))}
      </div>

      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-3 hover:opacity-80 transition-opacity"
        aria-expanded={isExpanded}
      >
        <span className="text-sm font-semibold text-slate-900">You&apos;ll pick premium outlets such as:</span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-slate-600" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-600" />
        )}
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? "max-h-[600px] opacity-100" : "max-h-40 opacity-100"
        }`}
      >
        <div
          className={`grid ${
            isExpanded ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2" : "grid-cols-3 gap-2"
          }`}
        >
          {displayedLogos.map((outlet) => (
            <div
              key={outlet.name}
              className="bg-white border border-slate-200 rounded-lg p-2 flex items-center justify-center hover:border-blue-300 transition-colors"
            >
              <div className="relative w-full h-12">
                <Image
                  src={outlet.logo_url || "/placeholder.svg"}
                  alt={`${outlet.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {isExpanded && (
          <div className="mt-3 text-xs text-slate-600 text-center leading-relaxed">
            After purchase, browse our full catalog and select your favorites. Every outlet is Google indexed.
          </div>
        )}
      </div>

      {!isExpanded && <p className="text-xs text-slate-500 mt-2 text-center">Click to see all 14 featured outlets</p>}
    </div>
  )
}
