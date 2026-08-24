"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { certificates, type CertificateItem } from "@/components/cert/certificates-data"

/**
 * Badge / issuer metadata, keyed by the certificate title.
 * - `issuer`: the organization line under the title (leave "" to hide it)
 * - `logo`:   optional path to a badge/logo file in /public (e.g. "/logos/cisco.svg").
 *             When omitted, a monogram badge is generated from the title.
 * - `accent`: optional brand color used for the badge glow on hover.
 */
type CertMeta = {
  issuer?: string
  logo?: string
  accent?: string
}

/** School of Computing mark. Traced greyscale artwork on a white ground, so it is
 *  presented as a light tile rather than sitting directly on the dark card. */
const SOC_LOGO = "/logos/soc.svg"

const CERT_META: Record<string, CertMeta> = {
  "TechTalk": { issuer: "Holy Angel University", logo: SOC_LOGO },
  "AI Conference": { issuer: "Holy Angel University", logo: SOC_LOGO },
  "Regional CyberSecurity": { issuer: "Holy Angel University", logo: SOC_LOGO },
  "Claude 101": { issuer: "Anthropic", logo: "/logos/anthropic.svg" },
}

const ACCENT = "#3b82f6"

function initialsOf(title: string) {
  const words = title
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[\s\-/]+/)
    .filter(Boolean)

  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

function CertBadge({ item, meta }: { item: CertificateItem; meta: CertMeta }) {
  const accent = meta.accent ?? ACCENT

  return (
    <div className="relative mb-6 flex h-[88px] w-[88px] items-center justify-center">
      <div
        className="absolute inset-0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${accent}55, transparent 70%)` }}
      />

      {meta.logo ? (
        <img
          src={meta.logo}
          alt={`${item.title} badge`}
          loading="lazy"
          className="relative h-[90px] w-[95px] rounded-m bg-white object-contain p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <>
          <div className="absolute inset-0 border border-white/15 bg-gradient-to-b from-white/[0.07] to-white/[0.01] transition-colors duration-500 group-hover:border-[#3b82f6]/45" />

          <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-white/40 transition-colors duration-500 group-hover:border-[#3b82f6]" />
          <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-white/40 transition-colors duration-500 group-hover:border-[#3b82f6]" />

          <span className="relative font-sans text-3xl font-light italic tracking-tight text-white/85 transition-transform duration-500 group-hover:scale-105">
            {initialsOf(item.title)}
          </span>
        </>
      )}
    </div>
  )
}

function CertCard({ item }: { item: CertificateItem }) {
  const meta = CERT_META[item.title] ?? {}

  const content = (
    <>
      <div className="flex flex-1 flex-col items-center px-6 pb-7 pt-9 text-center">
        <CertBadge item={item} meta={meta} />

        <h2 className="font-sans text-xl font-light leading-snug tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-[#3b82f6] md:text-2xl">
          {item.title}
        </h2>

        {meta.issuer ? (
          <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-white/45">{meta.issuer}</p>
        ) : null}
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
        <span className="font-mono text-[10px] tracking-[0.22em] text-white/40">{item.year.toUpperCase()}</span>

        {item.href ? (
          <ArrowUpRight className="h-4 w-4 stroke-1 text-white/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#3b82f6]" />
        ) : (
          <span className="font-mono text-[10px] tracking-[0.22em] text-white/30">ON REQUEST</span>
        )}
      </div>
    </>
  )

  const cardClass =
    "group flex h-full flex-col border border-white/12 bg-[#0a0d13] shadow-[0_20px_70px_rgba(0,0,0,0.45)] transition-colors duration-500 hover:border-white/30"

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
    >
      {item.href ? (
        <a href={item.href} target="_blank" rel="noreferrer" className={cardClass}>
          {content}
        </a>
      ) : (
        <div className={cardClass}>{content}</div>
      )}
    </motion.article>
  )
}

export default function CertificatesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-10 sm:px-6 md:px-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <div className="relative mx-auto max-w-[1180px]">
        <Link
          href="/#certificates"
          className="group mb-8 inline-flex w-fit items-center gap-2 font-mono text-xs tracking-[0.18em] text-foreground transition-colors duration-300 hover:text-[#3b82f6]"
        >
          <ArrowLeft className="h-4 w-4 stroke-1 transition-transform duration-300 group-hover:-translate-x-1" />
          BACK
        </Link>

        <div className="mb-10 flex flex-col gap-4 border-b border-white/30 pb-6 sm:flex-row sm:items-end sm:justify-between md:mb-14">
          <h1 className="max-w-[16ch] font-sans text-4xl font-light italic tracking-tight text-white sm:text-5xl md:text-6xl">
            Certifications
          </h1>

          <span className="font-mono text-[11px] tracking-[0.28em] text-white/40">
            {String(certificates.length).padStart(2, "0")} CREDENTIALS
          </span>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {certificates.map((item) => (
            <CertCard key={item.title} item={item} />
          ))}
        </motion.div>
      </div>
    </main>
  )
}
