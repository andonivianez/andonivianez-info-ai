"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { getEducation } from "@/lib/portfolio"

export function Education() {
  const { language, t } = useLanguage()
  const education = getEducation(language)

  return (
    <section id="education" className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-balance sm:text-4xl">
          {t("education.title")}
        </h2>

        <div className="mb-12 space-y-6">
          {education.map((edu) => (
            <Card key={edu.id} className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-balance">{edu.degree}</h3>
                        <p className="font-medium text-blue-600">{edu.institution}</p>
                        <span className="mt-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                          {t(`education.${edu.type}`)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">{edu.period}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
