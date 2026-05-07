"use client"

import { useState, useRef } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect"

const menuColumns = [
  {
    title: "QUICK",
    items: [
      { number: "01", label: "Works", href: "/#works" },
      { number: "02", label: "Exp", href: "/#experience" },
      { number: "03", label: "Certificate", href: "/#certificates" },
    ],
  },
  {
    title: "LINKS",
    items: [
      { number: "04", label: "Stack", href: "/#stack" },
      { number: "05", label: "Contact", href: "/#contact" },
      { number: "06", label: "About", href: "/#about" },
    ],
  },
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
      y: -120,
      skewX: -12,
    })

    gsap.set(".menu-item-char", {
      opacity: 0,
      yPercent: -120,
      skewX: -10,
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
          y: -120,
          opacity: 0,
          skewX: -12,
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
      skewX: -10,
      opacity: 0,
      duration: 0.7,
      ease: "power3.in",
      stagger: {
        each: 0.012,
        from: "end",
      },
    })
      .to(
        ".menu-item",
        {
          skewX: -12,
          opacity: 0,
          y: -120,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.in",
        },
        "<",
      )
      .to(
        ".menu-backdrop",
        {
          opacity: 0,
          duration: 0.65,
          ease: "power2.in",
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
          duration: 0.75,
        },
        "-=0.45",
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
    menuCloseRef.current?.pause()
    menuOpenRef.current?.restart()
    setIsMenuOpen(true)
  }

  const closeMenu = (afterClose?: () => void) => {
    menuOpenRef.current?.pause()

    const closeTimeline = menuCloseRef.current
    if (!closeTimeline) {
      setIsMenuOpen(false)
      afterClose?.()
      return
    }

    closeTimeline.eventCallback("onComplete", () => {
      setIsMenuOpen(false)
      closeTimeline.eventCallback("onComplete", null)
      afterClose?.()
    })

    closeTimeline.restart()
  }

  const handleMenu = () => {
    if (isMenuOpen) {
      closeMenu()
      return
    }

    openMenu()
  }

  const handleMenuItemClick = (href: string) => {
    closeMenu(() => {
      scrollToSection(href)
    })
  }

  const handleMenuClose = () => {
    closeMenu()
  }

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 mx-auto mt-6 flex w-[90%] max-w-screen-xl items-center justify-between mix-blend-difference md:mt-8">
        <div className="nav-item group flex items-center gap-2 px-3 py-1.5 font-mono text-base tracking-widest text-muted-foreground backdrop-blur-sm">
          lowish
          <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] transition-transform duration-300 group-hover:scale-150" />
        </div>

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
      <div className="grid w-full max-w-[980px] grid-cols-1 gap-y-8 px-6 sm:px-10 md:grid-cols-2 md:gap-x-14 md:gap-y-8">
        {menuColumns.map((column) => (
          <div key={column.title} className="flex flex-col items-start">
            <p className="mb-4 pl-10 font-mono text-xs tracking-[0.22em] text-[#6b7280] md:pl-16">{column.title}</p>

            <div className="flex w-full flex-col gap-3">
              {column.items.map((link) => (
                <button
                  type="button"
                  key={link.number}
                  className="menu-item inline-flex w-full items-center gap-3 font-sans text-[clamp(1.65rem,8vw,2.2rem)] tracking-tight opacity-0 md:gap-4 md:text-[clamp(1rem,4.8vw,2rem)]"
                  onClick={() => onSelect(link.href)}
                >
                  <span className="w-10 text-right font-mono text-base text-[#3b82f6] md:w-12 md:text-lg">{link.number}</span>
                  <span className="relative flex">{renderSplitText(link.label)}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
