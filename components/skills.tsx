"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion } from "motion/react"
import { useLanguage } from "@/components/language-provider"
import { getCertifications, getPortfolioData, getSoftSkills } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

interface SkillsProps {
  variant?: "default" | "document"
}

export function Skills({ variant = "default" }: SkillsProps) {
  const { language, t } = useLanguage()
  const skillCategories = getPortfolioData().skills
  const certifications = getCertifications(language)
  const softSkills = getSoftSkills(language)
  const isDoc = variant === "document"

  return (
    <section id="skills" className={cn(!isDoc && "px-4 py-20 sm:px-6 lg:px-8", isDoc && "mb-16")}>
      <div className={cn(!isDoc && "mx-auto max-w-6xl")}>
        <h2
          className={cn(
            "font-display mb-8 text-2xl font-bold sm:text-3xl",
            !isDoc && "mb-12 text-center text-balance sm:text-4xl",
          )}
        >
          {t("skills.title")}
        </h2>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span>{category.icon}</span>
                    {t(category.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-muted-foreground font-mono">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-1.5" aria-label={skill.name} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("skills.certifications")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("skills.softSkills")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
