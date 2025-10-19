"use server"

import { stripe } from "@/lib/stripe"
import { QUIZ_PRODUCTS } from "@/lib/quiz-products"

export async function createQuizPaymentIntent(productId: string, email: string, fullName: string) {
  const product = QUIZ_PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  try {
    console.log("[v0] Creating quiz payment intent with setup_future_usage for one-click upsell")

    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.priceInCents,
      currency: "usd",
      payment_method_types: ["card", "link"],
      setup_future_usage: "off_session", // Enable one-click upsell
      metadata: {
        productId: product.id,
        productName: product.name,
        email: email,
        fullName: fullName,
      },
      receipt_email: email,
      description: product.description,
    })

    console.log("[v0] Quiz payment intent created:", paymentIntent.id)

    return { clientSecret: paymentIntent.client_secret }
  } catch (error) {
    console.error("[v0] Error creating quiz payment intent:", error)
    throw new Error("Failed to create payment intent")
  }
}

export async function getPaymentIntentCustomer(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    const customerId = typeof paymentIntent.customer === "string" ? paymentIntent.customer : paymentIntent.customer?.id

    console.log("[v0] Retrieved customer ID from payment intent:", customerId)

    return { customerId }
  } catch (error) {
    console.error("[v0] Error retrieving payment intent:", error)
    throw new Error("Failed to retrieve payment intent")
  }
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
