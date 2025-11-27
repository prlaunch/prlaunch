"use client"

import { Check } from "lucide-react"
import { useVariant } from "@/lib/use-variant"

export function WhatsIncludedSection() {
  const variant = useVariant()
  const packageLink = variant === "b" ? "https://pay.prlaunch.io/checkout-new" : "/payment?package=authority"

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-6 shadow-sm">
      <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-1 text-center">WHAT YOU GET</h2>
      <p className="text-xs md:text-sm text-slate-600 mb-4 text-center">Per Article</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-1.5">
          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span className="text-sm md:text-base text-slate-700 flex-1">Professional writing</span>
          <span className="text-sm md:text-base text-slate-600 font-semibold">$50</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span className="text-sm md:text-base text-slate-700 flex-1">Unlimited revisions</span>
          <span className="text-sm md:text-base text-slate-600 font-semibold">$75</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span className="text-sm md:text-base text-slate-700 flex-1">Publishing on major outlets</span>
          <span className="text-sm md:text-base text-slate-600 font-semibold">$150</span>
        </div>
      </div>

      <div className="border-t border-slate-200 my-4"></div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm md:text-base text-slate-700 font-medium">Regular Price:</span>
        <span className="text-base md:text-lg text-slate-600 font-bold line-through">$275/article</span>
      </div>

      <a
        href={packageLink}
        className="block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg p-3 md:p-4 mb-3 transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm md:text-base text-white font-bold">YOUR PRICE:</span>
          <span className="text-2xl md:text-3xl text-white font-black group-hover:scale-105 transition-transform">
            $28/article
          </span>
        </div>
        
      </a>

      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
        <p className="text-base md:text-lg font-bold text-green-700 mb-0.5">💰 SAVE $247 PER ARTICLE</p>
      </div>
    </div>
  )
}
