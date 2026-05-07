"use client"

import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Works } from "@/components/works"
import { Experience } from "@/components/experience"
import { Certificates } from "@/components/cert"
import { InfiniteCarousel } from "@/components/infinite-carousel"
import { TechMarquee } from "@/components/tech-marquee"
import { Contact } from "@/components/contact"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SectionBlend } from "@/components/background/section-blend"
import { GetInTouchModal } from "@/components/get-in-touch"

export default function Home() {
  useEffect(() => {
    const scrollToHash = () => {
      const targetId = window.location.hash.replace("#", "")
      if (!targetId) {
        return
      }

      const element = document.getElementById(targetId)
      if (!element) {
        return
      }

      const headerOffset = 96
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo({ top: targetPosition, behavior: "smooth" })
    }

    const timer = window.setTimeout(() => {
      scrollToHash()
    }, 120)

    window.addEventListener("hashchange", scrollToHash)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("hashchange", scrollToHash)
    }
  }, [])

  return (
    <GetInTouchModal>
      <SmoothScroll>
        <Navbar />
        <main className="overflow-x-hidden">
          <Hero />
          <SectionBlend />
          <Works />
          <Experience />
          <Certificates />
          <InfiniteCarousel />
          <About />
          <TechMarquee />
          <Contact />
        </main>
      </SmoothScroll>
    </GetInTouchModal>
  )
}
