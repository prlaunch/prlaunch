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
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ScrollingLogos />
      <StoryScrollSection />
      <WhatYouGetSection />
      <PricingExplainerSection />
      <FeatureCardsSection />
      <RevenueCalculator />
      <PublicationsSection />
      <SocialProofGrid />
      <HowItWorksSection />
      <TestimonialsSection />
      <GuaranteeSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
