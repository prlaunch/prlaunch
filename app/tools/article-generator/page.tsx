import { ArticlePreviewGenerator } from "@/components/article-preview-generator"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Article Generator - PR Launch",
  description: "See your article before you buy. Generate a personalized preview of your feature article.",
}

export default function ArticleGeneratorPage() {
  return (
    <main className="min-h-screen">
      <ArticlePreviewGenerator />
      <Footer />
    </main>
  )
}
