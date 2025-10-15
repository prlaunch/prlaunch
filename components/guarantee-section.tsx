"use client"

import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import Link from "next/link"

export function GuaranteeSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="bg-primary py-20 text-primary-foreground md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground/10">
              <Shield className="h-10 w-10" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight md:text-5xl">Our 7-Day Guarantee</h2>

          {/* Description */}
          <div className="mb-8 space-y-4 text-pretty text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
            <p>
              If we don&#39;t get you published in a major publication within 7 days of receiving your approval, you pay
              nothing. Zero risk. Zero hassle.
            </p>
          </div>

          {/* CTA */}
          <Link href="/checkout">
            <Button
              size="lg"
              className="h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
            >
              Get Featured — $47
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
