import type React from "react"
import { StickyLogoBanner } from "@/components/quiz-logo"

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <StickyLogoBanner />
      <div className="flex-1">{children}</div>
    </div>
  )
}
