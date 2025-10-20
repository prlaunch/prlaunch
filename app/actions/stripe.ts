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

    return { clientSecret: paymentIntent.client_secret }
  } catch (error) {
    console.error("[v0] Error creating payment intent:", error)
    throw new Error("Failed to create payment intent")
  }
}

export async function getPaymentIntentCustomer(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    const customerId = typeof paymentIntent.customer === "string" ? paymentIntent.customer : paymentIntent.customer?.id

    if (!customerId) {
      throw new Error("No customer found on payment intent")
    }

    return { customerId }
  } catch (error) {
    console.error("[v0] Error retrieving customer:", error)
    throw new Error("Failed to retrieve customer")
  }
}

export async function getPaymentMethodType(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    const paymentMethodId =
      typeof paymentIntent.payment_method === "string" ? paymentIntent.payment_method : paymentIntent.payment_method?.id

    if (!paymentMethodId) {
      throw new Error("No payment method found")
    }

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)

    return { paymentMethodType: paymentMethod.type }
  } catch (error) {
    console.error("[v0] Error retrieving payment method type:", error)
    throw new Error("Failed to retrieve payment method type")
  }
}

export async function processMainUpsellPayment(customerId: string, amount: number) {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      limit: 1,
    })

    if (paymentMethods.data.length === 0) {
      throw new Error("No saved payment method found for customer")
    }

    const paymentMethod = paymentMethods.data[0]

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

    if (paymentIntent.status === "requires_action") {
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

    return { clientSecret: paymentIntent.client_secret }
  } catch (error) {
    console.error("[v0] Error creating upsell payment intent:", error)
    throw new Error("Failed to create upsell payment intent")
  }
}
