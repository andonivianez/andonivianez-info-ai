"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"
import { motion } from "motion/react"
import { useLanguage } from "@/components/language-provider"
import { getFaq } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

interface FaqProps {
  variant?: "default" | "document"
}

export function Faq({ variant = "default" }: FaqProps) {
  const { language, t } = useLanguage()
  const entries = getFaq(language)
  const isDoc = variant === "document"

  return (
    <section
      id="faq"
      className={cn(!isDoc && "bg-muted/30 px-4 py-20 sm:px-6 lg:px-8", isDoc && "mb-16")}
    >
      <div className={cn(!isDoc && "mx-auto max-w-4xl")}>
        <h2
          className={cn(
            "font-display mb-8 text-2xl font-bold sm:text-3xl",
            !isDoc && "mb-12 text-center text-balance sm:text-4xl",
          )}
        >
          {t("faq.title")}
        </h2>

        <div className="space-y-3">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-start gap-2 text-sm font-medium">
                    <HelpCircle className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                    {entry.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{entry.answer}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
