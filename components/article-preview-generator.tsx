"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MovingBorderButton } from "@/components/ui/moving-border"
import { Loader2, Calendar, Clock, Mail, Globe } from "lucide-react"
import Image from "next/image"

const headlineTemplates: Record<string, string[]> = {
  technology: [
    "How {name} Built {company} to Transform the {industry} Industry",
    "{name}'s {company} is Revolutionizing {industry} with Innovative Solutions",
    "Meet {name}: The Visionary Behind {company}'s {industry} Breakthrough",
    "{company} Founder {name} Shares Insights on the Future of {industry}",
    "How {name} is Disrupting {industry} with {company}",
  ],
  healthcare: [
    "How {name} Built {company} to Transform the {industry} Industry",
    "{name}'s {company} is Revolutionizing Patient Care in {industry}",
    "Meet {name}: Innovating {industry} Through {company}",
    "{company} Founder {name} on the Future of {industry}",
    "How {name} is Making {industry} More Accessible with {company}",
  ],
  finance: [
    "How {name} Built {company} to Transform the {industry} Industry",
    "{name}'s {company} is Democratizing {industry} for Everyone",
    "Meet {name}: The Financial Innovator Behind {company}",
    "{company} Founder {name} on Disrupting Traditional {industry}",
    "How {name} is Reshaping {industry} with {company}",
  ],
  ecommerce: [
    "How {name} Built {company} to Transform the {industry} Industry",
    "{name}'s {company} is Redefining Online {industry}",
    "Meet {name}: The Entrepreneur Scaling {company} in {industry}",
    "{company} Founder {name} Shares {industry} Growth Strategies",
    "How {name} Built a Thriving {industry} Business with {company}",
  ],
  education: [
    "How {name} Built {company} to Transform the {industry} Industry",
    "{name}'s {company} is Making {industry} More Accessible",
    "Meet {name}: Innovating Learning Through {company}",
    "{company} Founder {name} on the Future of {industry}",
    "How {name} is Empowering Students with {company}",
  ],
  marketing: [
    "How {name} Built {company} to Transform the {industry} Industry",
    "{name}'s {company} is Revolutionizing {industry} Strategies",
    "Meet {name}: The Marketing Innovator Behind {company}",
    "{company} Founder {name} on Modern {industry} Tactics",
    "How {name} Helps Brands Grow with {company}",
  ],
  consulting: [
    "How {name} Built {company} to Transform the {industry} Industry",
    "{name}'s {company} is Redefining {industry} Excellence",
    "Meet {name}: The Expert Behind {company}'s Success",
    "{company} Founder {name} Shares {industry} Insights",
    "How {name} Helps Businesses Thrive with {company}",
  ],
  other: [
    "How {name} Built {company} to Transform the {industry} Industry",
    "{name}'s {company} is Making Waves in {industry}",
    "Meet {name}: The Visionary Behind {company}",
    "{company} Founder {name} on Building a {industry} Business",
    "How {name} is Innovating in {industry} with {company}",
  ],
}

export function ArticlePreviewGenerator() {
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [industry, setIndustry] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const handleGenerate = () => {
    if (name && company && industry) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setShowPreview(true)
      }, 1500)
    }
  }

  const handleReset = () => {
    setShowPreview(false)
    setName("")
    setCompany("")
    setIndustry("")
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const generateEmail = () => {
    const firstName = name.split(" ")[0].toLowerCase()
    const lastName = name.split(" ").slice(1).join("").toLowerCase()
    const companyDomain = company.toLowerCase().replace(/[^a-z0-9]/g, "")
    return `${firstName}${lastName ? "." + lastName : ""}@${companyDomain}.com`
  }

  const getHeadline = () => {
    const templates = headlineTemplates[industry.toLowerCase()] || headlineTemplates.other
    const template = templates[Math.floor(Math.random() * templates.length)]
    return template.replace("{name}", name).replace("{company}", company).replace("{industry}", industry)
  }

  const getPreviewText = () => {
    const industryText =
      industry.toLowerCase() === "other"
        ? `${name}, founder of ${company}, has built a reputation for innovation. With a clear vision, ${name} founded ${company} to deliver exceptional value.`
        : `${name}, founder of ${company}, has emerged as a leader in the ${industry} sector. ${name} founded ${company} to address key challenges and deliver value to clients.`

    return `${industryText}

Through strategic vision, ${company} has gained recognition for its innovative approach. ${name}'s leadership continues to shape the industry...`
  }

  const getCurrentDate = () => {
    const date = new Date()
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            See Your Article Before You Buy
          </h2>
          <p className="text-pretty text-lg text-muted-foreground md:text-xl">
            Enter your details below to generate a personalized preview of your feature article
          </p>
        </div>

        {isLoading ? (
          <div className="mx-auto flex max-w-2xl items-center justify-center rounded-2xl border bg-card p-16 shadow-lg">
            <div className="text-center">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-500" />
              <p className="mt-4 text-lg font-medium text-muted-foreground">Generating your preview...</p>
            </div>
          </div>
        ) : showPreview ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mx-auto max-w-3xl rounded-xl border bg-white shadow-2xl">
              {/* Article Header */}
              <div className="border-b bg-gradient-to-r from-slate-50 to-white px-8 py-6">
                <div className="mb-4">
                  <Image
                    src="/images/logos/successxl.png"
                    alt="Success XL"
                    width={140}
                    height={32}
                    className="h-8 w-auto"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{getCurrentDate()}</span>
                    </div>
                    <div className="h-1 w-1 rounded-full bg-slate-400" />
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>5 min read</span>
                    </div>
                  </div>
                  <span className="inline-flex w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {industry}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <article className="px-8 py-8">
                {/* Headline */}
                <h1 className="mb-6 text-balance font-serif font-bold leading-tight text-slate-900 md:text-4xl text-2xl">
                  {getHeadline()}
                </h1>

                {/* Byline */}
                <div className="mb-8 flex items-center gap-3 border-b pb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                    <span className="text-sm font-bold text-white">PR</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">By PR Launch</p>
                    <p className="text-xs text-slate-600">PR Launch Editorial</p>
                  </div>
                </div>

                {/* Article Body */}
                <div className="prose prose-slate max-w-none">
                  <p className="mb-4 font-serif text-lg leading-relaxed text-slate-700">
                    {getPreviewText().split("\n\n")[0]}
                  </p>
                  <p className="mb-6 font-serif text-base leading-relaxed text-slate-600">
                    {getPreviewText().split("\n\n")[1]}
                  </p>

                  {/* Value-driven benefits section */}

                  {/* Pull Quote */}
                  <div className="my-8 border-l-4 border-blue-500 bg-blue-50 py-4 pl-6 pr-4">
                    <p className="font-serif text-xl italic leading-relaxed text-slate-800">
                      "Innovation has been the cornerstone of our journey at {company}."
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-600">— {name}, Founder & CEO</p>
                  </div>

                  <p className="mb-4 font-serif text-base leading-relaxed text-slate-600">
                    Looking ahead, {name} and {company} continue to push boundaries in the {industry.toLowerCase()}{" "}
                    industry, positioning them as a leader to watch.
                  </p>

                  {/* Contact section with generated email */}
                  <div className="my-8 rounded-lg border border-slate-200 bg-slate-50 p-6">
                    <h3 className="mb-3 text-base font-bold text-slate-900">Media Contact</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-slate-600" />
                        <a href={`mailto:${generateEmail()}`} className="text-blue-600 hover:underline">
                          {generateEmail()}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-slate-600" />
                        <span className="text-slate-700">{company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Media reach statistics */}
                </div>

                <div className="mt-10 rounded-lg border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-center">
                  <h3 className="mb-2 text-xl font-bold text-slate-900">Ready to Get Featured?</h3>
                  <p className="mb-6 text-sm text-slate-600">
                    Get your own feature article published in 7 days or less
                  </p>
                  <div className="flex flex-col items-center gap-3">
                    <MovingBorderButton
                      borderRadius="1.75rem"
                      as="a"
                      href="/checkout/step-5"
                      containerClassName="h-14 w-auto"
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
                      duration={3000}
                    >
                      Get Featured — $47
                    </MovingBorderButton>
                    <Button
                      onClick={handleReset}
                      variant="ghost"
                      className="text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    >
                      Generate a New Article
                    </Button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl">
            <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 animate-gradient-shift shadow-lg shadow-blue-500/20">
              <div className="rounded-2xl bg-card p-8">
                <div className="mb-6 grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Your Company</Label>
                    <Input
                      id="company"
                      placeholder="Acme Inc"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Your Industry</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger id="industry" className="h-12">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Consulting">Consulting</SelectItem>
                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!name || !company || !industry}
                  className="h-12 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-lg font-semibold hover:from-blue-600 hover:to-blue-700"
                >
                  Generate Preview
                </Button>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  We don't collect or store your information. This preview is generated locally.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
