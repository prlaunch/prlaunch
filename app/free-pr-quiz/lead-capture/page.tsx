"use client"

import type React from "react"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function LeadCapturePage() {
  const router = useRouter()
  const { leadData, setLeadData } = useQuiz()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/free-pr-quiz/phone-capture")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <StickyLogoBanner />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Claim Your FREE Article</h2>
            <p className="text-muted-foreground">Enter your details to claim your prize:</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-8 space-y-6">
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
