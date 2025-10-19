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

    const customer = await stripe.customers.create({
      email: email,
      name: fullName,
      metadata: {
        source: "quiz",
        productId: product.id,
      },
    })

    console.log("[v0] Customer created:", customer.id)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.priceInCents,
      currency: "usd",
      customer: customer.id, // Add customer ID
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

    console.log("[v0] Quiz payment intent created:", paymentIntent.id, "with customer:", customer.id)

    return { clientSecret: paymentIntent.client_secret }
  } catch (error) {
    console.error("[v0] Error creating quiz payment intent:", error)
    throw new Error("Failed to create payment intent")
  }
}

export async function getPaymentIntentCustomer(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ["payment_method"], // Expand payment method to get its type
    })

    const customerId = typeof paymentIntent.customer === "string" ? paymentIntent.customer : paymentIntent.customer?.id

    let paymentMethodType = "unknown"
    if (paymentIntent.payment_method) {
      if (typeof paymentIntent.payment_method === "string") {
        const pm = await stripe.paymentMethods.retrieve(paymentIntent.payment_method)
        paymentMethodType = pm.type
      } else {
        paymentMethodType = paymentIntent.payment_method.type
      }
    }

    console.log("[v0] Retrieved customer ID:", customerId, "payment method type:", paymentMethodType)

    return { customerId, paymentMethodType }
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

    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      // Removed type filter to include all payment methods (card, link, etc.)
      limit: 10, // Get more to ensure we find one
    })

    console.log("[v0] Found payment methods:", paymentMethods.data.length)

    if (paymentMethods.data.length > 0) {
      console.log("[v0] Payment method types found:", paymentMethods.data.map((pm) => pm.type).join(", "))
    }

    if (paymentMethods.data.length === 0) {
      console.error("[v0] No payment method found for customer")
      return {
        success: false,
        error: "No saved payment method found. Please contact support.",
      }
    }

    const paymentMethod = paymentMethods.data[0]
    console.log("[v0] Using payment method:", paymentMethod.id, "type:", paymentMethod.type)

    // Create and confirm payment intent with stored payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents and round
      currency: "usd",
      customer: customerId,
      payment_method: paymentMethod.id,
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
      return {
        success: false,
        error: "Your card was declined. Please contact your bank.",
      }
    }

    if (error.code === "authentication_required") {
      return {
        success: false,
        error: "Additional authentication required. Please contact support to complete your purchase.",
      }
    }

    return {
      success: false,
      error: error.message || "Failed to process upsell payment",
    }
  }
}
