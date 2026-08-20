"use client"

import type { CSSProperties } from "react"
import type { IconType } from "react-icons"
import { motion } from "framer-motion"
import {
  SiDocker,
  SiFigma,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiHtml5,
  SiPython,
  SiFirebase,
} from "react-icons/si"

import { LogoLoop } from "@/components/ui/LogoLoop"
import { FaCss3Alt } from "react-icons/fa"

const concepts = [
  "FULLSTACK",
  "WEB DEV",
  "AI ENGINEER",
  "DEVELOPER"
]

const techLogos: { Icon: IconType; title: string; color: string }[] = [
  { Icon: SiReact, title: "React", color: "#61DAFB" },
  { Icon: SiNextdotjs, title: "Next.js", color: "#FFFFFF" },
  { Icon: SiTailwindcss, title: "Tailwind CSS", color: "#38BDF8" },
  { Icon: SiTypescript, title: "TypeScript", color: "#3178C6" },
  { Icon: SiNodedotjs, title: "Node.js", color: "#5FA04E" },
  { Icon: SiJavascript, title: "JavaScript", color: "#F7DF1E" },
  { Icon: SiMongodb, title: "MongoDB", color: "#47A248" },
  { Icon: SiGit, title: "Git", color: "#F05032" },
  { Icon: SiDocker, title: "Docker", color: "#2496ED" },
  { Icon: SiFigma, title: "Figma", color: "#F24E1E" },
  { Icon: SiHtml5, title: "HTML", color: "#E34F26" },
  { Icon: FaCss3Alt, title: "CSS", color: "#1572B6" },
  { Icon: SiPython, title: "Python", color: "#3776AB" },
  { Icon: SiFirebase, title: "Firebase", color: "#FFCA28" },
]

const logoItems = techLogos.map(({ Icon, title, color }) => ({
  node: (
    <span
      className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors duration-300 hover:text-[var(--brand-color)]"
      style={{ "--brand-color": color } as CSSProperties}
    >
      <Icon className="w-15 h-15" aria-hidden />
      <span className="sr-only">{title}</span>
    </span>
  ),
  title,
  ariaLabel: title,
}))

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
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">05 - STACK / ROLE</p>
      </motion.div>

      <div className="space-y-4">
        <LogoLoop
          logos={logoItems}
          direction="left"
          speed={100}
          pauseOnHover={true}
          fadeOut={false}
          scaleOnHover={true}
          logoHeight={72}
          gap={50}
          ariaLabel="Technology logos"
        />
        <MarqueeRow items={concepts} direction="right" />
      </div>
    </section>
  )
}
