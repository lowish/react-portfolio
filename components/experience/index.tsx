"use client"

import { motion } from "framer-motion"
import { Award, ArrowUpRight, BriefcaseBusiness } from "lucide-react"

const certificates = [
  {
    title: "AI Conference",
    issuer: "Google Developer Student Clubs",
    year: "2025",
    url: "https://pdfhost.io/v/6qMFR8gQDj_PRINCE_WILLIAM_M__TAN_Certification_AI_CONFERENCE",
  },
  {
    title: "4th Regional Cybersecurity",
    issuer: "Holy Angel University",
    year: "2025",
    url: "https://pdfhost.io/v/JaS5RJLUCd_PRINCE_WILLIAM_M__TAN_Certificate_of_Participation",
  },
  {
    title: "Full Stack Web Development",
    issuer: "Coursera",
    year: "2026",
    url: "https://www.coursera.org/account/accomplishments/your-certificate-id",
  },
  {
    title: "AI Prompt Engineering",
    issuer: "Udemy",
    year: "2026",
    url: "https://www.udemy.com/certificate/your-certificate-id/",
  },
]

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
          <h2 className="font-sans text-2xl font-light italic sm:text-3xl md:text-5xl">Certificates - Experience</h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/15 bg-[#0a0d13] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5">
                <Award className="h-4 w-4 text-white/85" />
              </span>
              <h3 className="mb-1 font-mono text-[13px] tracking-[0.22em] text-[#3b82f6]">Certificates</h3>
            </div>

            <ul className="space-y-4">
              {certificates.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/25"
                  >
                    <div>
                      <p className="mb-0.5 font-mono text-sm leading-relaxed text-white md:text-base">{item.title}</p>
                      <p className="font-mono text-[11px] tracking-[0.16em] text-white/60">
                        {item.issuer} - {item.year}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-white/60 transition-colors group-hover:text-[#3b82f6]" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="rounded-3xl border border-white/15 bg-[#0a0d13] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5">
                <BriefcaseBusiness className="h-4 w-4 text-white/85" />
              </span>
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
          </motion.article>
        </div>
      </div>
    </section>
  )
}
