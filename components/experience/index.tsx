"use client"

import { motion } from "framer-motion"

const experiences = [
  {
    role: "UI/UX Designer",
    company: "School Projects",
    period: "2026",
    summary: "Creating a prototype for a mobile app using Figma. The protoype focus in e-commerce app that allows users to buy and sell products online./scan id payment.",
  },
  {
    role: "Web Project Builder",
    company: "Academic and Personal Projects",
    period: "2026 - Present",
    summary: "Delivered full-stack school and passion projects from planning to deployment, focusing on clear UX and practical features.",
  },
]

export function Experience() {
  return (
    <section id="experience" className="relative px-4 py-20 sm:px-6 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1000px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-10"
        >
          <p className="mb-3 font-mono text-xs tracking-[0.28em] text-muted-foreground">02 - EXP</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-white/15 bg-[#0a0d13] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        >
          <div className="mb-5 flex items-center p-2 gap-3">
            <h3 className="mb-0.5 font-mono text-[13px] tracking-[0.22em] text-[#3b82f6]">Experience</h3>
           </div>
          <ul className="space-y-4">
            {experiences.map((item) => (
              <li key={item.role} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="font-mono text-sm leading-relaxed text-white md:text-base">{item.role}</p>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-white/55">{item.period}</span>
                </div>
                <p className="font-mono text-sm leading-relaxed text-white/70 md:text-base">{item.summary}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
