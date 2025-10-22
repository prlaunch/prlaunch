import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { SocialProofGrid } from "@/components/social-proof-grid"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

export default function PricingPage() {
  const packages = [
    {
      name: "Starter",
      articles: "1 article",
      price: "$47",
      originalPrice: "$94",
      perArticle: "$47",
      popular: false,
      isAgency: false,
      features: [
        "Pro writing included",
        "Real editorial or contributor articles",
        "Published on U.S. news sites",
        "Shareable links for social proof",
        "Backlinks and social media links included",
      ],
    },
    {
      name: "Growth",
      articles: "3 articles",
      price: "$127",
      originalPrice: "$254",
      perArticle: "$42.30",
      popular: true,
      isAgency: false,
      features: [
        "Everything in Starter, plus:",
        "3 premium publication placements",
        "Better value per article",
        "Multiple backlinks for SEO",
        "More prominent Google presence",
      ],
    },
    {
      name: "Authority",
      articles: "5 articles",
      price: "$197",
      originalPrice: "$394",
      perArticle: "$39.40",
      popular: false,
      isAgency: false,
      features: [
        "Everything in Growth, plus:",
        "5 premium publication placements",
        "Best value per article",
        "Maximum authority building",
        "Comprehensive media coverage",
        "Strongest SEO impact",
        "Priority support",
      ],
    },
    {
      name: "Agency",
      articles: "40 articles",
      price: "$997",
      originalPrice: "$1,994",
      perArticle: "$24.93",
      popular: false,
      isAgency: true,
      features: [
        "Everything in Authority, plus:",
        "40 premium publication placements",
        "Agency deal per article ($24.93)",
        "Enterprise-level media coverage",
        "Dedicated account manager",
      ],
    },
  ]

  return (
    <>
      <main className="min-h-screen bg-white pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 text-balance">Simple, Transparent Pricing</h1>
            <p className="text-lg md:text-xl text-gray-600 text-balance">
              Get featured on major news sites and build instant credibility
            </p>
          </div>

          {/* Pricing grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
            {packages.map((pkg) => (
              <div key={pkg.name} className="relative">
                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white px-4 py-1 text-sm font-semibold">
                      ⭐ MOST POPULAR
                    </Badge>
                  </div>
                )}

                {pkg.popular ? (
                  // Gradient border wrapper for Growth package
                  <div className="rounded-3xl p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 shadow-2xl h-full">
                    <div className="rounded-[22px] p-8 bg-gradient-to-br from-gray-900 to-gray-800 h-full flex flex-col">
                      {/* Plan Name */}
                      <div className="mb-6 text-center">
                        <p className="text-2xl font-bold text-blue-400 mb-2">{pkg.articles}</p>
                        <h2 className="text-2xl font-bold text-white">{pkg.name}</h2>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl font-semibold line-through text-gray-400">{pkg.originalPrice}</span>
                          <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                            50% OFF
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl md:text-6xl font-bold text-white">{pkg.price}</span>
                        </div>
                        <p className="mt-2 text-gray-300">{pkg.perArticle} per article</p>
                      </div>

                      <Button
                        asChild
                        size="lg"
                        className="w-full h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 mb-8"
                      >
                        <a href="/checkout">Get Featured</a>
                      </Button>

                      {/* Features List */}
                      <div className="space-y-3 flex-1">
                        {pkg.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3">
                            <div className="mt-0.5 shrink-0">
                              <Check className="h-5 w-5 text-blue-400" />
                            </div>
                            <span className="text-sm leading-relaxed text-gray-200">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular cards for Starter, Authority, and Agency
                  <div
                    className={`rounded-3xl p-8 shadow-2xl h-full flex flex-col ${
                      pkg.isAgency ? "bg-white border-2 border-gray-200" : "bg-gradient-to-br from-gray-900 to-gray-800"
                    }`}
                  >
                    {/* Plan Name */}
                    <div className="mb-6 text-center">
                      <p className={`text-2xl font-bold mb-2 ${pkg.isAgency ? "text-blue-600" : "text-blue-400"}`}>
                        {pkg.articles}
                      </p>
                      <h2 className={`text-2xl font-bold ${pkg.isAgency ? "text-black" : "text-white"}`}>{pkg.name}</h2>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-semibold line-through text-gray-400">{pkg.originalPrice}</span>
                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                          50% OFF
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-5xl md:text-6xl font-bold ${pkg.isAgency ? "text-black" : "text-white"}`}
                        >
                          {pkg.price}
                        </span>
                      </div>
                      <p className={`mt-2 ${pkg.isAgency ? "text-gray-600" : "text-gray-300"}`}>
                        {pkg.perArticle} per article
                      </p>
                    </div>

                    <Button
                      asChild
                      size="lg"
                      className="w-full h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 mb-8"
                    >
                      <a href={pkg.isAgency ? `/payment?package=${pkg.name.toLowerCase()}` : "/checkout"}>
                        Get Featured
                      </a>
                    </Button>

                    {/* Features List */}
                    <div className="space-y-3 flex-1">
                      {pkg.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0">
                            <Check className="h-5 w-5 text-blue-400" />
                          </div>
                          <span
                            className={`text-sm leading-relaxed ${pkg.isAgency ? "text-gray-700" : "text-gray-200"}`}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">No hidden fees. No subscriptions. Just one simple payment.</p>
          </div>
        </div>
      </main>

      <SocialProofGrid />
      <FAQSection />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 text-balance">
            Ready to Build Your Credibility?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 text-balance max-w-2xl mx-auto">
            Get featured on major news sites in 7 days and start converting more customers today.
          </p>
          <Button
            asChild
            size="lg"
            className="h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 text-lg font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
          >
            <a href="/checkout">Get Featured</a>
          </Button>
        </div>
      </section>

      <Footer />
    </>
  )
}
