"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { getCertifications, getPortfolioData, getSoftSkills } from "@/lib/portfolio"

export function Skills() {
  const { language, t } = useLanguage()
  const skillCategories = getPortfolioData().skills
  const certifications = getCertifications(language)
  const softSkills = getSoftSkills(language)

  return (
    <section id="skills" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-balance sm:text-4xl">
          {t("skills.title")}
        </h2>

        <div className="mb-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {skillCategories.map((category) => (
            <Card key={category.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-center text-lg">
                  <span className="text-2xl">{category.icon}</span>
                  {t(category.titleKey)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm font-semibold text-blue-600">{skill.level}%</span>
                    </div>
                    <Progress
                      value={skill.level}
                      className="h-2"
                      aria-label={`${skill.name} ${skill.level}%`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg">🏆 Certificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <Badge key={cert} className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg">👥 Habilidades de Liderazgo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-blue-200 text-blue-700">
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
