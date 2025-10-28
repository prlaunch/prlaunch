"use client"

import { useRouter } from "next/navigation"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import Image from "next/image"
import { Star, Loader2, CheckCircle2, Clock, FileText, Zap, Shield } from "lucide-react"
import { mainReviews } from "@/lib/reviews-data"
import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

export default function CheckoutBPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (showCelebration) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [showCelebration])

  const logos = [
    { src: "/images/logos/sf-tribune.png", alt: "The San Francisco Tribune" },
    { src: "/images/logos/successxl.png", alt: "Success XL" },
    { src: "/images/logos/usawire.png", alt: "USA Wire" },
    { src: "/images/logos/la-tabloid.webp", alt: "L.A. Tabloid" },
    { src: "/images/logos/bosses-mag.png", alt: "Bosses Mag" },
    { src: "/images/logos/medium.png", alt: "Medium" },
  ]

  const scrollToPricing = () => {
    setShowCelebration(true)
  }

  const handleClaimBonuses = () => {
    setIsLoading(true)
    router.push("/checkout/pricing")
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
      {showCelebration && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center space-y-4 sm:space-y-6">
            <div className="text-5xl sm:text-6xl mb-2 sm:mb-4">🎉</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">CONGRATULATIONS!</h2>
            <p className="text-lg sm:text-xl text-slate-700 mb-4 sm:mb-6">You've unlocked exclusive bonuses:</p>
            <div className="space-y-3 sm:space-y-4 text-left">
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-3 sm:p-4">
                <p className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                  🎁 +1 BONUS Article (on 3+ article packages)
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3 sm:p-4">
                <p className="font-bold text-slate-900 text-sm sm:text-base mb-1">🎁 Unlimited Writing Revisions</p>
              </div>
            </div>
            <MovingBorderButton
              borderRadius="1.75rem"
              onClick={handleClaimBonuses}
              disabled={isLoading}
              containerClassName="h-12 sm:h-14 w-full"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 sm:px-8 text-base sm:text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              duration={3000}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  Loading...
                </span>
              ) : (
                "Claim My Bonuses →"
              )}
            </MovingBorderButton>
          </div>
        </div>
      )}

      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-lg transition-transform duration-300 ${
          showStickyCTA ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900">Get Famous on Google in 48 Hours</span>
          <Button
            onClick={scrollToPricing}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg"
          >
            See Packages & Pricing
          </Button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="flex items-start justify-center p-4 pt-8 pb-16">
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

          <p className="text-slate-600 text-lg mb-6">Get featured on 100+ Google-ranking articles.</p>

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
              "See Packages & Pricing"
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

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            You're credible. Your work is solid.
            <br />
            But when prospects Google you... nothing.
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            You lose deals to competitors who <span className="font-bold text-slate-900">LOOK bigger</span>.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              "73% of customers report 2-4 qualified leads within 30 days"
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {verifiedTestimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{testimonial.verified}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={scrollToPricing}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg"
            >
              See Packages & Pricing
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Before & After: The Transformation
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 border-2 border-red-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold">✗</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Before</h3>
              </div>
              <p className="text-slate-600 mb-4">Google your name → nothing</p>
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-slate-100">
                <img
                  src="/images/before-after/google-no-results.jpg"
                  alt="Before: No Google results"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">After</h3>
              </div>
              <p className="text-slate-600 mb-4">Your article ranks for your niche</p>
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-slate-100">
                <img
                  src="/images/before-after/google-with-results.jpg"
                  alt="After: Article ranking on Google"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

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
            <Button
              onClick={scrollToPricing}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg"
            >
              See Packages & Pricing
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-slate-900">Professional Quality</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Written by Real Journalists</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Articles written by journalists with 5+ years experience.
            <br />
            <span className="font-bold text-slate-900">Not AI. Not templates.</span>
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">How Fast & Simple</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">⏱️ 3 minutes</h3>
              <p className="text-slate-600">Fill form</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">📝 24-48 hours</h3>
              <p className="text-slate-600">Journalists write & pitch</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">🔗 Instantly</h3>
              <p className="text-slate-600">Live links</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={scrollToPricing}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg"
            >
              See Packages & Pricing
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Where You Get Featured</h2>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4 text-center">Real USA Media Outlets </h3>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {logos.map((logo, i) => (
                  <div key={i} className="h-8 w-24 flex items-center justify-center">
                    <img
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      className="h-full w-full object-contain grayscale opacity-70"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4 text-center"> and 100+ more...</h3>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={scrollToPricing}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg"
            >
              See Packages & Pricing
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Your Process</h2>

          <div className="space-y-6 mb-12">
            {[
              { step: 1, title: "Choose package", icon: "📦" },
              { step: 2, title: "Fill 3-field form", icon: "📝" },
              { step: 3, title: "Journalists write", icon: "✍️" },
              { step: 4, title: "You approve angle", icon: "✅" },
              { step: 5, title: "Live in 48 hours", icon: "🚀" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4 bg-slate-50 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <p className="text-xl font-semibold text-slate-900">
                    {item.icon} {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={scrollToPricing}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg"
            >
              See Packages & Pricing
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full mb-12">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-pretty leading-relaxed text-slate-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center">
            <Button
              onClick={scrollToPricing}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg"
            >
              See Packages & Pricing
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-700/50">
            <Shield className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">100% Money-Back Guarantee</h2>

          <div className="bg-blue-600 rounded-2xl p-8 mb-8">
            <p className="text-xl font-semibold leading-relaxed">"If not published in 48 hours, full refund."</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-sm">Published within 48 hours</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-sm">Full refund if we don't deliver</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-sm">No questions asked</span>
            </div>
          </div>

          <Button
            onClick={scrollToPricing}
            className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-6 rounded-full text-lg font-semibold shadow-lg"
          >
            See Packages & Pricing
          </Button>

          <p className="mt-6 text-sm text-blue-200">Join 500+ founders who've been featured in major publications</p>
        </div>
      </section>
    </div>
  )
}
