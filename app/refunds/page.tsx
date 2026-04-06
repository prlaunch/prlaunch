import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Refund Policy | PR Launch",
  description: "Refund Policy for PR Launch - Understand our refund terms and conditions.",
}

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-black mb-4">Refund Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">1. Overview</h2>
              <p className="text-slate-700 leading-relaxed">
                At PR Launch (operated by MEQAYIS RAISIA MARKETING AND PR CO. L.L.C), we are committed to delivering
                high-quality PR services. We offer a 100% money-back guarantee if articles are not published within 48
                hours of client's approval. This Refund Policy outlines the circumstances under which refunds may be
                issued.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">2. Refund Eligibility</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Refunds are ONLY provided under the following specific circumstances:
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
                <p className="text-slate-700 font-semibold mb-2">Eligible for Refund:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Articles are not published within 48 hours after client approval</li>
                  <li>We are unable to fulfill the service as described</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">3. Non-Refundable Items</h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6">
                <p className="text-slate-700 font-semibold mb-2">NOT Eligible for Refund:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Free gifts or bonus services</li>
                  <li>Articles published within 48 hours of approval</li>
                  <li>Orders where the article has been successfully published within the guaranteed timeframe</li>
                  <li>Change of mind after article approval and publication</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">4. Order Finality</h2>
              <p className="text-slate-700 leading-relaxed">
                All orders are considered final once the article has been approved by the client and published within 48
                hours. By approving an article, you acknowledge that you have reviewed the content and agree to
                publication. If the article is not published within 48 hours of your approval, you are eligible for a
                full refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">5. Revision Policy</h2>
              <p className="text-slate-700 leading-relaxed mb-4">Before requesting a refund, please note:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Every order includes UNLIMITED free revisions</li>
                <li>You have the right to review and approve articles before publication</li>
                <li>We encourage clients to request as many revisions as needed to ensure complete satisfaction</li>
                <li>Our team will work with you until the article meets your expectations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">6. How to Request a Refund</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                If you believe you are eligible for a refund based on the criteria above, please follow these steps:
              </p>
              <ol className="list-decimal pl-6 space-y-3 text-slate-700">
                <li>
                  <strong>Email us at:</strong> hello@prlaunch.io
                </li>
                <li>
                  <strong>Include the following information:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Your order number</li>
                    <li>Date of purchase</li>
                    <li>Reason for refund request</li>
                    <li>Any relevant documentation</li>
                  </ul>
                </li>
                <li>
                  <strong>Subject line:</strong> "Refund Request - [Your Order Number]"
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">7. Refund Processing</h2>
              <p className="text-slate-700 leading-relaxed mb-4">Once your refund request is received and approved:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>We will review your request within 5-7 business days</li>
                <li>You will receive an email confirmation of approval or denial</li>
                <li>Approved refunds will be processed within 10-14 business days</li>
                <li>Refunds will be issued to the original payment method</li>
                <li>Processing time may vary depending on your financial institution</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">8. Partial Refunds</h2>
              <p className="text-slate-700 leading-relaxed">
                In some cases, partial refunds may be issued at our discretion if services were partially delivered or
                if there were extenuating circumstances. Each case will be evaluated individually.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">9. Chargebacks</h2>
              <p className="text-slate-700 leading-relaxed">
                We strongly encourage you to contact us directly before initiating a chargeback with your bank or credit
                card company. Chargebacks may result in suspension of services and may affect your ability to use PR
                Launch in the future.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">10. Questions and Disputes</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                If you have questions about our Refund Policy or wish to dispute a refund decision, please contact us:
              </p>
              <div className="bg-slate-50 p-6 rounded-lg space-y-2">
                <p className="text-slate-700">
                  <strong>Email:</strong> hello@prlaunch.io
                </p>
                <p className="text-slate-700">
                  <strong>Phone:</strong> +971 55 44 708 24
                </p>
                <p className="text-slate-700">
                  <strong>Address:</strong> Office 159, Floor C18, Ontario Tower, Business Bay, Dubai, United Arab
                  Emirates
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">11. Policy Changes</h2>
              <p className="text-slate-700 leading-relaxed">
                We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately
                upon posting to our website. Your continued use of our services after changes constitutes acceptance of
                the modified policy.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
