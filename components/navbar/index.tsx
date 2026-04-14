"use client"

import { useState, useRef } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect"

const navLinks = [
  { label: "Works", href: "/#works" },
  { label: "Exp", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
  { label: "Contact", href: "/#contact" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuOpenRef = useRef<gsap.core.Timeline | null>(null)
  const menuCloseRef = useRef<gsap.core.Timeline | null>(null)

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollToPlugin)

    gsap.set(".menu", {
      autoAlpha: 0,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    })

    gsap.set(".menu-backdrop", { opacity: 0 })

    gsap.set(".menu-item", {
      opacity: 0,
      y: 120,
      skewX: 12,
    })

    gsap.set(".menu-item-char", {
      opacity: 0,
      yPercent: 120,
      skewX: 10,
    })

    menuOpenRef.current = gsap.timeline({ paused: true }).to(".menu", {
      autoAlpha: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power4.inOut",
      duration: 0.75,
    })
      .to(
        ".menu-backdrop",
        {
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        "body",
        {
          overflowY: "hidden",
        },
        "<",
      )
      .fromTo(
        ".menu-item",
        {
          y: 120,
          opacity: 0,
          skewX: 12,
        },
        {
          y: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.45",
      )
      .to(
        ".menu-item-char",
        {
          yPercent: 0,
          skewX: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: {
            each: 0.012,
            from: "start",
          },
        },
        "-=0.68",
      )

    menuCloseRef.current = gsap.timeline({ paused: true }).to(".menu-item-char", {
      yPercent: -120,
      skewX: -8,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      stagger: {
        each: 0.006,
        from: "end",
      },
    })
      .to(
        ".menu-item",
        {
          skewX: -10,
          opacity: 0,
          y: -120,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.in",
        },
        "<0.05",
      )
      .to(
        ".menu-backdrop",
        {
          opacity: 0,
          duration: 0.45,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(
        "body",
        {
          overflowY: "auto",
        },
        "<0.1",
      )
      .to(
        ".menu",
        {
          autoAlpha: 0,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          ease: "power4.inOut",
          duration: 0.65,
        },
        "-=0.2",
      )

    return () => {
      menuOpenRef.current?.kill()
      menuCloseRef.current?.kill()
      gsap.set("body", { clearProps: "overflowY" })
    }
  }, [])

  const scrollToSection = (href: string, offsetY = 96) => {
    const targetId = href.split("#")[1]
    if (!targetId) return

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${targetId}`, offsetY },
      ease: "power2.out",
    })
    window.history.pushState(null, "", href)
  }

  const openMenu = () => {
    menuCloseRef.current?.pause(0)
    menuOpenRef.current?.play(0)
  }

  const closeMenu = () => {
    menuOpenRef.current?.pause(0)
    menuCloseRef.current?.play(0)
  }

  const handleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev
      if (next) {
        openMenu()
      } else {
        closeMenu()
      }
      return next
    })
  }

  const handleMenuItemClick = (href: string) => {
    closeMenu()
    setIsMenuOpen(false)
    scrollToSection(href)
  }

  const handleMenuClose = () => {
    closeMenu()
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 mx-auto mt-6 flex w-[90%] max-w-screen-xl items-center justify-between text-white mix-blend-difference md:mt-8">
        <button
          type="button"
          className="nav-item group flex items-center gap-2 px-3 py-1.5 font-mono text-base tracking-widest text-muted-foreground backdrop-blur-sm transition-colors duration-300 hover:border-[#3b82f6] sm:text-s"
          onClick={() => {
            closeMenu()
            setIsMenuOpen(false)
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: 0, offsetY: 0 },
              ease: "power2.out",
            })
          }}
        >
            lowish
          <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] transition-transform duration-300 group-hover:scale-150" />
        </button>

        <button
          type="button"
          className="nav-item menu-burger group flex w-8 cursor-pointer flex-col items-center justify-center space-y-1 py-3 [&>span]:block [&>span]:h-[1.5px] [&>span]:w-full [&>span]:transform [&>span]:bg-white [&>span]:transition [&>span]:duration-300"
          onClick={handleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-menu"
        >
          <span
            className={`${
              isMenuOpen
                ? "translate-y-[3px] rotate-45 opacity-100 group-hover:opacity-50"
                : "opacity-100 group-hover:opacity-50"
            }`}
          />
          <span
            className={`${
              isMenuOpen
                ? "-translate-y-[3px] -rotate-45 opacity-100 group-hover:opacity-50"
                : "opacity-100 group-hover:opacity-50"
            }`}
          />
        </button>
      </nav>

      <Menu isOpen={isMenuOpen} onSelect={handleMenuItemClick} onClose={handleMenuClose} />
    </>
  )
}

function Menu({
  isOpen,
  onSelect,
  onClose,
}: {
  isOpen: boolean
  onSelect: (href: string) => void
  onClose: () => void
}) {
  const renderSplitText = (text: string) => {
    return text.split("").map((char, idx) => (
      <span
        key={`${text}-${idx}-${char}`}
        className="menu-item-char inline-block will-change-transform"
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char}
      </span>
    ))
  }

  return (
    <div
      id="mobile-nav-menu"
      className={`menu invisible fixed left-0 top-0 z-40 grid h-screen w-screen place-items-center justify-center bg-white text-[#050505] opacity-0 backdrop-blur-lg [clip-path:polygon(0%_0%,_100%_0%,_100%_0%,_0%_0%)] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="menu-backdrop absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(59,130,246,0.12),transparent_45%),radial-gradient(circle_at_82%_78%,rgba(0,0,0,0.08),transparent_44%)]" />
      <div className="flex w-full max-w-[760px] flex-col items-start gap-5 px-6 sm:px-10">
        {navLinks.map((link, index) => (
          <button
            type="button"
            key={link.label}
            className="menu-item inline-flex w-full items-center gap-4 font-sans text-[clamp(2rem,10vw,3.25rem)] tracking-tight opacity-0"
            onClick={() => onSelect(link.href)}
          >
            <span className="w-12 text-right font-mono text-lg text-[#3b82f6]">0{index + 1}</span>
            <span className="relative flex">{renderSplitText(link.label)}</span>
          </button>
        ))}

        <div className="mt-8 flex items-center gap-3 pl-16">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3b82f6] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3b82f6]" />
          </span>
          <a
            href="/resume.txt"
            download
            className="inline-flex items-center rounded-full border border-black/10 px-5 py-2.5 font-mono text-xs tracking-wider text-[#050505] transition-colors duration-300 hover:border-[#3b82f6] hover:text-[#3b82f6]"
            onClick={onClose}
          >
            RESUME
          </a>
        </div>
      </div>
    </div>
  )
}
