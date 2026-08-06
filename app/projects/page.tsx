"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { projects } from "@/components/works/projects-data"

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-10 sm:px-6 md:px-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <div className="relative mx-auto max-w-[1180px]">
        <div className="mb-10 flex flex-col gap-5 border-b border-white/30 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>

            <Link
            href="/#works"
            className="mb-2 group inline-flex w-fit items-center gap-2 self-start px-1 pb-2 font-mono text-xs tracking-[0.18em] text-foreground transition-colors duration-300 hover:text-[#3b82f6] sm:self-auto"
          >
            <ArrowLeft className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
            BACK
          </Link>

            <h1 className="font-sans text-4xl font-light italic tracking-tight text-white sm:text-5xl md:text-7xl">
              Personal Projects
            </h1>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid gap-6 lg:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border border-white/15 bg-[#0a0d13] shadow-[0_20px_70px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#11151e] px-4 py-3 md:px-6">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.18em] text-white/45">PROJECT</span>
              </div>

              <div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
                <div className="border-b border-r-0 border-white/10 p-4 md:p-6 lg:border-b-0 lg:border-r">
                  <div className="flex h-full flex-col justify-center px-1 py-2 text-left md:px-2">
                    <h2 className="mb-3 font-mono text-[1.35rem] text-white sm:text-[1.5rem]">{project.title}</h2>
                    <p className="mb-10 font-mono text-sm leading-relaxed text-white/80 md:text-base">
                      {project.description}
                    </p>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover-effect relative flex w-full items-center justify-between gap-2 border-b border-border px-1 pb-3 font-mono text-xs tracking-[0.18em] text-white transition-colors duration-300 hover:text-[#3b82f6] sm:px-3 sm:text-sm"
                    >
                      View Project
                      <ArrowUpRight className="stroke-1" />
                    </a>
                  </div>
                </div>

                <div className="relative bg-black/30 p-3 md:p-5">
                  <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                      style={{ filter: "grayscale(18%) contrast(1.08)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </main>
  )
}