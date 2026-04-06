"use client"

import { useState } from "react"
import { Check, Clock, Calendar, Shield, ChevronDown, User, Target, Award, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import Script from "next/script"

const publications = [
  { name: "Forbes", serif: true },
  { name: "Bloomberg", serif: true },
  { name: "Business Insider", serif: true },
  { name: "Yahoo Finance", serif: true },
  { name: "Entrepreneur", serif: true },
]

const callSteps = [
  {
    icon: User,
    title: "Profile Review",
    description: "We assess your current online presence, identify gaps, and see where you stand in Google search results.",
  },
  {
    icon: Target,
    title: "Forbes Placement Roadmap",
    description: "Learn the exact process, timeline, and what makes a pitch stick with top-tier editors.",
  },
  {
    icon: Award,
    title: "Google Knowledge Panel Strategy",
    description: "Discover how to claim, verify, and optimize your Knowledge Panel for maximum credibility.",
  },
  {
    icon: FileText,
    title: "Custom PR Plan",
    description: "Leave with an actionable plan tailored to your goals—whether you work with us or not.",
  },
]

const faqs = [
  {
    question: "Is this actually free?",
    answer: "Yes, 100% free. No credit card required, no payment information collected, no pressure to buy anything. This is a genuine strategy session to help you understand your PR opportunities.",
  },
  {
    question: "Can you guarantee a Forbes feature?",
    answer: "While we can't guarantee any specific publication (no ethical PR firm can), we have strong editorial relationships and a proven track record. We'll explain our success rates and realistic expectations on the call.",
  },
  {
    question: "What's a Google Knowledge Panel?",
    answer: "It's the information box that appears on the right side of Google search results when someone searches your name. It signals to Google (and everyone searching you) that you're a notable, established figure in your field.",
  },
  {
    question: "Who is this for?",
    answer: "This call is ideal for founders, executives, coaches, creators, and professionals who want to build credibility, get featured in major publications, and establish a stronger online presence.",
  },
]

function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-foreground hover:text-foreground/80 transition-colors md:text-lg"
      >
        {question}
        <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      <div className={cn("grid transition-all duration-200", isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function BookACallPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-background">
      {/* Top Security Bar */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
        <div className="container mx-auto px-4 py-2.5 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-emerald-700 font-medium">
            <Shield className="h-4 w-4" />
            <span>This call is 100% free — no card needed</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
              </span>
              <span className="text-sm font-medium text-amber-700">Limited spots each month</span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Learn How to Get Featured on <em className="not-italic text-blue-600">Forbes</em> & Build Your Google Knowledge Panel
            </h1>

            {/* Subhead */}
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Book a free 30-minute strategy call with our PR team. No commitment — just a clear roadmap to get you featured in top-tier publications.
            </p>

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>30 minutes</span>
              </div>
              <div className="h-4 w-px bg-border hidden md:block" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>No commitment</span>
              </div>
              <div className="h-4 w-px bg-border hidden md:block" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Free — no card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publication Logo Bar */}
      <section className="border-y border-border bg-secondary/50 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Publications we place clients in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {publications.map((pub) => (
              <span
                key={pub.name}
                className="text-xl font-semibold text-muted-foreground/60 hover:text-foreground transition-colors cursor-default md:text-2xl"
                style={{ fontFamily: pub.serif ? "Georgia, serif" : "inherit" }}
              >
                {pub.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Two Column Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - What Happens */}
            <div className="order-2 lg:order-1">
              <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
                What happens on the call
              </h2>

              <div className="space-y-6">
                {callSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <step.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                        <h3 className="font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial Card */}
              <div className="mt-10 rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground leading-relaxed italic mb-4">
                  &ldquo;The strategy call alone gave me more clarity than 3 months of trying to figure out PR on my own. They mapped out exactly how to position myself for Forbes and explained the Knowledge Panel process step by step.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                    JM
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">James Mitchell</p>
                    <p className="text-muted-foreground text-sm">Founder & CEO, TechVentures</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Calendar */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-8 lg:self-start">
              <div className="rounded-xl border border-border bg-card shadow-lg overflow-hidden">
                {/* Calendar Header */}
                <div className="border-b border-border bg-secondary/30 px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>Pick a time that works</span>
                  </div>
                  <p className="font-semibold text-foreground">30 min · Free strategy call</p>
                </div>

                {/* Calendly Embed */}
                <div className="min-h-[650px]">
                  <div
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/hello-prlaunch/30min?hide_gdpr_banner=1&primary_color=3b82f6"
                    style={{ minWidth: "320px", height: "650px" }}
                  />
                  <Script
                    src="https://assets.calendly.com/assets/external/widget.js"
                    strategy="lazyOnload"
                  />
                </div>

                {/* Calendar Footer */}
                <div className="border-t border-border bg-secondary/30 px-6 py-4">
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>Instant confirmation</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>Calendar invite sent</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>Zoom link included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-xl">
            <h2 className="mb-10 text-center text-2xl font-bold text-foreground md:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="rounded-xl border border-border bg-card shadow-sm">
              <div className="px-6">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQ === index}
                    onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
