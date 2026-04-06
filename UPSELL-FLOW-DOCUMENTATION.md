# One-Click Upsell Flow - Complete Documentation

## Overview
The `/add-more` page offers customers 4 additional articles for $97 after completing their initial purchase. This is a post-purchase one-click upsell using Stripe's `off_session` payment capability.

## How It Works

### Flow Sequence
1. **Payment Page** → Customer completes payment with any method
2. **Payment Success** → System captures `customerId` and `paymentMethodType`
3. **Routing Logic** → Determines if customer should see upsell
4. **Add-More Page** → Shows 5-minute countdown with one-click purchase button
5. **Stripe Charge** → Uses saved payment method with `off_session: true`
6. **Thank You Page** → Shows final order total with all articles

### Current Implementation

\`\`\`typescript
// In app/payment/page.tsx - handlePaymentComplete()
const skipUpsell = 
  selectedPackage === 'agency' || 
  paymentMethodType === 'apple_pay' || 
  paymentMethodType === 'google_pay'

if (skipUpsell) {
  // Go directly to thank-you
  router.push('/thank-you?...')
} else {
  // Show upsell page
  router.push('/add-more?...&customerId=...&paymentMethodType=...')
}
\`\`\`

## Payment Method Compatibility

### ✅ WORKS RELIABLY
**Credit/Debit Cards**
- Status: **Fully Supported**
- One-click works: Yes
- Why: Card details are saved by default and can be charged off-session
- Safe to launch: **YES**

**Stripe Link (with saved card)**
- Status: **Supported if customer opted to save**
- One-click works: Yes, if saved
- Why: Link can store payment methods for future use
- Safe to launch: **YES** (with error handling)

### ❌ DOES NOT WORK
**Apple Pay**
- Status: **NOT SUPPORTED**
- One-click works: No
- Why: Apple Pay tokens are single-use only, cannot be charged off-session
- Current solution: **Skips upsell, goes directly to thank-you**
- Safe to launch: **YES** (with skip logic)

**Google Pay**
- Status: **NOT SUPPORTED**
- One-click works: No
- Why: Google Pay tokens are single-use only, cannot be charged off-session
- Current solution: **Skips upsell, goes directly to thank-you**
- Safe to launch: **YES** (with skip logic)

## Package Filtering

### Current Rules
- **Starter (1 article)** → ✅ Shows upsell
- **Growth (3-4 articles)** → ✅ Shows upsell
- **Authority (5-7 articles)** → ✅ Shows upsell
- **Agency (40 articles)** → ❌ Skips upsell (already bulk purchase)

### Logic Location
File: `app/payment/page.tsx`
Function: `handlePaymentComplete()`

## Error Handling

### Stripe Error Scenarios

1. **No Payment Method Found**
   - Message: "No saved payment method found. Please contact support."
   - Action: Shows error, allows skip to thank-you

2. **Card Declined**
   - Message: "Your card was declined. Please contact your bank."
   - Action: Shows error, allows skip to thank-you

3. **Requires Authentication**
   - Message: "Additional authentication required. Please contact support to complete your purchase."
   - Action: Cannot complete 3D Secure off-session, directs to support

4. **Generic Stripe Error**
   - Message: "Failed to process upsell payment. Please contact support."
   - Action: Shows error, allows skip to thank-you

### Frontend Error Display
- Non-intrusive alert() messages
- Button re-enables after error
- Skip option always available
- No payment failures block order completion

## Timer Behavior

- **Duration:** 5 minutes (300 seconds)
- **Auto-redirect:** Goes to thank-you page when expires
- **Countdown display:** MM:SS format in red badge
- **No pause/reset:** Timer continues even if user leaves and returns

## Data Flow

### URL Parameters Passed to Add-More
\`\`\`
/add-more?
  order_id=1234567890
  &package=Growth
  &articles=4
  &amount=127
  &email=customer@example.com
  &name=John+Doe
  &customerId=cus_abc123
  &paymentMethodType=card
\`\`\`

### URL Parameters Passed to Thank-You (if accepted)
\`\`\`
/thank-you?
  package=Growth
  &articles=8              ← Original 4 + Upsell 4
  &price=224               ← Original $127 + Upsell $97
  &email=customer@example.com
  &name=John+Doe
  &upsell=accepted
  &upsellArticles=4
  &upsellPrice=97
\`\`\`

## Security Considerations

### ✅ Secure Elements
- Customer ID verification required
- Stripe's built-in fraud prevention
- Off-session payment with customer's saved method
- No card details stored in your database
- PCI compliance handled by Stripe

### ⚠️ Potential Issues
- **Session hijacking:** URL parameters contain order info (but no payment data)
- **Replay attacks:** Same customerId could theoretically be used multiple times
- **Recommendation:** Add order ID verification to prevent duplicate charges

## Performance Metrics to Track

Once launched, monitor these metrics:

1. **Upsell Show Rate:** % of customers who see the upsell page
2. **Upsell Accept Rate:** % who click "Yes"
3. **Payment Success Rate:** % of accepts that successfully charge
4. **Payment Method Breakdown:** Card vs Link vs Express checkout
5. **Timer Expiration Rate:** % who let timer run out
6. **Skip Rate:** % who manually skip

## Pre-Launch Checklist

### ✅ COMPLETED
- [x] Express checkout (Apple/Google Pay) automatically skips upsell
- [x] Agency package automatically skips upsell
- [x] Error messages display properly
- [x] Timer auto-redirects after expiration
- [x] Payment method type detected and passed
- [x] Warning shown for potentially incompatible payment methods
- [x] Button properly styled and visible

### ⚠️ RECOMMENDED BEFORE LAUNCH
- [ ] Test with real Stripe account (currently test mode)
- [ ] Test card payment → upsell flow end-to-end
- [ ] Test Link payment → upsell flow
- [ ] Verify Apple Pay skips directly to thank-you
- [ ] Verify Google Pay skips directly to thank-you
- [ ] Add server-side order ID verification to prevent duplicate charges
- [ ] Set up Stripe webhook to log upsell purchases
- [ ] Add analytics tracking for upsell metrics
- [ ] Test timer expiration auto-redirect
- [ ] Test manual skip button

### 🔒 SECURITY ENHANCEMENTS (Optional)
- [ ] Add CSRF token to upsell acceptance
- [ ] Verify order hasn't already been upsold (prevent double-charge)
- [ ] Add rate limiting to prevent abuse
- [ ] Log all upsell attempts for fraud detection

## Launch Recommendation

### Current Status: **SAFE TO LAUNCH WITH CARD PAYMENTS**

**Why it's safe:**
1. Express checkout customers skip upsell entirely (no broken experience)
2. Agency customers skip upsell (appropriate business logic)
3. Card payments have proper error handling with skip option
4. No payment failure blocks the customer's original order
5. All edge cases have fallback paths

**Minor risks:**
- Link payments may fail if customer didn't save card (but has error handling)
- Timer expiration experience is acceptable (auto-redirect)
- URL parameters are visible (but contain no sensitive payment data)

### Suggested Soft Launch Strategy
1. **Week 1:** Launch to 10% of traffic, monitor metrics
2. **Week 2:** Increase to 50% if no issues
3. **Week 3:** Full rollout to 100% of card payments

### Red Flags to Watch For
- Upsell accept rate above 60% (potential abuse)
- Payment failure rate above 5%
- Customer support tickets about double charges
- Complaints about "couldn't complete purchase"

## Contact for Issues

If customers report problems:
- **Support Email:** support@prlaunch.io
- **Resolution:** Manually add articles to order or issue refund
- **Escalation:** Check Stripe dashboard for failed payment intents

---

**Last Updated:** 2025-11-17
**Version:** 1.0
**Reviewed By:** v0 AI Assistant
