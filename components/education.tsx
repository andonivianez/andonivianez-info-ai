"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"
import { motion } from "motion/react"
import { useLanguage } from "@/components/language-provider"
import { getEducation } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

interface EducationProps {
  variant?: "default" | "document"
}

export function Education({ variant = "default" }: EducationProps) {
  const { language, t } = useLanguage()
  const education = getEducation(language)
  const isDoc = variant === "document"

  return (
    <section
      id="education"
      className={cn(!isDoc && "bg-slate-50 px-4 py-20 sm:px-6 lg:px-8", isDoc && "mb-16")}
    >
      <div className={cn(!isDoc && "mx-auto max-w-6xl")}>
        <h2
          className={cn(
            "font-display mb-8 text-2xl font-bold sm:text-3xl",
            !isDoc && "mb-12 text-center text-balance sm:text-4xl",
          )}
        >
          {t("education.title")}
        </h2>

        <div className="space-y-3">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Card>
                <CardContent className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <h3 className="font-medium text-balance">{edu.degree}</h3>
                      <p className="text-muted-foreground text-sm">{edu.institution}</p>
                      <span className="text-muted-foreground mt-1 inline-block font-mono text-xs">
                        {t(`education.${edu.type}`)}
                      </span>
                    </div>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 font-mono text-sm">
                    <Calendar className="h-4 w-4" />
                    {edu.period}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
