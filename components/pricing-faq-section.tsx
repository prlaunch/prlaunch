"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function PricingFAQSection() {
  const faqs = [
    {
      question: "Which publications will I be featured in?",
      answer:
        "You'll be published on premium Google-ranking outlets including USA Wire, Success XL, LA Tabloid, Bosses Mag, Medium, and 100+ more. You can choose your preferred outlets from our list when you order.",
    },
    {
      question: "How fast will this actually happen?",
      answer:
        "24-48 hour article writing. Published within 48 hours of your approval. If we miss the 48-hour deadline, you get a full refund - no questions asked.",
    },
    {
      question: "What if I don't like the article you write?",
      answer:
        "We offer unlimited revisions until you're 100% happy. Our writers are experienced and 90% of articles are approved on first draft. We'll work with you until it's perfect.",
    },
    {
      question: "Will this help me get more clients/customers?",
      answer:
        "73% of our customers report getting 2-4 qualified leads within 30 days of publication. You'll rank on Google for your name, which builds instant credibility with prospects. When people Google you before a meeting, they'll see you've been featured in major publications.",
    },
    {
      question: "Can I choose which publication I want?",
      answer: "Yes! When you order, you'll see our full list of publications. You pick your preferred outlets.",
    },
    {
      question: "What happens after I order?",
      answer:
        "1. You'll receive a quick questionnaire (5-7 questions)\n2. We write your articles\n3. You approve them (or request changes)\n4. We publish within 48 hours\n5. You receive the live links\n\nThe entire process takes 48 hours from approval to publication.",
    },
    {
      question: "Is this a one-time payment or subscription?",
      answer:
        "One-time payment. No hidden fees, no recurring charges. You own the articles forever and can use them however you want.",
    },
    {
      question: "What if my business/industry is unique?",
      answer:
        "We've published 4,847+ articles across every industry - from tech startups to real estate to coaching to e-commerce. Our writers are experienced in crafting articles for any business type. We make you look like an authority regardless of your industry.",
    },
    {
      question: "Do I get to keep the article if I'm not happy?",
      answer: "Yes! Even if you request a refund, you keep the article. Zero risk for you.",
    },
    {
      question: "How is this different from hiring a PR agency?",
      answer:
        "Traditional PR agencies:\n• Cost $5,000-10,000/month\n• Take 2-4 weeks minimum\n• No guarantee of publication\n• Require 6-12 month contracts\n\nPR Launch:\n• One-time fee of $47-197\n• Guaranteed publication in 48 hours\n• No contracts, no recurring fees\n• 100% money-back guarantee",
    },
    {
      question: "Will this work for local businesses?",
      answer:
        "Local businesses especially benefit because when prospects Google you before visiting, they see you've been featured in publications. This builds trust immediately. We have customers ranging from restaurants to law firms to dental offices.",
    },
    {
      question: "Can I see examples of articles you've published?",
      answer:
        "Yes! Check out the examples on our homepage showing real articles published for customers just like you. Every article is professionally written and looks authentic on major publications.",
    },
  ]

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">Common Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-sm md:text-base font-semibold">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
