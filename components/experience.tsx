"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, TrendingUp } from "lucide-react"
import { motion } from "motion/react"
import { useLanguage } from "@/components/language-provider"
import { getExperiences } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

interface ExperienceProps {
  variant?: "default" | "document"
}

export function Experience({ variant = "default" }: ExperienceProps) {
  const { language, t } = useLanguage()
  const experiences = getExperiences(language)
  const isDoc = variant === "document"

  return (
    <section
      id="experience"
      className={cn(!isDoc && "bg-muted/30 px-4 py-20 sm:px-6 lg:px-8", isDoc && "mb-16")}
    >
      <div className={cn(isDoc ? "" : "mx-auto max-w-4xl")}>
        <h2
          className={cn(
            "font-display mb-8 text-2xl font-bold sm:text-3xl",
            !isDoc && "mb-12 text-center text-balance sm:text-4xl",
          )}
        >
          {t("experience.title")}
        </h2>

        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
            >
              <Card
                className={cn(
                  "transition-shadow hover:shadow-md",
                  isDoc ? "border-border" : "border-l-4 border-l-blue-500",
                )}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex flex-wrap items-center gap-2 text-lg text-balance">
                    {exp.title}
                    {exp.tags.includes("current") && (
                      <Badge variant="secondary">{t("experience.current")}</Badge>
                    )}
                    {exp.tags.includes("freelance") && (
                      <Badge variant="outline">{t("experience.freelance")}</Badge>
                    )}
                  </CardTitle>
                  <div className="text-muted-foreground flex flex-col gap-2 sm:flex-row sm:items-center">
                    <span className="text-foreground font-medium">{exp.company}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed text-pretty">
                    {exp.description}
                  </p>
                  <div className="mb-3">
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
                      <TrendingUp className="h-4 w-4" />
                      {t("experience.achievements")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.achievements.map((achievement) => (
                        <Badge key={achievement} variant="outline" className="text-xs">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
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
