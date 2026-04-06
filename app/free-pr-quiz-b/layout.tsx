import type React from "react"
import { QuizProvider } from "@/lib/quiz-context"

export default function QuizBLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <QuizProvider>{children}</QuizProvider>
}
