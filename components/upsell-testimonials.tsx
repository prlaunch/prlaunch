"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "I added the EverybodyWiki page and now I show up on Google's Knowledge Panel. Investors Google me before calls and I look 10x more established.",
    author: "Sarah K.",
    role: "SaaS Founder",
  },
  {
    quote: "Best $197 I've spent. My LinkedIn profile now has the Wikipedia icon next to my name. Instant credibility.",
    author: "Mike R.",
    role: "Consultant",
  },
]

export function UpsellTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative px-8 py-6">
      <button
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm z-10"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-4 w-4 text-slate-600" />
      </button>

      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <p className="text-slate-700 text-sm leading-relaxed mb-3 min-h-[60px]">"{testimonials[currentIndex].quote}"</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-900 text-sm">{testimonials[currentIndex].author}</p>
            <p className="text-slate-500 text-xs">{testimonials[currentIndex].role}</p>
          </div>

          <div className="flex gap-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex ? "w-4 bg-blue-500" : "w-1.5 bg-slate-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm z-10"
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-4 w-4 text-slate-600" />
      </button>
    </div>
  )
}
