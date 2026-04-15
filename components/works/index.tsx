"use client"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "DEVKIT",
    image: "/Devkit.jpg",
    url: "https://devkit-ph.vercel.app/",
    description:
      "A curated collection of essential resources for modern developers, from AI assistants to hosting platforms and component libraries..",
  },

  {
    title: "HomeVia",
    image: "/homevia.jpg",
    url: "https://homevia-eta.vercel.app/",
    description:
      "HomeVia is a real estate platform. It showcases properties in the Philippines, helping users explore and discover their perfect place to live..",
  },
  {
    title: "Campus Hau",
    image: "/CampusHAU.jpg",
    url: "https://campushau.vercel.app/",
    description:
      "CampusHau is a campus-focused web platform built on the MEVN stack to enhance streamline student access to school-related services and information.",
  },
]

export function Works() {
  return (
    <section id="works" className="relative px-4 py-20 sm:px-6 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-8 md:mb-10">
          <p className="mb-3 font-mono text-xs tracking-[0.28em] text-muted-foreground">01 - WORKS</p>
          <h2 className="font-sans text-2xl font-light italic sm:text-3xl md:text-5xl">Personal Projects</h2>
        </div>

        {projects.map((project, index) => {
          return (
            <div
              key={project.title}
              className={`overflow-hidden rounded-[26px] border border-white/15 bg-[#0a0d13] shadow-[0_20px_70px_rgba(0,0,0,0.5)] ${
                index === 0 ? "shadow-[0_30px_90px_rgba(0,0,0,0.55)]" : "mt-12"
              }`}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#11151e] px-4 py-3 md:px-6">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="hidden h-7 w-16 rounded-full border border-white/10 bg-white/5 md:block" />
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

      {/* Bottom Border */}
      <div className="mx-auto mt-8 max-w-[1400px] border-t border-white/10" />
    </section>
  )
}
