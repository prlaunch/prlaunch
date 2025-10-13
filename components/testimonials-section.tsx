"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TestimonialsSection() {
  const [visibleCount, setVisibleCount] = useState(6)

  const testimonials = [
    {
      quote:
        "I was skeptical about the price, but PR Launch delivered. Featured in Entrepreneur within 5 days. Now I'm closing more clients just by sharing the link.",
      author: "Marcus Chen",
      title: "Business Coach",
      initials: "MC",
      color: "bg-blue-500",
      rating: 5,
      date: "Jan 8, 2025",
      verified: true,
    },
    {
      quote:
        "Best investment I made for my personal brand. Got published in Forbes and my LinkedIn engagement went through the roof. Worth every penny.",
      author: "Sarah Mitchell",
      title: "Marketing Consultant",
      initials: "SM",
      color: "bg-purple-500",
      rating: 5,
      date: "Dec 15, 2024",
      verified: true,
    },
    {
      quote:
        "I tried traditional PR agencies before—they wanted $10k and 3 months. PR Launch got me in Business Insider in 4 days for $47. Incredible.",
      author: "David Park",
      title: "Tech Founder",
      initials: "DP",
      color: "bg-emerald-500",
      rating: 5,
      date: "Jan 2, 2025",
      verified: true,
    },
    {
      quote:
        "As a startup founder, every dollar counts. This gave me the credibility boost I needed without breaking the bank. Featured in TechCrunch!",
      author: "Jessica Rodriguez",
      title: "SaaS Founder",
      initials: "JR",
      color: "bg-pink-500",
      rating: 5,
      date: "Jan 5, 2025",
      verified: true,
    },
    {
      quote:
        "I've been trying to get media coverage for years. PR Launch made it happen in less than a week. My clients are impressed.",
      author: "Michael Thompson",
      title: "Real Estate Agent",
      initials: "MT",
      color: "bg-orange-500",
      rating: 5,
      date: "Dec 28, 2024",
      verified: true,
    },
    {
      quote:
        "The process was so simple. Filled out the form, got my article approved, and boom—published in USA Today. Game changer for my coaching business.",
      author: "Amanda Lee",
      title: "Life Coach",
      initials: "AL",
      color: "bg-teal-500",
      rating: 5,
      date: "Jan 10, 2025",
      verified: true,
    },
    {
      quote:
        "I was hesitant at first, but the results speak for themselves. Featured in Inc. Magazine and my website traffic doubled overnight.",
      author: "Robert Kim",
      title: "E-commerce Owner",
      initials: "RK",
      color: "bg-indigo-500",
      rating: 5,
      date: "Dec 20, 2024",
      verified: true,
    },
    {
      quote:
        "Finally, a PR service that doesn't require a massive budget. Got featured in multiple outlets and my credibility skyrocketed.",
      author: "Emily Watson",
      title: "Fitness Trainer",
      initials: "EW",
      color: "bg-rose-500",
      rating: 5,
      date: "Jan 3, 2025",
      verified: true,
    },
    {
      quote:
        "I've recommended PR Launch to all my entrepreneur friends. Fast, affordable, and actually works. Featured in Bloomberg!",
      author: "James Anderson",
      title: "Financial Advisor",
      initials: "JA",
      color: "bg-cyan-500",
      rating: 5,
      date: "Dec 18, 2024",
      verified: true,
    },
    {
      quote:
        "The ROI on this is insane. Spent $47 and landed a client worth $15k who found me through my Forbes feature. Thank you!",
      author: "Lisa Chang",
      title: "Brand Strategist",
      initials: "LC",
      color: "bg-violet-500",
      rating: 5,
      date: "Jan 7, 2025",
      verified: true,
    },
    {
      quote:
        "I was tired of being invisible online. PR Launch changed that. Now when people Google me, they see real publications. Worth it.",
      author: "Daniel Martinez",
      title: "Consultant",
      initials: "DM",
      color: "bg-amber-500",
      rating: 5,
      date: "Dec 22, 2024",
      verified: true,
    },
    {
      quote:
        "Super impressed with the quality of writing and the speed. Got published in Entrepreneur and my social proof is now undeniable.",
      author: "Rachel Green",
      title: "Author & Speaker",
      initials: "RG",
      color: "bg-lime-500",
      rating: 5,
      date: "Jan 4, 2025",
      verified: true,
    },
    {
      quote:
        "I've tried other PR services and they were either too expensive or didn't deliver. PR Launch delivered exactly what they promised.",
      author: "Kevin Brown",
      title: "Software Developer",
      initials: "KB",
      color: "bg-sky-500",
      rating: 5,
      date: "Dec 25, 2024",
      verified: true,
    },
    {
      quote:
        "The best part? I didn't have to do any pitching or cold outreach. Just filled out a form and got featured. So easy.",
      author: "Sophia Taylor",
      title: "Interior Designer",
      initials: "ST",
      color: "bg-fuchsia-500",
      rating: 5,
      date: "Jan 9, 2025",
      verified: true,
    },
    {
      quote:
        "My competitors are still trying to figure out how I got featured in major publications. PR Launch is my secret weapon.",
      author: "Christopher Lee",
      title: "Marketing Agency Owner",
      initials: "CL",
      color: "bg-red-500",
      rating: 5,
      date: "Dec 19, 2024",
      verified: true,
    },
    {
      quote:
        "I was about to hire a $5k PR agency. So glad I found PR Launch first. Same results, fraction of the cost.",
      author: "Nicole Johnson",
      title: "Nutritionist",
      initials: "NJ",
      color: "bg-green-500",
      rating: 5,
      date: "Jan 6, 2025",
      verified: true,
    },
    {
      quote:
        "The credibility boost is real. Clients take me more seriously now that I have media features. Best $47 I've ever spent.",
      author: "Brandon White",
      title: "Business Consultant",
      initials: "BW",
      color: "bg-yellow-500",
      rating: 5,
      date: "Dec 21, 2024",
      verified: true,
    },
    {
      quote:
        "I got featured in USA Wire and Success XL. Now I have real social proof to share on my website and LinkedIn. Game changer!",
      author: "Olivia Harris",
      title: "Career Coach",
      initials: "OH",
      color: "bg-purple-600",
      rating: 5,
      date: "Jan 1, 2025",
      verified: true,
    },
    {
      quote:
        "Fast, professional, and affordable. I've already ordered two more features for my other businesses. Highly recommend!",
      author: "Matthew Davis",
      title: "Serial Entrepreneur",
      initials: "MD",
      color: "bg-blue-600",
      rating: 5,
      date: "Dec 27, 2024",
      verified: true,
    },
    {
      quote:
        "The writers did an amazing job telling my story. The article was well-written and got published exactly when they said it would.",
      author: "Victoria Moore",
      title: "Fashion Designer",
      initials: "VM",
      color: "bg-pink-600",
      rating: 5,
      date: "Jan 11, 2025",
      verified: true,
    },
    {
      quote:
        "I've been in business for 10 years and never had media coverage. PR Launch made it happen in less than a week. Incredible service!",
      author: "Andrew Wilson",
      title: "Restaurant Owner",
      initials: "AW",
      color: "bg-orange-600",
      rating: 5,
      date: "Dec 23, 2024",
      verified: true,
    },
  ]

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, testimonials.length))
  }

  const visibleTestimonials = testimonials.slice(0, visibleCount)
  const hasMore = visibleCount < testimonials.length

  return (
    null
  )
}
