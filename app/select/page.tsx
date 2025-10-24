"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Check, Star, ArrowRight, ShoppingCart, X, Gift } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { outletsData, type Outlet } from "@/lib/outlets-data"
import { getOutletImage } from "@/lib/outlet-images"
import { mainReviews } from "@/lib/reviews-data"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"

const CATEGORIES = ["All", "Business", "Tech", "Lifestyle", "Wellness/Health", "Finance"]

// Map category names to outlet data categories
const CATEGORY_MAP: Record<string, string> = {
  All: "",
  Business: "Business & Entrepreneurship",
  Tech: "Technology & Digital Marketing",
  Lifestyle: "Lifestyle & Culture",
  "Wellness/Health": "Health & Wellness",
  Finance: "Finance & Economics",
}

export default function SelectPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedOutlets, setSelectedOutlets] = useState<Outlet[]>([])
  const [filteredOutlets, setFilteredOutlets] = useState<Outlet[]>(outletsData)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const outletGridRef = useRef<HTMLDivElement>(null)

  // Filter outlets when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredOutlets(outletsData)
    } else {
      const categoryName = CATEGORY_MAP[selectedCategory]
      setFilteredOutlets(outletsData.filter((outlet) => outlet.category === categoryName))
    }
  }, [selectedCategory])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    // Scroll to the outlet grid section
    setTimeout(() => {
      const element = document.getElementById("outlet-selector")
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  const scrollToOutlets = () => {
    const element = document.getElementById("outlet-selector")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleAddToCart = (outlet: Outlet) => {
    if (selectedOutlets.find((o) => o.number === outlet.number)) {
      // Remove from cart
      setSelectedOutlets(selectedOutlets.filter((o) => o.number !== outlet.number))
    } else {
      // Add to cart
      setSelectedOutlets([...selectedOutlets, outlet])
    }
  }

  const isInCart = (outlet: Outlet) => {
    return selectedOutlets.some((o) => o.number === outlet.number)
  }

  const calculateTotal = () => {
    const count = selectedOutlets.length
    // Every 4th outlet is free (buy 3 get 1 free)
    const paidOutlets = count - Math.floor(count / 4)
    return paidOutlets * 47
  }

  const getFreeOutletsCount = () => {
    return Math.floor(selectedOutlets.length / 4)
  }

  const getProgressToNextFree = () => {
    const remainder = selectedOutlets.length % 4
    if (remainder === 0 && selectedOutlets.length > 0) {
      // Bonus unlocked, waiting for user to add the free article
      return 0
    }
    return 3 - remainder
  }

  const getCurrentBonusTier = () => {
    return Math.floor(selectedOutlets.length / 4)
  }

  const isFreeOutlet = (index: number) => {
    return (index + 1) % 4 === 0
  }

  const handleCheckout = () => {
    // Create detailed outlet data with free status
    const outletsWithStatus = selectedOutlets.map((outlet, index) => ({
      ...outlet,
      isFree: isFreeOutlet(index),
    }))

    // Encode outlet data as JSON
    const outletsData = encodeURIComponent(JSON.stringify(outletsWithStatus))
    const total = calculateTotal()
    const freeCount = getFreeOutletsCount()

    router.push(`/payment?outletsData=${outletsData}&total=${total}&freeCount=${freeCount}`)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-background pt-12 md:pt-16 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <Link
                href="/"
                className="inline-block mb-8 text-2xl md:text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity"
              >
                <span className="text-blue-500">pr</span>
                <span className="text-foreground">launch.io</span>
              </Link>

              {/* Rating banner */}
              <div className="mb-8 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < 4
                            ? "fill-[#00B67A] text-[#00B67A]"
                            : i === 4
                              ? "fill-[#00B67A] text-[#00B67A] opacity-80"
                              : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="h-3 w-px bg-border" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-foreground">4.8/5</span>
                    <span className="text-xs text-muted-foreground">from 231+ reviews</span>
                  </div>
                </div>
              </div>

              <h1 className="mb-6 text-balance font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl text-4xl">
                Select Your PR Article – Only $47
              </h1>

              <p className="mb-8 text-pretty text-base text-muted-foreground md:text-lg lg:text-xl">
                Get published in premium USA outlets in 48 hours. Choose your outlets below.
              </p>

              {/* CTA button */}
              <div className="mb-10">
                <Button
                  size="lg"
                  onClick={scrollToOutlets}
                  className="h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
                >
                  Browse Outlets ↓
                </Button>
              </div>

              {/* Badges */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg bg-success/10 px-2.5 py-1.5">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-success">
                      <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-xs font-medium text-foreground">48-Hour Guarantee</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-success/10 px-2.5 py-1.5">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-success">
                      <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-xs font-medium text-foreground">500+ Articles Published</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-success/10 px-2.5 py-1.5">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-success">
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-xs font-medium text-foreground">Money-Back Promise</span>
                </div>

                {/* Trust badge */}
                <div className="flex flex-col items-center gap-2 text-sm text-gray-600 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {mainReviews.slice(0, 4).map((review, i) => (
                        <div key={i} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                          <Image
                            src={review.image || "/placeholder.svg"}
                            alt={review.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <span className="font-medium text-slate-700">Trusted by 4,847+ entrepreneurs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER BAR */}
      <section
        id="outlet-selector"
        ref={outletGridRef}
        className="bg-slate-50 py-6 sticky top-0 z-40 border-b border-slate-200"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* OUTLET GRID */}
      <section className="py-12 md:py-16 pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredOutlets.map((outlet, index) => {
              const imageUrl = getOutletImage(outlet.name)
              const inCart = isInCart(outlet)

              return (
                <div
                  key={outlet.number}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Outlet Image */}
                  <Link href={outlet.url} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative w-full aspect-[4/3] bg-slate-100">
                      {imageUrl ? (
                        <Image src={imageUrl || "/placeholder.svg"} alt={outlet.name} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-slate-400 text-sm">No image</span>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Outlet Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <Link href={outlet.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                      <h3 className="font-semibold text-slate-900 text-sm md:text-base mb-1">{outlet.name}</h3>
                    </Link>
                    <p className="text-xs text-slate-500 mb-3">{outlet.category}</p>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={() => handleAddToCart(outlet)}
                      className={`w-full mt-auto rounded-full text-sm font-medium transition-all duration-200 ${
                        inCart
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Added
                        </>
                      ) : (
                        <>Add to Cart ($47)</>
                      )}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-8">What's Included</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "✓ Full professional PR article",
                "✓ Guaranteed publication in 48 hours",
                "✓ Review before publishing",
                "✓ Permanent backlink + 'As Seen In' assets",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4 border border-slate-200">
                  <span className="text-lg text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {mainReviews.slice(0, 6).map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image src={review.image || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{review.name}</p>
                    <p className="text-sm text-slate-500">{review.title}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-12 md:py-16 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              100% MONEY-BACK GUARANTEE
            </h2>
            <p className="text-pretty text-base leading-relaxed text-blue-200 md:text-lg">
              If your article isn't published within 48 hours of draft approval, you'll receive a full refund.
            </p>
          </div>
        </div>
      </section>

      {selectedOutlets.length > 0 && (
        <>
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 shadow-2xl z-50">
            <div className="container mx-auto px-4 md:px-6 py-4">
              <div className="flex flex-col gap-3 max-w-6xl mx-auto">
                {/* Progress Bar - Now visible on all screen sizes */}
                <div className="flex flex-col gap-1.5">
                  {selectedOutlets.length % 4 === 0 && selectedOutlets.length > 0 ? (
                    // Bonus unlocked - next article they add will be free
                    <>
                      <div className="h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-sm animate-pulse" />
                      <p className="text-xs text-green-600 font-bold text-center">
                        🎉 Bonus unlocked! Next article you add is FREE!
                      </p>
                    </>
                  ) : selectedOutlets.length % 4 === 1 && selectedOutlets.length > 1 ? (
                    // Just added the free article, now working toward next bonus
                    <>
                      <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-500 shadow-sm"
                          style={{ width: "0%" }}
                        />
                      </div>
                      <span className="text-xs text-slate-700 font-medium text-center">
                        Add 3 more for free article #{getCurrentBonusTier() + 1}! 🎁
                      </span>
                    </>
                  ) : (
                    // Working toward next bonus
                    <>
                      <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-500 shadow-sm"
                          style={{ width: `${((selectedOutlets.length % 4) / 3) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-700 font-medium text-center">
                        {getCurrentBonusTier() === 0
                          ? `Add ${getProgressToNextFree()} more for your 1st free article! 🎉`
                          : `Add ${getProgressToNextFree()} more for free article #${getCurrentBonusTier() + 1}! 🎁`}
                      </span>
                    </>
                  )}
                </div>

                {/* Cart and Checkout Row */}
                <div className="flex items-center justify-between gap-3">
                  {/* Left: Cart button with count */}
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  >
                    <div className="relative">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                        <ShoppingCart className="w-5 h-5" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                        {selectedOutlets.length}
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-bold text-slate-900">${calculateTotal()}</p>
                      {getFreeOutletsCount() > 0 && (
                        <p className="text-xs text-green-600 font-semibold">🎁 +{getFreeOutletsCount()} free!</p>
                      )}
                    </div>
                  </button>

                  {/* Right: Checkout button */}
                  <Button
                    onClick={handleCheckout}
                    size="lg"
                    className="h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 md:px-8 text-base font-semibold shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">Your Cart ({selectedOutlets.length})</SheetTitle>
                <SheetDescription>Review your selected outlets. Every 4th article is FREE! 🎁</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                {selectedOutlets.map((outlet, index) => {
                  const imageUrl = getOutletImage(outlet.name)
                  const isFree = isFreeOutlet(index)

                  return (
                    <div
                      key={outlet.number}
                      className={`flex items-center gap-4 rounded-lg p-4 border-2 transition-all ${
                        isFree
                          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-md"
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      {/* Outlet Image */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                        {imageUrl ? (
                          <Image src={imageUrl || "/placeholder.svg"} alt={outlet.name} fill className="object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-slate-400 text-xs">No image</span>
                          </div>
                        )}
                        {isFree && (
                          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                            <Gift className="w-8 h-8 text-green-600" />
                          </div>
                        )}
                      </div>

                      {/* Outlet Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900 text-base">{outlet.name}</h3>
                          {isFree && (
                            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                              FREE
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500">{outlet.category}</p>
                        <p
                          className={`text-sm font-bold mt-1 ${isFree ? "text-green-600 line-through" : "text-blue-600"}`}
                        >
                          {isFree ? "$0 (was $47)" : "$47"}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleAddToCart(outlet)}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                        aria-label="Remove from cart"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Cart Summary */}
              <div className="mt-6 p-4 bg-slate-100 rounded-lg border border-slate-200">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal ({selectedOutlets.length} articles)</span>
                    <span className="font-semibold text-slate-900">${selectedOutlets.length * 47}</span>
                  </div>
                  {getFreeOutletsCount() > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 font-medium">🎁 Free articles ({getFreeOutletsCount()})</span>
                      <span className="font-semibold text-green-600">-${getFreeOutletsCount() * 47}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-300 flex justify-between">
                    <span className="text-lg font-bold text-slate-900">Total</span>
                    <span className="text-lg font-bold text-blue-600">${calculateTotal()}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="w-full mt-4 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-base font-semibold shadow-lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </main>
  )
}
