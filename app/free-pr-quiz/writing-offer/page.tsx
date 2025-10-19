"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, Check, Loader2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { mainReviews } from "@/lib/reviews-data"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function WritingOfferPage() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60)
  const [showCheckAnimation, setShowCheckAnimation] = useState(false)
  const [checkedItems, setCheckedItems] = useState<number[]>([])
  const [isLoadingPro, setIsLoadingPro] = useState(false)
  const [isLoadingDIY, setIsLoadingDIY] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSelectProfessionalWriting = () => {
    setIsLoadingPro(true)
    setShowCheckAnimation(true)
    setCheckedItems([])

    setTimeout(() => setCheckedItems([0]), 1500)
    setTimeout(() => setCheckedItems([0, 1]), 3000)
    setTimeout(() => setCheckedItems([0, 1, 2]), 4500)
    setTimeout(() => {
      setShowCheckAnimation(false)
      router.push("/free-pr-quiz/payment")
    }, 6000)
  }

  const handleSelectDIY = () => {
    setIsLoadingDIY(true)
    router.push("/free-pr-quiz/diy-qualification")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-4 px-4">
      <StickyLogoBanner />

      <div className="max-w-4xl mx-auto space-y-8 pb-24 pt-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center space-y-4">
          <h1 className="text-base md:text-lg font-bold">🎁 EXCLUSIVE WINNER'S BONUS 🎁</h1>
          <p className="text-xl">Your FREE article placement is confirmed!</p>
          <p className="text-lg text-muted-foreground">Choose how you want to create your article...</p>
        </div>

        <div className="text-center">
          <div className="relative w-full max-w-xs md:max-w-md mx-auto aspect-video">
            <Image
              src="/professional-pr-writing-team.jpg"
              alt="Professional PR Team"
              fill
              className="rounded-xl object-cover"
            />
          </div>
          <p className="mt-4 font-semibold">Meet Your PR Writing Team</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500 rounded-xl p-6 space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold">⭐ PROFESSIONAL WRITING</h3>
              <p className="text-sm font-semibold text-yellow-600">(Winner's Exclusive 50% OFF)</p>
            </div>

            <div className="space-y-2 text-sm">
              {[
                "Written by experienced journalists",
                "Unlimited revisions until perfect",
                "Human support & PR consultation",
                "500-1000 words of professional copy",
                'FREE "As Seen On" badge',
                "Article stays live forever",
                "FREE backlinks to your website",
                "FREE contact info & social links",
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="text-center space-y-1 py-3 border-t border-b">
              <p className="text-xs text-muted-foreground line-through">Regular Price: $89.99</p>
              <p className="text-3xl font-bold">$44.99</p>
              <p className="text-sm font-semibold text-green-600">YOU SAVE $45.00 (50% OFF)</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs">
                <span className="text-muted-foreground">Offer expires in</span>
                <span>⏰</span>
                <span className="font-mono font-bold text-red-600">{formatTime(timeLeft)}</span>
              </div>
              <p className="text-center text-xs text-muted-foreground">🔥 Only for quiz winners</p>
            </div>

            <Button
              size="lg"
              className="w-full text-base px-6 py-3 h-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
              onClick={handleSelectProfessionalWriting}
              disabled={isLoadingPro}
            >
              {isLoadingPro ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Add Pro Writing →"
              )}
            </Button>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500 rounded-xl p-6 space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold">✍️ WRITE IT YOURSELF</h3>
              <p className="text-sm font-semibold text-blue-600">(Free DIY Option)</p>
            </div>

            <div className="space-y-2 text-sm">
              {[
                "Professional article template",
                "Step-by-step writing guidelines",
                "Topic ideas & angle suggestions",
                "SEO optimization tips",
                "FREE article placement included",
                "Article stays live forever",
                "FREE backlinks to your website",
                "14 days to complete your article",
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="text-center space-y-1 py-3 border-t border-b">
              <p className="text-xs text-muted-foreground">Best if you're a strong writer</p>
              <p className="text-3xl font-bold">FREE</p>
              <p className="text-sm font-semibold text-blue-600">Requires 8-13 hours of your time</p>
            </div>

            <div className="space-y-2">
              <p className="text-center text-xs text-muted-foreground">⏱️ Template delivered within 24 hours</p>
              <p className="text-center text-xs text-muted-foreground">📝 14-day writing deadline</p>
            </div>

            <Button
              size="lg"
              variant="outline"
              className="w-full text-base px-6 py-3 h-auto rounded-full border-2 border-blue-500 hover:bg-blue-50 bg-transparent"
              onClick={handleSelectDIY}
              disabled={isLoadingDIY}
            >
              {isLoadingDIY ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "I'll Write It Myself →"
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center">💬 What Quiz Winners Are Saying:</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                quote: "I can't write to save my life. $44.99 was a no-brainer for professional quality.",
                author: "Priya W., E-commerce Owner",
                image: mainReviews[5].image,
              },
              {
                quote: "The article was 10x better than I could have written. Worth every penny.",
                author: "Marcus T., Startup Founder",
                image: mainReviews[0].image,
              },
              {
                quote: "Got my article in 3 days. The backlinks alone were worth the price.",
                author: "Amanda P., Content Creator",
                image: mainReviews[6].image,
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-card border rounded-xl p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm italic">"{testimonial.quote}"</p>
                <p className="text-sm font-medium">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center space-y-2 py-6">
          <p className="text-lg font-semibold">🔒 100% Money-Back Guarantee</p>
          <p className="text-muted-foreground">If you're not satisfied, we'll refund every penny.</p>
        </div>
      </div>

      {showCheckAnimation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border rounded-xl p-8 max-w-md w-full mx-4 space-y-4">
            <h3 className="text-2xl font-bold text-center">Processing Your Order...</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 transition-all duration-500">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${checkedItems.includes(0) ? "bg-green-500 border-green-500 scale-110" : "border-muted"}`}
                >
                  {checkedItems.includes(0) && <Check className="w-5 h-5 text-white animate-in zoom-in duration-300" />}
                </div>
                <span
                  className={`transition-all duration-300 ${checkedItems.includes(0) ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  Free article claimed
                </span>
              </div>
              <div className="flex items-center gap-3 transition-all duration-500">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${checkedItems.includes(1) ? "bg-green-500 border-green-500 scale-110" : "border-muted"}`}
                >
                  {checkedItems.includes(1) && <Check className="w-5 h-5 text-white animate-in zoom-in duration-300" />}
                </div>
                <span
                  className={`transition-all duration-300 ${checkedItems.includes(1) ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  50% off Pro Writing discount claimed
                </span>
              </div>
              <div className="flex items-center gap-3 transition-all duration-500">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${checkedItems.includes(2) ? "bg-green-500 border-green-500 scale-110" : "border-muted"}`}
                >
                  {checkedItems.includes(2) && <Check className="w-5 h-5 text-white animate-in zoom-in duration-300" />}
                </div>
                <span
                  className={`transition-all duration-300 ${checkedItems.includes(2) ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  100% money-back guarantee included
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
