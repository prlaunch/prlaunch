"use client"

import type React from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function PhoneCapturePage() {
  const router = useRouter()
  const { leadData, setLeadData, countryCode, setCountryCode } = useQuiz()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadData.phone) return
    router.push("/free-pr-quiz/article-selection")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <StickyLogoBanner />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Almost There, {leadData.name.split(" ")[0]}! 📱</h2>
            <p className="text-muted-foreground">We'll send you updates about your article via text message</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Your Phone Number *</Label>
              <div className="flex gap-2">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1">🇺🇸 +1</SelectItem>
                    <SelectItem value="+44">🇬🇧 +44</SelectItem>
                    <SelectItem value="+61">🇦🇺 +61</SelectItem>
                    <SelectItem value="+91">🇮🇳 +91</SelectItem>
                    <SelectItem value="+86">🇨🇳 +86</SelectItem>
                    <SelectItem value="+81">🇯🇵 +81</SelectItem>
                    <SelectItem value="+49">🇩🇪 +49</SelectItem>
                    <SelectItem value="+33">🇫🇷 +33</SelectItem>
                    <SelectItem value="+39">🇮🇹 +39</SelectItem>
                    <SelectItem value="+34">🇪🇸 +34</SelectItem>
                    <SelectItem value="+52">🇲🇽 +52</SelectItem>
                    <SelectItem value="+55">🇧🇷 +55</SelectItem>
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
