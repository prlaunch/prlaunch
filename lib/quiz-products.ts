export interface QuizProduct {
  id: string
  name: string
  description: string
  priceInCents: number
}

export const QUIZ_PRODUCTS: QuizProduct[] = [
  {
    id: "professional-writing",
    name: "Free Article + Pro Writing",
    description: "Written by experienced journalists with unlimited revisions",
    priceInCents: 4499, // $44.99
  },
  {
    id: "upsell-bundle",
    name: "Add 2 More Articles",
    description: "Back inventory deal - 2 additional professional articles",
    priceInCents: 7947, // $79.47
  },
]
