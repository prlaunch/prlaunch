"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export function StoryScrollSection() {
  // ----- data -----
  const entrepreneurs = [
    { name: "Sarah Chen", title: "Tech Founder", image: "/asian-woman-entrepreneur-smiling.jpg" },
    { name: "Marcus Johnson", title: "E-commerce CEO", image: "/black-man-entrepreneur-confident.jpg" },
    { name: "Elena Rodriguez", title: "SaaS Founder", image: "/latina-woman-entrepreneur-professional.jpg" },
  ]
  const companies = [
    { name: "TechFlow", logo: "/tech-company-logo-blue.png" },
    { name: "GrowthLabs", logo: "/startup-company-logo-green.jpg" },
    { name: "CloudSync", logo: "/cloud-company-logo-purple.jpg" },
  ]

  // steps: Intro, 3 x Ent, 3 x Com, Outro  => total 8 screens
  const steps = useMemo(
    () => [
      { type: "intro" as const },
      ...entrepreneurs.map((_, i) => ({ type: "ent" as const, idx: i })),
      ...companies.map((_, i) => ({ type: "com" as const, idx: i })),
      { type: "outro" as const },
    ],
    [entrepreneurs, companies]
  )

  // ----- refs & state -----
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  // cadence + dir latch: 1 gesture = 1 step
  const lastStepAtRef = useRef(0)
  const dirLatchRef = useRef<1 | -1 | 0>(0)
  const animLockRef = useRef(false)
  const animTimerRef = useRef<number | null>(null)

  // layout cache
  const layoutRef = useRef({ top: 0, bottomSnap: 0, vh: 0, snaps: [] as number[] })

  // ----- tunables -----
  const ANIM_LOCK_MS = 650   // one step per this ms
  const DEADZONE = 3         // wheel deadzone (px)
  const EDGE_TOL = 2         // px tolerance at edges
  const EXIT_AFTER_VH = 80   // extra natural scroll after last step (vh)

  // ----- helpers -----
  const recomputeLayout = () => {
    const sec = sectionRef.current
    if (!sec) return
    const rect = sec.getBoundingClientRect()
    const top = window.scrollY + rect.top
    const vh = window.innerHeight
    const total = steps.length
    const snaps = Array.from({ length: total }, (_, i) => top + i * vh)
    const bottomSnap = top + total * vh // last snap ends here (sticky release can happen after this)
    layoutRef.current = { top, bottomSnap, vh, snaps }
  }

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

  const indexFromScroll = (y: number) => {
    const { top, vh } = layoutRef.current
    return clamp(Math.round((y - top) / vh), 0, steps.length - 1)
  }

  const wheelDir = (e: WheelEvent): -1 | 0 | 1 => {
    const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
    if (Math.abs(dy) < DEADZONE) return 0
    return dy > 0 ? 1 : -1
  }

  const scrollToIndex = (idx: number) => {
    const { snaps } = layoutRef.current
    const target = snaps[idx]
    window.scrollTo({ top: target, behavior: "smooth" })
  }

  const step = (dir: 1 | -1) => {
    if (animLockRef.current) return
    const idx = activeStep
    const next = clamp(idx + dir, 0, steps.length - 1)
    if (next === idx) return
    animLockRef.current = true
    lastStepAtRef.current = performance.now()
    dirLatchRef.current = dir
    setActiveStep(next)
    scrollToIndex(next)
    if (animTimerRef.current) window.clearTimeout(animTimerRef.current)
    animTimerRef.current = window.setTimeout(() => {
      animLockRef.current = false
      dirLatchRef.current = 0
    }, ANIM_LOCK_MS)
  }

  // ----- lifecycle: layout -----
  useEffect(() => {
    recomputeLayout()
    const onResize = () => recomputeLayout()
    window.addEventListener("resize", onResize)
    // align to nearest snap if starting inside section
    requestAnimationFrame(() => {
      const y = window.scrollY
      const { top, bottomSnap } = layoutRef.current
      if (y > top && y < bottomSnap) {
        const idx = indexFromScroll(y)
        setActiveStep(idx)
      }
    })
    return () => window.removeEventListener("resize", onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length])

  // ----- main wheel controller (window scroll only) -----
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const { top, bottomSnap } = layoutRef.current
      const y = window.scrollY

      // completely outside section → do nothing (normal page)
      if (y < top - EDGE_TOL || y > bottomSnap + EDGE_TOL) return

      const dir = wheelDir(e)
      if (dir === 0) return

      const atFirst = activeStep === 0
      const atLast = activeStep === steps.length - 1

      // if at very top snap and scrolling up → let page move (no preventDefault)
      if (atFirst && dir < 0 && y <= top + EDGE_TOL) return

      // if at very last snap and scrolling down → let page move (no preventDefault)
      // NOTE: bottomSnap is 1vh below the last snap top; we allow default if we're past last snap start.
      const lastSnapTop = bottomSnap - layoutRef.current.vh
      if (atLast && dir > 0 && y >= lastSnapTop - EDGE_TOL) return

      // inside controlled range → enforce cadence
      const now = performance.now()
      const cadenceReady = now - lastStepAtRef.current >= ANIM_LOCK_MS && !animLockRef.current

      // during cadence window: ignore opposite direction but block native to avoid jump
      if (!cadenceReady) {
        if (dirLatchRef.current !== 0 && dir !== dirLatchRef.current) {
          if (e.cancelable) { e.preventDefault(); e.stopPropagation() }
          return
        }
      }

      if (e.cancelable) { e.preventDefault(); e.stopPropagation() }
      if (cadenceReady) step(dir)
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    return () => window.removeEventListener("wheel", onWheel as EventListener)
  }, [activeStep, steps.length])

  // ----- keep activeStep in sync if user drags scrollbar / keyboard -----
  useEffect(() => {
    const onScroll = () => {
      const { top, bottomSnap } = layoutRef.current
      const y = window.scrollY
      if (y < top - EDGE_TOL || y > bottomSnap + EDGE_TOL) return
      if (!animLockRef.current) {
        const idx = indexFromScroll(y)
        setActiveStep(idx)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ----- visuals -----
  const visible = (i: number) => activeStep === i
  const screenStyle = (i: number): React.CSSProperties => ({
    opacity: visible(i) ? 1 : 0,
    transform: visible(i) ? "translateY(0) scale(1)" : "translateY(18px) scale(0.99)",
    transition: "opacity 380ms cubic-bezier(.22,.61,.36,1), transform 420ms cubic-bezier(.22,.61,.36,1)",
    pointerEvents: visible(i) ? "auto" : "none",
  })
  const showEntrepreneur = (i: number) => steps[activeStep]?.type === "ent" && steps[activeStep]?.idx === i
  const showCompany = (i: number) => steps[activeStep]?.type === "com" && steps[activeStep]?.idx === i

  const scrollToWhatYouGet = () => {
    const el = document.getElementById("what-you-get")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    // Height = steps*100vh + exit buffer (so last item ke baad natural scroll space mile)
    <section
      ref={sectionRef}
      id="story-scroll-section"
      className="relative"
      style={{ height: `calc(${steps.length} * 100vh + ${EXIT_AFTER_VH}vh)` }}
    >
      {/* Sticky stage stays visible only within the first steps.length * 100vh */}
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-background via-blue-50/30 to-background">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Intro */}
          <div className="absolute inset-0 flex items-center justify-center px-4" style={screenStyle(0)}>
            <div className="text-center max-w-4xl relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 blur-3xl opacity-20 -z-10" />
              <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
                  You Have a Story...
                </span>
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl lg:text-2xl max-w-2xl mx-auto text-balance">
                Whether it's your career, personal achievements, or a cause you support, you have a story we can publish for you.
              </p>
            </div>
          </div>

          {/* Entrepreneurs (3 snaps) */}
          {entrepreneurs.map((p, i) => {
            const stepIndex = 1 + i
            return (
              <div key={p.name} className="absolute inset-0 flex items-center justify-center px-4" style={screenStyle(stepIndex)}>
                <div className="flex flex-col items-center justify-center w-full max-w-6xl">
                  <h3 className="mb-12 text-2xl font-bold text-foreground md:text-4xl lg:text-5xl text-center">
                    We have helped{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">entrepreneurs</span>
                  </h3>
                  <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-[420px] md:h-[460px] flex items-center justify-center">
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        opacity: showEntrepreneur(i) ? 1 : 0,
                        transform: showEntrepreneur(i) ? "translateY(0) scale(1)" : "translateY(16px) scale(0.985)",
                        transition: "opacity 380ms cubic-bezier(.22,.61,.36,1), transform 420ms cubic-bezier(.22,.61,.36,1)",
                        pointerEvents: showEntrepreneur(i) ? "auto" : "none",
                      }}
                    >
                      <div className="rounded-2xl bg-white p-6 md:p-8 shadow-2xl border border-border w-full">
                        <div className="relative w-full aspect-[4/3] mb-4 rounded-xl overflow-hidden bg-muted">
                          <Image src={p.image || "/placeholder.svg"} alt={p.name} fill className="object-cover" />
                        </div>
                        <h4 className="text-xl md:text-2xl font-bold text-foreground mb-1 text-center">{p.name}</h4>
                        <p className="text-base md:text-lg text-muted-foreground text-center">{p.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Companies (3 snaps) */}
          {companies.map((c, i) => {
            const stepIndex = 1 + entrepreneurs.length + i
            return (
              <div key={c.name} className="absolute inset-0 flex items-center justify-center px-4" style={screenStyle(stepIndex)}>
                <div className="flex flex-col items-center justify-center w-full max-w-6xl">
                  <h3 className="mb-12 text-2xl font-bold text-foreground md:text-4xl lg:text-5xl text-center">
                    We empower{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">companies</span>
                  </h3>
                  <div className="relative w-full max-w-sm md:max-w-md h-[420px] flex items-center justify-center">
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        opacity: showCompany(i) ? 1 : 0,
                        transform: showCompany(i) ? "translateY(0) scale(1)" : "translateY(16px) scale(0.985)",
                        transition: "opacity 380ms cubic-bezier(.22,.61,.36,1), transform 420ms cubic-bezier(.22,.61,.36,1)",
                        pointerEvents: showCompany(i) ? "auto" : "none",
                      }}
                    >
                      <div className="rounded-2xl bg-white p-8 md:p-12 shadow-2xl border border-border flex flex-col items-center justify-center aspect-square w-full">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
                          <Image src={c.logo || "/placeholder.svg"} alt={c.name} fill className="object-contain" />
                        </div>
                        <h4 className="text-xl md:text-2xl font-bold text-foreground text-center">{c.name}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Outro */}
          <div
            className="absolute inset-0 flex items-center justify-center px-4"
            style={screenStyle(steps.length - 1)}
          >
            <div className="text-center">
              <h3 className="mb-8 text-2xl font-bold text-foreground md:text-4xl lg:text-5xl">
                And now it's time for{" "}
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">you</span>
              </h3>
              <div className="mb-8 text-7xl md:text-8xl">🫵😎</div>
              <button
                onClick={() => {
                  const el = document.getElementById("what-you-get")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }}
                className="group inline-flex items-center gap-2 text-sm md:text-base font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-muted-foreground/30 hover:border-foreground pb-1"
              >
                see the stories we write
                <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EXIT BUFFER*/}
      <div aria-hidden style={{ height: `${EXIT_AFTER_VH}vh` }} />
    </section>
  )
}
