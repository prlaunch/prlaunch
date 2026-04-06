"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { StickyLogoBanner } from "@/components/quiz-logo"
import { useQuiz } from "@/lib/quiz-context"

export default function DIYQualificationPage() {
  const router = useRouter()
  const { diyQualification, setDIYQualification } = useQuiz()
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState({
    writingComfort: diyQualification.writingComfort || "",
    timeAvailable: diyQualification.timeAvailable || "",
    writingExperience: diyQualification.writingExperience || "",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const questions = [
    {
      id: 1,
      question: "How comfortable are you with writing?",
      field: "writingComfort" as const,
      options: [
        { value: "very-comfortable", label: "Very comfortable - I write regularly" },
        { value: "somewhat-comfortable", label: "Somewhat comfortable - I can write when needed" },
        { value: "not-comfortable", label: "Not comfortable - Writing is challenging for me" },
      ],
    },
    {
      id: 2,
      question: "Do you have 8-13 hours available in the next 14 days?",
      field: "timeAvailable" as const,
      options: [
        { value: "yes-time", label: "Yes, I have plenty of time" },
        { value: "maybe-time", label: "Maybe, I'm pretty busy but could make time" },
        { value: "no-time", label: "No, I'm too busy right now" },
      ],
    },
    {
      id: 3,
      question: "Have you written articles or blog posts before?",
      field: "writingExperience" as const,
      options: [
        { value: "yes-experience", label: "Yes, I've written multiple articles" },
        { value: "some-experience", label: "I've written a few things" },
        { value: "no-experience", label: "No, this would be my first" },
      ],
    },
  ]

  const currentQ = questions[currentQuestion - 1]
  const currentAnswer = answers[currentQ.field]

  const handleNext = () => {
    if (currentQuestion < 3) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsLoading(true)
      setDIYQualification(answers)
      router.push("/free-pr-quiz/diy-recommendation")
    }
  }

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQ.field]: value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-4 px-4">
      <StickyLogoBanner />

      <div className="max-w-2xl mx-auto space-y-8 pb-24 pt-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Question {currentQuestion} of 3</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-card border rounded-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center">{currentQ.question}</h2>

          <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange} className="space-y-3">
            {currentQ.options.map((option) => (
              <div
                key={option.value}
                className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  currentAnswer === option.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-muted hover:border-blue-200 hover:bg-muted/50"
                }`}
                onClick={() => handleAnswerChange(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            className="px-12 py-3 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            onClick={handleNext}
            disabled={!currentAnswer || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Loading...
              </>
            ) : currentQuestion === 3 ? (
              "See My Recommendation →"
            ) : (
              "Next Question →"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
