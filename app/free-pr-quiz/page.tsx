"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QuizCheckout } from "@/components/quiz-checkout"
import { X, Star, ArrowLeft, Gift, Check } from "lucide-react"
import Image from "next/image"
import { mainReviews } from "@/lib/reviews-data"

type QuizStep =
  | "landing"
  | "quiz"
  | "calculating"
  | "score"
  | "winner"
  | "lead-capture"
  | "phone-capture"
  | "article-selection"
  | "article-questions"
  | "processing"
  | "writing-offer"
  | "payment"
  | "upsell"
  | "thank-you"

interface QuizAnswers {
  goal?: string
  stage?: string
  presence?: string
  challenge?: string
  urgency?: string
  featured?: string
}

interface LeadData {
  name: string
  email: string
  phone?: string
  publication?: string
  publicationLogo?: string
  companyName?: string
  articleAngle?: string
  keyMessage?: string
  website?: string
}

const ARTICLE_PUBLICATIONS = [
  { id: "usawire", name: "USA Wire", logo: "/images/logos/usawire.png" },
  { id: "successxl", name: "SuccessXL", logo: "/images/logos/successxl.png" },
  { id: "la-tabloid", name: "LA Tabloid", logo: "/images/logos/la-tabloid.webp" },
  { id: "medium", name: "Medium", logo: "/images/logos/medium.png" },
  { id: "sf-tribune", name: "SF Tribune", logo: "/images/logos/sf-tribune.png" },
  { id: "bosses-mag", name: "Bosses Mag", logo: "/images/logos/bosses-mag.png" },
]

const PR_LOGOS = [
  { src: "/images/logos/sf-tribune.png", alt: "SF Tribune" },
  { src: "/images/logos/successxl.png", alt: "SuccessXL" },
  { src: "/images/logos/usawire.png", alt: "USA Wire" },
  { src: "/images/logos/la-tabloid.webp", alt: "LA Tabloid" },
  { src: "/images/logos/bosses-mag.png", alt: "Bosses Mag" },
  { src: "/images/logos/medium.png", alt: "Medium" },
]

const OUTLET_SCREENSHOTS = [
  { src: "/images/outlets/010_thriveinsider-8sVaym2kpyM3Ui2oyVypLCWeGzqnmK.webp", alt: "Thrive Insider" },
  { src: "/images/outlets/029_bossesmag-qf0gFr7WSI81nXCkVwW3YKWEWkRS4O.webp", alt: "Bosses Mag" },
  { src: "/images/outlets/057_hustleweekly.webp", alt: "Hustle Weekly" },
  { src: "/images/outlets/054_usawire.webp", alt: "USA Wire" },
  { src: "/images/outlets/037_latabloid.webp", alt: "LA Tabloid" },
]

export default function FreeQuizPage() {
  const [step, setStep] = useState<QuizStep>("landing")
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [leadData, setLeadData] = useState<LeadData>({
    name: "",
    email: "",
  })
  const [articleQuestionIndex, setArticleQuestionIndex] = useState(0)
  const [showMysteryPopup, setShowMysteryPopup] = useState(false)
  const [mysteryBoxOpened, setMysteryBoxOpened] = useState(false)
  const [score, setScore] = useState(87)
  const [winnerNumber] = useState(Math.floor(Math.random() * 13) + 37) // Random between 37-49
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60) // 24 hours in seconds
  const [upsellTimeLeft, setUpsellTimeLeft] = useState(10 * 60) // 10 minutes in seconds
  const [showConfetti, setShowConfetti] = useState(false)
  // Added state for check animation
  const [showCheckAnimation, setShowCheckAnimation] = useState(false)
  const [checkedItems, setCheckedItems] = useState<number[]>([])
  const [mysteryRewardClaimed, setMysteryRewardClaimed] = useState(false)
  const [countryCode, setCountryCode] = useState("+1")

  useEffect(() => {
    if (step === "upsell" || step === "thank-you" || step === "payment") {
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [step])

  useEffect(() => {
    const savedAnswers = localStorage.getItem("quizAnswers")
    const savedLeadData = localStorage.getItem("quizLeadData")
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
    if (savedLeadData) setLeadData(JSON.parse(savedLeadData))
  }, [])

  useEffect(() => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers))
  }, [answers])

  useEffect(() => {
    localStorage.setItem("quizLeadData", JSON.stringify(leadData))
  }, [leadData])

  // Countdown timer for writing offer
  useEffect(() => {
    if (step === "writing-offer" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step, timeLeft])

  // Countdown timer for upsell
  useEffect(() => {
    if (step === "upsell" && upsellTimeLeft > 0) {
      const timer = setInterval(() => {
        setUpsellTimeLeft((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step, upsellTimeLeft])

  useEffect(() => {
    if (step === "winner") {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [step])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = (currentQuestion / 6) * 100

  const handleQuizAnswer = (answer: string, key: keyof QuizAnswers) => {
    setAnswers({ ...answers, [key]: answer })

    if (currentQuestion === 4 && !showMysteryPopup && !mysteryRewardClaimed) {
      setShowMysteryPopup(true)
      return
    }

    if (currentQuestion < 6) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      setTimeout(() => {
        setStep("calculating")
        setTimeout(() => {
          setStep("score")
        }, 6000)
      }, 300)
    }
  }

  const handleBack = () => {
    if (step === "quiz" && currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (step === "phone-capture") {
      setStep("lead-capture")
    } else if (step === "article-selection") {
      setStep("phone-capture")
    } else if (step === "article-questions") {
      if (articleQuestionIndex > 0) {
        setArticleQuestionIndex(articleQuestionIndex - 1)
      } else {
        setStep("article-selection")
      }
    } else if (step === "writing-offer") {
      setStep("article-questions")
      setArticleQuestionIndex(3)
    }
  }

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep("phone-capture")
  }

  const handlePhoneCapture = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadData.phone) return
    setStep("article-selection")
  }

  const handleArticleSelection = (publication: { name: string; logo: string }) => {
    setLeadData({ ...leadData, publication: publication.name, publicationLogo: publication.logo })
    setStep("article-questions")
  }

  const handleArticleQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (articleQuestionIndex < 3) {
      setArticleQuestionIndex(articleQuestionIndex + 1)
    } else {
      setStep("processing")
      setTimeout(() => {
        setStep("writing-offer")
      }, 2500)
    }
  }

  const handleSelectProfessionalWriting = () => {
    setShowCheckAnimation(true)
    setCheckedItems([])

    setTimeout(() => setCheckedItems([0]), 1500)
    setTimeout(() => setCheckedItems([0, 1]), 3000)
    setTimeout(() => setCheckedItems([0, 1, 2]), 4500)
    setTimeout(() => {
      setShowCheckAnimation(false)
      setStep("payment")
    }, 6000)
  }

  const handlePaymentComplete = () => {
    setStep("upsell")
  }

  const handleUpsellAccept = () => {
    // In real app, process upsell payment
    setStep("thank-you")
  }

  const handleUpsellDecline = () => {
    setStep("thank-you")
  }

  const handleClaimMystery = () => {
    setMysteryBoxOpened(true)
    setMysteryRewardClaimed(true)
    setShowMysteryPopup(false)
  }

  const Logo = () => (
    <div className="text-2xl font-bold tracking-tight text-black cursor-default">
      <span className="text-blue-500">pr</span>
      <span>launch.io</span>
    </div>
  )

  const StickyLogoBanner = () => (
    <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b py-3 px-4">
      <div className="flex justify-center">
        <Logo />
      </div>
    </div>
  )

  // Landing Page
  if (step === "landing") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
        <div className="w-full py-6 px-4 flex justify-center">
          <Logo />
        </div>

        <div className="flex-1 flex items-start justify-center p-4 pt-2">
          <div className="max-w-2xl w-full text-center space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                You Could Get Published In:
              </p>
              <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
                {PR_LOGOS.map((logo, i) => (
                  <div key={i} className="flex items-center justify-center h-6">
                    <Image
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      width={70}
                      height={24}
                      className="object-contain grayscale opacity-60"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic">and 100+ more...</p>
            </div>

            <div className="space-y-4 pt-2">
              <h1 className="text-5xl md:text-6xl font-bold text-balance">Is PR Right for Your Business?</h1>
              <p className="text-xl text-muted-foreground text-balance">
                Take this 2-minute quiz to discover your PR Readiness Score and unlock a special reward
              </p>
            </div>

            <Button
              size="lg"
              className="text-lg px-16 py-5 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
              onClick={() => setStep("quiz")}
            >
              Start Free Quiz →
            </Button>

            <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {mainReviews.slice(0, 4).map((review, i) => (
                    <div key={i} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-background">
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
              <span>Taken by 4,847 entrepreneurs</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Quiz Questions
  if (step === "quiz") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
        <StickyLogoBanner />

        {mysteryRewardClaimed && (
          <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 border-t-2 border-yellow-500/30 py-3 px-4 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2">
              <Gift className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-yellow-700">Mystery Gift Claimed</span>
            </div>
          </div>
        )}

        <div className="sticky top-[57px] z-40 w-full py-6 px-4 space-y-6 bg-background/80 backdrop-blur-sm">
          {/* Progress Bar - Fixed position */}
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion} of 6</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${progressPercentage}%`,
                  background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #9333EA 100%)",
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full space-y-6">
            {currentQuestion >= 4 && !mysteryRewardClaimed && (
              <div
                className="fixed bottom-6 right-6 z-50 cursor-pointer group"
                onClick={() => setShowMysteryPopup(true)}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
                  <Gift className="w-12 h-12 text-yellow-500 relative animate-bounce" />
                </div>
              </div>
            )}

            {showMysteryPopup && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-card border-2 border-yellow-500 rounded-xl p-8 max-w-md w-full space-y-6 relative animate-in fade-in zoom-in duration-300">
                  <button
                    onClick={() => setShowMysteryPopup(false)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="text-center space-y-4">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-2xl animate-pulse"></div>
                      <Gift className="w-20 h-20 mx-auto text-yellow-500 relative" />
                    </div>
                    <h3 className="text-2xl font-bold">MYSTERY REWARD UNLOCKED!</h3>
                    <p className="text-muted-foreground">
                      You've unlocked a special surprise! Complete the quiz to reveal your reward.
                    </p>
                    <Button
                      size="lg"
                      className="w-full text-2xl px-16 py-5 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                      onClick={handleClaimMystery}
                    >
                      Claim & Continue →
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentQuestion > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}

            {/* Question Content */}
            <div className="bg-card border rounded-xl p-8 space-y-6">
              {currentQuestion === 1 && (
                <>
                  <h2 className="text-2xl font-bold">What's your main goal for getting press coverage?</h2>
                  <RadioGroup
                    onValueChange={(value) => handleQuizAnswer(value, "goal")}
                    value={answers.goal}
                    className="space-y-3"
                  >
                    {[
                      { value: "customers", label: "🚀 Attract more customers" },
                      { value: "fundraising", label: "💰 Build credibility for fundraising" },
                      { value: "leadership", label: "🎯 Establish thought leadership" },
                      { value: "talent", label: "👥 Hire better talent" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        htmlFor={option.value}
                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => handleQuizAnswer(option.value, "goal")}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <span className="flex-1 cursor-pointer">{option.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </>
              )}

              {currentQuestion === 2 && (
                <>
                  <h2 className="text-2xl font-bold">Where is your business right now?</h2>
                  <RadioGroup
                    onValueChange={(value) => handleQuizAnswer(value, "stage")}
                    value={answers.stage}
                    className="space-y-3"
                  >
                    {[
                      { value: "pre-revenue", label: "💡 Pre-revenue (just starting)" },
                      { value: "under-100k", label: "📈 Under $100K annual revenue" },
                      { value: "100k-500k", label: "🎯 $100K - $500K annual revenue" },
                      { value: "over-500k", label: "🚀 Over $500K annual revenue" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        htmlFor={option.value}
                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => handleQuizAnswer(option.value, "stage")}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <span className="flex-1 cursor-pointer">{option.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </>
              )}

              {currentQuestion === 3 && (
                <>
                  <h2 className="text-2xl font-bold">How would you describe your online presence?</h2>
                  <RadioGroup
                    onValueChange={(value) => handleQuizAnswer(value, "presence")}
                    value={answers.presence}
                    className="space-y-3"
                  >
                    {[
                      { value: "strong", label: "🌟 Strong (website, social media, content)" },
                      { value: "moderate", label: "📱 Moderate (website + one social platform)" },
                      { value: "minimal", label: "🌱 Minimal (just getting started)" },
                      { value: "none", label: "❌ Non-existent (need to build it)" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        htmlFor={option.value}
                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => handleQuizAnswer(option.value, "presence")}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <span className="flex-1 cursor-pointer">{option.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </>
              )}

              {currentQuestion === 4 && (
                <>
                  <h2 className="text-2xl font-bold">What's your biggest challenge with PR?</h2>
                  <RadioGroup
                    onValueChange={(value) => handleQuizAnswer(value, "challenge")}
                    value={answers.challenge}
                    className="space-y-3"
                  >
                    {[
                      { value: "start", label: "🤔 Don't know where to start" },
                      { value: "time", label: "⏰ Don't have time to pitch journalists" },
                      { value: "story", label: "📝 Don't know what makes a good story" },
                      { value: "afford", label: "💸 Can't afford traditional PR agencies" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        htmlFor={option.value}
                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => handleQuizAnswer(option.value, "challenge")}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <span className="flex-1 cursor-pointer">{option.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </>
              )}

              {currentQuestion === 5 && (
                <>
                  <h2 className="text-2xl font-bold">How soon do you need press coverage?</h2>
                  <RadioGroup
                    onValueChange={(value) => handleQuizAnswer(value, "urgency")}
                    value={answers.urgency}
                    className="space-y-3"
                  >
                    {[
                      { value: "immediate", label: "🔥 Immediately (within 1 month)" },
                      { value: "soon", label: "⚡ Soon (1-3 months)" },
                      { value: "planning", label: "📅 Planning ahead (3-6 months)" },
                      { value: "exploring", label: "🔍 Just exploring options" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        htmlFor={option.value}
                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => handleQuizAnswer(option.value, "urgency")}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <span className="flex-1 cursor-pointer">{option.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </>
              )}

              {currentQuestion === 6 && (
                <>
                  <h2 className="font-bold text-xl">Have you ever been featured in any publications?</h2>
                  <RadioGroup
                    onValueChange={(value) => handleQuizAnswer(value, "featured")}
                    value={answers.featured}
                    className="space-y-3"
                  >
                    {[
                      { value: "multiple", label: "✅ Yes, multiple times" },
                      { value: "once", label: "📰 Yes, once or twice" },
                      { value: "tried", label: "🚫 No, but I've tried" },
                      { value: "new", label: "🆕 No, I don't know how to start" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        htmlFor={option.value}
                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => handleQuizAnswer(option.value, "featured")}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <span className="flex-1 cursor-pointer">{option.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === "calculating") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
        <div className="w-full py-6 px-4 flex justify-center">
          <Logo />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-12">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-muted/20"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
                style={{
                  borderTopColor: "#2563EB",
                  borderRightColor: "#06B6D4",
                  borderBottomColor: "#9333EA",
                  animationDuration: "1s",
                }}
              ></div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Analyzing Your Results</h2>
              <p className="text-lg text-muted-foreground">Calculating your PR readiness score...</p>
            </div>

            <div className="space-y-4 max-w-xs mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Evaluating business stage</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span className="text-sm text-muted-foreground">Analyzing online presence</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: "1s" }}></div>
                <span className="text-sm text-muted-foreground">Matching ideal publications</span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                ></div>
                <span className="text-sm text-muted-foreground">Calculating readiness score</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === "score") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
        <div className="w-full py-6 px-4 flex justify-center">
          <Logo />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold">Your PR Readiness Score</h2>

              <div className="inline-flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <svg className="transform -rotate-90 w-24 h-24">
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${2 * Math.PI * 42 * (1 - score / 100)}`}
                      className="text-green-500 transition-all duration-1000"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{score}%</span>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-semibold text-green-600">Highly Effective</span>
              </div>
            </div>

            <div className="bg-card border rounded-xl p-6 space-y-3">
              <h3 className="font-semibold text-sm">Why PR Will Work for You:</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm">Your business stage is ideal for media coverage</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm">Press coverage will directly boost your credibility</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm">You're ready to start getting featured now</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="text-xl px-20 py-6 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                onClick={() => {
                  setMysteryBoxOpened(true)
                  setStep("winner")
                }}
              >
                Unlock My Reward →
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === "winner") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col relative overflow-hidden">
        <div className="w-full py-6 px-4 flex justify-center">
          <Logo />
        </div>

        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                {["🎉", "🎊", "⭐", "✨"][Math.floor(Math.random() * 4)]}
              </div>
            ))}
          </div>
        )}

        <div className="flex-1 flex items-center justify-center p-4 relative z-20">
          <div className="max-w-2xl w-full text-center space-y-8">
            <Gift className="w-12 h-12 mx-auto text-yellow-500" />

            <div className="space-y-3">
              <h1 className="text-3xl font-bold">Congratulations!</h1>
              <h2 className="text-xl font-bold text-green-600">You've Won a FREE PR Article</h2>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto">
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/010_thriveinsider-8sVaym2kpyM3Ui2oyVypLCWeGzqnmK.webp"
                    alt="Thrive Insider"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/029_bossesmag-qf0gFr7WSI81nXCkVwW3YKWEWkRS4O.webp"
                    alt="Bosses Mag"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                  <Image
                    src="/images/outlets/057_hustleweekly.webp"
                    alt="Hustle Weekly"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                  <Image src="/images/outlets/054_usawire.webp" alt="USA Wire" fill className="object-cover" />
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                  <Image src="/images/outlets/037_latabloid.webp" alt="LA Tabloid" fill className="object-cover" />
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-green-500 rounded-xl p-6 space-y-2">
              <p className="text-sm">
                We're giving away FREE articles to the first 50 people who take this quiz today.
              </p>
              <p className="text-lg font-bold text-green-600">You're winner #{winnerNumber} of 50</p>
              <p className="text-sm text-muted-foreground">Published in a professional USA-based publication</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <div className="flex -space-x-2">
                  {mainReviews.slice(0, 3).map((review, i) => (
                    <div key={i} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-background">
                      <Image src={review.image || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Join 4,847+ entrepreneurs</span>
              </div>
            </div>

            <Button
              size="lg"
              className="text-lg md:text-xl px-12 md:px-20 py-6 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg w-full max-w-md mx-auto"
              onClick={() => setStep("lead-capture")}
            >
              Claim My Free Article →
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Lead Capture - Name & Email
  if (step === "lead-capture") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
        <div className="w-full py-6 px-4 flex justify-center">
          <Logo />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Claim Your FREE Article</h2>
              <p className="text-muted-foreground">Enter your details to claim your prize:</p>
            </div>

            <form onSubmit={handleLeadCapture} className="bg-card border rounded-xl p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={leadData.name}
                  onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Your Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={leadData.email}
                  onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Your information is 100% secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>We'll never share your details</span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full px-16 py-5 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                Continue to Claim →
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  if (step === "phone-capture") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
        <StickyLogoBanner />

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full space-y-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Almost There, {leadData.name.split(" ")[0]}! 📱</h2>
              <p className="text-muted-foreground">We'll send you updates about your article via text message</p>
            </div>

            <form onSubmit={handlePhoneCapture} className="bg-card border rounded-xl p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Your Phone Number *</Label>
                <div className="flex gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectItem value="+1">🇺🇸 USA +1</SelectItem>
                      <SelectItem value="+44">🇬🇧 UK +44</SelectItem>
                      <SelectItem value="+61">🇦🇺 Australia +61</SelectItem>
                      <SelectItem value="+91">🇮🇳 India +91</SelectItem>
                      <SelectItem value="+86">🇨🇳 China +86</SelectItem>
                      <SelectItem value="+81">🇯🇵 Japan +81</SelectItem>
                      <SelectItem value="+49">🇩🇪 Germany +49</SelectItem>
                      <SelectItem value="+33">🇫🇷 France +33</SelectItem>
                      <SelectItem value="+39">🇮🇹 Italy +39</SelectItem>
                      <SelectItem value="+34">🇪🇸 Spain +34</SelectItem>
                      <SelectItem value="+52">🇲🇽 Mexico +52</SelectItem>
                      <SelectItem value="+55">🇧🇷 Brazil +55</SelectItem>
                      <SelectItem value="+7">🇷🇺 Russia +7</SelectItem>
                      <SelectItem value="+82">🇰🇷 South Korea +82</SelectItem>
                      <SelectItem value="+62">🇮🇩 Indonesia +62</SelectItem>
                      <SelectItem value="+90">🇹🇷 Turkey +90</SelectItem>
                      <SelectItem value="+966">🇸🇦 Saudi Arabia +966</SelectItem>
                      <SelectItem value="+27">🇿🇦 South Africa +27</SelectItem>
                      <SelectItem value="+234">🇳🇬 Nigeria +234</SelectItem>
                      <SelectItem value="+20">🇪🇬 Egypt +20</SelectItem>
                      <SelectItem value="+63">🇵🇭 Philippines +63</SelectItem>
                      <SelectItem value="+84">🇻🇳 Vietnam +84</SelectItem>
                      <SelectItem value="+66">🇹🇭 Thailand +66</SelectItem>
                      <SelectItem value="+60">🇲🇾 Malaysia +60</SelectItem>
                      <SelectItem value="+65">🇸🇬 Singapore +65</SelectItem>
                      <SelectItem value="+64">🇳🇿 New Zealand +64</SelectItem>
                      <SelectItem value="+48">🇵🇱 Poland +48</SelectItem>
                      <SelectItem value="+31">🇳🇱 Netherlands +31</SelectItem>
                      <SelectItem value="+32">🇧🇪 Belgium +32</SelectItem>
                      <SelectItem value="+41">🇨🇭 Switzerland +41</SelectItem>
                      <SelectItem value="+43">🇦🇹 Austria +43</SelectItem>
                      <SelectItem value="+45">🇩🇰 Denmark +45</SelectItem>
                      <SelectItem value="+46">🇸🇪 Sweden +46</SelectItem>
                      <SelectItem value="+47">🇳🇴 Norway +47</SelectItem>
                      <SelectItem value="+358">🇫🇮 Finland +358</SelectItem>
                      <SelectItem value="+351">🇵🇹 Portugal +351</SelectItem>
                      <SelectItem value="+30">🇬🇷 Greece +30</SelectItem>
                      <SelectItem value="+420">🇨🇿 Czech Republic +420</SelectItem>
                      <SelectItem value="+36">🇭🇺 Hungary +36</SelectItem>
                      <SelectItem value="+40">🇷🇴 Romania +40</SelectItem>
                      <SelectItem value="+353">🇮🇪 Ireland +353</SelectItem>
                      <SelectItem value="+972">🇮🇱 Israel +972</SelectItem>
                      <SelectItem value="+971">🇦🇪 UAE +971</SelectItem>
                      <SelectItem value="+974">🇶🇦 Qatar +974</SelectItem>
                      <SelectItem value="+965">🇰🇼 Kuwait +965</SelectItem>
                      <SelectItem value="+92">🇵🇰 Pakistan +92</SelectItem>
                      <SelectItem value="+880">🇧🇩 Bangladesh +880</SelectItem>
                      <SelectItem value="+94">🇱🇰 Sri Lanka +94</SelectItem>
                      <SelectItem value="+977">🇳🇵 Nepal +977</SelectItem>
                      <SelectItem value="+54">🇦🇷 Argentina +54</SelectItem>
                      <SelectItem value="+56">🇨🇱 Chile +56</SelectItem>
                      <SelectItem value="+57">🇨🇴 Colombia +57</SelectItem>
                      <SelectItem value="+51">🇵🇪 Peru +51</SelectItem>
                      <SelectItem value="+58">🇻🇪 Venezuela +58</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={leadData.phone || ""}
                    onChange={(e) => setLeadData({ ...leadData, phone: `${countryCode} ${e.target.value}` })}
                    placeholder="(555) 123-4567"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Get instant updates on your article status</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Direct line to our support team</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>No spam, only important updates</span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full px-16 py-5 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                Claim My Article →
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  if (step === "article-selection") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
        <StickyLogoBanner />

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full space-y-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="text-center space-y-2">
              <h2 className="font-bold text-3xl">Choose Your FREE Article 📰</h2>
              <p className="text-muted-foreground">Select which publication you'd like to be featured in:</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {ARTICLE_PUBLICATIONS.map((pub) => (
                <button
                  key={pub.id}
                  onClick={() => handleArticleSelection({ name: pub.name, logo: pub.logo })}
                  className="relative bg-card rounded-xl p-4 hover:shadow-lg transition-all group overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 opacity-100 animate-gradient-x"></div>
                  <div className="absolute inset-[2px] rounded-xl bg-card"></div>
                  <div className="relative flex flex-col items-center gap-2">
                    <div className="relative w-full h-10 flex items-center justify-center">
                      <Image
                        src={pub.logo || "/placeholder.svg"}
                        alt={pub.name}
                        width={90}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium group-hover:text-blue-500 transition-colors">{pub.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === "article-questions") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
        <StickyLogoBanner />

        <div className="flex-1 flex flex-col items-center p-4 pt-4">
          <div className="max-w-2xl w-full space-y-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Let's Personalize Your Article ✍️</h2>
              <p className="text-muted-foreground">
                Answer a few quick questions so we can create the perfect article for you:
              </p>
            </div>

            <form onSubmit={handleArticleQuestion} className="bg-card border rounded-xl p-8 space-y-6">
              <p className="text-sm text-muted-foreground">Question {articleQuestionIndex + 1} of 4</p>

              {articleQuestionIndex === 0 && (
                <div className="space-y-2">
                  <Label htmlFor="company">What's your company/brand name?</Label>
                  <Input
                    id="company"
                    type="text"
                    required
                    value={leadData.companyName || ""}
                    onChange={(e) => setLeadData({ ...leadData, companyName: e.target.value })}
                    placeholder="Acme Inc."
                  />
                </div>
              )}

              {articleQuestionIndex === 1 && (
                <div className="space-y-3">
                  <Label>What should your article focus on?</Label>
                  <RadioGroup
                    required
                    value={leadData.articleAngle}
                    onValueChange={(value) => setLeadData({ ...leadData, articleAngle: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="launch" id="launch" />
                      <Label htmlFor="launch">Company launch/announcement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="founder" id="founder" />
                      <Label htmlFor="founder">Founder story & journey</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="innovation" id="innovation" />
                      <Label htmlFor="innovation">Product/service innovation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="expertise" id="expertise" />
                      <Label htmlFor="expertise">Industry expertise & insights</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {articleQuestionIndex === 2 && (
                <div className="space-y-2">
                  <Label htmlFor="message">What's the main message you want to convey?</Label>
                  <Textarea
                    id="message"
                    required
                    rows={4}
                    value={leadData.keyMessage || ""}
                    onChange={(e) => setLeadData({ ...leadData, keyMessage: e.target.value })}
                    placeholder="e.g., We help small businesses get affordable PR"
                  />
                </div>
              )}

              {articleQuestionIndex === 3 && (
                <div className="space-y-2">
                  <Label htmlFor="website">What's your website or social media link?</Label>
                  <Input
                    id="website"
                    type="text"
                    required
                    value={leadData.website || ""}
                    onChange={(e) => setLeadData({ ...leadData, website: e.target.value })}
                    placeholder="example.com or @yourhandle"
                  />
                  <p className="text-sm text-muted-foreground">(We'll include this in your article for free!)</p>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full text-xl px-20 py-6 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                {articleQuestionIndex < 3 ? "Next Question →" : "Complete Article Setup →"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Processing
  if (step === "processing") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
        <div className="w-full py-6 px-4 flex justify-center">
          <Logo />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-8">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Setting Up Your Article</h2>
              <p className="text-muted-foreground">Preparing your personalized options...</p>
            </div>
            <div className="space-y-3 text-left max-w-xs mx-auto">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">Publication selected</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">Article angle defined</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-muted-foreground">Finalizing details...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === "writing-offer") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-4 px-4">
        <StickyLogoBanner />

        <div className="max-w-4xl mx-auto space-y-8 pb-24 pt-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center space-y-4">
            <h1 className="text-base md:text-lg font-bold">🎁 EXCLUSIVE WINNER'S BONUS 🎁</h1>
            <p className="text-xl">Your FREE article placement is confirmed!</p>
            <p className="text-lg text-muted-foreground">Unlock 50% OFF professional writing...</p>
          </div>

          <div className="text-center">
            <div className="relative w-full max-w-xs md:max-w-md mx-auto aspect-video">
              <Image
                src="/professional-pr-writing-team.jpg"
                alt="Professional PR Team"
                fill
                className="rounded-xl object-cover"
              />
            </div>
            <p className="mt-4 font-semibold">Meet Your PR Writing Team</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500 rounded-xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">⭐ PROFESSIONAL WRITING</h3>
              <p className="text-lg font-semibold text-yellow-600">(Winner's Exclusive 50% OFF)</p>
            </div>

            <div className="grid md:grid-cols-2 gap-3 text-sm">
              {[
                "Written by experienced journalists",
                "Unlimited revisions until perfect",
                "Human support & PR consultation",
                "500-1000 words of professional copy",
                'FREE "As Seen On" badge for your website',
                "Article stays live forever",
                "FREE backlinks to your website",
                "FREE contact info & social links included",
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="text-center space-y-2 py-4 border-t border-b">
              <p className="text-sm text-muted-foreground line-through">Regular Price: $89.99</p>
              <p className="text-4xl font-bold">$44.99</p>
              <p className="text-lg font-semibold text-green-600">YOU SAVE $45.00 (50% OFF)</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-muted-foreground">This offer expires in</span>
                <span>⏰</span>
                <span className="font-mono font-bold text-red-600">{formatTime(timeLeft)}</span>
              </div>
              <p className="text-center text-sm text-muted-foreground">🔥 Only for quiz winners</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center">💬 What Quiz Winners Are Saying:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  quote: "I can't write to save my life. $44.99 was a no-brainer for professional quality.",
                  author: "Priya W., E-commerce Owner",
                  image: mainReviews[5].image, // Female pfp
                },
                {
                  quote: "The article was 10x better than I could have written. Worth every penny.",
                  author: "Marcus T., Startup Founder",
                  image: mainReviews[0].image, // Male pfp
                },
                {
                  quote: "Got my article in 3 days. The backlinks alone were worth the price.",
                  author: "Amanda P., Content Creator",
                  image: mainReviews[6].image, // Female pfp
                },
              ].map((testimonial, i) => (
                <div key={i} className="bg-card border rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3 h-3 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm italic">"{testimonial.quote}"</p>
                  <p className="text-sm font-medium">- {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center space-y-2 py-6">
            <p className="text-lg font-semibold">🔒 100% Money-Back Guarantee</p>
            <p className="text-muted-foreground">If you're not satisfied, we'll refund every penny.</p>
          </div>
        </div>

        {showCheckAnimation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border rounded-xl p-8 max-w-md w-full mx-4 space-y-4">
              <h3 className="text-2xl font-bold text-center">Processing Your Order...</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 transition-all duration-500">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${checkedItems.includes(0) ? "bg-green-500 border-green-500 scale-110" : "border-muted"}`}
                  >
                    {checkedItems.includes(0) && <Check className="w-5 h-5 text-white" />}
                  </div>
                  <span className={`text-sm ${checkedItems.includes(0) ? "font-semibold" : ""}`}>
                    Writing service selected
                  </span>
                </div>
                <div className="flex items-center gap-3 transition-all duration-500">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${checkedItems.includes(1) ? "bg-green-500 border-green-500 scale-110" : "border-muted"}`}
                  >
                    {checkedItems.includes(1) && <Check className="w-5 h-5 text-white" />}
                  </div>
                  <span className={`text-sm ${checkedItems.includes(1) ? "font-semibold" : ""}`}>Discount applied</span>
                </div>
                <div className="flex items-center gap-3 transition-all duration-500">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${checkedItems.includes(2) ? "bg-green-500 border-green-500 scale-110" : "border-muted"}`}
                  >
                    {checkedItems.includes(2) && <Check className="w-5 h-5 text-white" />}
                  </div>
                  <span className={`text-sm ${checkedItems.includes(2) ? "font-semibold" : ""}`}>
                    Payment gateway initiated
                  </span>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full text-lg px-16 py-5 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                onClick={handleSelectProfessionalWriting}
                disabled={!checkedItems.includes(2)}
              >
                Proceed to Payment →
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (step === "payment") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
        <StickyLogoBanner />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-8">
            <h2 className="text-3xl font-bold">Confirm Your Payment</h2>
            <p className="text-muted-foreground">
              You are about to secure your exclusive 50% discount for professional PR writing.
            </p>
            <QuizCheckout price={44.99} onPaymentComplete={handlePaymentComplete} />
          </div>
        </div>
      </div>
    )
  }

  if (step === "upsell") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-4 px-4">
        <StickyLogoBanner />

        <div className="max-w-4xl mx-auto space-y-8 pb-24 pt-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center space-y-4">
            <h1 className="text-base md:text-lg font-bold">🚀 FINAL UPGRADE OFFER 🚀</h1>
            <p className="text-xl">Don't Miss This Opportunity!</p>
            <p className="text-lg text-muted-foreground">
              Add our "PR Accelerator" package to maximize your launch impact.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500 rounded-xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">⭐ PR ACCELERATOR</h3>
              <p className="text-lg font-semibold text-blue-600">(Limited-Time Upsell)</p>
            </div>

            <div className="grid md:grid-cols-2 gap-3 text-sm">
              {[
                "Expedited Article Placement (within 48 hours)",
                "Social Media Promotion (5 posts across our network)",
                "Direct Outreach to 50+ relevant journalists",
                "Press Release Distribution to 100+ outlets",
                "Dedicated PR Manager for 1 week",
                "Performance Report & Analytics",
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="text-center space-y-2 py-4 border-t border-b">
              <p className="text-sm text-muted-foreground line-through">Regular Price: $299.00</p>
              <p className="text-4xl font-bold">$99.00</p>
              <p className="text-lg font-semibold text-blue-600">YOU SAVE $200.00</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-muted-foreground">This offer expires in</span>
                <span>⏰</span>
                <span className="font-mono font-bold text-red-600">{formatTime(upsellTimeLeft)}</span>
              </div>
              <p className="text-center text-sm text-muted-foreground">🔥 Only for new article winners</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="text-xl px-12 py-6 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
              onClick={handleUpsellAccept}
            >
              Yes, Accelerate My PR! →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-xl px-12 py-6 h-auto rounded-full border-muted-foreground text-muted-foreground hover:bg-muted/10 bg-transparent"
              onClick={handleUpsellDecline}
            >
              No Thanks
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (step === "thank-you") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
        <div className="w-full py-6 px-4 flex justify-center">
          <Logo />
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-8">
            <Check className="w-16 h-16 mx-auto text-green-500" />
            <div className="space-y-3">
              <h1 className="text-4xl font-bold">Thank You!</h1>
              <p className="text-xl text-muted-foreground">
                We've received your information and will be in touch shortly to finalize your article.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-lg font-semibold">What to Expect Next:</p>
              <ul className="space-y-2 text-left text-muted-foreground list-disc list-inside">
                <li>A confirmation email with your article details.</li>
                <li>Our team will review your input and reach out for any clarifications.</li>
                <li>You'll receive a draft of your article within 2-3 business days.</li>
                <li>Final review and publication!</li>
              </ul>
            </div>

            <Button
              size="lg"
              className="text-lg px-16 py-5 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              onClick={() => window.open("https://prlaunch.io", "_blank")}
            >
              Visit Our Website
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
