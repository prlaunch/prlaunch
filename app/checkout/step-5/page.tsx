"use client"
import { Check, Loader2, Gift, Star, ArrowUp } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { mainReviews } from "@/lib/reviews-data"
import { ScrollingLogos } from "@/components/scrolling-logos"
import { GuaranteeSection } from "@/components/guarantee-section"
import { ExitIntentModal, useExitIntent } from "@/components/exit-intent-modal"
import { Button } from "@/components/ui/button"
import { WhatsIncludedSection } from "@/components/whats-included-section"
import { WhatYouGetSection } from "@/components/what-you-get-section"
import { PricingFAQSection } from "@/components/pricing-faq-section"
import { OutletShowcase } from "@/components/outlet-showcase"

type Package = "starter" | "growth" | "authority"

const packages = [
  {
    id: "starter" as Package,
    name: "Starter",
    articles: 1,
    bonus: 0,
    price: 67,
    originalPrice: 134,
    savings: 67,
    description: "Perfect for: Testing PR",
    features: ["You'll pick your outlets from 15+ premium sites"],
    borderColor: "border-slate-300",
    soldCount: 8,
  },
  {
    id: "growth" as Package,
    name: "Growth",
    articles: 3,
    bonus: 1,
    price: 127,
    originalPrice: 376,
    savings: 249,
    description: "Perfect for: Building credibility",
    features: ["You'll pick your outlets from 15+ premium sites"],
    popular: true,
    borderColor: "border-blue-400",
    rewardEligible: true,
    soldCount: 17,
  },
  {
    id: "authority" as Package,
    name: "Authority",
    articles: 5,
    bonus: 2,
    price: 197,
    originalPrice: 658,
    savings: 461,
    description: "Perfect for: Maximum exposure",
    features: ["You'll pick your outlets from 15+ premium sites"],
    borderColor: "border-yellow-400",
    rewardEligible: true,
    soldCount: 31,
  },
]

const categories = [
  { id: "business", title: "Business & Entrepreneurship" },
  { id: "finance", title: "Finance & Economics" },
  { id: "lifestyle", title: "Lifestyle & Culture" },
  { id: "tech", title: "Technology & Digital Marketing" },
  { id: "health", title: "Health & Wellness" },
]

const goals = [
  { id: "trust", title: "Build Trust & Credibility" },
  { id: "sales", title: "Increase Sales & Revenue" },
  { id: "seo", title: "Boost Google Rankings" },
  { id: "reviews", title: "Overcome Bad Reviews" },
]

const videoTestimonials = [
  {
    videoId: "1146466317",
    name: "Jahan",
    role: "Founder",
    company: "Derby Digital",
  },
  {
    videoId: "1146466337",
    name: "Michael",
    role: "Founder",
    company: "MTS Management Group",
  },
]

export default function Step5Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const goal = searchParams.get("goal")
  const category = searchParams.get("category")
  const hasReward = searchParams.get("reward") === "free_article"
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showScrollArrow, setShowScrollArrow] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)
  const [hasClickedPackage, setHasClickedPackage] = useState(false)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const packagesRef = useRef<HTMLDivElement>(null)
  const whatsIncludedRef = useRef<HTMLDivElement>(null)

  useExitIntent(() => {
    const hasShownModal = sessionStorage.getItem("exitModalShown")
    if (!hasShownModal && !hasClickedPackage) {
      setShowExitModal(true)
      sessionStorage.setItem("exitModalShown", "true")
    }
  }, !hasClickedPackage)

  useEffect(() => {
    const timerStart = localStorage.getItem("blackFridayTimerStart")
    if (timerStart) {
      const elapsed = Math.floor((Date.now() - Number.parseInt(timerStart)) / 1000)
      const totalSeconds = 2 * 3600 + 13 * 60 // 2 hours 13 minutes
      const remaining = Math.max(0, totalSeconds - elapsed)
      setTimeLeft(remaining)
    } else {
      // First time, set the start time
      const newStartTime = Date.now()
      localStorage.setItem("blackFridayTimerStart", newStartTime.toString())
      setTimeLeft(2 * 3600 + 13 * 60) // 2 hours 13 minutes in seconds
    }
  }, [])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft])

  useEffect(() => {
    if (timeLeft === 0) {
      const newStartTime = Date.now()
      localStorage.setItem("blackFridayTimerStart", newStartTime.toString())
      setTimeLeft(2 * 3600 + 13 * 60)
    }
  }, [timeLeft])

  useEffect(() => {
    const handleScroll = () => {
      const outletsSection = document.getElementById("outlets-section")
      if (outletsSection) {
        const rect = outletsSection.getBoundingClientRect()
        setShowScrollArrow(rect.top <= window.innerHeight)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handlePackageSelect = (pkg: Package) => {
    setHasClickedPackage(true)
    setSelectedPackage(pkg)
    setIsLoading(true)
    setTimeout(() => {
      router.push(`/payment?package=${pkg}`)
    }, 500)
  }

  const scrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const displayReviews = mainReviews.slice(0, 10)

  return (
    <div className="min-h-screen bg-white">
      {showExitModal && (
        <ExitIntentModal
          onClose={() => setShowExitModal(false)}
          onClaim={() => {
            setShowExitModal(false)
            packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
          }}
        />
      )}

      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
          style={{ width: "100%" }}
        />
      </div>

      <div className="fixed top-14 left-0 right-0 z-40 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 py-2 px-4 text-center text-white text-sm font-semibold">
        🔥 END OF YEAR SALE ENDS IN {formatTime(timeLeft)}
      </div>

      <div className="container mx-auto px-4 max-w-2xl py-2.5" style={{ marginTop: "48px" }}>
        <div className="space-y-6">
          {hasReward && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 mb-6 animate-in slide-in-from-top duration-500">
              <div className="flex items-start gap-3">
                <Gift className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-green-900 mb-1">🎉 Your Free Article is Ready!</h3>
                  <p className="text-sm text-green-800">
                    Select a package of 4 or 7 articles below to claim your free bonus article (worth $94)
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center mb-6">
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

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow mb-6">
            <div className="flex items-start gap-3 mb-3">
              <img
                src="/images/design-mode/73x73.png"
                alt="Marcus T."
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-slate-900 text-sm">Marcus T.</h4>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#00B67A] text-[#00B67A]" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600">Startup Founder</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              "They didn't just meet expectations, they crushed them. Article quality was top-tier and results spoke for
              themselves."
            </p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>2 weeks ago</span>
              <span className="flex items-center gap-1 text-green-600 font-medium">
                <Check className="w-3 h-3" />
                Verified
              </span>
            </div>
          </div>

          <div className="mb-8">
            <WhatsIncludedSection />
          </div>

          <div data-package-section className="text-center mb-6">
            <p className="text-sm text-slate-600 font-bold">Select more and pay less per each article.</p>
          </div>

          <div ref={packagesRef} className="space-y-6">
            {packages.map((pkg) => {
              const totalArticles = pkg.articles + pkg.bonus
              const pricePerArticle = pkg.price / totalArticles

              return (
                <button
                  key={pkg.id}
                  onClick={() => handlePackageSelect(pkg.id)}
                  disabled={isLoading}
                  className={`w-full rounded-2xl border-2 ${pkg.borderColor} bg-white hover:scale-[1.01] hover:shadow-xl transition-all duration-200 text-left relative disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer ${
                    selectedPackage === pkg.id ? "ring-2 ring-offset-2 ring-blue-500" : ""
                  } ${hasReward && pkg.rewardEligible ? "shadow-[0_0_0_6px_rgba(34,197,94,0.1)] shadow-lg" : "shadow-lg"} overflow-visible`}
                >
                  {pkg.bonus > 0 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xl flex items-center gap-1 z-20">
                      🎁 +{pkg.bonus} FREE
                    </div>
                  )}

                  {hasReward && pkg.rewardEligible && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xl z-20">
                      🎁 FREE ARTICLE
                    </div>
                  )}

                  <div className="p-3.5">
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">
                          {totalArticles} Article{totalArticles > 1 ? "s" : ""}
                          {pkg.bonus > 0 && (
                            <span className="text-slate-700 font-normal text-sm">
                              {" "}
                              ({pkg.articles} + {pkg.bonus} Free Bonus)
                            </span>
                          )}
                        </h3>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-5xl font-black text-slate-800 leading-none tracking-tight drop-shadow-sm">
                            ${pkg.price}
                          </span>
                          {isLoading && selectedPackage === pkg.id ? (
                            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                          ) : selectedPackage === pkg.id ? (
                            <Check className="h-5 w-5 text-blue-600" />
                          ) : null}
                        </div>
                        <span className="text-sm text-slate-400 line-through leading-none font-semibold mt-1">
                          ${pkg.originalPrice}
                        </span>
                      </div>
                    </div>

                    <div className="mb-3 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                        <span className="text-sm">🔥</span>
                        <span>{pkg.soldCount} sold in the last 24 hours</span>
                      </div>

                      <div
                        className={`flex items-center justify-between bg-white border-2 rounded-lg px-3 py-1.5 ${
                          pkg.id === "growth"
                            ? "border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                            : pkg.id === "authority"
                              ? "border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                              : "border-slate-300 shadow-sm"
                        }`}
                      >
                        <span className="text-base font-bold text-slate-700 tracking-tight">
                          ${pricePerArticle.toFixed(2)}/article
                        </span>
                        <span className="text-sm font-semibold text-slate-600 tracking-tight">Claim now</span>
                      </div>

                      <div className="space-y-1.5">
                        {pkg.features.map((feature, i) => (
                          <p key={i} className="text-[11px] text-slate-700 flex items-start gap-1.5 leading-tight">
                            <span className="text-green-600 text-xs flex-shrink-0">✓</span>
                            <span>{feature}</span>
                          </p>
                        ))}
                        <div className="flex items-center gap-1.5 flex-wrap mt-2 pl-5">
                          {[
                            { src: "/images/logos/successxl.png", alt: "Success XL" },
                            { src: "/images/logos/usawire.png", alt: "USA Wire" },
                            { src: "/images/logos/medium.png", alt: "Medium" },
                            { src: "/images/logos/la-tabloid.webp", alt: "LA Tabloid" },
                            { src: "/images/logos/sf-tribune.png", alt: "SF Tribune" },
                            { src: "/images/logos/bosses-mag.png", alt: "Bosses Mag" },
                          ].map((logo, idx) => (
                            <img
                              key={idx}
                              src={logo.src || "/placeholder.svg"}
                              alt={logo.alt}
                              className="h-4 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePackageSelect(pkg.id)
                      }}
                      disabled={isLoading}
                      className="w-full h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-sm"
                    >
                      {pkg.id === "starter" && "Get 1 Article →"}
                      {pkg.id === "growth" && "Get 4 Articles →"}
                      {pkg.id === "authority" && "Get 7 Articles →"}
                    </Button>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-8 mb-8">
            <div className="grid grid-cols-2 gap-3">
              {videoTestimonials.map((video, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="relative aspect-[9/16] bg-slate-100">
                    <iframe
                      src={`https://player.vimeo.com/video/${video.videoId}?badge=0&autopause=0&player_id=0&app_id=58479&dnt=1`}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      allowFullScreen
                      loading="eager"
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="absolute inset-0 w-full h-full"
                      title={`Video testimonial ${index + 1}`}
                      style={{ border: 0 }}
                    />
                  </div>
                  <div className="p-2 bg-white">
                    <h4 className="text-xs font-bold text-slate-900">{video.name}</h4>
                    <p className="text-[10px] text-slate-600">{video.role}</p>
                    <p className="text-[10px] text-slate-500">{video.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <OutletShowcase />
          </div>

          <div ref={whatsIncludedRef} className="mt-12 space-y-8">
            <WhatYouGetSection />
          </div>

          <div ref={reviewsRef} className="pt-8 border-t border-slate-200 mt-12">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">What Our Customers Say</h3>
            <div className="space-y-4">
              {displayReviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={review.image || "/placeholder.svg"}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900 text-sm">{review.name}</h4>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#00B67A] text-[#00B67A]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600">{review.title}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-3">{review.review}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{review.date}</span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <Check className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <PricingFAQSection />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <ScrollingLogos />
      </div>

      <GuaranteeSection />

      {showScrollArrow && (
        <button
          onClick={scrollToPackages}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 animate-in fade-in slide-in-from-bottom-4"
          aria-label="Scroll to packages"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
