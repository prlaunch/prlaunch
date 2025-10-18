"use client"

import { useState, useEffect } from "react"
import { Check, Sparkles, TrendingUp, Users, Award, Clock, Shield, Zap, Target, Lightbulb, Rocket } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { quizTestimonials } from "@/lib/reviews-data"

const questions = [
  {
    id: 1,
    question: "What stage is your business in?",
    options: [
      { id: "stage-new", text: "Just getting started (0-6 months)", icon: Rocket },
      { id: "stage-early", text: "Early growth (6 months - 2 years)", icon: TrendingUp },
      { id: "stage-established", text: "Established (2+ years)", icon: Award },
      { id: "stage-launching", text: "Launching something new", icon: Sparkles },
    ],
  },
  {
    id: 2,
    question: "What's your primary goal with media coverage?",
    options: [
      { id: "goal-customers", text: "Attract more customers", icon: Users },
      { id: "goal-credibility", text: "Build industry credibility", icon: Shield },
      { id: "goal-expert", text: "Position myself as an expert", icon: Award },
      { id: "goal-differentiate", text: "Differentiate from competitors", icon: Target },
      { id: "goal-awareness", text: "Grow brand awareness", icon: Sparkles },
    ],
  },
  {
    id: 3,
    question: "Which describes your story best?",
    options: [
      { id: "story-unique", text: "Unique approach or innovation", icon: Lightbulb },
      { id: "story-milestone", text: "Impressive milestone or growth", icon: TrendingUp },
      { id: "story-problem", text: "Solving an important problem", icon: Target },
      { id: "story-expert", text: "Expert insights to share", icon: Award },
      { id: "story-impact", text: "Community impact or mission", icon: Users },
    ],
  },
  {
    id: 4,
    question: "What's held you back from getting press?",
    options: [
      { id: "barrier-start", text: "Don't know where to start", icon: Lightbulb },
      { id: "barrier-story", text: 'Think my story isn\'t "big enough"', icon: Sparkles },
      { id: "barrier-cost", text: "Concerned about cost", icon: Shield },
      { id: "barrier-time", text: "Don't have time to pitch", icon: Clock },
      { id: "barrier-none", text: "Haven't tried yet", icon: Rocket },
    ],
  },
]

const testimonials = quizTestimonials

export function PRQuizLanding() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showLoading, setShowLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [loadingText, setLoadingText] = useState("Analyzing your responses...")
  const [prScore, setPrScore] = useState(0)
  const [showStickyCTA, setShowStickyCTA] = useState(false)

  const loadingTexts = [
    "Analyzing your responses...",
    "Matching you with outlets...",
    "Calculating your PR readiness...",
  ]

  useEffect(() => {
    if (showLoading) {
      let index = 0
      const interval = setInterval(() => {
        index = (index + 1) % loadingTexts.length
        setLoadingText(loadingTexts[index])
      }, 800)

      const timer = setTimeout(() => {
        clearInterval(interval)
        setShowLoading(false)
        setShowResults(true)
        // Animate score counter
        const targetScore = Math.floor(Math.random() * 13) + 85 // 85-97
        let current = 0
        const scoreInterval = setInterval(() => {
          current += 1
          setPrScore(current)
          if (current >= targetScore) {
            clearInterval(scoreInterval)
          }
        }, 20)
      }, 2500)

      return () => {
        clearInterval(interval)
        clearTimeout(timer)
      }
    }
  }, [showLoading])

  useEffect(() => {
    if (showResults) {
      const handleScroll = () => {
        setShowStickyCTA(window.scrollY > 400)
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [showResults])

  const handleAnswer = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion]: optionId })

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      setTimeout(() => {
        setShowLoading(true)
      }, 300)
    }
  }

  const getPersonalizedInsights = () => {
    const insights = []

    // Based on stage
    if (answers[0] === "stage-new") {
      insights.push({ icon: Sparkles, text: "Early coverage builds instant credibility when you need it most" })
    } else if (answers[0] === "stage-established") {
      insights.push({ icon: Award, text: "Your track record gives you the proof points media outlets love" })
    } else {
      insights.push({ icon: TrendingUp, text: "Your growth story is exactly what journalists are looking for" })
    }

    // Based on goal
    if (answers[1] === "goal-expert") {
      insights.push({ icon: Target, text: "Media features are the fastest way to establish authority in your field" })
    } else if (answers[1] === "goal-customers") {
      insights.push({ icon: Users, text: "Published articles convert 3x better than traditional ads" })
    } else {
      insights.push({ icon: Shield, text: "Press coverage creates lasting credibility that compounds over time" })
    }

    // Based on barrier
    if (answers[3] === "barrier-start") {
      insights.push({ icon: Rocket, text: "Our done-for-you service handles everything - you just review and approve" })
    } else if (answers[3] === "barrier-story") {
      insights.push({
        icon: Lightbulb,
        text: "Every business has a story worth telling - our writers know how to find it",
      })
    } else if (answers[3] === "barrier-time") {
      insights.push({ icon: Clock, text: "Takes just 5 minutes to choose outlets - we handle the rest" })
    } else {
      insights.push({ icon: Zap, text: "Get published in 5-7 days with zero PR experience needed" })
    }

    return insights
  }

  if (showResults) {
    const insights = getPersonalizedInsights()

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 md:pt-32">
        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 mb-4 animate-bounce">
              <Check className="w-7 h-7 text-white" strokeWidth={3} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Great News - PR Is Perfect For You!</h1>
            <div className="inline-block bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-2xl p-4 mb-6">
              <p className="text-white/80 text-xs font-medium mb-1">Your PR Readiness Score</p>
              <p className="text-4xl font-bold text-white">{prScore}%</p>
            </div>
          </div>

          {/* Personalized Insights */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4">Why PR Is Perfect For You</h2>
            <div className="space-y-3">
              {insights.map((insight, index) => {
                const Icon = insight.icon
                return (
                  <div key={index} className="flex items-start gap-2.5">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{insight.text}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* What You'll Get */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-5 mb-6">
            <h2 className="text-base font-bold text-slate-900 mb-4">Here's What Happens When You Get Published</h2>
            <div className="space-y-2.5">
              {[
                "Professional writer crafts your story (normally $200+)",
                "Published on reputable USA outlets",
                "Builds instant credibility & trust",
                "Shareable across all your marketing",
                "5-7 day turnaround",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-slate-900 mb-3 text-center">Join Entrepreneurs Getting Featured</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-xs text-slate-900">{testimonial.name}</p>
                      <p className="text-xs text-slate-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 mb-2">"{testimonial.quote}"</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {testimonial.outlets.map((outlet, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {outlet}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div className="text-center mb-6">
            <p className="text-xs text-slate-600 mb-4">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>47 spots taken this week</span>
              </span>
            </p>
          </div>

          {/* Primary CTA */}
          <div className="text-center">
            <Link
              href="/payment"
              className="inline-block bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white font-bold text-base px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Published for $47 →
            </Link>
            <p className="text-xs text-slate-600 mt-3">Professional writers • USA outlets • 5-7 day turnaround</p>
            <p className="text-xs text-slate-500 mt-2">💳 Secure checkout • Money-back guarantee</p>
          </div>

          {/* Secondary */}
          <div className="text-center mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-600">
              Still have questions?{" "}
              <Link href="/#faq" className="text-blue-600 hover:underline">
                View FAQ
              </Link>
            </p>
          </div>
        </div>

        {/* Full Footer component */}
        <Footer />
      </div>
    )
  }

  if (showLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 pt-24 md:pt-32">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-xl font-semibold text-slate-900 animate-pulse">{loadingText}</p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-full animate-loading-bar"></div>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 md:pt-32">
      {/* Hero Section */}
      {currentQuestion === 0 && (
        <div className="max-w-4xl mx-auto px-4 text-center pb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">See If PR Is Right For You</h1>
          <p className="text-lg text-slate-600 mb-8">60-second assessment • Personalized insights • Completely free</p>

          {/* Trust Indicators */}

          {/* Testimonial */}
        </div>
      )}

      {/* Quiz */}
      <div className="max-w-2xl mx-auto px-4 md:py-6 py-0 pb-12 md:pb-16">
        {/* Progress */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-slate-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-xs font-medium text-slate-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm animate-fade-in">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-5 text-center">{currentQ.question}</h2>

          <div className="space-y-2.5">
            {currentQ.options.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4 text-slate-600 group-hover:text-blue-600" />
                  </div>
                  <span className="text-sm text-slate-700 group-hover:text-slate-900 font-medium">{option.text}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer component */}
      <Footer />
    </div>
  )
}
