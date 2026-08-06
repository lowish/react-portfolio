"use client"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { projects } from "./projects-data"

export function Works() {
  return (
    <section id="works" className="relative px-4 py-20 sm:px-6 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
          <p className="mb-3 font-mono text-xs tracking-[0.28em] text-muted-foreground">01 - WORKS</p>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-1 pb-3 font-mono text-xs tracking-[0.18em] text-foreground transition-colors duration-300 hover:text-[#3b82f6]"
          >
            VIEW ALL
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {projects.map((project, index) => {
          return (
            <div
              key={project.title}
              className={`overflow-hidden border border-white/15 bg-[#0a0d13] shadow-[0_20px_70px_rgba(0,0,0,0.5)] ${
                index === 0 ? "shadow-[0_30px_90px_rgba(0,0,0,0.55)]" : "mt-12"
              }`}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#11151e] px-4 py-3 md:px-6">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div/>
              </div>

              <div className="grid gap-0 lg:grid-cols-[1fr_1.15fr]">
                <div className="border-b border-r-0 border-white/10 p-4 md:p-6 lg:border-b-0 lg:border-r">
                  <div className="flex h-full flex-col justify-center px-1 py-2 text-left md:px-2">
                    <h3 className="mb-3 font-mono text-[1.35rem] text-white sm:text-[1.5rem]">{project.title}</h3>
                    <p className="mb-15 text-sm leading-relaxed text-white/80 md:text-base font-mono">{project.description}</p>

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
                  <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-contain"
                      style={{ filter: "grayscale(18%) contrast(1.08)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
