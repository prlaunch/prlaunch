"use server"

import { stripe } from "@/lib/stripe"
import { QUIZ_PRODUCTS } from "@/lib/quiz-products"

export async function startQuizCheckoutSession(productId: string) {
  const product = QUIZ_PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // Hide line items in embedded checkout since we show order summary above
    custom_text: {
      submit: {
        message: "Complete your order securely",
      },
    },
  })

  return session.client_secret
}
