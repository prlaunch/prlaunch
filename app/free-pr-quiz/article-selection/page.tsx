"use client"

import { useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useQuiz } from "@/lib/quiz-context"
import { ARTICLE_PUBLICATIONS } from "@/lib/quiz-constants"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function ArticleSelectionPage() {
  const router = useRouter()
  const { setLeadData, leadData } = useQuiz()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const handleArticleSelection = (publication: { name: string; logo: string }) => {
    setLeadData({ ...leadData, publication: publication.name, publicationLogo: publication.logo })
    router.push("/free-pr-quiz/article-questions")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <StickyLogoBanner />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full space-y-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center space-y-2">
            <h2 className="font-bold text-3xl">Choose Your FREE Article 📰</h2>
            <p className="text-muted-foreground">Select which publication you'd like to be featured in:</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {ARTICLE_PUBLICATIONS.map((pub) => (
              <button
                key={pub.id}
                onClick={() => handleArticleSelection({ name: pub.name, logo: pub.logo })}
                className="relative bg-card rounded-xl p-4 hover:shadow-lg transition-all group overflow-hidden"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 opacity-100 animate-gradient-x"></div>
                <div className="absolute inset-[2px] rounded-xl bg-card"></div>
                <div className="relative flex flex-col items-center gap-2">
                  <div className="relative w-full h-10 flex items-center justify-center">
                    <Image
                      src={pub.logo || "/placeholder.svg"}
                      alt={pub.name}
                      width={90}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium group-hover:text-blue-500 transition-colors">{pub.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
