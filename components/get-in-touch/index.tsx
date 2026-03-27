"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { motion } from "framer-motion"
import { Send, X } from "lucide-react"
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"

interface GetInTouchContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const GetInTouchContext = createContext<GetInTouchContextType | undefined>(undefined)

export function useGetInTouch() {
  const context = useContext(GetInTouchContext)
  if (!context) {
    throw new Error("useGetInTouch must be used within GetInTouchProvider")
  }
  return context
}

function GetInTouchDialog() {
  const { open, setOpen } = useGetInTouch()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch("/api/email-send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to send message")
      }

      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })

      setTimeout(() => {
        setIsSubmitted(false)
        setOpen(false)
      }, 2000)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong"
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90vw] max-w-md h-auto max-h-[90vh] bg-[#0a0d13] border border-white/10 p-0 gap-0 rounded-sm" showCloseButton={false}>
        {/* Close Button */}
        <div className="absolute top-6 right-6 z-50">
          <DialogClose asChild>
            <button
              className="text-white hover:text-[#3b82f6] transition-colors duration-300"
              data-cursor-hover
            >
              <X className="w-5 h-5" />
            </button>
          </DialogClose>
        </div>

        {/* Content */}
        <div className="px-6 py-8 overflow-y-auto max-h-[80vh]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <DialogTitle className="font-sans text-2xl md:text-3xl font-light tracking-tight text-white mb-2">
              Get in Touch
            </DialogTitle>
            <div className="w-12 h-1 bg-[#3b82f6]" />
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Name Input */}
            <motion.div
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="name" className="block text-xs font-mono tracking-widest text-muted-foreground mb-2">
                NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                data-cursor-hover
                className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-none focus:border-[#3b82f6] outline-none transition-colors duration-300 font-mono text-sm text-white placeholder-white/40"
              />
            </motion.div>

            {/* Email Input */}
            <motion.div
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="email" className="block text-xs font-mono tracking-widest text-muted-foreground mb-2">
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                data-cursor-hover
                className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-none focus:border-[#3b82f6] outline-none transition-colors duration-300 font-mono text-sm text-white placeholder-white/40"
              />
            </motion.div>

            {/* Message Input */}
            <motion.div
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="message" className="block text-xs font-mono tracking-widest text-muted-foreground mb-2">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                data-cursor-hover
                rows={4}
                className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-none focus:border-[#3b82f6] outline-none transition-colors duration-300 font-mono text-sm text-white placeholder-white/40 resize-none"
                placeholder="Your message..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                data-cursor-hover
                className="w-full relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-[#3b82f6]"
                  initial={{ y: "100%" }}
                  whileHover={{ y: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative px-6 py-3 flex items-center justify-center gap-2">
                  <span className="font-mono text-sm font-medium group-hover:text-black transition-colors duration-300 tracking-widest">
                    {isSubmitted ? "SENT!" : isSubmitting ? "SENDING..." : "Send Message"}
                  </span>
                  <motion.div
                    animate={{
                      rotate: isSubmitting ? 360 : 0,
                    }}
                    transition={{
                      duration: isSubmitting ? 1 : 0.3,
                      repeat: isSubmitting ? Number.POSITIVE_INFINITY : 0,
                    }}
                  >
                    <Send className="w-4 h-4 group-hover:text-black transition-colors duration-300" />
                  </motion.div>
                </div>
                <div className="absolute inset-0 border border-[#3b82f6] group-hover:border-transparent transition-colors duration-300" />
              </button>
            </motion.div>

            {/* Success Message */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 bg-[#3b82f6]/10 border border-[#3b82f6]/30 rounded-sm text-center"
              >
                <p className="font-mono text-xs text-[#3b82f6]">Message sent successfully!</p>
              </motion.div>
            )}

            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/30 rounded-sm text-center"
              >
                <p className="font-mono text-xs text-red-300">{submitError}</p>
              </motion.div>
            )}
          </motion.form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function GetInTouchModal({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <GetInTouchContext.Provider value={{ open, setOpen }}>
      {children}
      <GetInTouchDialog />
    </GetInTouchContext.Provider>
  )
}
