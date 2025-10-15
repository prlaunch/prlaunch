"use client"

import { useState } from "react"
import { DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RevenueCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(100000)

  const researchersPercent = 25
  const dropoffRate = 40
  const lossPercentage = 15 // They lose 15% of their monthly revenue

  const calculateRevenueLost = () => {
    return Math.round(monthlyRevenue * (lossPercentage / 100))
  }

  const revenueLost = calculateRevenueLost()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <section className="py-16 md:py-24 px-4 bg-white relative overflow-hidden">
      {/* Subtle background metrics */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl font-bold text-slate-400">25%</div>
        <div className="absolute bottom-10 right-10 text-6xl font-bold text-slate-400">40%</div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            How Much Money Are You Losing Right Now?
          </h2>
          <p className="text-lg text-slate-600">Prospects leave when they can't trust you.</p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 mb-6">
          <div className="space-y-6 mb-8">
            <div>
              <label className="flex items-center justify-between text-sm font-semibold text-slate-700 mb-3">
                <span className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  Monthly Revenue
                </span>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
                  {formatCurrency(monthlyRevenue)}
                </span>
              </label>
              <div className="relative">
                <input
                  type="range"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  min="5000"
                  max="500000"
                  step="5000"
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer slider-gradient"
                  style={{
                    background: `linear-gradient(to right, #2563EB 0%, #06B6D4 ${(monthlyRevenue / 500000) * 100}%, #9333EA ${(monthlyRevenue / 500000) * 100}%, #e5e7eb ${(monthlyRevenue / 500000) * 100}%)`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="border-t-2 border-slate-100 pt-6 text-center">
            <p className="text-sm text-slate-600 font-medium mb-2">Monthly Revenue Lost</p>
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_200%]">
              {formatCurrency(revenueLost)}
            </div>
          </div>

          {/* Static metrics info */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              Based on {researchersPercent}% who research before purchase and {dropoffRate}% dropoff rate due to lack of
              credibility
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            asChild
            className="h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
          >
            <a href="/checkout">Get Featured — $47</a>
          </Button>
        </div>
      </div>

      <style jsx>{`
        .slider-gradient::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb 0%, #06b6d4 50%, #9333ea 100%);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s;
        }

        .slider-gradient::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }

        .slider-gradient::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb 0%, #06b6d4 50%, #9333ea 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s;
        }

        .slider-gradient::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  )
}
