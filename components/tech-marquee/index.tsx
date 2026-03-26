"use client"

import { motion } from "framer-motion"

const techItems = [
  "HTML",
  "CSS",
  "TAILWIND",
  "JAVASCRIPT",
  "NEXT.JS",
  "REACTJS",
  "NODE.JS",
  "EXPRESS.JS",
  "TYPESCRIPT",
  "SHADCNUI",
  "PYTHON",
  "JAVA",
  "MONGODB",
  "MYSQL",
  "DOCKER",
  "GIT",
  "FIGMA",
]

const concepts = [
  "FULLSTACK",
  "UI/UX",
  "WEB DEV",
]

function MarqueeRow({ items, direction = "left" }: { items: string[]; direction?: "left" | "right" }) {
  const duplicatedItems = [...items, ...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className={`flex gap-8 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ width: "fit-content" }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="group cursor-default whitespace-nowrap font-sans text-4xl font-light tracking-tight sm:text-5xl md:text-7xl lg:text-8xl"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.3)",
              color: "transparent",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white"
              e.currentTarget.style.WebkitTextStroke = "none"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "transparent"
              e.currentTarget.style.WebkitTextStroke = "1px rgba(255,255,255,0.3)"
            }}
          >
            {item}
            <span className="mx-8 text-white/20">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <section id="stack" className="relative overflow-hidden py-20 md:py-32">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12 px-4 sm:px-6 md:px-12 md:mb-16"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">04 - STACK / ROLE</p>
      </motion.div>

      {/* Marquee Rows */}
      <div className="space-y-4">
        <MarqueeRow items={techItems} direction="left" />
        <MarqueeRow items={concepts} direction="right" />
      </div>
    </section>
  )
}
