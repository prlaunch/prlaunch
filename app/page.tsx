import { HeroSection } from "@/components/hero-section"
import { StoryScrollSection } from "@/components/story-scroll-section"
import { ScrollingLogos } from "@/components/scrolling-logos"
import { PublicationsSection } from "@/components/publications-section"
import { SocialProofGrid } from "@/components/social-proof-grid"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { WhatYouGetSection } from "@/components/what-you-get-section"
import { PricingExplainerSection } from "@/components/pricing-explainer-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { GuaranteeSection } from "@/components/guarantee-section"
import { FAQSection } from "@/components/faq-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { FeatureCardsSection } from "@/components/feature-cards-section"
import { RevenueCalculator } from "@/components/revenue-calculator"
import { OutletSelectionSection } from "@/components/outlet-selection-section"
import { PRQuizSection } from "@/components/pr-quiz-section"
import { Footer } from "@/components/footer"
import { LiveProofNotification } from "@/components/live-proof-notification"
import { ArticlePreviewGenerator } from "@/components/article-preview-generator"
import { BeforeAfterGoogleSection } from "@/components/before-after-google-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ScrollingLogos />
      <StoryScrollSection />
      <WhatYouGetSection />
      <PricingExplainerSection />
      <PRQuizSection />
      <OutletSelectionSection />
      <FeatureCardsSection />
      <RevenueCalculator />
      <BeforeAfterGoogleSection />
      <PublicationsSection />
      <SocialProofGrid />
      <HowItWorksSection />
      <TestimonialsSection />
      <GuaranteeSection />
      <FAQSection />
      <ArticlePreviewGenerator />
      <FinalCTASection />
      <Footer />
      <LiveProofNotification />
    </main>
  )
}
