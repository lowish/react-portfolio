"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { label: "Works", href: "/#works" },
  { label: "Exp", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
  { label: "Contact", href: "/#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    const targetId = href.split("#")[1]
    const element = targetId ? document.getElementById(targetId) : null
    if (element) {
      const headerOffset = 96
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo({ top: targetPosition, behavior: "smooth" })
      window.history.pushState(null, "", href)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
        }`}
      >
        <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 md:px-12 md:py-5">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="group flex items-center gap-2"
          >
            <span className="font-mono text-xs tracking-widest text-muted-foreground">lowish</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] group-hover:scale-150 transition-transform duration-300" />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className="group relative font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <span className="mr-1 font-mono text-[#3b82f6]">0{index + 1}</span>
                  {link.label.toUpperCase()}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]" />
            </span>
            <a
              href="/resume.txt"
              download
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              RESUME
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            <span className="relative block h-5 w-6">
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-0 h-px w-6 origin-center bg-foreground"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                className="absolute left-0 top-2 h-px w-6 bg-foreground"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-4 h-px w-6 origin-center bg-foreground"
              />
            </span>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <nav className="flex h-full flex-col items-center justify-center gap-7 px-4 pt-20 pb-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className="group inline-flex items-center gap-3 text-[clamp(2rem,10vw,3.25rem)] font-sans tracking-tight text-foreground"
                >
                  <span className="font-mono text-lg text-[#3b82f6] flex-shrink-0">0{index + 1}</span>
                  <span className="text-center">{link.label}</span>
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 mt-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]" />
                </span>
                <a
                  href="/resume.txt"
                  download
                  className="font-mono text-xs tracking-wider text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  RESUME
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
