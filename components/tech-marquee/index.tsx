"use client"

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
  "UI/UX",
  "WEB DEV",
]

const logoItems = [
  {
    node: (
      <span className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors hover:text-white">
        <SiReact className="w-15 h-15" aria-hidden />
        <span className="sr-only">React</span>
      </span>
    ),
    title: "React",
    ariaLabel: "React",
  },
  {
    node: (
      <span className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors hover:text-white">
        <SiNextdotjs className="w-15 h-15" aria-hidden />
        <span className="sr-only">Next.js</span>
      </span>
    ),
    title: "Next.js",
    ariaLabel: "Next.js",
  },
  {
    node: (
      <span className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors hover:text-white">
        <SiTailwindcss className="w-15 h-15" aria-hidden />
        <span className="sr-only">Tailwind CSS</span>
      </span>
    ),
    title: "Tailwind CSS",
    ariaLabel: "Tailwind CSS",
  },
  {
    node: (
      <span className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors hover:text-white">
        <SiTypescript className="w-15 h-15" aria-hidden />
        <span className="sr-only">TypeScript</span>
      </span>
    ),
    title: "TypeScript",
    ariaLabel: "TypeScript",
  },
  {
    node: (
      <span className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors hover:text-white">
        <SiNodedotjs className="w-15 h-15" aria-hidden />
        <span className="sr-only">Node.js</span>
      </span>
    ),
    title: "Node.js",
    ariaLabel: "Node.js",
  },
  {
    node: (
      <span className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors hover:text-white">
        <SiJavascript className="w-15 h-15" aria-hidden />
        <span className="sr-only">JavaScript</span>
      </span>
    ),
    title: "JavaScript",
    ariaLabel: "JavaScript",
  },
  {
    node: (
      <span className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors hover:text-white">
        <SiMongodb className="w-15 h-15" aria-hidden />
        <span className="sr-only">MongoDB</span>
      </span>
    ),
    title: "MongoDB",
    ariaLabel: "MongoDB",
  },
  {
    node: (
      <span className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors hover:text-white">
        <SiGit className="w-15 h-15" aria-hidden />
        <span className="sr-only">Git</span>
      </span>
    ),
    title: "Git",
    ariaLabel: "Git",
  },
  {
    node: (
      <span className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors hover:text-white">
        <SiDocker className="w-15 h-15" aria-hidden />
        <span className="sr-only">Docker</span>
      </span>
    ),
    title: "Docker",
    ariaLabel: "Docker",
  },
  {
    node: (
      <span className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors hover:text-white">
        <SiFigma className="w-15 h-15" aria-hidden />
        <span className="sr-only">Figma</span>
      </span>
    ),
    title: "Figma",
    ariaLabel: "Figma",
  },
  {
    node: (
      <span className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors hover:text-white">
        <SiHtml5 className="w-15 h-15" aria-hidden />
        <span className="sr-only">HTML</span>
      </span>
    ),
    title: "HTML",
    ariaLabel: "HTML",
  },
  {
  node: (
    <span className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors hover:text-white">
      <FaCss3Alt className="w-15 h-15" aria-hidden />
      <span className="sr-only">CSS</span>
    </span>
  ),
  title: "CSS",
  ariaLabel: "CSS",
  },
  {
    node: (
      <span className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors hover:text-white">
        <SiPython className="w-15 h-15" aria-hidden />
        <span className="sr-only">Python</span>
      </span>
    ),
    title: "Python",
    ariaLabel: "Python",
  },
  {
    node: (
      <span className="inline-flex items-center justify-center w-16 h-16 text-white/70 transition-colors hover:text-white">
        <SiFirebase className="w-15 h-15" aria-hidden />
        <span className="sr-only">Firebase</span>
      </span>
    ),
    title: "Firebase",
    ariaLabel: "Firebase",
  },
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
