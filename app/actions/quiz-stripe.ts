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
    payment_intent_data: {
      setup_future_usage: "off_session",
    },
    custom_text: {
      submit: {
        message: "Complete your order securely",
      },
    },
  })

  return session.client_secret
}

export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer", "payment_intent"],
    })

    return {
      customerId: typeof session.customer === "string" ? session.customer : session.customer?.id,
      paymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
    }
  } catch (error) {
    console.error("[v0] Error retrieving checkout session:", error)
    throw new Error("Failed to retrieve checkout session")
  }
}

export async function processUpsellPayment(customerId: string, amount: number) {
  try {
    console.log("[v0] Processing upsell payment for customer:", customerId)

    // Retrieve customer's default payment method
    const customer = await stripe.customers.retrieve(customerId)

    if (!customer || customer.deleted) {
      throw new Error("Customer not found")
    }

    const defaultPaymentMethod = customer.invoice_settings?.default_payment_method

    if (!defaultPaymentMethod) {
      throw new Error("No payment method found for customer")
    }

    // Create and confirm payment intent with stored payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "usd",
      customer: customerId,
      payment_method: typeof defaultPaymentMethod === "string" ? defaultPaymentMethod : defaultPaymentMethod.id,
      off_session: true,
      confirm: true,
      description: "Quiz Upsell - 2 Additional Articles",
      metadata: {
        type: "upsell",
        product: "2 Additional Articles",
      },
    })

    console.log("[v0] Upsell payment successful:", paymentIntent.id)

    return {
      success: true,
      paymentIntentId: paymentIntent.id,
    }
  } catch (error: any) {
    console.error("[v0] Error processing upsell payment:", error)

    // Handle specific Stripe errors
    if (error.type === "StripeCardError") {
      throw new Error("Your card was declined. Please contact your bank.")
    }

    throw new Error("Failed to process upsell payment")
  }
}
