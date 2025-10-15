import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              <span className="text-blue-500">pr</span>
              <span className="text-foreground">launch.io</span>
            </Link>
            {/* </CHANGE> */}
            <p className="text-sm text-muted-foreground">
              Get featured in top publications and build instant credibility for your brand.
            </p>
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
                  className="text-muted-foreground hover:text-foreground transition-colors flex gap-2 items-center"
                >
                  <Image
                    src="/email.png"
                    alt="email"
                    width={16}
                    height={16}
                  /> hello@prlaunch.io
                </a>
              </li>
              <li>
                <a href="tel:+971554470824" className="text-muted-foreground hover:text-foreground transition-colors flex gap-2 items-center">
                  <Image
                    src="/telephone.png"
                    alt="email"
                    width={16}
                    height={16}
                  /> +971 55 44 708 24
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/prlaunch.io"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors flex gap-2 items-center"
                >
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={16}
                    height={16}
                  /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/prlaunch/"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors flex gap-2 items-center"
                >
                  <Image
                    src="/facebook.png"
                    alt="Facebook"
                    width={16}
                    height={16}
                  /> Facebook
                </a>
              </li>
            </ul>
          </div>


          {/* Company */}
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2025 PR Launch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
