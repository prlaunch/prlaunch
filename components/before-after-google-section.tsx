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
    null
  )
}
