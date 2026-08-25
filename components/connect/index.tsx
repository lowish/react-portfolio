"use client"

import { useEffect, useRef, useState } from "react"
import type { IconType } from "react-icons"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { Mail, Plus } from "lucide-react"
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

/**
 * Mobile trigger: a "+" that fans the links upward in a column.
 * Anchored bottom-left so it sits beside the hero heading instead of covering
 * it the way a centred dock does.
 */
function MobileConnect() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <div className="md:hidden">
      {/* Tap-anywhere-to-close scrim; also dims the page so the icons stay legible */}
      <AnimatePresence>
        {isOpen ? (
          <motion.button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-20 cursor-default bg-black/45 backdrop-blur-[2px]"
          />
        ) : null}
      </AnimatePresence>

      {/* z-30 matches the desktop dock, so the fullscreen nav menu (z-40) covers it */}
      <nav
        aria-label="Contact links"
        className="pointer-events-none fixed bottom-10 left-4 z-30 flex flex-col items-center gap-2.5"
      >
        <AnimatePresence>
          {isOpen
            ? links.map((link, index) => {
                const { Icon } = link
                /* Items nearest the trigger lead the stagger going out, trail it coming back. */
                const distanceFromTrigger = links.length - 1 - index

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    aria-label={`${link.label} - ${link.handle}`}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 18, scale: 0.5 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 380,
                        damping: 24,
                        delay: distanceFromTrigger * 0.05,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      y: 14,
                      scale: 0.5,
                      transition: { duration: 0.18, delay: index * 0.035 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#151515]/90 text-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.55)] backdrop-blur-md"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </motion.a>
                )
              })
            : null}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close contact links" : "Open contact links"}
          aria-expanded={isOpen}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileTap={{ scale: 0.9 }}
          className="pointer-events-auto relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#151515]/90 text-white shadow-[0_14px_40px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          <motion.span
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            className="flex items-center justify-center"
          >
            <Plus className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </motion.span>

          {!isOpen ? (
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-pulse rounded-full bg-[#3b82f6]" />
          ) : null}
        </motion.button>
      </nav>
    </div>
  )
}

export function Connect() {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)

  return (
    <>
      <MobileConnect />

      {/* Pointer devices keep the magnifying dock */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 hidden justify-center px-4 md:flex">
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
    </>
  )
}
