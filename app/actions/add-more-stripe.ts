"use server"

import { stripe } from "@/lib/stripe"

export async function processAddMoreUpsell(customerId: string, amount: number, orderId?: string) {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      limit: 1,
    })

    if (paymentMethods.data.length === 0) {
      return {
        success: false,
        error: "No saved payment method found. Please contact support.",
      }
    }

    const paymentMethod = paymentMethods.data[0]

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "usd",
      customer: customerId,
      payment_method: paymentMethod.id,
      off_session: true,
      confirm: true,
      metadata: {
        type: "add_more_upsell",
        product: "4 Additional Articles",
        original_order_id: orderId || "",
        upsell_articles: "4",
      },
      description: "4 Additional Articles - Post-Purchase Upsell",
    })

    if (paymentIntent.status === "requires_action") {
      return {
        success: false,
        requiresAction: true,
        error: "Payment requires additional authentication. Please contact support.",
      }
    }

    if (paymentIntent.status === "succeeded") {
      return {
        success: true,
        paymentIntentId: paymentIntent.id,
      }
    }

    return {
      success: false,
      error: "Payment was not completed. Please try again.",
    }
  } catch (error: any) {
    console.error("[v0] Add-more upsell payment error:", error)

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
      error: error.message || "Failed to process upsell payment. Please contact support.",
    }
  }
}
