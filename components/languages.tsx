"use client"

import { Badge } from "@/components/ui/badge"
import { Globe, Award } from "lucide-react"
import { motion } from "motion/react"
import { useLanguage } from "@/components/language-provider"
import { getLanguages } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

interface LanguagesProps {
  variant?: "default" | "document"
}

export function Languages({ variant = "default" }: LanguagesProps) {
  const { language, t } = useLanguage()
  const languages = getLanguages(language)
  const isDoc = variant === "document"

  return (
    <section
      id="languages"
      className={cn(!isDoc && "px-4 py-20 sm:px-6 lg:px-8", isDoc && "mb-16")}
    >
      <div className={cn(!isDoc && "mx-auto max-w-4xl")}>
        <h2
          className={cn(
            "font-display mb-8 text-2xl font-bold sm:text-3xl",
            !isDoc && "mb-12 text-center text-balance sm:text-4xl",
          )}
        >
          {t("languages.title")}
        </h2>

        <div className="space-y-3">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border-border bg-card rounded-lg border p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="text-muted-foreground h-4 w-4" />
                  <h3 className="font-medium">{lang.language}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {lang.level === "native"
                      ? t("languages.native")
                      : lang.level === "basic"
                        ? t("languages.basic")
                        : lang.level === "intermediate"
                          ? t("languages.intermediate")
                          : lang.level}
                  </Badge>
                </div>
                <span className="text-muted-foreground font-mono text-sm">{lang.proficiency}%</span>
              </div>
              <div className="bg-muted mb-2 h-1.5 w-full rounded-full">
                <div
                  className="bg-foreground h-1.5 rounded-full transition-all duration-700"
                  style={{ width: `${lang.proficiency}%` }}
                />
              </div>
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                {lang.level !== "native" && <Award className="h-3 w-3" />}
                <span>{lang.description}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
