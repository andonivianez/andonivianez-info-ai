"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useLanguage } from "@/components/language-provider"

const BOOT_LINES = {
  es: [
    "Inicializando runtime local…",
    "Comprobando WebGPU…",
    "Comprobando Chrome Built-in AI…",
    "0 peticiones salen de tu dispositivo",
    "Listo — pregúntame lo que quieras",
  ],
  en: [
    "Initializing local runtime…",
    "Checking WebGPU…",
    "Checking Chrome Built-in AI…",
    "0 requests leave your device",
    "Ready — ask me anything",
  ],
} as const

interface ChatBootSequenceProps {
  onComplete?: () => void
}

export function ChatBootSequence({ onComplete }: ChatBootSequenceProps) {
  const { language } = useLanguage()
  const reduceMotion = useReducedMotion()
  const lines = BOOT_LINES[language]
  const [visibleCount, setVisibleCount] = useState(reduceMotion ? lines.length : 0)

  useEffect(() => {
    if (reduceMotion) {
      onComplete?.()
      return
    }

    let index = 0
    const interval = setInterval(() => {
      index += 1
      setVisibleCount(index)
      if (index >= lines.length) {
        clearInterval(interval)
        onComplete?.()
      }
    }, 420)

    return () => clearInterval(interval)
  }, [lines.length, onComplete, reduceMotion])

  if (reduceMotion) return null

  return (
    <div
      className="border-line/60 bg-ink-muted/50 mb-4 rounded-lg border px-4 py-3 font-mono text-xs"
      aria-live="polite"
      aria-label="Boot sequence"
    >
      {lines.slice(0, visibleCount).map((line, i) => (
        <motion.div
          key={line}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className={i === lines.length - 1 ? "text-amber" : "text-slate-muted"}
        >
          <span className="text-amber/60 mr-2">{">"}</span>
          {line}
        </motion.div>
      ))}
    </div>
  )
}
