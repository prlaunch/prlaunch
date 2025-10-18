"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  X,
  Check,
  Sparkles,
  Shield,
  Clock,
  Award,
  Star,
  BadgeCheck,
  Lock,
  ChevronLeft,
  ChevronRight,
  Rocket,
  DollarSign,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function CheckoutPage() {
  const [showPopup, setShowPopup] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(1)
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [currentReviewPage, setCurrentReviewPage] = useState(0)
  const reviewsPerPage = 4

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const packages = [
    {
      name: "Authority",
      articles: 5,
      originalPrice: "$394",
      originalPricePerArticle: "$79",
      pricePerArticle: "$39",
      totalPrice: "$197",
      description: "Total: $197 for 5 articles",
    },
    {
      name: "Growth",
      articles: 3,
      originalPrice: "$254",
      originalPricePerArticle: "$84",
      pricePerArticle: "$42",
      totalPrice: "$127",
      description: "Total: $127 for 3 articles",
      popular: true,
    },
    {
      name: "Starter",
      articles: 1,
      originalPrice: "$94",
      originalPricePerArticle: "$94",
      pricePerArticle: "$47",
      totalPrice: "$47",
      description: "Total: $47 for 1 article",
    },
  ]

  const benefits = [
    {
      icon: Shield,
      title: "Live in 7 Days or Free",
      description: "Full refund if not published within 7 days of draft approval",
    },
    {
      icon: Rocket,
      title: "Writing Starts in 12 Hours",
      description: "Professional writers begin your story same day",
    },
    {
      icon: DollarSign,
      title: "$47 vs $5,000 Agencies",
      description: "Get the same outlets without the agency markup",
    },
    {
      icon: Search,
      title: "Push Down Negative Results",
      description: "Positive PR articles dominate your Google results",
    },
    {
      icon: Award,
      title: "Real Publications",
      description: "Featured on major outlets",
    },
    {
      icon: Check,
      title: "No Pitching Required",
      description: "Answer questions, we handle everything else",
    },
  ]

  const allReviews = [
    {
      name: "Sarah Mitchell",
      title: "Marketing Consultant",
      initials: "SM",
      color: "bg-blue-500",
      image: "/marketing-consultant-cafe-photo.jpg",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      review:
        "Absolutely incredible service! I was featured in Forbes within 5 days. The whole process was seamless - just uploaded my content and they handled everything. My LinkedIn engagement has tripled since the article went live.",
    },
    {
      name: "Marcus Chen",
      title: "Business Coach",
      initials: "MC",
      color: "bg-purple-500",
      image: "/casual-business-coach-selfie.jpg",
      rating: 5,
      date: "1 month ago",
      verified: true,
      review:
        "Best investment for my personal brand. Got published in Entrepreneur and Business Insider. Now I'm closing more clients just by sharing these links. The credibility boost is unreal.",
    },
    {
      name: "David Park",
      title: "Tech Founder",
      initials: "DP",
      color: "bg-emerald-500",
      image: "/tech-founder-office-photo.jpg",
      rating: 5,
      date: "3 weeks ago",
      verified: true,
      review:
        "I tried traditional PR agencies before - they wanted $10k and 3 months. PR Launch got me in Business Insider in 4 days for $47. The ROI is insane. Highly recommend!",
    },
    {
      name: "Jennifer Lopez",
      title: "Real Estate Agent",
      initials: "JL",
      color: "bg-pink-500",
      image: "/business-consultant-smart-casual.jpg",
      rating: 5,
      date: "1 week ago",
      verified: true,
      review:
        "Game changer for my business. Featured in Yahoo Finance and MarketWatch. My clients are impressed and it's helped me stand out in a crowded market. Worth every penny!",
    },
    {
      name: "Alex Rodriguez",
      title: "Fitness Coach",
      initials: "AR",
      color: "bg-indigo-500",
      image: "/fitness-coach-outdoor-casual.jpg",
      rating: 5,
      date: "5 days ago",
      verified: true,
      review:
        "This service is a no-brainer. Got featured in multiple publications and my social media following doubled. The authority it gives you is priceless. My coaching business has never been better!",
    },
    {
      name: "Emily Watson",
      title: "E-commerce Owner",
      initials: "EW",
      color: "bg-teal-500",
      image: "/ecommerce-owner-warehouse-casual.jpg",
      rating: 5,
      date: "2 months ago",
      verified: true,
      review:
        "I was skeptical at first, but this exceeded all expectations. Featured in USA Wire and Success XL within a week. My website traffic increased by 300% and sales are through the roof!",
    },
    {
      name: "Michael Brown",
      title: "Financial Advisor",
      initials: "MB",
      color: "bg-orange-500",
      image: "/financial-advisor-professional-headshot.jpg",
      rating: 5,
      date: "3 days ago",
      verified: true,
      review:
        "The best marketing investment I've made. Got published in major outlets and now I'm seen as an authority in my field. Clients trust me more and referrals have skyrocketed!",
    },
    {
      name: "Lisa Anderson",
      title: "Life Coach",
      initials: "LA",
      color: "bg-red-500",
      image: "/life-coach-outdoor-casual.jpg",
      rating: 5,
      date: "1 month ago",
      verified: true,
      review:
        "Phenomenal service! I was featured in multiple publications within days. The process was so easy and the results speak for themselves. My coaching practice is now fully booked!",
    },
    {
      name: "James Wilson",
      title: "SaaS Founder",
      initials: "JW",
      color: "bg-blue-600",
      image: "/saas-founder-home-office.jpg",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      review:
        "This is the real deal. Got featured in top-tier publications and it's helped us close enterprise deals. The credibility boost is worth 10x what we paid. Highly recommend to any founder!",
    },
    {
      name: "Rachel Green",
      title: "Interior Designer",
      initials: "RG",
      color: "bg-purple-600",
      image: "/interior-designer-creative-workspace.jpg",
      rating: 5,
      date: "4 weeks ago",
      verified: true,
      review:
        "I can't believe how easy this was. Featured in major publications and my business has transformed. Clients are now coming to me instead of me chasing them. Best decision ever!",
    },
    {
      name: "Tom Harris",
      title: "Real Estate Investor",
      initials: "TH",
      color: "bg-emerald-600",
      image: "/real-estate-investor-business-casual.jpg",
      rating: 5,
      date: "1 week ago",
      verified: true,
      review:
        "Outstanding results! Got published in Business Insider and Yahoo Finance. My credibility in the market has skyrocketed and I'm closing bigger deals than ever before.",
    },
    {
      name: "Amanda Clark",
      title: "Digital Marketing Expert",
      initials: "AC",
      color: "bg-pink-600",
      image: "/ceo-conference-professional.jpg",
      rating: 5,
      date: "3 weeks ago",
      verified: true,
      review:
        "This service delivers exactly what it promises. Featured in multiple outlets within a week. My personal brand has never been stronger and I'm getting speaking opportunities left and right!",
    },
  ]

  const totalPages = Math.ceil(allReviews.length / reviewsPerPage)
  const currentReviews = allReviews.slice(currentReviewPage * reviewsPerPage, (currentReviewPage + 1) * reviewsPerPage)

  const nextPage = () => {
    setCurrentReviewPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentReviewPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const prLogos = [
    { src: "/images/logos/sf-tribune.png", alt: "The San Francisco Tribune" },
    { src: "/images/logos/successxl.png", alt: "Success XL" },
    { src: "/images/logos/usawire.png", alt: "USA Wire" },
    { src: "/images/logos/la-tabloid.webp", alt: "L.A. Tabloid" },
    { src: "/images/logos/bosses-mag.png", alt: "Bosses Mag" },
    { src: "/images/logos/medium.png", alt: "Medium" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Banner */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 py-3 px-4 text-center text-white shadow-lg shadow-blue-500/20">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold">
          <Sparkles className="w-5 animate-pulse h-4" />
          <span>Claim 50% Off as Our New Client </span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">Limited Time Offer</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <Clock className="h-4 w-4 text-cyan-600" />
            <span className="text-sm text-slate-700">Offer expires in</span>
            <span className="font-mono text-lg font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              {formatTime(timeLeft)}
            </span>
          </div>

          <h1 className="md:text-6xl font-bold mb-4 text-black leading-tight text-3xl">
            Other Agencies Charge 10x More for This...
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            They want to hook you on expensive monthly retainers and at the end of the day you get less value than with
            PR Launch.
          </p>

          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-600 font-semibold">We Publish in Just 7 Days </span>
          </div>
        </div>

        <div className="mb-12 md:mb-16">
          <h3 className="text-center text-sm font-semibold text-slate-600 mb-6 uppercase tracking-wider">
            WE PUBLISH IN
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-6">
            {prLogos.map((logo, index) => (
              <div key={index} className="h-10 w-28 flex items-center justify-center">
                <img
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  className="h-full w-full object-contain grayscale opacity-60 hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-lg font-bold text-slate-700 tracking-wide">AND 100+ MORE...</p>
        </div>

        <div className="mb-12 md:mb-16 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
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
            <div className="h-3 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-900">4.8/5</span>
              <span className="text-xs text-slate-600">on</span>
              <svg className="h-3 w-auto" viewBox="0 0 90 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
                  fill="#00B67A"
                />
                <text x="22" y="15" fill="currentColor" className="text-[10px] font-bold">
                  Trustpilot
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12 md:mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            const gradients = [
              "from-pink-500 via-rose-500 to-pink-600",
              "from-blue-500 via-cyan-500 to-blue-600",
              "from-emerald-500 via-teal-500 to-emerald-600",
              "from-purple-500 via-indigo-500 to-purple-600",
              "from-orange-500 via-amber-500 to-orange-600",
              "from-rose-500 via-pink-500 to-rose-600",
            ]
            return (
              <div
                key={index}
                className="group relative bg-white rounded-xl p-3 hover:scale-105 transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, var(--tw-gradient-stops))`,
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  border: "2px solid transparent",
                  ["--tw-gradient-from" as any]: `rgb(${index === 0 ? "236 72 153" : index === 1 ? "37 99 235" : index === 2 ? "16 185 129" : index === 3 ? "168 85 247" : index === 4 ? "249 115 22" : "244 63 94"})`,
                  ["--tw-gradient-to" as any]: `rgb(${index === 0 ? "244 63 94" : index === 1 ? "6 182 212" : index === 2 ? "20 184 166" : index === 3 ? "99 102 241" : index === 4 ? "251 191 36" : "236 72 153"})`,
                  ["--tw-gradient-stops" as any]: "var(--tw-gradient-from), var(--tw-gradient-to)",
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${gradients[index]} mb-2 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xs font-semibold text-slate-900 mb-1 leading-tight">{benefit.title}</h3>
                  <p className="text-[10px] text-slate-600 leading-tight">{benefit.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Customer Reviews</h2>
          <div className="space-y-4 mb-6">
            {currentReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Header with avatar and name */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-muted shrink-0">
                      <Image
                        src={review.image || "/placeholder.svg"}
                        alt={review.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {review.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xl text-slate-900">{review.name}</h3>
                  </div>
                </div>

                {/* Star rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 fill-blue-500 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-slate-600 text-base leading-relaxed mb-4">{review.review}</p>

                {/* Footer with title and date */}
                <div className="flex items-center justify-between text-sm">
                  <p className="text-slate-500">{review.title}</p>
                  <p className="text-slate-400">{review.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevPage}
              className="p-2 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5 text-slate-600" />
            </button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentReviewPage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentReviewPage ? "w-8 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextPage}
              className="p-2 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Trust Badges Section */}
        <div className="mb-12 md:mb-16">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Safe & Secure Checkout</h3>

            {/* Money-back guarantee */}
            <div className="flex items-center justify-center gap-3 mb-8 pb-8 border-b border-slate-200">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">100% Money-Back Guarantee</div>
                <div className="text-sm text-slate-600">If not published within 7 days of your approval</div>
              </div>
            </div>

            {/* Security badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-slate-200">
                <Lock className="h-5 w-5 text-slate-500" />
                <span className="text-[10px] font-medium text-slate-600">256-bit SSL</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-slate-200">
                <Shield className="h-5 w-5 text-slate-500" />
                <span className="text-[10px] font-medium text-slate-600">Secure Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-slate-200">
                <BadgeCheck className="h-5 w-5 text-slate-500" />
                <span className="text-[10px] font-medium text-slate-600">Verified Business</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-slate-200">
                <Lock className="h-5 w-5 text-slate-500" />
                <span className="text-[10px] font-medium text-slate-600">PCI Compliant</span>
              </div>
            </div>

            {/* Payment methods */}
            <div>
              <div className="text-center text-sm font-semibold text-slate-600 mb-4">Accepted Payment Methods</div>
              <div className="flex items-center justify-center">
                <img
                  src="/images/stripe-payment-methods.png"
                  alt="Powered by Stripe - Visa, Mastercard, Maestro, American Express, Discover"
                  className="h-20 w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Checkout Button */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-lg border-t border-slate-200">
          <div className="container mx-auto max-w-2xl">
            <Button
              onClick={() => setShowPopup(true)}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Claim 50% Off Now
            </Button>
          </div>
        </div>
      </div>

      {/* Pricing Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="w-full md:max-w-xl bg-white rounded-t-3xl md:rounded-3xl border border-slate-200 shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Pricing options</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
              {packages.map((pkg, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPlan(index)}
                  className={`relative w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedPlan === index
                      ? pkg.popular
                        ? "border-transparent bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50"
                        : "border-transparent bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300"
                  }`}
                  style={
                    selectedPlan === index
                      ? {
                          backgroundImage: pkg.popular
                            ? "linear-gradient(white, white), linear-gradient(135deg, #2563EB 0%, #9333EA 50%, #2563EB 100%)"
                            : "linear-gradient(white, white), linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #9333EA 100%)",
                          backgroundOrigin: "border-box",
                          backgroundClip: "padding-box, border-box",
                        }
                      : {}
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-slate-400 line-through text-sm">{pkg.originalPricePerArticle}</span>
                        <span className="text-xl font-bold text-slate-900">{pkg.pricePerArticle}/article</span>
                        {selectedPlan === index && (
                          <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full shadow-sm">
                            50% OFF
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 text-sm">{pkg.description}</p>
                    </div>
                    {selectedPlan === index && (
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 rounded-full border-2 border-cyan-500 flex items-center justify-center">
                          <Check className="h-3.5 w-3.5 text-cyan-600 stroke-[3]" />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
              <div className="pt-3 border-slate-200 mt-0 border-t-0">
                <h3 className="text-center text-sm font-semibold text-slate-900 mb-2">You Will Pick Your Outlets</h3>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
                  {prLogos.map((logo, index) => (
                    <div key={index} className="h-4 w-16 flex items-center justify-center">
                      <img
                        src={logo.src || "/placeholder.svg"}
                        alt={logo.alt}
                        className="h-full w-full object-contain grayscale opacity-60"
                      />
                    </div>
                  ))}
                </div>

                <p className="text-center text-xs text-slate-500">and 100s more...</p>
              </div>
            </div>

            <div className="p-5 border-t border-slate-200">
              <Button
                asChild
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
              >
                <a href={`/payment?package=${packages[selectedPlan].name.toLowerCase()}`}>
                  Get {packages[selectedPlan].articles} {packages[selectedPlan].articles === 1 ? "Article" : "Articles"}{" "}
                  for {packages[selectedPlan].totalPrice}
                </a>
              </Button>
              <p className="text-center text-xs text-slate-500 mt-3">
                You will be redirected to checkout. All purchases are backed by our unconditional 100% money-back
                guarantee.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
