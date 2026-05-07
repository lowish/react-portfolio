"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { type MouseEvent, useEffect, useState } from "react"

type CertificateItem = {
  title: string
  year: string
  image: string
  href?: string
}

const certificates: CertificateItem[] = [
  {
    title: "Web Design Competition",
    year: "2025",
    image: "/Web%20Design.jpg",
  },
  {
    title: "AI Conference",
    year: "2025",
    image: "/AI%20Conference.png",
    href: "https://pdfhost.io/v/6qMFR8gQDj_PRINCE_WILLIAM_M__TAN_Certification_AI_CONFERENCE",
  },
  {
    title: "Regional CyberSecurity",
    year: "2025",
    image: "/4th%20Regional.png",
    href: "https://pdfhost.io/v/JaS5RJLUCd_PRINCE_WILLIAM_M__TAN_Certificate_of_Participation",
  },
]

type PreviewState = {
  visible: boolean
  image: string
  x: number
  y: number
}

function FloatingPreview({ image, visible, x, y }: PreviewState) {
  const mouseX = useMotionValue(x)
  const mouseY = useMotionValue(y)
  const springX = useSpring(mouseX, { damping: 18, stiffness: 220, mass: 0.25 })
  const springY = useSpring(mouseY, { damping: 18, stiffness: 220, mass: 0.25 })
  const opacity = useTransform(springX, [0, 1], [0, 1])

  useEffect(() => {
    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY, x, y])

  if (!visible || !image) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-52 w-72 md:block"
      style={{ x: springX, y: springY, opacity }}
      initial={{ scale: 0.9 }}
      animate={{ scale: visible ? 1 : 0.9 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative h-full w-full overflow-hidden bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        <img src={image} alt="Certificate preview" className="h-full w-full object-cover grayscale-[18%] contrast-125" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 ring-1 ring-inset ring-blue-400/20" />
      </div>
    </motion.div>
  )
}

type CertificateRowProps = {
  item: CertificateItem
  active: boolean
  onHover: (image: string, x: number, y: number) => void
  onLeave: () => void
}

function CertificateRow({ item, active, onHover, onLeave }: CertificateRowProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMove = (event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLDivElement>) => {
    const x = event.clientX + 28
    const y = event.clientY - 210

    mouseX.set(x)
    mouseY.set(y)
    onHover(item.image, x, y)
  }

  const rowContent = (
    <motion.div className="group flex items-center gap-4 px-0 py-5 md:py-6">
      <div className="w-16 shrink-0 md:w-20">
        <span className="font-mono text-[11px] tracking-[0.18em] text-white/45 transition-colors group-hover:text-blue-600">
          {item.year}
        </span>
      </div>

      <motion.div
        className="min-w-0 flex-1 overflow-hidden"
        onMouseMove={handleMove}
        onMouseEnter={handleMove}
        onMouseLeave={onLeave}
      >
        <motion.h3
          animate={{ x: active ? 6 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="text-2xl font-light tracking-[-0.03em] text-white md:text-4xl"
        >
          {item.title}
        </motion.h3>
      </motion.div>

      <motion.span
        animate={{ x: active ? 4 : 0, y: active ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-white/80 transition-colors group-hover:text-blue-600"
      >
        <ArrowUpRight className="h-4 w-4" />
      </motion.span>
    </motion.div>
  )

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="block"
      >
        {rowContent}
      </a>
    )
  }

  return <div>{rowContent}</div>
}

export function Certificates() {
  const [preview, setPreview] = useState<PreviewState>({
    visible: false,
    image: "",
    x: 0,
    y: 0,
  })

  return (
    <section id="certificates" className="relative px-4 py-20 sm:px-6 md:px-12 md:py-28">
      <FloatingPreview image={preview.image} visible={preview.visible} x={preview.x} y={preview.y} />

      <div className="mx-auto max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 md:mb-14"
        >
          <p className="mb-3 font-mono text-xs tracking-[0.28em] text-muted-foreground">03 - CERT</p>
          <h2 className="text-2xl font-light italic tracking-[-0.03em] text-white md:text-4xl">Certificates</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-y border-white/8"
        >
          {certificates.map((item, index) => (
            <div key={item.title} className={index !== certificates.length - 1 ? "border-b border-white/8" : ""}>
              <CertificateRow
                item={item}
                active={preview.visible && preview.image === item.image}
                onHover={(image, x, y) => setPreview({ visible: true, image, x, y })}
                onLeave={() => setPreview((current) => ({ ...current, visible: false }))}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}