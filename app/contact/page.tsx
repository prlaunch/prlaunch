import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Contact Us | PR Launch",
  description: "Get in touch with PR Launch - We're here to help with your PR needs.",
}

export default function ContactPage() {
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

        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">Have questions? We're here to help. Reach out to our team.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100">
                <h2 className="text-2xl font-semibold text-black mb-6">Get in Touch</h2>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Email</h3>
                      <a href="mailto:hello@prlaunch.io" className="text-blue-600 hover:underline">
                        hello@prlaunch.io
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        For all inquiries, support, and refund requests
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Phone</h3>
                      <a href="tel:+971554470824" className="text-blue-600 hover:underline">
                        +971 55 44 708 24
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Monday - Friday, 9:00 AM - 6:00 PM GST</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Office</h3>
                      <p className="text-slate-700">
                        Office 159, Floor C18
                        <br />
                        Ontario Tower, Business Bay
                        <br />
                        Dubai, United Arab Emirates
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">Business Hours</h3>
                      <p className="text-slate-700">
                        Monday - Friday: 9:00 AM - 6:00 PM GST
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-black mb-3">Company Information</h3>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Legal Name:</strong>
                  <br />
                  MEQAYIS RAISIA MARKETING AND PR CO. L.L.C
                </p>
                <p className="text-sm text-slate-700">
                  <strong>Doing Business As:</strong>
                  <br />
                  PR Launch / prlaunch.io
                </p>
              </div>
            </div>

            {/* Contact Form / Quick Links */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-semibold text-black mb-4">Quick Links</h2>
                <p className="text-slate-700 mb-6">
                  Find answers to common questions or learn more about our policies.
                </p>

                <div className="space-y-4">
                  <Link href="/terms">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 px-6 bg-transparent"
                    >
                      <div>
                        <div className="font-semibold text-black">Terms of Service</div>
                        <div className="text-sm text-muted-foreground">Read our terms and conditions</div>
                      </div>
                    </Button>
                  </Link>

                  <Link href="/privacy">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 px-6 bg-transparent"
                    >
                      <div>
                        <div className="font-semibold text-black">Privacy Policy</div>
                        <div className="text-sm text-muted-foreground">How we protect your data</div>
                      </div>
                    </Button>
                  </Link>

                  <Link href="/refunds">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 px-6 bg-transparent"
                    >
                      <div>
                        <div className="font-semibold text-black">Refund Policy</div>
                        <div className="text-sm text-muted-foreground">Understand our refund terms</div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Support Types */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-semibold text-black mb-4">How Can We Help?</h2>

                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-black mb-1">Customer Support</h3>
                    <p className="text-sm text-slate-700">
                      Questions about your order, revisions, or general inquiries
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-black mb-1">Refund Requests</h3>
                    <p className="text-sm text-slate-700">Submit refund requests with your order details</p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-black mb-1">Legal Inquiries</h3>
                    <p className="text-sm text-slate-700">Legal matters, compliance, or business partnerships</p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="font-semibold text-black mb-1">Technical Support</h3>
                    <p className="text-sm text-slate-700">Website issues, account access, or technical problems</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-sm text-slate-600 text-center">
                    All inquiries should be sent to <strong>hello@prlaunch.io</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
