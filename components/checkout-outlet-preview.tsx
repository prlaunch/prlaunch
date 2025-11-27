"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"
import outletsData from "@/data/outlets.json"
import { OutletModal } from "./outlet-modal"

export function CheckoutOutletPreview({
  hideButton = false,
  isExpanded,
  onToggle,
}: {
  hideButton?: boolean
  isExpanded?: boolean
  onToggle?: () => void
}) {
  const [internalExpanded, setInternalExpanded] = useState(false)
  const [selectedOutlet, setSelectedOutlet] = useState<(typeof outletsData)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const expanded = isExpanded !== undefined ? isExpanded : internalExpanded
  const handleToggle = onToggle || (() => setInternalExpanded(!internalExpanded))

  const priorityOutlets = ["USA Wire", "Bosses Mag", "SuccessXL"]
  const reorderedOutlets = [
    ...outletsData.filter((outlet) => priorityOutlets.includes(outlet.name)),
    ...outletsData.filter((outlet) => !priorityOutlets.includes(outlet.name)),
  ]

  const displayedLogos = expanded ? reorderedOutlets : reorderedOutlets.slice(0, 3)

  const handleOutletClick = (e: React.MouseEvent, outlet: (typeof outletsData)[0]) => {
    e.stopPropagation()
    setSelectedOutlet(outlet)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="border-t border-slate-200 pt-4 mt-4 cursor-pointer" onClick={handleToggle}>
        <div
          className="w-full flex items-center justify-between mb-3 p-2 -m-2 hover:bg-slate-50 rounded-lg transition-all"
          aria-expanded={expanded}
        >
          <span className="text-sm font-semibold text-slate-900">You&#39;ll pick premium outlets including:</span>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-slate-600" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-600" />
          )}
        </div>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            expanded ? "max-h-[800px] opacity-100" : "max-h-40 opacity-100"
          }`}
        >
          <div
            className={`grid ${
              expanded ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2" : "grid-cols-3 gap-2"
            }`}
          >
            {displayedLogos.map((outlet) => (
              <button
                key={outlet.name}
                onClick={(e) => handleOutletClick(e, outlet)}
                className="bg-white border border-slate-200 rounded-lg p-2 flex items-center justify-center hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="relative w-full h-12">
                  <Image
                    src={outlet.logo_url || "/placeholder.svg"}
                    alt={`${outlet.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              </button>
            ))}

            {expanded && (
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-2 flex items-center justify-center">
                <span className="text-sm font-semibold text-slate-600">& More...</span>
              </div>
            )}
          </div>

          {expanded && (
            <div className="mt-3 text-xs text-slate-600 text-center leading-relaxed">
              After purchase, browse our full catalog and select your favorites. Every outlet is Google indexed.
            </div>
          )}
        </div>

        {!expanded && <p className="text-xs text-slate-500 mt-2 text-center">Click to see all 14 featured outlets</p>}
      </div>

      {selectedOutlet && (
        <OutletModal
          outlet={{
            name: selectedOutlet.name,
            logo_url: selectedOutlet.logo_url,
            screenshot_url: selectedOutlet.screenshot_url,
            domain_authority: selectedOutlet.domain_authority,
            founded: selectedOutlet.founded,
            description: selectedOutlet.description,
            industries: selectedOutlet.industries,
            sample_headlines: selectedOutlet.sample_headlines,
          }}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          hideButton={hideButton}
        />
      )}
    </>
  )
}
