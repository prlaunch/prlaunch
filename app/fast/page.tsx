import { HeroSection } from "@/components/hero-section"
import { StoryScrollSection } from "@/components/story-scroll-section"
import { ScrollingLogos } from "@/components/scrolling-logos"
import { PublicationsSection } from "@/components/publications-section"
import { SocialProofGrid } from "@/components/social-proof-grid"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { WhatYouGetSection } from "@/components/what-you-get-section"
import { PricingExplainerSection } from "@/components/pricing-explainer-section"
import { FAQSection } from "@/components/faq-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { OutletSelectionSection } from "@/components/outlet-selection-section"
import { BeforeAfterGoogleSection } from "@/components/before-after-google-section"
import { FooterSimple } from "@/components/footer-simple"
import { LiveProofNotification } from "@/components/live-proof-notification"
import { FloatingRewardButton } from "@/components/floating-reward-button"
import { Suspense } from "react"

export default function FastPage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="h-screen" />}>
        <HeroSection />
      </Suspense>
      <ScrollingLogos />
      <StoryScrollSection />
      <WhatYouGetSection />
      <PricingExplainerSection />
      <OutletSelectionSection />
      <BeforeAfterGoogleSection />
      <PublicationsSection />
      <SocialProofGrid />
      <HowItWorksSection />
      <FAQSection />
      <FinalCTASection />
      <FooterSimple />
      <LiveProofNotification />
      <FloatingRewardButton />
    </main>
  )
}
