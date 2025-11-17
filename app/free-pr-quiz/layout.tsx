import type React from "react"
import { QuizProvider } from "@/lib/quiz-context"

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <QuizProvider>
      <div className="quiz-layout">{children}</div>
    </QuizProvider>
  )
}
