"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface QuizAnswers {
  goal?: string
  stage?: string
  presence?: string
  challenge?: string
  urgency?: string
  featured?: string
}

export interface LeadData {
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

export interface DIYQualificationAnswers {
  writingComfort?: string
  timeAvailable?: string
  writingExperience?: string
}

interface QuizContextType {
  answers: QuizAnswers
  setAnswers: (answers: QuizAnswers) => void
  leadData: LeadData
  setLeadData: (data: LeadData) => void
  currentQuestion: number
  setCurrentQuestion: (q: number) => void
  articleQuestionIndex: number
  setArticleQuestionIndex: (i: number) => void
  mysteryRewardClaimed: boolean
  setMysteryRewardClaimed: (claimed: boolean) => void
  score: number
  setScore: (score: number) => void
  winnerNumber: number
  countryCode: string
  setCountryCode: (code: string) => void
  customerId: string
  setCustomerId: (id: string) => void
  diyQualification: DIYQualificationAnswers
  setDIYQualification: (answers: DIYQualificationAnswers) => void
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswersState] = useState<QuizAnswers>({})
  const [leadData, setLeadDataState] = useState<LeadData>({
    name: "",
    email: "",
  })
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [articleQuestionIndex, setArticleQuestionIndex] = useState(0)
  const [mysteryRewardClaimed, setMysteryRewardClaimed] = useState(false)
  const [score, setScore] = useState(87)
  const [winnerNumber] = useState(Math.floor(Math.random() * 13) + 37)
  const [countryCode, setCountryCode] = useState("+1")
  const [customerId, setCustomerIdState] = useState("")
  const [diyQualification, setDIYQualificationState] = useState<DIYQualificationAnswers>({})

  useEffect(() => {
    const savedAnswers = localStorage.getItem("quizAnswers")
    const savedLeadData = localStorage.getItem("quizLeadData")
    const savedQuestion = localStorage.getItem("quizCurrentQuestion")
    const savedArticleQuestion = localStorage.getItem("quizArticleQuestion")
    const savedMystery = localStorage.getItem("quizMysteryReward")
    const savedCustomerId = localStorage.getItem("quizCustomerId")
    const savedDIYQualification = localStorage.getItem("quizDIYQualification")

    if (savedAnswers) setAnswersState(JSON.parse(savedAnswers))
    if (savedLeadData) setLeadDataState(JSON.parse(savedLeadData))
    if (savedQuestion) setCurrentQuestion(Number.parseInt(savedQuestion))
    if (savedArticleQuestion) setArticleQuestionIndex(Number.parseInt(savedArticleQuestion))
    if (savedMystery) setMysteryRewardClaimed(JSON.parse(savedMystery))
    if (savedCustomerId) setCustomerIdState(savedCustomerId)
    if (savedDIYQualification) setDIYQualificationState(JSON.parse(savedDIYQualification))
  }, [])

  const setAnswers = (newAnswers: QuizAnswers) => {
    setAnswersState(newAnswers)
    localStorage.setItem("quizAnswers", JSON.stringify(newAnswers))
  }

  const setLeadData = (newData: LeadData) => {
    setLeadDataState(newData)
    localStorage.setItem("quizLeadData", JSON.stringify(newData))
  }

  const setCustomerId = (id: string) => {
    setCustomerIdState(id)
    localStorage.setItem("quizCustomerId", id)
  }

  const setDIYQualification = (newAnswers: DIYQualificationAnswers) => {
    setDIYQualificationState(newAnswers)
    localStorage.setItem("quizDIYQualification", JSON.stringify(newAnswers))
  }

  useEffect(() => {
    localStorage.setItem("quizCurrentQuestion", currentQuestion.toString())
  }, [currentQuestion])

  useEffect(() => {
    localStorage.setItem("quizArticleQuestion", articleQuestionIndex.toString())
  }, [articleQuestionIndex])

  useEffect(() => {
    localStorage.setItem("quizMysteryReward", JSON.stringify(mysteryRewardClaimed))
  }, [mysteryRewardClaimed])

  return (
    <QuizContext.Provider
      value={{
        answers,
        setAnswers,
        leadData,
        setLeadData,
        currentQuestion,
        setCurrentQuestion,
        articleQuestionIndex,
        setArticleQuestionIndex,
        mysteryRewardClaimed,
        setMysteryRewardClaimed,
        score,
        setScore,
        winnerNumber,
        countryCode,
        setCountryCode,
        customerId,
        setCustomerId,
        diyQualification,
        setDIYQualification,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider")
  }
  return context
}
