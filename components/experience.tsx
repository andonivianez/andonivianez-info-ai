"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, TrendingUp } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { getExperiences } from "@/lib/portfolio"

export function Experience() {
  const { language, t } = useLanguage()
  const experiences = getExperiences(language)

  return (
    <section id="experience" className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-balance sm:text-4xl">
          {t("experience.title")}
        </h2>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <Card
              key={exp.id}
              className="border-l-4 border-l-blue-500 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-balance">
                  {exp.title}
                  {exp.tags.includes("current") && (
                    <Badge className="bg-blue-100 text-blue-700">{t("experience.current")}</Badge>
                  )}
                  {exp.tags.includes("freelance") && (
                    <Badge className="bg-green-100 text-green-700">
                      {t("experience.freelance")}
                    </Badge>
                  )}
                </CardTitle>
                <div className="text-muted-foreground flex flex-col gap-2 sm:flex-row sm:items-center">
                  <span className="font-medium text-blue-600">{exp.company}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-pretty">{exp.description}</p>

                <div className="mb-4">
                  <h4 className="mb-2 flex items-center gap-2 font-medium">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    {t("experience.achievements")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.achievements.map((achievement) => (
                      <Badge
                        key={achievement}
                        variant="outline"
                        className="border-blue-200 text-blue-700"
                      >
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
