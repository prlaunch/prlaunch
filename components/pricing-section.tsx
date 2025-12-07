import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function PricingSection() {
  const packages = [
    {
      name: "Starter",
      articles: "1 article",
      price: "$67",
      perArticle: "$67",
      popular: false,
    },
    {
      name: "Growth",
      articles: "3 articles",
      price: "$127",
      perArticle: "$42.30",
      popular: true,
    },
    {
      name: "Authority",
      articles: "5 articles",
      price: "$197",
      perArticle: "$39.40",
      popular: false,
    },
  ]

  const features = [
    "All placements guaranteed within 48 hours",
    "Real editorial or contributor articles",
    "Shareable links for social proof",
    "100% money-back guarantee if not published within 48 hours of approval",
  ]

  return (
    <section id="pricing" className="bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Choose Your Package
            </h2>
          </div>

          {/* Pricing Cards */}
          <div className="mb-12 grid gap-8 md:grid-cols-3">
            {packages.map((pkg) => (
              <Card key={pkg.name} className={`relative ${pkg.popular ? "border-accent shadow-lg" : ""}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground">⭐ MOST POPULAR</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-base">{pkg.articles}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-foreground">{pkg.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.perArticle} per article</p>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
                  >
                    <a href="/checkout/step-5">Choose {pkg.name}</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Features List */}
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
