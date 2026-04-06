"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function StoryScrollSection() {
  const entrepreneurs = [
    { name: "Sarah Chen", title: "Tech Founder", image: "/asian-woman-entrepreneur-smiling.jpg" },
    { name: "Marcus Johnson", title: "E-commerce CEO", image: "/black-man-entrepreneur-confident.jpg" },
    { name: "Elena Rodriguez", title: "SaaS Founder", image: "/latina-woman-entrepreneur-professional.jpg" },
  ]

  const companies = [
    { name: "TechFlow", logo: "/tech-company-logo-blue.png" },
    { name: "GrowthLabs", logo: "/startup-company-logo-green.jpg" },
    { name: "CloudSync", logo: "/cloud-company-logo-purple.jpg" },
  ]

  const scrollToWhatYouGet = () => {
    const whatYouGetSection = document.getElementById("what-you-get")
    if (whatYouGetSection) {
      whatYouGetSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    null
  )
}
