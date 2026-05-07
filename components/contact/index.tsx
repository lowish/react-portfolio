"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export function Contact() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <footer id="contact" className="relative">
      {/* Main CTA */}
      <motion.a
        href="mailto:lowishxx@gmail.com"
        data-cursor-hover
        className="relative block overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Curtain */}
        <motion.div
          className="absolute inset-0 bg-[#3b82f6]"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Content */}
        <div className="relative border-t border-white/10 px-4 py-14 sm:px-6 sm:py-16 md:px-12 md:py-24">
          <p className="mb-6 font-mono text-xs tracking-[0.3em] text-muted-foreground">06 - CONTACT</p>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.h2
              className="text-center font-sans text-3xl font-light tracking-tight sm:text-4xl md:text-left md:text-6xl lg:text-8xl"
              animate={
                isHovered
                  ? {
                      color: "#050505",
                      textShadow: "0 0 0 rgba(59,130,246,0)",
                    }
                  : {
                      color: ["#fafafa", "#bfdbfe", "#fafafa"],
                      textShadow: [
                        "0 0 0 rgba(59,130,246,0)",
                        "0 0 14px rgba(59,130,246,0.55)",
                        "0 0 0 rgba(59,130,246,0)",
                      ],
                    }
              }
              transition={isHovered ? { duration: 0.3 } : { duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              Let's <span className="italic">Talk</span>
            </motion.h2>

            <motion.div
              animate={{
                rotate: isHovered ? 45 : 0,
                color: isHovered ? "#050505" : "#3b82f6",
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-12 h-12 md:w-16 md:h-16" />
            </motion.div>
          </div>
        </div>
      </motion.a>

      {/* Footer Info */}
      <div className="border-t border-white/10 px-4 py-8 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Location */}
          <div className="font-mono text-xs tracking-widest text-muted-foreground">
            <span className="mr-2">LOCATION |</span>
            <span className="text-white">ANGELES CITY, PH</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-start md:gap-8">
            {[
              { name: "LinkedIn", url: "https://www.linkedin.com/in/pwtandev" },
              { name: "GitHub", url: "https://github.com/lowish" },
              { name: "Instagram", url: "https://www.instagram.com/lowishxx/" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="font-mono text-xs tracking-widest text-muted-foreground hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-mono text-xs tracking-widest text-muted-foreground">© {new Date().getFullYear()} lowish</p>
        </div>
      </div>
    </footer>
  )
}
