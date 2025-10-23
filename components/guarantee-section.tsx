"use client"

import { Button } from "@/components/ui/button"
import { Shield, Check } from "lucide-react"
import Link from "next/link"

export function GuaranteeSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const benefits = [
    "Published within 48 hours of approval",
    "We'll pay you $100 extra if we fail",
    "Full refund if we don't deliver",
  ]

  return (
    <section className="bg-gradient-to-br from-slate-900 to-blue-900 py-12 text-white md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-700/50">
              <Shield className="h-7 w-7 text-white" />
            </div>
          </div>

          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Our Iron-Clad 48-Hour Guarantee
          </h2>

          <p className="mb-6 text-pretty text-base leading-relaxed text-blue-200 md:text-lg">
            Get featured in <span className="font-semibold text-white">USA Wire</span>,{" "}
            <span className="font-semibold text-white">Success XL</span>,{" "}
            <span className="font-semibold text-white">LA Tabloid</span>, and 100+ more — or get your money back.
          </p>

          <div className="mb-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-6 shadow-2xl">
            <p className="text-pretty text-base font-semibold leading-relaxed md:text-lg">
              We're so confident in our process that if we don't deliver results within 48 hours of your draft approval,
              you get a <span className="underline decoration-2 underline-offset-2">full refund</span> + we'll pay you{" "}
              <span className="underline decoration-2 underline-offset-2">$100</span> for wasting your time.
            </p>
          </div>

          <p className="mb-6 text-sm font-medium text-blue-100 md:text-base">
            Zero risk. Zero hassle. All the upside, none of the downside.
          </p>

          <div className="mb-6 rounded-2xl bg-slate-800/50 p-6 backdrop-blur-sm">
            <div className="grid gap-3 md:grid-cols-2 md:gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2 text-left">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <p className="text-sm leading-relaxed text-blue-50 md:text-base">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link href="/checkout">
            <Button
              size="lg"
              className="h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Get Featured — $47
            </Button>
          </Link>

          <p className="mt-3 text-sm text-blue-300">Join 500+ founders who've been featured in major publications</p>
        </div>
      </div>
    </section>
  )
}
