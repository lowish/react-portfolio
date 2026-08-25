"use client"

import { useRef } from "react"
import type { IconType } from "react-icons"
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion"
import { Mail } from "lucide-react"
import { SiGithub, SiDiscord } from "react-icons/si"
import { FaLinkedinIn } from "react-icons/fa6"

type ConnectLink = {
  label: string
  handle: string
  href: string
  Icon: IconType
  external: boolean
}

/** TODO: swap in your own Discord profile link (Discord > Settings > "Copy User ID"). */
const DISCORD_URL = "https://discord.com/users/000000000000000000"

const links: ConnectLink[] = [
  {
    label: "EMAIL",
    handle: "lowishxx@gmail.com",
    href: "mailto:lowishxx@gmail.com",
    Icon: Mail as IconType,
    external: false,
  },
  {
    label: "LINKEDIN",
    handle: "pwtandev",
    href: "https://www.linkedin.com/in/pwtandev",
    Icon: FaLinkedinIn,
    external: true,
  },
  {
    label: "GITHUB",
    handle: "lowish",
    href: "https://github.com/lowish",
    Icon: SiGithub,
    external: true,
  },
  {
    label: "DISCORD",
    handle: "lowish",
    href: DISCORD_URL,
    Icon: SiDiscord,
    external: true,
  },
]

/** Dock sizing, in px. Magnification only ever kicks in for pointer devices. */
const BASE_SIZE = 50
const MAX_SIZE = 68
const BASE_ICON = 21
const MAX_ICON = 27
/** How far from an item's center the cursor still magnifies it. */
const RANGE = 130

const spring = { mass: 0.1, stiffness: 160, damping: 14 }

function DockItem({ link, mouseX }: { link: ConnectLink; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const { Icon } = link

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) {
      return Number.POSITIVE_INFINITY
    }
    return value - bounds.x - bounds.width / 2
  })

  const size = useSpring(useTransform(distance, [-RANGE, 0, RANGE], [BASE_SIZE, MAX_SIZE, BASE_SIZE], { clamp: true }), spring)
  const iconSize = useSpring(useTransform(distance, [-RANGE, 0, RANGE], [BASE_ICON, MAX_ICON, BASE_ICON], { clamp: true }), spring)

  return (
    <motion.a
      ref={ref}
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      aria-label={`${link.label} - ${link.handle}`}
      data-cursor-hover
      style={{ width: size, height: size }}
      whileTap={{ scale: 0.92 }}
      className="group relative flex aspect-square shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.1] text-white/90 transition-colors duration-300 hover:border-[#3b82f6] hover:bg-white/[0.18] hover:text-white"
    >
      <motion.span style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center">
        <Icon className="h-full w-full" aria-hidden />
      </motion.span>

      {/* Hover label - pointer devices only */}
      <span className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#0a0d13] px-2.5 py-1.5 font-mono text-[10px] tracking-[0.18em] text-white/85 opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-opacity duration-200 group-hover:opacity-100 md:block">
        {link.label}
      </span>
    </motion.a>
  )
}

export function Connect() {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4">
      <motion.nav
        aria-label="Contact links"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseMove={(event) => mouseX.set(event.clientX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        className="pointer-events-auto flex items-end gap-2 rounded-full border border-white/15 bg-[#151515]/90 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-md sm:gap-3 sm:p-3"
      >
        {links.map((link) => (
          <DockItem key={link.label} link={link} mouseX={mouseX} />
        ))}
      </motion.nav>
    </div>
  )
}
