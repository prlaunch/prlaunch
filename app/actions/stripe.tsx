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
    console.log("[v0] Creating payment intent for:", data.email)

    let customer
    const existingCustomers = await stripe.customers.list({
      email: data.email,
      limit: 1,
    })

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
      console.log("[v0] Found existing customer:", customer.id)

      await stripe.customers.update(customer.id, {
        name: data.fullName,
        metadata: {
          package: data.packageName,
          articles: data.articles.toString(),
          ...(data.companyName && { companyName: data.companyName }),
          ...(data.companyNumber && { companyNumber: data.companyNumber }),
        },
      })
    } else {
      console.log("[v0] Creating new customer for:", data.email)
      customer = await stripe.customers.create({
        email: data.email,
        name: data.fullName,
        metadata: {
          package: data.packageName,
          articles: data.articles.toString(),
          ...(data.companyName && { companyName: data.companyName }),
          ...(data.companyNumber && { companyNumber: data.companyNumber }),
        },
      })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount * 100,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
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
    return { clientSecret: paymentIntent.client_secret }
  } catch (error: any) {
    console.error("[v0] Stripe payment intent creation failed:", error)
    throw new Error(`Failed to create payment intent: ${error.message || "Unknown error"}`)
  }
}

export async function getPaymentIntentCustomer(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const customerId = typeof paymentIntent.customer === "string" ? paymentIntent.customer : paymentIntent.customer?.id

    if (!customerId) {
      throw new Error("No customer ID found on payment intent")
    }

    return { customerId }
  } catch (error: any) {
    console.error("[v0] Failed to retrieve customer from payment intent:", error)
    throw new Error(`Failed to retrieve customer: ${error.message || "Unknown error"}`)
  }
}

export async function getPaymentMethodType(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const paymentMethodId =
      typeof paymentIntent.payment_method === "string" ? paymentIntent.payment_method : paymentIntent.payment_method?.id

    if (!paymentMethodId) {
      return { paymentMethodType: "unknown" }
    }

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)
    return { paymentMethodType: paymentMethod.type }
  } catch (error: any) {
    console.error("[v0] Failed to retrieve payment method type:", error)
    return { paymentMethodType: "unknown" }
  }
}
