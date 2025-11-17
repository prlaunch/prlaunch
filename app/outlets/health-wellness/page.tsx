"use client"

import { OutletCard } from "@/components/outlet-card"
import { Activity, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getOutletImage } from "@/lib/outlet-images"
import { StickyOutletCTA } from "@/components/sticky-outlet-cta"
import { Footer } from "@/components/footer"

interface Outlet {
  number: number
  name: string
  url: string
  category: string
  description: string
}

export default function HealthWellnessPage() {
  const [outlets, setOutlets] = useState<Outlet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/outlets")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((o: Outlet) => o.category === "Health & Wellness")
        setOutlets(filtered)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Health & Wellness</h1>
              <p className="text-slate-600 mt-1">
                {loading ? "Loading..." : `${outlets.length} premium outlets available`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 pb-24">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-600 mt-4">Loading outlets...</p>
          </div>
        ) : outlets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600">No outlets found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {outlets.map((outlet) => (
              <OutletCard
                key={outlet.number}
                name={outlet.name}
                url={outlet.url}
                description={outlet.description}
                isAvailable={true}
                imageUrl={getOutletImage(outlet.name)}
              />
            ))}
          </div>
        )}
      </div>

      <StickyOutletCTA />

      <Footer />
    </div>
  )
}
