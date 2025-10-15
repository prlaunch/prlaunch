"use client"

import { useState } from "react"
import { CheckCircle2, Sparkles, TrendingUp, Target, Lightbulb, Users, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Answer = {
  question: number
  answer: string
}

const questions = [
  {
    id: 1,
    question: "What stage is your business in?",
    options: [
      { text: "Just getting started (0-6 months)", icon: Sparkles, value: "starting" },
      { text: "Early growth (6 months - 2 years)", icon: TrendingUp, value: "early" },
      { text: "Established (2+ years)", icon: Target, value: "established" },
      { text: "Launching something new", icon: Lightbulb, value: "launching" },
    ],
  },
  {
    id: 2,
    question: "What's your primary goal with media coverage?",
    options: [
      { text: "Attract more customers", icon: Users, value: "customers" },
      { text: "Build industry credibility", icon: Target, value: "credibility" },
      { text: "Position myself as an expert", icon: Lightbulb, value: "expert" },
      { text: "Differentiate from competitors", icon: Sparkles, value: "differentiate" },
      { text: "Grow brand awareness", icon: TrendingUp, value: "awareness" },
    ],
  },
  {
    id: 3,
    question: "Which describes your story best?",
    options: [
      { text: "Unique approach or innovation", icon: Lightbulb, value: "innovation" },
      { text: "Impressive milestone or growth", icon: TrendingUp, value: "milestone" },
      { text: "Solving an important problem", icon: Target, value: "problem" },
      { text: "Expert insights to share", icon: Sparkles, value: "insights" },
      { text: "Community impact or mission", icon: Users, value: "impact" },
    ],
  },
  {
    id: 4,
    question: "What's held you back from getting press?",
    options: [
      { text: "Don't know where to start", icon: Target, value: "start" },
      { text: 'Think my story isn\'t "big enough"', icon: Sparkles, value: "story" },
      { text: "Concerned about cost", icon: TrendingUp, value: "cost" },
      { text: "Don't have time to pitch", icon: Lightbulb, value: "time" },
      { text: "Haven't tried yet", icon: Users, value: "nottried" },
    ],
  },
]

export function PRQuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleAnswer = (answer: string) => {
    setSelectedOption(answer)

    setTimeout(() => {
      const newAnswers = [...answers, { question: currentQuestion, answer }]
      setAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
      } else {
        setIsAnalyzing(true)
        setTimeout(() => {
          setIsAnalyzing(false)
          setShowResults(true)
        }, 2500)
      }
    }, 300)
  }

  const getPersonalizedResults = () => {
    const stage = answers.find((a) => a.question === 0)?.answer
    const goal = answers.find((a) => a.question === 1)?.answer
    const heldBack = answers.find((a) => a.question === 3)?.answer

    const results = []

    if (stage === "starting") {
      results.push("Early coverage builds instant credibility when you need it most")
    } else if (stage === "established") {
      results.push("Your track record gives you the proof points media outlets love")
    } else if (stage === "early") {
      results.push("You're at the perfect stage to leverage media for accelerated growth")
    } else {
      results.push("Fresh launches get exceptional media attention and coverage")
    }

    if (goal === "credibility") {
      results.push("Media features are the fastest way to establish authority in your industry")
    } else if (goal === "customers") {
      results.push("Press coverage converts 3-5x better than traditional advertising")
    } else if (goal === "expert") {
      results.push("Published articles position you as the go-to expert in your field")
    } else if (goal === "awareness") {
      results.push("Media exposure reaches thousands of potential customers instantly")
    } else {
      results.push("Stand out from competitors with credible third-party validation")
    }

    if (heldBack === "start") {
      results.push("That's exactly why our done-for-you service exists - we handle everything")
    } else if (heldBack === "story") {
      results.push("Every business has a story worth telling - our writers know how to find it")
    } else if (heldBack === "cost") {
      results.push("At $47, this is 95% less expensive than traditional PR agencies")
    } else if (heldBack === "time") {
      results.push("You invest just 5 minutes - we do all the writing and publishing")
    } else {
      results.push("Now is the perfect time to start building your media presence")
    }

    return results
  }

  const getReadinessScore = () => {
    return Math.floor(Math.random() * (97 - 85 + 1)) + 85
  }

  if (isAnalyzing) {
    return (
      <section className="py-8 md:py-12 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse" />
                  <Loader2 className="w-10 h-10 text-blue-600 animate-spin relative" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Analyzing Your Answers...</h3>
                  <p className="text-xs text-slate-600">Calculating your PR readiness score</p>
                </div>
                <div className="w-full max-w-xs h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 animate-[loadingBar_2.5s_ease-out]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (showResults) {
    const personalizedResults = getPersonalizedResults()
    const score = getReadinessScore()

    return (
      <section className="py-8 md:py-12 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-5 md:p-6">
              <div className="flex justify-center mb-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse" />
                  <CheckCircle2 className="w-10 h-10 text-green-500 relative" strokeWidth={2} />
                </div>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-slate-900 text-center mb-2">
                Great News - PR Is Perfect For You!
              </h2>

              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                <p className="text-xs font-semibold text-slate-700">
                  Your PR Readiness Score: <span className="text-green-600">{score}%</span>
                </p>
              </div>

              <div className="space-y-2 mb-4">
                {personalizedResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-2.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 leading-relaxed">{result}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-600 text-center mb-4 leading-relaxed">
                Based on your answers, you're in an excellent position to benefit from media coverage. Our professional
                writers will craft your story, and you'll be published in reputable USA outlets within 5-7 days.
              </p>

              <div className="text-center">
                <Link href="/checkout">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:opacity-90 text-white font-semibold px-5 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Published for $47 →
                  </Button>
                </Link>
                <p className="text-xs text-slate-500 mt-1.5">Professional writers • USA outlets • 5-7 day turnaround</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1.5">See If PR Is Right For You</h2>
            <p className="text-slate-600 text-xs">Answer 4 quick questions to discover your PR potential</p>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-xs font-medium text-slate-600">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-5 md:p-6">
            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4 text-center">{currentQ.question}</h3>

            <div className="space-y-1.5">
              {currentQ.options.map((option) => {
                const Icon = option.icon
                const isSelected = selectedOption === option.value

                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full flex items-center gap-2.5 p-2.5 rounded-lg border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md scale-[0.98]"
                        : "border-slate-200 hover:border-blue-300 hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-600 to-purple-600"
                          : "bg-slate-100 group-hover:bg-slate-200"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-600"}`} />
                    </div>
                    <span
                      className={`text-left font-medium text-xs ${isSelected ? "text-slate-900" : "text-slate-700"}`}
                    >
                      {option.text}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
