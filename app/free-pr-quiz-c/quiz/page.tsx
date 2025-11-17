"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { QuizLogo } from "@/components/quiz-logo"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const QUESTIONS = [
  {
    id: 1,
    key: "goal" as const,
    question:
      "Imagine seeing your name in USA Wire, LA Tabloid, or a major publication. How would that change your business?",
    answers: [
      { emoji: "🚀", title: "GAME CHANGER", subtitle: "Instant credibility boost" },
      { emoji: "💰", title: "MORE CLIENTS", subtitle: "People would trust me more" },
      { emoji: "⭐", title: "VALIDATION", subtitle: "Finally be taken seriously" },
      { emoji: "🎯", title: "OPPORTUNITIES", subtitle: "Doors would open" },
    ],
    socialProof: null,
  },
  {
    id: 2,
    key: "stage" as const,
    question: "What's currently holding your business back from growing faster?",
    answers: [
      { emoji: "😔", title: "NO CREDIBILITY", subtitle: "People don't trust me yet" },
      { emoji: "🔍", title: "INVISIBLE", subtitle: "No one knows I exist" },
      { emoji: "💸", title: "EXPENSIVE ADS", subtitle: "Spending too much on marketing" },
      { emoji: "🤝", title: "HARD TO CLOSE", subtitle: "Prospects don't convert" },
    ],
    socialProof: "87% of businesses said press coverage solved this problem",
  },
  {
    id: 3,
    key: "presence" as const,
    question: "When you see competitors featured in major publications, how does that make you feel?",
    answers: [
      { emoji: "😤", title: "FRUSTRATED", subtitle: "That should be me" },
      { emoji: "😰", title: "BEHIND", subtitle: "I'm falling behind" },
      { emoji: "💪", title: "MOTIVATED", subtitle: "If they can, so can I" },
      { emoji: "🤔", title: "CURIOUS", subtitle: "How did they do it?" },
    ],
    socialProof: null,
  },
  {
    id: 4,
    key: "challenge" as const,
    question: "If you could get featured in a major publication for FREE, how soon would you want it?",
    answers: [
      { emoji: "🔥", title: "RIGHT NOW", subtitle: "I need this ASAP" },
      { emoji: "📅", title: "THIS WEEK", subtitle: "Within 7 days" },
      { emoji: "⏰", title: "THIS MONTH", subtitle: "Within 30 days" },
      { emoji: "🤷", title: "NO RUSH", subtitle: "Whenever it's ready" },
    ],
    socialProof: null,
  },
  {
    id: 5,
    key: "urgency" as const,
    question: "What would you use press coverage for?",
    answers: [
      { emoji: "💼", title: "CREDIBILITY", subtitle: "Build trust with clients" },
      { emoji: "🌐", title: "WEBSITE", subtitle: '"As Seen In" badges' },
      { emoji: "📱", title: "SOCIAL MEDIA", subtitle: "Share with my audience" },
      { emoji: "📧", title: "SALES", subtitle: "Close more deals" },
    ],
    socialProof: null,
    badge: "Almost there! 🎉",
  },
  {
    id: 6,
    key: "featured" as const,
    question: "Are you ready to get featured in a major publication?",
    answers: [
      { emoji: "🚀", title: "ABSOLUTELY", subtitle: "I'm 100% ready" },
      { emoji: "✅", title: "YES", subtitle: "Let's do this" },
      { emoji: "🤔", title: "MAYBE", subtitle: "Want to learn more first" },
      { emoji: "🌱", title: "NOT YET", subtitle: "But soon" },
    ],
    socialProof: null,
    badge: "Last question! 🎯",
  },
]

export default function QuizCQuestionsPage() {
  const router = useRouter()
  const { answers, setAnswers } = useQuiz()
  const [currentQuestion, setCurrentQuestion] = useState(1)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const question = QUESTIONS[currentQuestion - 1]
  const progress = (currentQuestion / QUESTIONS.length) * 100

  const handleAnswer = (answerText: string) => {
    setAnswers({ ...answers, [question.key]: answerText })

    if (currentQuestion < QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/free-pr-quiz-c/calculating")
    }
  }

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Logo */}
        <div className="flex justify-center mb-8 md:mb-12">
          <QuizLogo />
        </div>

        {/* Back Button */}
        {currentQuestion > 1 && (
          <div className="flex justify-start mb-6 max-w-2xl mx-auto">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8">
          <div className="flex justify-between text-xs md:text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion}/6</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Badge (for Q5 and Q6) */}
        {question.badge && (
          <div className="flex justify-center mb-4">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-xs md:text-sm font-semibold">
              {question.badge}
            </div>
          </div>
        )}

        {/* Question */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-12 text-balance max-w-3xl mx-auto">
          {question.question}
        </h2>

        {/* Answer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto mb-6">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer.title)}
              className="p-4 md:p-6 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center min-h-[100px] md:min-h-[120px] flex flex-col items-center justify-center"
            >
              <div className="text-3xl md:text-4xl mb-2">{answer.emoji}</div>
              <div className="font-semibold text-sm md:text-base mb-1">{answer.title}</div>
              <div className="text-xs md:text-sm text-gray-600">{answer.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Social Proof */}
        {question.socialProof && (
          <p className="text-xs md:text-sm text-gray-500 text-center mt-6">{question.socialProof}</p>
        )}
      </div>
    </div>
  )
}
