import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | PR Launch",
  description: "Privacy Policy for PR Launch - Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-black mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">1. Introduction</h2>
              <p className="text-slate-700 leading-relaxed">
                MEQAYIS RAISIA MARKETING AND PR CO. L.L.C, doing business as PR Launch ("we," "us," or "our"), is
                committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use our website prlaunch.io and our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-black mb-3 mt-4">Personal Information</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Name and contact information (email address, phone number)</li>
                <li>Company name and business information</li>
                <li>Payment and billing information</li>
                <li>Content and materials you provide for PR services</li>
                <li>Communications with our customer service team</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mb-3 mt-6">Automatically Collected Information</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                When you visit our website, we may automatically collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>IP address and browser information</li>
                <li>Device information and operating system</li>
                <li>Usage data and analytics (via Meta Pixel and other tracking technologies)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-700 leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Provide and deliver our PR services</li>
                <li>Process payments and fulfill orders</li>
                <li>Communicate with you about your orders and services</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Analyze usage patterns and optimize user experience</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-slate-700 leading-relaxed mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who assist in providing our services (payment
                  processors, hosting providers, etc.)
                </li>
                <li>
                  <strong>Publications:</strong> Media outlets where we distribute your content
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition
                </li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies, including Meta Pixel, to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Deliver targeted advertising</li>
                <li>Measure marketing campaign effectiveness</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-4">
                You can control cookies through your browser settings, but disabling cookies may affect website
                functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">6. Data Security</h2>
              <p className="text-slate-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information.
                However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">7. Your Rights</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information</li>
                <li>Objection to processing of your information</li>
                <li>Data portability</li>
                <li>Withdrawal of consent</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-4">
                To exercise these rights, please contact us at hello@prlaunch.io.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">8. Data Retention</h2>
              <p className="text-slate-700 leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                Privacy Policy, unless a longer retention period is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">9. International Data Transfers</h2>
              <p className="text-slate-700 leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence.
                We ensure appropriate safeguards are in place to protect your information in accordance with this
                Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">10. Children's Privacy</h2>
              <p className="text-slate-700 leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
                information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-slate-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">12. Contact Us</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                If you have questions about this Privacy Policy, please contact us:
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
