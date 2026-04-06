"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PolicyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "terms" | "privacy"
}

export function PolicyModal({ open, onOpenChange, type }: PolicyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {type === "terms" ? "Terms of Service" : "Privacy Policy"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">{type === "terms" ? <TermsContent /> : <PrivacyContent />}</ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function TermsContent() {
  return (
    <div className="prose prose-slate max-w-none space-y-6 text-sm">
      <p className="text-muted-foreground">Last updated: January 2025</p>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">1. Agreement to Terms</h3>
        <p className="text-slate-700 leading-relaxed">
          By accessing or using PR Launch (operated by MEQAYIS RAISIA MARKETING AND PR CO. L.L.C, doing business as "PR
          Launch" or "prlaunch.io"), you agree to be bound by these Terms of Service. If you do not agree to these
          terms, please do not use our services.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">2. Services Provided</h3>
        <p className="text-slate-700 leading-relaxed mb-2">
          PR Launch provides public relations services including but not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700">
          <li>Article writing and content creation</li>
          <li>Publication and distribution to media outlets</li>
          <li>Guaranteed article placements on specified publications</li>
          <li>PR consultation and strategy services</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">3. Order Process and Approval</h3>
        <p className="text-slate-700 leading-relaxed mb-2">
          All orders placed through PR Launch are subject to the following process:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700">
          <li>Users have the right to approve all articles before publication</li>
          <li>One free revision is included with every order</li>
          <li>Additional revisions may be subject to additional fees</li>
          <li>Once approved, orders are considered final</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">4. Order Finality</h3>
        <p className="text-slate-700 leading-relaxed">
          All orders are final once the article has been approved by the client and published. We reserve the right to
          reject orders that promote harmful, illegal, or inappropriate content at our sole discretion.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">5. Refund Policy</h3>
        <p className="text-slate-700 leading-relaxed mb-2">
          We offer a 100% money-back guarantee if articles are not published within 7 days of client's approval. Refunds
          are only provided under the following circumstances:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700">
          <li>Articles are not published within 7 days after client approval</li>
          <li>All refund requests must be submitted to hello@prlaunch.io</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">6. Content Guidelines</h3>
        <p className="text-slate-700 leading-relaxed mb-2">We reserve the right to reject any order that contains:</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700">
          <li>Harmful, defamatory, or illegal content</li>
          <li>Misleading or fraudulent information</li>
          <li>Content that violates third-party rights</li>
          <li>Content that violates publication guidelines</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">7. Limitation of Liability</h3>
        <p className="text-slate-700 leading-relaxed">
          PR Launch and MEQAYIS RAISIA MARKETING AND PR CO. L.L.C are not liable for any damages, losses, or
          consequences resulting from articles purchased through our services. This includes but is not limited to
          reputational damage, financial loss, or any indirect or consequential damages. Clients are solely responsible
          for the content they approve for publication.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">8. Third-Party Relationships</h3>
        <p className="text-slate-700 leading-relaxed">
          PR Launch is not associated with, endorsed by, or affiliated with Meta, Apple, or any of the publications we
          distribute content to. We operate as an independent PR service provider.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">9. Intellectual Property</h3>
        <p className="text-slate-700 leading-relaxed">
          Upon full payment and publication, clients retain ownership of the content created for their order. However,
          PR Launch retains the right to use published articles as portfolio examples and testimonials unless otherwise
          agreed in writing.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">10. Contact Information</h3>
        <p className="text-slate-700 leading-relaxed mb-2">
          For questions about these Terms of Service, please contact us:
        </p>
        <div className="bg-slate-50 p-4 rounded-lg space-y-1 text-sm">
          <p className="text-slate-700">
            <strong>Email:</strong> hello@prlaunch.io
          </p>
          <p className="text-slate-700">
            <strong>Phone:</strong> +971 55 44 708 24
          </p>
          <p className="text-slate-700">
            <strong>Address:</strong> Office 159, Floor C18, Ontario Tower, Business Bay, Dubai, United Arab Emirates
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">11. Changes to Terms</h3>
        <p className="text-slate-700 leading-relaxed">
          We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to
          our website. Continued use of our services after changes constitutes acceptance of the modified terms.
        </p>
      </section>
    </div>
  )
}

function PrivacyContent() {
  return (
    <div className="prose prose-slate max-w-none space-y-6 text-sm">
      <p className="text-muted-foreground">Last updated: January 2025</p>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">1. Introduction</h3>
        <p className="text-slate-700 leading-relaxed">
          MEQAYIS RAISIA MARKETING AND PR CO. L.L.C, doing business as PR Launch ("we," "us," or "our"), is committed to
          protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
          information when you use our website prlaunch.io and our services.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">2. Information We Collect</h3>
        <h4 className="text-base font-semibold text-black mb-2 mt-3">Personal Information</h4>
        <p className="text-slate-700 leading-relaxed mb-2">
          We may collect personal information that you voluntarily provide to us, including:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700">
          <li>Name and contact information (email address, phone number)</li>
          <li>Company name and business information</li>
          <li>Payment and billing information</li>
          <li>Content and materials you provide for PR services</li>
          <li>Communications with our customer service team</li>
        </ul>

        <h4 className="text-base font-semibold text-black mb-2 mt-4">Automatically Collected Information</h4>
        <p className="text-slate-700 leading-relaxed mb-2">When you visit our website, we may automatically collect:</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700">
          <li>IP address and browser information</li>
          <li>Device information and operating system</li>
          <li>Usage data and analytics (via Meta Pixel and other tracking technologies)</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">3. How We Use Your Information</h3>
        <p className="text-slate-700 leading-relaxed mb-2">We use the information we collect to:</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700">
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
        <h3 className="text-lg font-semibold text-black mb-2">4. Information Sharing and Disclosure</h3>
        <p className="text-slate-700 leading-relaxed mb-2">We may share your information with:</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700">
          <li>
            <strong>Service Providers:</strong> Third-party vendors who assist in providing our services
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
        <p className="text-slate-700 leading-relaxed mt-2">
          We do not sell your personal information to third parties.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">5. Cookies and Tracking Technologies</h3>
        <p className="text-slate-700 leading-relaxed mb-2">
          We use cookies and similar tracking technologies, including Meta Pixel, to:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700">
          <li>Remember your preferences and settings</li>
          <li>Analyze website traffic and user behavior</li>
          <li>Deliver targeted advertising</li>
          <li>Measure marketing campaign effectiveness</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">6. Data Security</h3>
        <p className="text-slate-700 leading-relaxed">
          We implement appropriate technical and organizational measures to protect your personal information. However,
          no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">7. Your Rights</h3>
        <p className="text-slate-700 leading-relaxed mb-2">
          Depending on your location, you may have the following rights:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-700">
          <li>Access to your personal information</li>
          <li>Correction of inaccurate information</li>
          <li>Deletion of your personal information</li>
          <li>Objection to processing of your information</li>
          <li>Data portability</li>
          <li>Withdrawal of consent</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mt-2">
          To exercise these rights, please contact us at hello@prlaunch.io.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">8. Data Retention</h3>
        <p className="text-slate-700 leading-relaxed">
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy
          Policy, unless a longer retention period is required by law.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">9. International Data Transfers</h3>
        <p className="text-slate-700 leading-relaxed">
          Your information may be transferred to and processed in countries other than your country of residence. We
          ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">10. Children's Privacy</h3>
        <p className="text-slate-700 leading-relaxed">
          Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
          information from children.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">11. Changes to This Privacy Policy</h3>
        <p className="text-slate-700 leading-relaxed">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last updated" date.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-black mb-2">12. Contact Us</h3>
        <p className="text-slate-700 leading-relaxed mb-2">
          If you have questions about this Privacy Policy, please contact us:
        </p>
        <div className="bg-slate-50 p-4 rounded-lg space-y-1 text-sm">
          <p className="text-slate-700">
            <strong>Email:</strong> hello@prlaunch.io
          </p>
          <p className="text-slate-700">
            <strong>Phone:</strong> +971 55 44 708 24
          </p>
          <p className="text-slate-700">
            <strong>Address:</strong> Office 159, Floor C18, Ontario Tower, Business Bay, Dubai, United Arab Emirates
          </p>
        </div>
      </section>
    </div>
  )
}
