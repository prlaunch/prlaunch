"use client"

import { useState } from "react"
import { Search, CheckCircle2, XCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Persona = "founder" | "consultant" | "ecommerce"

const personaData = {
  founder: {
    name: "Sarah Chen",
    company: "TechFlow AI",
    before: [
      { type: "negative", text: "LinkedIn Profile", subtitle: "Basic profile, 500 connections" },
      { type: "negative", text: "Random Blog Mention", subtitle: "Outdated article from 2021" },
      { type: "negative", text: "Competitor Rankings", subtitle: "Your competitors dominate results" },
      { type: "negative", text: "Generic Directory Listing", subtitle: "No credibility signals" },
    ],
    after: [
      { type: "positive", text: "SF Tribune Feature", subtitle: '"TechFlow AI Raises $2M Series A"' },
      { type: "positive", text: "Success XL Interview", subtitle: '"How Sarah Chen Built a 7-Figure SaaS"' },
      { type: "positive", text: "USA Wire Coverage", subtitle: '"Top 10 AI Startups to Watch in 2025"' },
      { type: "positive", text: "Enhanced LinkedIn", subtitle: "Now with media mentions badge" },
      { type: "positive", text: "Knowledge Panel Eligible", subtitle: "Google recognizes you as notable" },
    ],
  },
  consultant: {
    name: "Michael Rodriguez",
    company: "Growth Strategy Partners",
    before: [
      { type: "negative", text: "LinkedIn Profile", subtitle: "Standard consultant profile" },
      { type: "negative", text: "Old Conference Bio", subtitle: "From 2019 speaking event" },
      { type: "negative", text: "Competitor Consultants", subtitle: "Others rank higher than you" },
      { type: "negative", text: "Generic Reviews", subtitle: "No authoritative mentions" },
    ],
    after: [
      { type: "positive", text: "SF Tribune Feature", subtitle: '"Expert Consultant Helps 50+ Businesses Scale"' },
      { type: "positive", text: "Success XL Profile", subtitle: '"The Growth Strategy Behind $10M Exits"' },
      { type: "positive", text: "USA Wire Article", subtitle: '"Top Business Consultants of 2025"' },
      { type: "positive", text: "LinkedIn with Authority", subtitle: "Featured in major publications" },
      { type: "positive", text: "Knowledge Panel Ready", subtitle: "Recognized industry expert" },
    ],
  },
  ecommerce: {
    name: "Jessica Park",
    company: "EcoLux Beauty",
    before: [
      { type: "negative", text: "LinkedIn Profile", subtitle: "Basic e-commerce owner profile" },
      { type: "negative", text: "Product Listings", subtitle: "Just your store pages" },
      { type: "negative", text: "Competitor Brands", subtitle: "Bigger brands dominate search" },
      { type: "negative", text: "Random Forum Posts", subtitle: "No brand authority" },
    ],
    after: [
      { type: "positive", text: "SF Tribune Feature", subtitle: '"EcoLux Beauty Hits $1M in Annual Revenue"' },
      { type: "positive", text: "Success XL Story", subtitle: '"How One Founder Built a Sustainable Beauty Empire"' },
      { type: "positive", text: "USA Wire Coverage", subtitle: '"Top Sustainable E-commerce Brands"' },
      { type: "positive", text: "Brand Authority Boost", subtitle: "Press mentions across search results" },
      { type: "positive", text: "Knowledge Panel Eligible", subtitle: "Brand recognition by Google" },
    ],
  },
}

export function BeforeAfterGoogleSection() {
  const [selectedPersona, setSelectedPersona] = useState<Persona>("founder")
  const [showAfter, setShowAfter] = useState(false)
  const data = personaData[selectedPersona]

  const handlePersonaChange = (persona: Persona) => {
    setSelectedPersona(persona)
    setShowAfter(false)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center md:mb-12">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 md:mb-4 md:text-5xl">
            What Investors See When They Google You
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 md:text-lg">
            Your online presence is your first impression. See the transformation from invisible to influential.
          </p>
        </div>

        {/* Persona Selector */}
        <div className="mb-8 flex justify-center gap-2 md:mb-12 md:gap-3">
          <Button
            variant={selectedPersona === "founder" ? "default" : "outline"}
            onClick={() => handlePersonaChange("founder")}
            className="rounded-full text-xs md:text-sm"
            size="sm"
          >
            Founder
          </Button>
          <Button
            variant={selectedPersona === "consultant" ? "default" : "outline"}
            onClick={() => handlePersonaChange("consultant")}
            className="rounded-full text-xs md:text-sm"
            size="sm"
          >
            Consultant
          </Button>
          <Button
            variant={selectedPersona === "ecommerce" ? "default" : "outline"}
            onClick={() => handlePersonaChange("ecommerce")}
            className="rounded-full text-xs md:text-sm"
            size="sm"
          >
            E-commerce
          </Button>
        </div>

        {/* Before/After Comparison */}
        <div className="mx-auto max-w-6xl">
          {/* Desktop: side-by-side grid */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-6">
            {/* BEFORE Column */}
            <div className="rounded-2xl border-2 border-red-200 bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">BEFORE PR Launch</h3>
                <XCircle className="h-6 w-6 text-red-500" />
              </div>

              {/* Mock Google Search Bar */}
              <div className="mb-6 flex items-center gap-2 rounded-full border-2 border-slate-200 bg-slate-50 px-4 py-2">
                <Search className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600">{data.name}</span>
              </div>

              {/* Search Results */}
              <div className="space-y-4">
                {data.before.map((result, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-slate-300"
                  >
                    <div className="mb-1 flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-red-400" />
                      <div>
                        <p className="font-medium text-slate-700">{result.text}</p>
                        <p className="text-sm text-slate-500">{result.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg bg-red-50 p-4">
                <p className="text-center text-sm font-medium text-red-700">
                  ❌ No credibility • No authority • Lost opportunities
                </p>
              </div>
            </div>

            {/* AFTER Column */}
            <div className="rounded-2xl border-2 border-green-200 bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">AFTER PR Launch</h3>
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>

              {/* Mock Google Search Bar */}
              <div className="mb-6 flex items-center gap-2 rounded-full border-2 border-slate-200 bg-slate-50 px-4 py-2">
                <Search className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600">{data.name}</span>
              </div>

              {/* Search Results */}
              <div className="space-y-4">
                {data.after.map((result, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-4 transition-all hover:border-green-300 hover:shadow-md"
                  >
                    <div className="mb-1 flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                      <div>
                        <p className="font-medium text-slate-900">{result.text}</p>
                        <p className="text-sm text-slate-600">{result.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-4">
                <p className="text-center text-sm font-medium text-green-700">
                  ✓ Instant credibility • Authority signals • Investor confidence
                </p>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <div
              className={`rounded-2xl border-2 bg-white p-4 shadow-lg transition-all duration-500 ${
                showAfter ? "border-green-200" : "border-red-200"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  {showAfter ? "AFTER PR Launch" : "BEFORE PR Launch"}
                </h3>
                {showAfter ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>

              {/* Mock Google Search Bar */}
              <div className="mb-4 flex items-center gap-2 rounded-full border-2 border-slate-200 bg-slate-50 px-3 py-1.5">
                <Search className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-600">{data.name}</span>
              </div>

              {/* Search Results with animation */}
              <div className="space-y-3">
                {(showAfter ? data.after : data.before).map((result, index) => (
                  <div
                    key={`${showAfter ? "after" : "before"}-${index}`}
                    className={`animate-in fade-in slide-in-from-bottom-2 rounded-lg border p-3 transition-all duration-300 ${
                      showAfter
                        ? "border-green-200 bg-gradient-to-r from-green-50 to-blue-50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`mt-1 h-1.5 w-1.5 rounded-full ${showAfter ? "bg-green-500" : "bg-red-400"}`} />
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${showAfter ? "text-slate-900" : "text-slate-700"}`}>
                          {result.text}
                        </p>
                        <p className={`text-xs ${showAfter ? "text-slate-600" : "text-slate-500"}`}>
                          {result.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`mt-4 rounded-lg p-3 ${showAfter ? "bg-gradient-to-r from-green-50 to-blue-50" : "bg-red-50"}`}
              >
                <p className={`text-center text-xs font-medium ${showAfter ? "text-green-700" : "text-red-700"}`}>
                  {showAfter
                    ? "✓ Instant credibility • Authority signals • Investor confidence"
                    : "❌ No credibility • No authority • Lost opportunities"}
                </p>
              </div>

              {/* Toggle Button */}
              <Button
                onClick={() => setShowAfter(!showAfter)}
                className="mt-4 w-full"
                variant={showAfter ? "outline" : "default"}
              >
                {showAfter ? "See Before" : "See After Transformation"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 text-center md:mt-12">
            <p className="mb-3 text-base font-medium text-slate-700 md:mb-4 md:text-lg">
              Transform your Google results in 7 days or get your money back
            </p>
            <p className="text-xs text-slate-500 md:text-sm">
              Join {selectedPersona === "founder" ? "500+" : selectedPersona === "consultant" ? "300+" : "200+"}{" "}
              {selectedPersona}s who've built credibility with PR Launch
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
