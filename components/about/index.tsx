"use client"

import Image from "next/image"
import { motion } from "framer-motion"

/** Thin geometric plus sign (two 1px lines) used to mark a corner. */
function CornerPlus({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute h-[14px] w-[14px] ${className ?? ""}`}>
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-neutral-50" />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-neutral-50" />
    </span>
  )
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden px-4 py-20 sm:px-6 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-8 md:mb-10">
          <p className="mb-3 font-mono text-xs tracking-[0.28em] text-muted-foreground">04 - ABOUT</p>
          <h2 className="font-sans text-2xl font-light italic sm:text-3xl md:text-5xl">What I Do</h2>
        </div>

        <div className="grid items-center gap-9 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative order-2 border border-white/30 bg-[#0b1018] p-6 lg:order-1 md:p-8"
          >
            <CornerPlus className="-left-[7px] -top-[7px]" />
            <CornerPlus className="-right-[7px] -top-[7px]" />
            <CornerPlus className="-bottom-[7px] -left-[7px]" />
            <CornerPlus className="-bottom-[7px] -right-[7px]" />

            <p className="mb-4 font-mono text-[11px] tracking-[0.22em] text-[#3b82f6]">DESCRIPTION</p>
            <p className="mb-4 font-mono text-sm leading-relaxed text-white/80 md:text-base">
              I&apos;m Prince Tan, a full-stack developer and designer focused on building modern, user-centered web applications.
            </p>
            <p className="mb-4 font-mono text-sm leading-relaxed text-white/70 md:text-base">
              Most of my work is in web development, where I focus on improving workflows and delivering projects on time.
            </p>
            <p className="font-mono text-sm leading-relaxed text-white/70 md:text-base">
              I&apos;m always open to new challenges, continuously learning, and committed to growing in the ever-evolving world of software development.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:order-2 lg:max-w-[290px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden border border-white/15 bg-[#11151e] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <Image
                src="/prince.jpg"
                alt="Prince portrait"
                fill
                className="object-cover"
                sizes="(max-width: 900px) 10vw, 180px"
                priority={false}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
