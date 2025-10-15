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
    <section
      id="story-scroll-section"
      className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-background via-blue-50/30 to-background"
    >
      <div className="container mx-auto px-4">
        {/* Intro */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
              You Have a Story...
            </span>
          </h2>
          <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto text-balance">
            Whether it's your career, personal achievements, or a cause you support, you have a story we can publish for
            you.
          </p>
        </div>

        {/* Entrepreneurs */}
        <div className="mb-16 md:mb-20">
          <h3 className="mb-8 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl text-center">
            We have helped{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              entrepreneurs
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {entrepreneurs.map((entrepreneur) => (
              <div
                key={entrepreneur.name}
                className="rounded-lg bg-white p-4 shadow-md border border-border flex flex-col items-center justify-center"
              >
                <div className="relative w-12 h-12 mb-2 rounded-md overflow-hidden bg-muted">
                  <Image
                    src={entrepreneur.image || "/placeholder.svg"}
                    alt={entrepreneur.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-0.5 text-center">{entrepreneur.name}</h4>
                <p className="text-xs text-muted-foreground text-center">{entrepreneur.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Companies */}
        <div className="mb-16 md:mb-20">
          <h3 className="mb-8 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl text-center">
            We empower{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              companies
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {companies.map((company) => (
              <div
                key={company.name}
                className="rounded-lg bg-white p-4 shadow-md border border-border flex flex-col items-center justify-center"
              >
                <div className="relative w-12 h-12 mb-2">
                  <Image src={company.logo || "/placeholder.svg"} alt={company.name} fill className="object-contain" />
                </div>
                <h4 className="text-sm font-bold text-foreground text-center">{company.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* You */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="mb-6 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            And now it's time for{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
              you
            </span>
          </h3>
          <div className="mb-8 text-6xl md:text-7xl">🫵😎</div>
          <Button onClick={scrollToWhatYouGet} variant="outline" size="lg" className="text-base bg-transparent">
            See the stories we write
          </Button>
        </div>
      </div>
    </section>
  )
}
