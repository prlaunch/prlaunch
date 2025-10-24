"use client"

import { usePathname } from "next/navigation"
import { FloatingNav } from "./floating-nav"
import { FloatingNavSimple } from "./floating-nav-simple"

export function ConditionalNav() {
  const pathname = usePathname()

  if (pathname === "/payment" || pathname === "/thank-you") {
    return null
  }

  if (pathname === "/fast") {
    return <FloatingNavSimple />
  }

  return <FloatingNav />
}
