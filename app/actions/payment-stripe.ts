"use server"

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
})

export async function createPaymentIntent({
  amount,
  packageName,
  articles,
  email,
  fullName,
  companyName,
  companyNumber,
}: {
  amount: number
  packageName: string
  articles: number
  email: string
  fullName: string
  companyName?: string
  companyNumber?: string
}) {
  try {
    console.log("[v0] Creating payment intent for:", { amount, packageName, articles, email })

    const isPlaceholderEmail = email === "pending@prlaunch.io" || !email || email.trim() === ""
    let customerId: string | undefined = undefined

    if (!isPlaceholderEmail) {
      // Only create/lookup customer if we have real email
      const existingCustomers = await stripe.customers.list({
        email: email,
        limit: 1,
      })

      let customer
      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0]
        console.log("[v0] Using existing customer:", customer.id)

        customer = await stripe.customers.update(customer.id, {
          name: fullName,
          metadata: {
            email: email,
            fullName: fullName,
            package: packageName,
            articles: articles.toString(),
            ...(companyName && { companyName }),
            ...(companyNumber && { companyNumber }),
          },
        })
        console.log("[v0] Updated existing customer metadata")
      } else {
        customer = await stripe.customers.create({
          email: email,
          name: fullName,
          metadata: {
            email: email,
            fullName: fullName,
            package: packageName,
            articles: articles.toString(),
            ...(companyName && { companyName }),
            ...(companyNumber && { companyNumber }),
          },
        })
        console.log("[v0] Created new customer:", customer.id)
      }

      customerId = customer.id
    } else {
      console.log("[v0] Creating payment intent without customer (placeholder email)")
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      ...(customerId && { customer: customerId }),
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "always",
      },
      payment_method_options: {
        card: {
          request_three_d_secure: "automatic",
        },
      },
      metadata: {
        email: email,
        fullName: fullName,
        package: packageName,
        articles: articles.toString(),
        ...(companyName && { companyName }),
        ...(companyNumber && { companyNumber }),
      },
      description: `${packageName} Package - ${articles} article${articles > 1 ? "s" : ""}`,
      ...(!isPlaceholderEmail && { receipt_email: email }),
    })

    console.log("[v0] Payment intent created:", paymentIntent.id)
    console.log("[v0] Available payment method types:", paymentIntent.payment_method_types)

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    }
  } catch (error: any) {
    console.error("[v0] Error creating payment intent:", error)
    throw new Error(error.message || "Failed to create payment intent")
  }
}

export async function getPaymentIntentCustomer(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const customerId = paymentIntent.customer as string

    if (!customerId) {
      throw new Error("No customer found for this payment intent")
    }

    return { customerId }
  } catch (error: any) {
    console.error("[v0] Error retrieving customer:", error)
    throw new Error(error.message || "Failed to retrieve customer")
  }
}

export async function getPaymentMethodType(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const paymentMethodId = paymentIntent.payment_method as string

    if (!paymentMethodId) {
      return { paymentMethodType: "unknown" }
    }

    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)
    return { paymentMethodType: paymentMethod.type }
  } catch (error: any) {
    console.error("[v0] Error retrieving payment method:", error)
    return { paymentMethodType: "unknown" }
  }
}

export async function updateCustomerMetadata({
  paymentIntentId,
  email,
  fullName,
  companyName,
  companyNumber,
  packageName,
  articles,
}: {
  paymentIntentId: string
  email: string
  fullName: string
  companyName?: string
  companyNumber?: string
  packageName: string
  articles: number
}) {
  try {
    console.log("[v0] Updating customer metadata for payment intent:", paymentIntentId)

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    let customerId = paymentIntent.customer as string | undefined

    if (!customerId) {
      console.log("[v0] No customer found, creating new customer with real email")

      const existingCustomers = await stripe.customers.list({
        email: email,
        limit: 1,
      })

      let customer
      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0]
        console.log("[v0] Found existing customer:", customer.id)
      } else {
        customer = await stripe.customers.create({
          email: email,
          name: fullName,
          metadata: {
            email: email,
            fullName: fullName,
            package: packageName,
            articles: articles.toString(),
            ...(companyName && { companyName }),
            ...(companyNumber && { companyNumber }),
          },
        })
        console.log("[v0] Created new customer:", customer.id)
      }

      customerId = customer.id

      // Attach customer to payment intent
      await stripe.paymentIntents.update(paymentIntentId, {
        customer: customerId,
      })
    } else {
      // Update existing customer
      await stripe.customers.update(customerId, {
        email: email,
        name: fullName,
        metadata: {
          email: email,
          fullName: fullName,
          package: packageName,
          articles: articles.toString(),
          ...(companyName && { companyName }),
          ...(companyNumber && { companyNumber }),
        },
      })
    }

    // Update payment intent metadata
    await stripe.paymentIntents.update(paymentIntentId, {
      metadata: {
        email: email,
        fullName: fullName,
        package: packageName,
        articles: articles.toString(),
        ...(companyName && { companyName }),
        ...(companyNumber && { companyNumber }),
      },
      receipt_email: email,
    })

    console.log("[v0] Successfully updated customer and payment intent metadata")

    return { success: true }
  } catch (error: any) {
    console.error("[v0] Error updating customer metadata:", error)
    throw new Error(error.message || "Failed to update customer metadata")
  }
}
