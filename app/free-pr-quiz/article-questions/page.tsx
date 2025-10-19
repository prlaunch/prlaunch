"use client"

import type React from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function ArticleQuestionsPage() {
  const router = useRouter()
  const { leadData, setLeadData, articleQuestionIndex, setArticleQuestionIndex } = useQuiz()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (articleQuestionIndex < 3) {
      setArticleQuestionIndex(articleQuestionIndex + 1)
    } else {
      router.push("/free-pr-quiz/processing")
    }
  }

  const handleBack = () => {
    if (articleQuestionIndex > 0) {
      setArticleQuestionIndex(articleQuestionIndex - 1)
    } else {
      router.back()
    }
  }

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

          <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-8 space-y-6">
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
