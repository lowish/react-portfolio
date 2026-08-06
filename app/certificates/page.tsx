"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { certificates } from "@/components/cert/certificates-data"

export default function CertificatesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-10 sm:px-6 md:px-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <div className="relative mx-auto max-w-[1180px]">
        <div className="mb-10 flex flex-col gap-6 border-b border-white/45 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[18rem] sm:max-w-none">

          <Link
            href="/#certificates"
            className="mb-2 group inline-flex w-fit items-center gap-2 self-start px-1 pb-2 font-mono text-xs tracking-[0.18em] text-foreground transition-colors duration-300 hover:text-[#3b82f6] sm:self-auto"
          >
            <ArrowLeft className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
            BACK
          </Link>

            <h1 className="font-sans text-4xl font-light italic tracking-tight text-white sm:text-5xl md:text-7xl">
              Certificates
            </h1>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {certificates.map((item) => (
            <motion.article
              key={item.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="group overflow-hidden border border-white/15 bg-[#0a0d13] shadow-[0_20px_70px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-[#11151e] px-4 py-3 md:px-5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.18em] text-white/45">{item.year}</span>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-black/35">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3b82f6]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="space-y-4 p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-sans text-2xl font-light tracking-[-0.03em] text-white md:text-3xl">
                      {item.title}
                    </h2>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-white/45">{item.year}</span>
                </div>

                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover-effect relative flex w-full items-center justify-between gap-2 border-b border-border px-1 pb-3 font-mono text-xs tracking-[0.18em] text-white transition-colors duration-300 hover:text-[#3b82f6]"
                  >
                    Open Certificate
                    <ArrowUpRight className="stroke-1" />
                  </a>
                ) : (
                  <div className="border-b border-border px-1 pb-3 font-mono text-xs tracking-[0.18em] text-white/55">
                    Available on request
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </main>
  )
}