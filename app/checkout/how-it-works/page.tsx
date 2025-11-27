"use client"

import { useRouter } from 'next/navigation'
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import { CheckCircle2, Loader2, TrendingUp, Users, Award, Newspaper, BadgeCheck, Crown, Globe, Key, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ScrollingLogos } from "@/components/scrolling-logos"
import { PricingExplainerSection } from "@/components/pricing-explainer-section"
import { GuaranteeSection } from "@/components/guarantee-section"
import { useVariant, getVariantParam } from "@/lib/use-variant"

export default function HowItWorksPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const variant = useVariant()

  useEffect(() => {
    console.log("[v0] Current variant:", variant)
  }, [variant])

  const handleContinue = () => {
    setIsLoading(true)
    router.push(`/checkout/step-5${getVariantParam()}`)
  }

  const articles = [
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-18%2001.54.01-wTHFPjZIg1WkKOGI4wkB1p44kE75tS.jpeg",
      outlet: "USA Wire",
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9027%20%281%29%281%29-FlIZUm81yUn6F58xxGAORvMWPMJXrz.jpg",
      outlet: "New York Tech",
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9032%20%281%29%281%29-OyadhHGUz7w9UwzeCUxUEHbNsIi1gh.jpg",
      outlet: "Bosses Mag",
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-18%2001.53.49-qgSl2doDDEQV6jGrQC4zU29cMZQ0W2.jpeg",
      outlet: "Rolling Hype",
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9028%20%281%29%281%29-UZZ2N3wUSNMZ36PXqimYdSONJtFiPB.jpg",
      outlet: "SF Tribune",
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-18%2001.53.59-hruHenKSPmJGFI0MU27Z6bdofAo811.jpeg",
      outlet: "Bosses Mag",
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-18%2001.53.58-ApbgOZddkr31vGsgnwGOye2wIZSnpb.jpeg",
      outlet: "LA Tabloid",
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9031%20%281%29%281%29-B3E7oIGHmSTkDTfiqhDrsxZ4U8Ifk9.jpg",
      outlet: "Success XL",
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-18%2001.54.18-Od1CX39qIbrprwPwSRGyYpf90uGCMl.jpeg",
      outlet: "Success XL",
    },
    {
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-18%2001.54.19-lfedMm5vxCYOQlNDFBZm1EXLCrBMCI.jpeg",
      outlet: "SF Tribune",
    },
  ]

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollWidth = container.scrollWidth / articles.length
      container.scrollTo({
        left: scrollWidth * currentSlide,
        behavior: "smooth",
      })
    }
  }, [currentSlide, articles.length])

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length)
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % articles.length)
  }

  const testimonials = [
    {
      name: "David K.",
      role: "Coach",
      image: "/testimonials/profile-3.jpg",
      quote:
        "I was losing clients to competitors with bigger online presence. After getting published, I closed 2 clients at $1,500 each.",
      verified: true,
    },
    {
      name: "Michelle L.",
      role: "Lawyer",
      image: "/testimonials/profile-4.jpg",
      quote:
        "Prospects Google me before hiring—I needed credibility. Got 2 deals, ~$50k commission after my articles went live.",
      verified: true,
    },
    {
      name: "Priya W.",
      role: "Business Owner",
      image: "/testimonials/profile-6.jpg",
      quote:
        "I needed to look as established as my competitors. Featured on USA Wire. Closed 3 deals at $2,000 that month.",
      verified: true,
    },
  ]

  const accessSteps = [
    {
      timeline: "WEEK 1",
      icon: Newspaper,
      headline: "Website & Email Credibility",
      copy: 'Add "As Seen In" badges to your website and email signature',
      gradient: "from-blue-50 to-blue-100",
    },
    {
      timeline: "MONTH 1",
      icon: BadgeCheck,
      headline: "Verified on All Platforms",
      copy: "Your press qualifies you for verified badges on all major platforms",
      gradient: "from-purple-50 to-purple-100",
    },
    {
      timeline: "MONTH 2",
      icon: Crown,
      headline: "Submit to Forbes & Inc.",
      copy: "Use our articles as credentials to apply for contributor status",
      gradient: "from-amber-50 to-amber-100",
    },
    {
      timeline: "MONTH 3",
      icon: Globe,
      headline: "Google Knowledge Panel",
      copy: "Fast-track your application with multiple published articles",
      gradient: "from-green-50 to-green-100",
    },
    {
      timeline: "ONGOING",
      icon: Key,
      headline: "VIP Treatment Everywhere",
      copy: "Hotels upgrade you. Clients stop negotiating. Doors open automatically.",
      gradient: "from-rose-50 to-rose-100",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-slate-50 py-11">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-4 py-2">
            <span className="text-sm font-semibold text-blue-900">Your Unfair Advantage</span>
          </div>
          <h1 className="md:text-5xl font-bold text-slate-900 mb-6 leading-tight text-3xl">
            {"We write your article about anything..."}
          </h1>

          <div className="max-w-3xl mx-auto space-y-3 mb-8 text-center">
            <div className="flex items-center gap-3 justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <p className="text-xl text-slate-700 text-left">You control how your story looks </p>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <p className="text-slate-700 text-left text-xl">Unlimited revisions until you love it</p>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              <p className="text-xl text-slate-700 text-left">You get to pick from 15+ US outlets</p>
            </div>
          </div>

          <div className="text-center">
            <MovingBorderButton
              borderRadius="1.75rem"
              onClick={handleContinue}
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
                "See Packages & Pricing →"
              )}
            </MovingBorderButton>
          </div>
        </div>
      </div>

      <section className="bg-white py-11">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {"You are not paying for PR. You are buying access."}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Your articles unlock doors that stay closed to everyone else.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {accessSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${step.gradient} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Icon className="w-6 h-6 text-slate-700" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="inline-block bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-700 mb-2 shadow-sm">
                        {step.timeline}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{step.headline}</h3>
                      <p className="text-slate-700 leading-relaxed">{step.copy}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mb-8">
            <p className="font-bold text-slate-900 mb-1 text-xl">The articles are a one-time fee.</p>
            <p className="text-2xl font-bold text-blue-600">The access compounds forever.</p>
          </div>

          <div className="text-center">
            <MovingBorderButton
              borderRadius="1.75rem"
              onClick={handleContinue}
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
                "See Packages & Pricing →"
              )}
            </MovingBorderButton>
          </div>
        </div>
      </section>

      {/* iPhone Mockup Carousel Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="md:text-4xl font-bold text-slate-900 mb-4 text-2xl">{"You Decide What Your Articles Look Like and the Options are Limitless..."}</h2>
            
          </div>

          {/* Mobile: Single iPhone with Horizontal Scroll */}
          <div className="md:hidden relative">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {articles.map((article, index) => (
                <div key={index} className="flex-shrink-0 w-[280px] snap-center">
                  <div className="relative mx-auto" style={{ width: "280px", height: "570px" }}>
                    {/* iPhone 17 Frame */}
                    <div className="absolute inset-0 bg-slate-900 rounded-[3.5rem] p-3">
                      {/* Dynamic Island */}
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-9 bg-black rounded-full z-10" />

                      {/* Screen */}
                      <div className="relative w-full h-full bg-white rounded-[2.8rem] overflow-hidden">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={`Article on ${article.outlet}`}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {articles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? "bg-blue-600 w-8" : "bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: 3 iPhones with Closer Arrows */}
          <div className="hidden md:block relative max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              {/* Left Arrow - Moved closer */}
              <button
                onClick={handlePrevSlide}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:scale-110 border border-slate-200"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-slate-700" />
              </button>

              {/* 3 iPhones */}
              <div className="flex gap-6 items-center justify-center">
                {[0, 1, 2].map((offset) => {
                  const index = (currentSlide + offset) % articles.length
                  const article = articles[index]
                  return (
                    <div key={offset} className="flex-shrink-0">
                      <div className="relative" style={{ width: "240px", height: "490px" }}>
                        {/* iPhone 17 Frame */}
                        <div className="absolute inset-0 bg-slate-900 rounded-[3rem] p-2.5">
                          {/* Dynamic Island */}
                          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-full z-10" />

                          {/* Screen */}
                          <div className="relative w-full h-full bg-white rounded-[2.4rem] overflow-hidden">
                            <Image
                              src={article.image || "/placeholder.svg"}
                              alt={`Article on ${article.outlet}`}
                              fill
                              className="object-cover object-top"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Right Arrow - Moved closer */}
              <button
                onClick={handleNextSlide}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:scale-110 border border-slate-200"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-slate-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Explainer Section */}
      <PricingExplainerSection ctaText="See Packages & Pricing →" />

      {/* Why This Works Section */}
      <section className="bg-white py-11">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Why This Works</h2>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-4 text-center">You get published on major U.S. outlets</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <p className="text-lg">{"They have Domain Authority 50+ & Google ranks them high"}</p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <p className="text-lg">Prospects see you as credible, established, legitimate</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-center text-slate-600 mb-6 text-lg font-medium">
              Get featured on trusted outlets including:
            </p>
            <ScrollingLogos />
          </div>

          <div className="text-center mt-12">
            <MovingBorderButton
              borderRadius="1.75rem"
              onClick={handleContinue}
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
                "See Packages & Pricing →"
              )}
            </MovingBorderButton>
          </div>
        </div>
      </section>

      {/* Will This Work For Me Section */}
      <section className="bg-white py-1.5">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
            "But Will This Work For Someone Like Me?"
          </h2>
          <p className="text-xl text-slate-600 mb-12 text-center">
            Yes. Here's why this works regardless of your industry:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xl mb-1">{testimonial.role}</h3>
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="font-semibold text-slate-700 text-sm">{testimonial.name}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    {i === 0 && <Users className="w-5 h-5 text-blue-600" />}
                    {i === 1 && <Award className="w-5 h-5 text-blue-600" />}
                    {i === 2 && <TrendingUp className="w-5 h-5 text-blue-600" />}
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed text-base flex-1 mb-4">"{testimonial.quote}"</p>

                {testimonial.verified && (
                  <div className="flex items-center gap-1.5 text-sm text-green-600 pt-3 border-t border-slate-100">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-medium">Verified customer</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 text-center">
            <p className="text-xl font-bold text-slate-900 mb-2">The process is the same.</p>
            <p className="text-xl font-bold text-slate-900 mb-2">The outlets are the same.</p>
            <p className="text-xl font-bold text-green-700">The results are proven.</p>
          </div>

          <div className="text-center mt-12">
            <MovingBorderButton
              borderRadius="1.75rem"
              onClick={handleContinue}
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
                "See Packages & Pricing →"
              )}
            </MovingBorderButton>
          </div>
        </div>
      </section>

      {/* Before/After Transformation */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            What Changes When You Get Published
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 border-2 border-red-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold text-xl">✗</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Before</h3>
              </div>
              <div className="space-y-3 mb-4">
                <p className="text-slate-700">
                  <span className="font-bold">Google your name:</span> Nothing or just social media
                </p>
                <p className="text-slate-700">
                  <span className="font-bold">Perception:</span> "Are they even real?"
                </p>
                <p className="text-slate-700">
                  <span className="font-bold">Result:</span> Lost deals to bigger-looking competitors
                </p>
              </div>
              <div className="relative w-full h-40 rounded-lg overflow-hidden bg-slate-100">
                <img
                  src="/images/before-after/google-no-results.jpg"
                  alt="Before: No Google results"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">After</h3>
              </div>
              <div className="space-y-3 mb-4">
                <p className="text-slate-700">
                  <span className="font-bold">Google your name:</span> 4-7 professional articles
                </p>
                <p className="text-slate-700">
                  <span className="font-bold">Perception:</span> "This person is established and credible"
                </p>
                <p className="text-slate-700">
                  <span className="font-bold">Result:</span> Close more deals, command higher prices
                </p>
              </div>
              <div className="relative w-full h-40 rounded-lg overflow-hidden bg-slate-100">
                <img
                  src="/images/before-after/google-with-results.jpg"
                  alt="After: Article ranking on Google"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <MovingBorderButton
              borderRadius="1.75rem"
              onClick={handleContinue}
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
                "See Packages & Pricing →"
              )}
            </MovingBorderButton>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <GuaranteeSection />
    </div>
  )
}
