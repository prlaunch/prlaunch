"use server"

import { stripe } from "@/lib/stripe"
import { QUIZ_PRODUCTS } from "@/lib/quiz-products"

export async function createQuizPaymentIntent(productId: string, email: string, fullName: string) {
  const product = QUIZ_PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  try {
    let customer
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    })

    if (existingCustomers.data.length > 0) {
      // Update existing customer with latest information
      customer = existingCustomers.data[0]
      await stripe.customers.update(customer.id, {
        name: fullName,
        metadata: {
          source: "quiz",
          productId: product.id,
          productName: product.name,
          email: email,
          fullName: fullName,
        },
      })
    } else {
      // Create new customer with complete metadata
      customer = await stripe.customers.create({
        email: email,
        name: fullName,
        metadata: {
          source: "quiz",
          productId: product.id,
          productName: product.name,
          email: email,
          fullName: fullName,
        },
      })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.priceInCents,
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card", "link"],
      setup_future_usage: "off_session",
      metadata: {
        productId: product.id,
        productName: product.name,
        email: email,
        fullName: fullName,
      },
      receipt_email: email,
      description: product.description,
    })

    return { clientSecret: paymentIntent.client_secret }
  } catch (error) {
    throw new Error("Failed to create payment intent")
  }
}

export async function getPaymentIntentCustomer(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ["payment_method"],
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

    return { customerId, paymentMethodType }
  } catch (error) {
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
    throw new Error("Failed to retrieve checkout session")
  }
}

export async function processUpsellPayment(customerId: string, amount: number) {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      limit: 10,
    })

    if (paymentMethods.data.length === 0) {
      return {
        success: false,
        error: "No saved payment method found. Please contact support.",
      }
    }

    const paymentMethod = paymentMethods.data[0]

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
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

    return {
      success: true,
      paymentIntentId: paymentIntent.id,
    }
  } catch (error: any) {
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
