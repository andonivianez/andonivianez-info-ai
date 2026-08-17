"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Code, Lightbulb } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { getProfile } from "@/lib/portfolio"

export function About() {
  const { language, t } = useLanguage()
  const profile = getProfile(language)

  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-balance sm:text-4xl">
          {t("about.title")}
        </h2>

        <Card className="mb-8">
          <CardContent className="p-8">
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              {profile.bio}
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="text-center transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
              <Award className="mx-auto mb-3 h-8 w-8 text-blue-600" />
              <div className="mb-2 text-3xl font-bold text-blue-600">
                {profile.stats.yearsExperience}+
              </div>
              <p className="text-muted-foreground text-sm">{t("about.stats.experience")}</p>
            </CardContent>
          </Card>

          <Card className="text-center transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
              <Users className="mx-auto mb-3 h-8 w-8 text-blue-600" />
              <div className="mb-2 text-3xl font-bold text-blue-600">
                {profile.stats.companies}+
              </div>
              <p className="text-muted-foreground text-sm">{t("about.stats.companies")}</p>
            </CardContent>
          </Card>

          <Card className="text-center transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
              <Code className="mx-auto mb-3 h-8 w-8 text-blue-600" />
              <div className="mb-2 text-3xl font-bold text-blue-600">
                {profile.stats.technologies}+
              </div>
              <p className="text-muted-foreground text-sm">{t("about.stats.technologies")}</p>
            </CardContent>
          </Card>

          <Card className="text-center transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
              <Lightbulb className="mx-auto mb-3 h-8 w-8 text-blue-600" />
              <div className="mb-2 text-3xl font-bold text-blue-600">{profile.stats.projects}+</div>
              <p className="text-muted-foreground text-sm">{t("about.stats.projects")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
