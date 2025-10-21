"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { StickyLogoBanner } from "@/components/quiz-logo"
import { PolicyModal } from "@/components/policy-modal"
import Image from "next/image"

export default function LeadCapturePage() {
  const router = useRouter()
  const { leadData, setLeadData } = useQuiz()
  const [isLoading, setIsLoading] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showPolicyModal, setShowPolicyModal] = useState(false)
  const [policyType, setPolicyType] = useState<"terms" | "privacy">("terms")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted) {
      return
    }
    setIsLoading(true)
    router.push("/free-pr-quiz/article-selection")
  }

  const openPolicyModal = (type: "terms" | "privacy") => {
    setPolicyType(type)
    setShowPolicyModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <StickyLogoBanner />

      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="max-w-md w-full space-y-6">
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

            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => openPolicyModal("terms")}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() => openPolicyModal("privacy")}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Privacy Policy
                </button>
              </label>
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
              className="w-full px-8 md:px-16 py-4 md:py-5 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white whitespace-normal text-center"
              disabled={isLoading || !termsAccepted}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Continue to Claim →"
              )}
            </Button>
          </form>

          <Card className="bg-white border p-6">
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image src="/testimonials/profile-2.jpg" alt="Sarah M." fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  "I was skeptical about the free offer, but it's 100% legit. My article is live and I've shared it with
                  investors."
                </p>
                <p className="text-xs font-semibold text-gray-900">Sarah M., Marketing Consultant</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <PolicyModal open={showPolicyModal} onOpenChange={setShowPolicyModal} type={policyType} />
    </div>
  )
}
