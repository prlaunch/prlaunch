"use client"

import { useEffect, useRef } from "react"

interface Confetti {
  x: number
  y: number
  rotation: number
  speed: number
  color: string
  size: number
  rotationSpeed: number
  opacity: number
}

export function ConfettiAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]
    const confettiPieces: Confetti[] = []

    for (let i = 0; i < 100; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        rotation: Math.random() * 360,
        speed: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 5 + 3,
        rotationSpeed: Math.random() * 10 - 5,
        opacity: 1,
      })
    }

    let animationFrameId: number
    const duration = 3000
    const fadeStart = 2000
    const startTime = Date.now()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const elapsed = Date.now() - startTime
      const fadeProgress = elapsed > fadeStart ? (elapsed - fadeStart) / (duration - fadeStart) : 0

      confettiPieces.forEach((confetti) => {
        const currentOpacity = 1 - fadeProgress

        ctx.save()
        ctx.translate(confetti.x, confetti.y)
        ctx.rotate((confetti.rotation * Math.PI) / 180)
        ctx.globalAlpha = currentOpacity
        ctx.fillStyle = confetti.color
        ctx.fillRect(-confetti.size / 2, -confetti.size / 2, confetti.size, confetti.size)
        ctx.restore()

        confetti.y += confetti.speed
        confetti.rotation += confetti.rotationSpeed

        if (confetti.y > canvas.height) {
          confetti.y = -20
          confetti.x = Math.random() * canvas.width
        }
      })

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
