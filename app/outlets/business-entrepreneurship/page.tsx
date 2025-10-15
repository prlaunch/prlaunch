"use client"

import { OutletCard } from "@/components/outlet-card"
import { Briefcase, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getOutletImage } from "@/lib/outlet-images"

interface Outlet {
  number: number
  name: string
  url: string
  category: string
  description: string
}

export default function BusinessEntrepreneurshipPage() {
  const [outlets, setOutlets] = useState<Outlet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOutlets = () => {
    setLoading(true)
    setError(null)

    fetch("/api/outlets")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
        }
        return res.json()
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error)
        }
        const filtered = data.filter((o: Outlet) => o.category === "Business & Entrepreneurship")
        setOutlets(filtered)
        setLoading(false)
      })
      .catch((err) => {
        console.error("[v0] Error loading outlets:", err)
        setError(err.message || "Failed to load outlets. Please try again.")
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchOutlets()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Business & Entrepreneurship</h1>
              <p className="text-slate-600 mt-1">
                {loading ? "Loading..." : `${outlets.length} premium outlets available`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Outlets Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-600 mt-4">Loading outlets...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Unable to Load Outlets</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={fetchOutlets}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
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
    </div>
  )
}
