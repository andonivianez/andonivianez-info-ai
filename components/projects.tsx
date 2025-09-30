"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

export function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-balance">{t("projects.title")}</h2>

        <div className="text-center">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl text-balance flex items-center justify-center gap-2">
                <Github className="h-6 w-6" />
                {t("projects.githubRepos")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 text-pretty">
                {t("projects.description")}
              </p>
              
              {/* GitHub Stats y Badges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Mosaico de contribuciones */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-center">{t("projects.contributions2024")}</h3>
                  <div className="flex justify-center">
                    <Image
                      src="https://github-readme-activity-graph.vercel.app/graph?username=andonivianez&theme=github-compact&hide_border=true&area=true"
                      alt="GitHub Activity Graph"
                      width={400}
                      height={200}
                      className="rounded-lg border"
                    />
                  </div>
                </div>

                {/* Estadísticas de GitHub */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-center">{t("projects.statistics")}</h3>
                  <div className="flex justify-center">
                    <Image
                      src="https://github-readme-stats.vercel.app/api?username=andonivianez&show_icons=true&theme=github_dark&hide_border=true&count_private=true"
                      alt="GitHub Stats"
                      width={400}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Lenguajes más usados */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">{t("projects.topLanguages")}</h3>
                <div className="flex justify-center">
                  <Image
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=andonivianez&layout=compact&theme=github_dark&hide_border=true&langs_count=8"
                    alt="Top Languages"
                    width={400}
                    height={150}
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* Badges de tecnologías */}
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                <Badge className="bg-emerald-100 text-emerald-700">React</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">React Native</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">Node.js</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">TypeScript</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">PHP</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">C++</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">Python</Badge>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => window.open("https://github.com/andonivianez", "_blank")}
                >
                  <Github className="mr-2 h-5 w-5" />
                  {t("projects.viewProfile")}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  onClick={() => window.open("https://github.com/andonivianez?tab=repositories", "_blank")}
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  {t("projects.viewRepos")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
