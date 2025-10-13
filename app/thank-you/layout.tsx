import type React from "react"

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <div suppressHydrationWarning>{children}</div>
}
