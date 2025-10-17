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
    console.log("[v0] Creating payment intent for wallet payments")

    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount * 100, // Convert to cents
      currency: "usd",
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

    console.log("[v0] Payment intent created:", paymentIntent.id)
    console.log("[v0] Available payment method types:", paymentIntent.payment_method_types)

    return { clientSecret: paymentIntent.client_secret }
  } catch (error) {
    console.error("[v0] Error creating payment intent:", error)
    throw new Error("Failed to create payment intent")
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
      amount: data.amount * 100, // Convert to cents
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
