"use client"

import type { CSSProperties } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { IconType } from "react-icons"
import { SiGit, SiNextdotjs, SiReact, SiTailwindcss } from "react-icons/si"

import { LogoLoop, type LogoItem } from "@/components/ui/LogoLoop"

const concepts = [
  "FULLSTACK",
  "WEB DEV",
  "AI ENGINEER",
  "DEVELOPER"
]

/**
 * A stack logo reaches its authentic look one of two ways:
 *
 * - "icon"  — marks that are officially a single hue. Drawn from react-icons and tinted with the
 *             brand color, since one CSS color reproduces them exactly.
 * - "image" — marks whose official artwork carries several hues or gradients that no single CSS
 *             color can express (Python's two-tone snakes, Figma's five shapes, MongoDB's shaded
 *             leaf). Served from the original SVG in /public/logos.
 */
type TechLogo =
  | { kind: "icon"; title: string; Icon: IconType; color: string }
  | { kind: "image"; title: string; src: string }

const techLogos: TechLogo[] = [
  { kind: "image", title: "HTML", src: "/logos/html5.svg" },
  { kind: "image", title: "CSS", src: "/logos/css3.svg" },
  { kind: "image", title: "JavaScript", src: "/logos/javascript.svg" },
  { kind: "icon", title: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { kind: "icon", title: "React", Icon: SiReact, color: "#61DAFB" },
  // The official Next.js mark is black; white is its sanctioned reverse for dark backgrounds.
  { kind: "icon", title: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  {kind: "image", title: "ExpressJs", src: "/logos/express.svg" },
  { kind: "image", title: "Node.js", src: "/logos/nodejs.svg" },
  { kind: "image", title: "TypeScript", src: "/logos/typescript.svg" },
  { kind: "image", title: "MongoDB", src: "/logos/mongodb.svg" },
  { kind: "icon", title: "Git", Icon: SiGit, color: "#F05032" },
  { kind: "image", title: "Docker", src: "/logos/docker.svg" },
  { kind: "image", title: "Python", src: "/logos/python.svg" },
  { kind: "image", title: "Firebase", src: "/logos/firebase.svg" },
  {kind: "image", title: "AWS", src: "/logos/aws.svg" },
]

/**
 * Renders either variant at the same 64px box / 60px mark, resting muted and resolving to the
 * authentic brand appearance on hover: icons tint to their brand color, images drop grayscale.
 */
function TechLogoMark({ logo }: { logo: TechLogo }) {
  return (
    <span className="group/logo inline-flex items-center justify-center w-16 h-16">
      {logo.kind === "icon" ? (
        <logo.Icon
          className="w-15 h-15 text-white/70 transition duration-300 group-hover/logo:text-[var(--brand-color)] motion-reduce:transition-none"
          style={{ "--brand-color": logo.color } as CSSProperties}
          aria-hidden
        />
      ) : (
        <Image
          src={logo.src}
          alt=""
          width={60}
          height={60}
          draggable={false}
          aria-hidden
          className="w-15 h-15 object-contain opacity-70 grayscale transition duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0 motion-reduce:transition-none"
        />
      )}
      <span className="sr-only">{logo.title}</span>
    </span>
  )
}

const logoItems: LogoItem[] = techLogos.map((logo) => ({
  node: <TechLogoMark logo={logo} />,
  title: logo.title,
  ariaLabel: logo.title,
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
              e.currentTarget.style.webkitTextStroke = "none"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "transparent"
              e.currentTarget.style.webkitTextStroke = "1px rgba(255,255,255,0.3)"
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
