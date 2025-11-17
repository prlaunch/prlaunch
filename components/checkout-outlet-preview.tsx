"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp } from 'lucide-react'
import outletsData from "@/data/outlets.json"

export function CheckoutOutletPreview() {
  const [isExpanded, setIsExpanded] = useState(false)

  const displayedLogos = isExpanded ? outletsData : outletsData.slice(0, 3)

  return (
    <div className="border-t border-slate-200 pt-4 mt-4">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-3 hover:opacity-80 transition-opacity"
        aria-expanded={isExpanded}
      >
        <span className="text-sm font-semibold text-slate-900">
          You&#39;ll pick premium outlets including:
        </span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-slate-600" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-600" />
        )}
      </button>

      <div className={`transition-all duration-300 overflow-hidden ${
        isExpanded ? "max-h-[600px] opacity-100" : "max-h-40 opacity-100"
      }`}>
        <div className={`grid ${
          isExpanded 
            ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2" 
            : "grid-cols-3 gap-2"
        }`}>
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

      {!isExpanded && (
        <p className="text-xs text-slate-500 mt-2 text-center">
          Click to see all 14 featured outlets
        </p>
      )}
    </div>
  )
}
