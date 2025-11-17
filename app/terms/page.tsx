import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Terms of Service | PR Launch",
  description: "Terms of Service for PR Launch - Read our terms and conditions for using our PR distribution services.",
}

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-black mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">1. Agreement to Terms</h2>
              <p className="text-slate-700 leading-relaxed">
                By accessing or using PR Launch (operated by MEQAYIS RAISIA MARKETING AND PR CO. L.L.C, doing business
                as "PR Launch" or "prlaunch.io"), you agree to be bound by these Terms of Service. If you do not agree
                to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">2. Services Provided</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                PR Launch provides public relations services including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Article writing and content creation</li>
                <li>Publication and distribution to media outlets</li>
                <li>Guaranteed article placements on specified publications</li>
                <li>PR consultation and strategy services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">3. Order Process and Approval</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                All orders placed through PR Launch are subject to the following process:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Users have the right to approve all articles before publication</li>
                <li>Unlimited free revisions are included with every order</li>
                <li>Once approved, orders are considered final</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">4. Order Finality</h2>
              <p className="text-slate-700 leading-relaxed">
                All orders are final once the article has been approved by the client and published. We reserve the
                right to reject orders that promote harmful, illegal, or inappropriate content at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">5. Refund Policy</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We offer a 100% money-back guarantee if articles are not published within 48 hours of client's approval.
                Refunds are only provided under the following circumstances:
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
                <p className="text-slate-700 font-semibold mb-2">Eligible for Refund:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Articles are not published within 48 hours after client approval</li>
                  <li>We are unable to fulfill the service as described</li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6">
                <p className="text-slate-700 font-semibold mb-2">NOT Eligible for Refund:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Free gifts or bonus services</li>
                  <li>Articles published within 48 hours of approval</li>
                  <li>Orders where the article has been successfully published within the guaranteed timeframe</li>
                  <li>Change of mind after article approval and publication</li>
                </ul>
              </div>

              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Revision Policy:</strong> Every order includes unlimited free revisions. We encourage clients to
                request as many revisions as needed to ensure complete satisfaction before approving the article for
                publication.
              </p>

              <p className="text-slate-700 leading-relaxed">
                All refund requests must be submitted to hello@prlaunch.io. For complete refund terms, please see our{" "}
                <Link href="/refunds" className="text-blue-600 hover:underline">
                  Refund Policy
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">6. Content Guidelines</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We reserve the right to reject any order that contains:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Harmful, defamatory, or illegal content</li>
                <li>Misleading or fraudulent information</li>
                <li>Content that violates third-party rights</li>
                <li>Content that violates publication guidelines</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">7. Limitation of Liability</h2>
              <p className="text-slate-700 leading-relaxed">
                PR Launch and MEQAYIS RAISIA MARKETING AND PR CO. L.L.C are not liable for any damages, losses, or
                consequences resulting from articles purchased through our services. This includes but is not limited to
                reputational damage, financial loss, or any indirect or consequential damages. Clients are solely
                responsible for the content they approve for publication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">8. Third-Party Relationships</h2>
              <p className="text-slate-700 leading-relaxed">
                PR Launch is not associated with, endorsed by, or affiliated with Meta, Apple, or any of the
                publications we distribute content to. We operate as an independent PR service provider.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">9. Intellectual Property</h2>
              <p className="text-slate-700 leading-relaxed">
                Upon full payment and publication, clients retain ownership of the content created for their order.
                However, PR Launch retains the right to use published articles as portfolio examples and testimonials
                unless otherwise agreed in writing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">10. Contact Information</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                For questions about these Terms of Service, please contact us:
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
              <h2 className="text-2xl font-semibold text-black mb-4">11. Changes to Terms</h2>
              <p className="text-slate-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting to our website. Continued use of our services after changes constitutes acceptance of the
                modified terms.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
