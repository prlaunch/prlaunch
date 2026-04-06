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

export async function processMainUpsellPayment(customerId: string, amount: number) {
  try {
    console.log("[v0] Processing upsell payment for customer:", customerId)

    // Get customer's default payment method
    const customer = await stripe.customers.retrieve(customerId)
    
    if (customer.deleted) {
      throw new Error("Customer has been deleted")
    }

    const defaultPaymentMethod = customer.invoice_settings?.default_payment_method as string | undefined

    // If no default payment method, try to get from recent payment intents
    let paymentMethodId = defaultPaymentMethod
    
    if (!paymentMethodId) {
      const paymentIntents = await stripe.paymentIntents.list({
        customer: customerId,
        limit: 1,
      })
      
      if (paymentIntents.data.length > 0 && paymentIntents.data[0].payment_method) {
        paymentMethodId = typeof paymentIntents.data[0].payment_method === "string" 
          ? paymentIntents.data[0].payment_method 
          : paymentIntents.data[0].payment_method.id
      }
    }

    if (!paymentMethodId) {
      console.error("[v0] No payment method found for customer")
      return { success: false, error: "No payment method on file" }
    }

    // Create and confirm payment intent for upsell
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
      metadata: {
        type: "upsell",
        product: "Wikipedia Page Creation",
      },
      description: "Wikipedia Page Creation - Upsell",
    })

    console.log("[v0] Upsell payment intent status:", paymentIntent.status)

    if (paymentIntent.status === "succeeded") {
      return { success: true, paymentIntentId: paymentIntent.id }
    } else if (paymentIntent.status === "requires_action") {
      return { success: false, requiresAction: true, clientSecret: paymentIntent.client_secret }
    } else {
      return { success: false, error: `Payment status: ${paymentIntent.status}` }
    }
  } catch (error: any) {
    console.error("[v0] Upsell payment failed:", error)
    
    // Handle specific Stripe errors
    if (error.code === "authentication_required") {
      return { success: false, requiresAction: true }
    }
    
    return { success: false, error: error.message || "Payment failed" }
  }
}
