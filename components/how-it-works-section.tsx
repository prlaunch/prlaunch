"use client"
import { FileText, Send, CheckCircle } from "lucide-react"

export function HowItWorksSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const steps = [
    {
      number: "1",
      icon: FileText,
      title: "You Submit Your Story",
      subtitle: "(2 minutes)",
      description: "Tell us about your business, expertise, or achievement. We'll handle the rest.",
    },
    {
      number: "2",
      icon: Send,
      title: "We Pitch & Place",
      subtitle: "(3-5 days)",
      description: "Our team pitches your story to major publications and secures your placement.",
    },
    {
      number: "3",
      icon: CheckCircle,
      title: "You Get Published",
      subtitle: "(Guaranteed)",
      description: "Your article goes live within 48 hours or you pay nothing. Link to share everywhere.",
    },
  ]

  return null
}
