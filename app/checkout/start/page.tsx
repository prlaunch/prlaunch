"use client"

import { useRouter } from "next/navigation"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import Image from "next/image"
import { Star, Loader2, CheckCircle2, Clock, DollarSign, Timer } from "lucide-react"
import { mainReviews } from "@/lib/reviews-data"
import { useState, useEffect } from "react"
import { useVariant, getVariantParam } from "@/lib/use-variant"

export default function CheckoutStartPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [timeLeft, setTimeLeft] = useState(7980)
  const variant = useVariant()

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft])

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const logos = [
    { src: "/images/logos/sf-tribune.png", alt: "The San Francisco Tribune" },
    { src: "/images/logos/successxl.png", alt: "Success XL" },
    { src: "/images/logos/usawire.png", alt: "USA Wire" },
    { src: "/images/logos/la-tabloid.webp", alt: "L.A. Tabloid" },
    { src: "/images/logos/bosses-mag.png", alt: "Bosses Mag" },
    { src: "/images/logos/medium.png", alt: "Medium" },
  ]

  const handleStart = () => {
    setIsLoading(true)
    router.push(`/checkout/how-it-works${getVariantParam()}`)
  }

  const scrollToPricing = () => {
    setIsLoading(true)
    router.push(`/checkout/how-it-works${getVariantParam()}`)
  }

  const handleClaimBonuses = () => {
    setIsLoading(true)
    router.push(`/checkout/step-5${getVariantParam()}`)
  }

  const verifiedTestimonials = [
    {
      name: "David K.",
      role: "Business Owner",
      image: "/testimonials/profile-3.jpg",
      quote: "Closed 2 clients at $1,500 each using this article.",
      verified: "Verified customer",
    },
    {
      name: "Priya W.",
      role: "E-commerce Owner",
      image: "/testimonials/profile-6.jpg",
      quote: "Featured on USA Wire. Closed 3 deals at $2,000 that month.",
      verified: "Verified customer",
    },
    {
      name: "Michelle L.",
      role: "Tech Entrepreneur",
      image: "/testimonials/profile-4.jpg",
      quote: "Got 2 deals, ~$50k commission.",
      verified: "Verified customer",
    },
  ]

  const faqs = [
    {
      question: "What if my niche is saturated?",
      answer:
        "We feature you in outlets YOUR audience reads. Even saturated niches benefit from credibility. The key is positioning you as an authority in your specific area.",
    },
    {
      question: "Will this help my SEO?",
      answer:
        "Yes. Published articles on high-authority sites rank in Google and create backlinks to your website. This improves your domain authority and search rankings.",
    },
    {
      question: "What if the article has no impact?",
      answer:
        "73% of customers see 2-4 leads in 30 days. If you don't see results, we offer a full refund within 60 days. We stand behind our work.",
    },
    {
      question: "Can I republish to my site?",
      answer:
        "Yes. You own the article and can republish on your website/blog. Many clients add an 'As Featured In' section to their homepage.",
    },
    {
      question: "How long do results last?",
      answer:
        "Permanently. Articles stay live indefinitely. Unlike ads that stop when you stop paying, PR articles continue building credibility forever.",
    },
    {
      question: "Can I control the article angle?",
      answer:
        "Yes. You set the angle, we write, you approve before publication. We work with you to ensure the article aligns with your brand and goals.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-lg transition-transform duration-300 ${
          showStickyCTA ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Sticky CTA content can be added here */}
      </div>

      <div className="fixed top-14 left-0 right-0 z-40 py-2 px-4 text-center text-white text-sm font-semibold bg-gradient-to-r from-black via-red-900 to-black">
        🔥 Black Friday Sale: Only $28/article · {formatTime(timeLeft)} left
      </div>

      {/* HERO SECTION */}
      <div className="flex items-start justify-center p-4 pt-8 pb-16" style={{ marginTop: "48px" }}>
        <div className="text-center max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
            <span className="text-xs">🔥</span>
            <span className="text-xs font-semibold text-slate-900">Only 12 spots left this week</span>
          </div>

          <div className="w-full max-w-3xl mx-auto relative h-48 sm:h-64 lg:h-80 mb-6">
            <div className="absolute left-2 sm:left-4 lg:left-8 top-0 w-32 h-32 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white">
              <img
                src="/images/design-mode/Screenshot%202025-10-27%20at%2015.15.07%20%281%29.jpg"
                alt="SuccessXL Article"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute right-2 sm:right-4 lg:right-8 top-1 sm:top-2 lg:top-4 w-32 h-32 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white z-10">
              <img
                src="/images/design-mode/Screenshot%202025-10-27%20at%2015.17.55%20%281%29.jpg"
                alt="USA Wire Article"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-32 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white z-20">
              <img
                src="/images/design-mode/Screenshot%202025-10-27%20at%2015.18.55%20%281%29.jpg"
                alt="Top Hustler Article"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="md:text-5xl font-bold text-black leading-tight mb-4 text-3xl">
            Get Famous on Google in 48 Hours and Close More Deals
          </h1>

          <p className="text-slate-600 text-lg mb-6">Pick from 15+ Google-ranking articles.</p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            {logos.map((logo, i) => (
              <div key={i} className="h-6 w-20 flex items-center justify-center">
                <img
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  className="h-full w-full object-contain grayscale opacity-70"
                />
              </div>
            ))}
          </div>

          <MovingBorderButton
            borderRadius="1.75rem"
            onClick={scrollToPricing}
            disabled={isLoading}
            containerClassName="h-14 w-auto"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            duration={3000}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </span>
            ) : (
              "See How It Works"
            )}
          </MovingBorderButton>

          <div className="flex flex-col items-center gap-2 text-sm text-gray-600 mt-6">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {mainReviews.slice(0, 4).map((review, i) => (
                  <div key={i} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                    <Image src={review.image || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
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

      <section className="bg-slate-50 py-11">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            You're credible. Your work is solid.
            <br />
            But when prospects Google you... nothing.
          </h2>

          <div className="mb-8 max-w-2xl mx-auto">
            <img
              src="/images/before-after/google-no-results.jpg"
              alt="Empty Google search results"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>

          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            You lose deals to competitors who <span className="font-bold text-slate-900">LOOK bigger</span>.
          </p>
          <MovingBorderButton
            borderRadius="1.75rem"
            onClick={scrollToPricing}
            disabled={isLoading}
            containerClassName="h-14 w-auto"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            duration={3000}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </span>
            ) : (
              "See How It Works"
            )}
          </MovingBorderButton>
        </div>
      </section>

      <section className="bg-slate-50 py-11">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            They all look legit online. <span className="bg-blue-100 px-2 rounded">Why not you?</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/press/bosses-mag-article.jpg"
                alt="Bosses Mag article featuring Josh Amundson"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/press/la-tabloid-article.jpg"
                alt="L.A. Tabloid article featuring Legendary Crisp"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/press/usa-wire-article.jpg"
                alt="USA Wire article featuring TJ Avazona"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/press/successxl-article.jpg"
                alt="SuccessXL article featuring Tommy S. Shields"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center">
            <MovingBorderButton
              borderRadius="1.75rem"
              onClick={scrollToPricing}
              disabled={isLoading}
              containerClassName="h-14 w-auto"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              duration={3000}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </span>
              ) : (
                "See How It Works"
              )}
            </MovingBorderButton>
          </div>
        </div>
      </section>

      <section className="bg-white my-0 py-11">
        <div className="container mx-auto px-4 max-w-5xl py-0">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Your Current Options</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Traditional PR Agency */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Traditional PR Agency</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-red-600">$3,000</p>
                    <p className="text-sm text-slate-600">Upfront retainer</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-red-600">6 months</p>
                    <p className="text-sm text-slate-600">Minimum commitment</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">❓</span>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900">Maybe 1-2 outlets</p>
                    <p className="text-sm text-slate-600">If you're lucky</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Building It Yourself */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Building It Yourself</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <Timer className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-yellow-600">2-3 years</p>
                    <p className="text-sm text-slate-600">To build real authority</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-yellow-600">5%</p>
                    <p className="text-sm text-slate-600">Success rate for organic growth</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💸</span>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900">Every lost deal</p>
                    <p className="text-sm text-slate-600">Opportunity cost adds up</p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Third Option - PR Launch */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">PR Launch</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900">Published in 4-7 major outlets</p>
                    <p className="text-sm text-slate-600">48 hours, not 6 months</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900">$47 per article, not $1,000</p>
                    <p className="text-sm text-slate-600">Same outlets PR agencies use</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900">Own Google's pages</p>
                    <p className="text-sm text-slate-600">When prospects search your name</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-0">Ready to see how it works?</p>
        </div>
      </section>

      <section className="bg-white my-0 py-11">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Primary CTA */}
            <div className="flex flex-col items-center">
              <MovingBorderButton
                borderRadius="1.75rem"
                onClick={scrollToPricing}
                disabled={isLoading}
                containerClassName="h-16 w-auto"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                duration={3000}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "See How It Works →"
                )}
              </MovingBorderButton>
              <span className="text-sm text-slate-500 mt-2">2-minute explainer</span>
            </div>

            {/* Secondary CTA */}
            <div className="flex flex-col items-center">
              <button
                onClick={handleClaimBonuses}
                disabled={isLoading}
                className="h-16 px-10 rounded-full border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:border-slate-400 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "Skip to Pricing →"
                )}
              </button>
              <span className="text-sm text-slate-500 mt-2">Already convinced?</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
