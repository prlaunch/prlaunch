"use server"

import { stripe } from "@/lib/stripe"

export async function createPaymentIntent(data: {
  amount: number
  packageName: string
  articles: number
  email: string
  fullName: string
  companyName?: string
  companyNumber?: string
}) {
  try {
    console.log("[v0] Creating customer for main payment")

    // Create customer first
    const customer = await stripe.customers.create({
      email: data.email,
      name: data.fullName,
      metadata: {
        package: data.packageName,
        articles: data.articles.toString(),
        ...(data.companyName && { companyName: data.companyName }),
        ...(data.companyNumber && { companyNumber: data.companyNumber }),
      },
    })

    console.log("[v0] Customer created:", customer.id)

    // Create payment intent with customer and setup_future_usage
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount * 100,
      currency: "usd",
      customer: customer.id,
      setup_future_usage: "off_session",
      payment_method_types: ["card", "link"],
      metadata: {
        package: data.packageName,
        articles: data.articles.toString(),
        email: data.email,
        fullName: data.fullName,
        ...(data.companyName && { companyName: data.companyName }),
        ...(data.companyNumber && { companyNumber: data.companyNumber }),
      },
      receipt_email: data.email,
      description: `${data.packageName} Package - ${data.articles} article${data.articles > 1 ? "s" : ""}`,
    })

    console.log("[v0] Payment intent created with customer:", paymentIntent.id)

    return { clientSecret: paymentIntent.client_secret }
  } catch (error) {
    console.error("[v0] Error creating payment intent:", error)
    throw new Error("Failed to create payment intent")
  }
}

export async function getPaymentIntentCustomer(paymentIntentId: string) {
  try {
    console.log("[v0] Retrieving payment intent customer:", paymentIntentId)

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    const customerId = typeof paymentIntent.customer === "string" ? paymentIntent.customer : paymentIntent.customer?.id

    if (!customerId) {
      throw new Error("No customer found on payment intent")
    }

    console.log("[v0] Customer ID retrieved:", customerId)
    return { customerId }
  } catch (error) {
    console.error("[v0] Error retrieving customer:", error)
    throw new Error("Failed to retrieve customer")
  }
}

export async function getPaymentMethodType(paymentIntentId: string) {
  try {
    console.log("[v0] Retrieving payment method type for:", paymentIntentId)

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    const paymentMethodId =
      typeof paymentIntent.payment_method === "string" ? paymentIntent.payment_method : paymentIntent.payment_method?.id

    if (!paymentMethodId) {
      throw new Error("No payment method found")
    }

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)

    console.log("[v0] Payment method type:", paymentMethod.type)
    return { paymentMethodType: paymentMethod.type }
  } catch (error) {
    console.error("[v0] Error retrieving payment method type:", error)
    throw new Error("Failed to retrieve payment method type")
  }
}

export async function processMainUpsellPayment(customerId: string, amount: number) {
  try {
    console.log("[v0] Processing main upsell payment for customer:", customerId)

    // Retrieve customer's payment methods
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      limit: 1,
    })

    console.log("[v0] Found payment methods:", paymentMethods.data.length)

    if (paymentMethods.data.length === 0) {
      throw new Error("No saved payment method found for customer")
    }

    const paymentMethod = paymentMethods.data[0]
    console.log("[v0] Using payment method:", paymentMethod.id, "Type:", paymentMethod.type)

    // Create and confirm payment intent with saved payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      customer: customerId,
      payment_method: paymentMethod.id,
      off_session: true,
      confirm: true,
      metadata: {
        type: "upsell",
        product: "EverybodyWiki Page",
      },
      description: "EverybodyWiki Page - One-time Upsell Offer",
    })

    console.log("[v0] Upsell payment successful:", paymentIntent.id, "Status:", paymentIntent.status)

    if (paymentIntent.status === "requires_action") {
      console.log("[v0] Payment requires additional authentication")
      return {
        success: false,
        requiresAction: true,
        clientSecret: paymentIntent.client_secret,
      }
    }

    return { success: true, paymentIntentId: paymentIntent.id }
  } catch (error: any) {
    console.error("[v0] Error processing upsell payment:", error)

    if (error.type === "StripeCardError" && error.code === "authentication_required") {
      console.log("[v0] Payment requires authentication")
      return {
        success: false,
        requiresAction: true,
        error: "Payment requires authentication",
      }
    }

    throw new Error(error.message || "Failed to process upsell payment")
  }
}

export async function createUpsellPaymentIntent(data: {
  amount: number
  email: string
  fullName: string
  originalPackage: string
  originalArticles: number
  originalPrice: number
}) {
  try {
    console.log("[v0] Creating upsell payment intent for EverybodyWiki")

    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount * 100,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        type: "upsell",
        product: "EverybodyWiki Page",
        email: data.email,
        fullName: data.fullName,
        originalPackage: data.originalPackage,
        originalArticles: data.originalArticles.toString(),
        originalPrice: data.originalPrice.toString(),
      },
      receipt_email: data.email,
      description: "EverybodyWiki Page - One-time Upsell Offer",
    })

    console.log("[v0] Upsell payment intent created:", paymentIntent.id)

    return { clientSecret: paymentIntent.client_secret }
  } catch (error) {
    console.error("[v0] Error creating upsell payment intent:", error)
    throw new Error("Failed to create upsell payment intent")
  }
}
