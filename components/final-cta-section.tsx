"use client"
import { Check } from "lucide-react"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"

export function FinalCTASection() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Heading */}
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Ready to Get Featured?
          </h2>

          {/* Subheading */}
          <p className="mb-10 text-pretty text-lg text-muted-foreground md:text-xl">
            Join 500+ founders, coaches, and entrepreneurs who've built credibility with PR Launch.
          </p>

          {/* CTA Button */}
          <div className="mb-8">
            <MovingBorderButton
              borderRadius="1.75rem"
              as="a"
              href="/checkout"
              containerClassName="h-14 w-auto"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
              duration={3000}
            >
              Get Featured — $47
            </MovingBorderButton>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground md:text-base">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <span>7-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <span>100% Money-Back Promise</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-success" />
              <span>Real Publications</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
