"use client"
import type React from "react"
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "motion/react"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string
  children: React.ReactNode
  as?: any
  containerClassName?: string
  borderClassName?: string
  duration?: number
  className?: string
  [key: string]: any
}) {
  return (
    <Component
      className={cn("relative overflow-hidden bg-transparent p-[1px] text-xl", containerClassName)}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn("h-20 w-20 bg-[radial-gradient(white_40%,transparent_60%)] opacity-[0.8]", borderClassName)}
          />
        </MovingBorder>
      </div>

      <div
        className={cn("relative flex min-h-full items-center justify-center", className)}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  )
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode
  duration?: number
  rx?: string
  ry?: string
  [key: string]: any
}) => {
  const pathRef = useRef<SVGPathElement>(null)
  const progress = useMotionValue<number>(0)
  const [pathLength, setPathLength] = useState(0)

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength()
      setPathLength(length)
    }
  }, [])

  useAnimationFrame((time) => {
    if (pathLength > 0) {
      const pxPerMillisecond = pathLength / duration
      progress.set((time * pxPerMillisecond) % pathLength)
    }
  })

  const x = useTransform(progress, (val) => {
    if (pathRef.current && pathLength > 0) {
      return pathRef.current.getPointAtLength(val).x
    }
    return 0
  })

  const y = useTransform(progress, (val) => {
    if (pathRef.current && pathLength > 0) {
      return pathRef.current.getPointAtLength(val).y
    }
    return 0
  })

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <path
          fill="none"
          d="M 10,0 L 90,0 Q 100,0 100,10 L 100,90 Q 100,100 90,100 L 10,100 Q 0,100 0,90 L 0,10 Q 0,0 10,0 Z"
          vectorEffect="non-scaling-stroke"
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  )
}

export { Button as MovingBorderButton }
