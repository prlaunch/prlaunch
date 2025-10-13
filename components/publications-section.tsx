"use client"

export function PublicationsSection() {
  const publications = [
    { name: "Forbes", logo: "/forbes-logo-transparent.jpg" },
    { name: "Entrepreneur", logo: "/entrepreneur-magazine-logo-transparent.jpg" },
    { name: "Inc.", logo: "/inc-magazine-logo-transparent.jpg" },
    { name: "Business Insider", logo: "/business-insider-logo-transparent.jpg" },
    { name: "Fast Company", logo: "/fast-company-logo-transparent.jpg" },
    { name: "MarketWatch", logo: "/marketwatch-logo-transparent.jpg" },
    { name: "Yahoo Finance", logo: "/yahoo-finance-logo-transparent.jpg" },
    { name: "Benzinga", logo: "/benzinga-logo-transparent.jpg" },
    { name: "TechBullion", logo: "/techbullion-logo-transparent.jpg" },
    { name: "CEO Weekly", logo: "/ceo-weekly-logo-transparent.jpg" },
  ]

  const midpoint = Math.ceil(publications.length / 2)
  const row1 = publications.slice(0, midpoint)
  const row2 = publications.slice(midpoint)

  return (
    null
  )
}
