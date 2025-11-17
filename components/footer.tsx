import Link from "next/link"
import { Instagram, Facebook, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-y-6 gap-x-8 grid-cols-2 md:grid-cols-5">
          {/* Company Info */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-block text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              <span className="text-blue-500">pr</span>
              <span className="text-foreground">launch.io</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Get featured in top publications and build instant credibility for your brand.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/prlaunch.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/prlaunch/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@prlaunch.io"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="text-muted-foreground hover:text-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Outlets */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Our Outlets</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/outlets/business-entrepreneurship"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Business & Entrepreneurship
                </Link>
              </li>
              <li>
                <Link
                  href="/outlets/finance-economics"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Finance & Economics
                </Link>
              </li>
              <li>
                <Link
                  href="/outlets/lifestyle-culture"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Lifestyle & Culture
                </Link>
              </li>
              <li>
                <Link
                  href="/outlets/technology-digital-marketing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Technology & Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/outlets/health-wellness"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Health & Wellness
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@prlaunch.io"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  hello@prlaunch.io
                </a>
              </li>
              <li>
                <a href="tel:+971554470824" className="text-muted-foreground hover:text-foreground transition-colors">
                  +971 55 44 708 24
                </a>
              </li>
            </ul>
          </div>

          {/* Free Tools */}
          <div className="space-y-4 md:col-span-1">
            <h4 className="text-sm font-semibold text-foreground">Free Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tools/article-generator"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Article Generator
                </Link>
              </li>
              <li>
                <Link href="/pr-quiz" className="text-muted-foreground hover:text-foreground transition-colors">
                  Eligibility Quiz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2025 PR Launch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
