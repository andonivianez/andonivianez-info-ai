"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { useLanguage } from "@/components/language-provider"
import { getProfile } from "@/lib/portfolio"
import { localizedPath } from "@/lib/i18n/config"

export function ProofStrip() {
  const { language, t } = useLanguage()
  const profile = getProfile(language)

  const items = [
    { label: t("home.proof.years"), value: `${profile.stats.yearsExperience}+` },
    { label: t("home.proof.stack"), value: t("home.proof.stackValue") },
    { label: t("home.proof.location"), value: profile.location },
  ]

  return (
    <section className="border-line/40 border-t px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="grid flex-1 gap-6 sm:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
            >
              <p className="text-slate-muted font-mono text-xs tracking-wider uppercase">
                {item.label}
              </p>
              <p className="text-text-on-ink mt-1 text-sm font-medium">{item.value}</p>
            </motion.div>
          ))}
        </div>
        <Link
          href={localizedPath("/about", language)}
          className="text-amber hover:text-amber/80 inline-flex items-center gap-2 text-sm font-medium transition-colors"
        >
          {t("home.viewProfile")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
