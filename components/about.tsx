"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Code, Lightbulb } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">{t("about.title")}</h2>

        <Card className="mb-8">
          <CardContent className="p-8">
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">{t("about.description")}</p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-600 mb-2">14+</div>
              <p className="text-muted-foreground text-sm">{t("about.stats.experience")}</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-600 mb-2">8+</div>
              <p className="text-muted-foreground text-sm">{t("about.stats.companies")}</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Code className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <p className="text-muted-foreground text-sm">{t("about.stats.technologies")}</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Lightbulb className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-muted-foreground text-sm">{t("about.stats.projects")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
