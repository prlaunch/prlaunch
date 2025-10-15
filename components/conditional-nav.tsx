"use client"

import { usePathname } from "next/navigation"
import { FloatingNav } from "./floating-nav"

export function ConditionalNav() {
  const pathname = usePathname()

  if (pathname === "/payment" || pathname === "/thank-you") {
    return null
  }

  return <FloatingNav />
}
