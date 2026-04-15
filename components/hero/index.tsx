"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { SentientSphere } from "@/components/background/sentient-sphere"
import { useGetInTouch } from "@/components/get-in-touch"

export function Hero() {
  const { setOpen } = useGetInTouch()
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {/* 3D Sphere Background */}
      <div className="absolute inset-0">
        <SentientSphere />
      </div>

      {/* Contrast layer for better text readability over the sphere */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-transparent to-black/45" />

      {/* Typography Overlay */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 flex h-full flex-col justify-between p-4 pt-20 sm:p-6 sm:pt-24 md:px-12 md:py-20"
      >
        {/* Top Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-[92vw] rounded-xl px-2 py-2 backdrop-blur-[1px] sm:max-w-[80vw] sm:px-3"
        >
          <p className="mb-2 font-mono text-[10px] tracking-[0.22em] text-white/85 sm:text-xs sm:tracking-[0.28em]">00 — BUILDING SOLUTIONS</p>
          <h2 className="font-sans text-[clamp(2.3rem,11vw,5.2rem)] font-light leading-[0.92] tracking-tight text-balance text-white [text-shadow:0_6px_26px_rgba(0,0,0,0.9)]">
            PRINCE
            <br />
            <span className="italic">TAN</span>
          </h2>

          <div className="mt-50 max-w-[230px] sm:mt-60 sm:max-w-[260px]">
            <Link
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-effect relative flex w-full items-center justify-between gap-2 border-b border-border px-1 pb-3 font-mono text-xs tracking-[0.18em] text-foreground transition-colors duration-300 hover:text-[#3b82f6] sm:px-2 sm:text-sm"
            >
              <p>View Resume</p>
              <ArrowUpRight className="stroke-1" />
            </Link>
          </div>
        </motion.div>

        {/* Center Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <motion.button
            onClick={() => setOpen(true)}
            data-cursor-hover
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-full border border-white/20 bg-transparent px-5 py-3 font-mono text-[11px] tracking-[0.2em] uppercase backdrop-blur-sm transition-colors duration-500 hover:bg-white hover:text-black sm:px-8 sm:py-4 sm:text-sm sm:tracking-widest"
          >
            Get In Touch
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#3b82f6] rounded-full animate-pulse" />
          </motion.button>
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-fit max-w-[92vw] self-end rounded-xl px-2 py-2 text-right backdrop-blur-[1px] sm:max-w-[80vw] sm:px-3 mb-14 sm:mb-16 md:mb-20"
        >
          <p className="mb-2 font-mono text-[10px] tracking-[0.22em] text-white/85 sm:text-xs sm:tracking-[0.28em]">SOFTWARE</p>
          <h2 className="font-sans text-[clamp(2.1rem,10.5vw,5rem)] font-light leading-[0.92] tracking-tight text-balance text-white [text-shadow:0_6px_26px_rgba(0,0,0,0.9)]">
            DEVELOPER
          </h2>
        </motion.div>
      </motion.div>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 sm:bottom-6 md:bottom-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
