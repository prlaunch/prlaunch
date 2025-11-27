"use client"

import { useState } from "react"
import Image from "next/image"
import { OutletModal } from "./outlet-modal"
import outletsData from "@/data/outlets.json"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import { useVariant } from "@/lib/use-variant"

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

export function OutletShowcase() {
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const variant = useVariant()

  const handleOutletClick = (outlet: Outlet) => {
    setSelectedOutlet(outlet)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedOutlet(null), 300)
  }

  const scrollToPackages = () => {
    const targetText = document.querySelector("[data-package-section]")
    if (targetText) {
      targetText.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="px-4 bg-white py-2.5" id="outlets-section">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            You'll Choose Your Premium Outlets
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            After purchase, browse our full catalog and select your favorites. Click any outlet to preview details.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {outletsData.map((outlet) => (
            <div
              key={outlet.name}
              onClick={() => handleOutletClick(outlet as Outlet)}
              className="group bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col cursor-pointer"
            >
              <div className="relative w-full aspect-[3/2] bg-white flex-shrink-0 overflow-hidden">
                <Image
                  src={outlet.logo_url || "/placeholder.svg"}
                  alt={`${outlet.name} logo`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              <div className="p-3 md:p-4 flex-1 flex flex-col justify-between bg-slate-50/50">
                <div>
                  <p className="text-xs md:text-sm font-semibold text-slate-900 truncate mb-1">{outlet.name}</p>
                  <p className="text-[10px] md:text-xs text-slate-500 truncate">DA {outlet.domain_authority}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOutletClick(outlet as Outlet)
                  }}
                  className="mt-2 text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                  aria-label={`View details for ${outlet.name}`}
                >
                  See details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <MovingBorderButton
            borderRadius="1.75rem"
            onClick={scrollToPackages}
            containerClassName="h-14 w-auto"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
            duration={3000}
          >
            Get 7 Articles Now  
          </MovingBorderButton>
        </div>
      </div>

      {/* Modal */}
      {selectedOutlet && (
        <OutletModal outlet={selectedOutlet} isOpen={isModalOpen} onClose={handleCloseModal} variant={variant} />
      )}
    </section>
  )
}
