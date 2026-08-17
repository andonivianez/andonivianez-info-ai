"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GitBranch, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { getPortfolioData, getProjects, getProfile } from "@/lib/portfolio"

export function Projects() {
  const { language, t } = useLanguage()
  const projects = getProjects(language)
  const profile = getProfile(language)
  const github = getPortfolioData().profile.links.github.replace("https://github.com/", "")

  return (
    <section id="projects" className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-balance sm:text-4xl">
          {t("projects.title")}
        </h2>

        <div className="mb-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge variant="outline">{project.category}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} className="bg-emerald-100 text-emerald-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <ul className="space-y-1 text-sm">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>• {highlight}</li>
                  ))}
                </ul>
                {project.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <GitBranch className="mr-2 h-4 w-4" />
                      {t("projects.github")}
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-xl text-balance">
              <GitBranch className="h-6 w-6" />
              {t("projects.githubRepos")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6 text-pretty">{t("projects.description")}</p>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-center text-lg font-semibold">
                  {t("projects.contributions2024")}
                </h3>
                <div className="flex justify-center">
                  <Image
                    src={`https://github-readme-activity-graph.vercel.app/graph?username=${github}&theme=github-compact&hide_border=true&area=true`}
                    alt="GitHub Activity Graph"
                    width={400}
                    height={200}
                    className="rounded-lg border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-center text-lg font-semibold">{t("projects.statistics")}</h3>
                <div className="flex justify-center">
                  <Image
                    src={`https://github-readme-stats.vercel.app/api?username=${github}&show_icons=true&theme=github_dark&hide_border=true&count_private=true`}
                    alt="GitHub Stats"
                    width={400}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => window.open(profile.links.github, "_blank")}
              >
                <GitBranch className="mr-2 h-5 w-5" />
                {t("projects.viewProfile")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                onClick={() => window.open(`${profile.links.github}?tab=repositories`, "_blank")}
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                {t("projects.viewRepos")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
