"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GitBranch, ExternalLink } from "lucide-react"
import Image from "next/image"
import { motion } from "motion/react"
import { useLanguage } from "@/components/language-provider"
import { getPortfolioData, getProjects, getProfile } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

interface ProjectsProps {
  variant?: "default" | "document"
}

export function Projects({ variant = "default" }: ProjectsProps) {
  const { language, t } = useLanguage()
  const projects = getProjects(language)
  const profile = getProfile(language)
  const github = getPortfolioData().profile.links.github.replace("https://github.com/", "")
  const isDoc = variant === "document"

  return (
    <section
      id="projects"
      className={cn(!isDoc && "bg-muted/30 px-4 py-20 sm:px-6 lg:px-8", isDoc && "mb-16")}
    >
      <div className={cn(!isDoc && "mx-auto max-w-6xl")}>
        <h2
          className={cn(
            "font-display mb-8 text-2xl font-bold sm:text-3xl",
            !isDoc && "mb-12 text-center text-balance sm:text-4xl",
          )}
        >
          {t("projects.title")}
        </h2>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  <Badge variant="outline" className="w-fit text-xs">
                    {project.category}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
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
            </motion.div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <GitBranch className="h-5 w-5" />
              {t("projects.githubRepos")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6 text-sm">{t("projects.description")}</p>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Image
                src={`https://github-readme-stats.vercel.app/api?username=${github}&show_icons=true&theme=default&hide_border=true`}
                alt="GitHub Stats"
                width={400}
                height={160}
                className="mx-auto rounded-lg border"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="sm" asChild>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                  {t("projects.viewProfile")}
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`${profile.links.github}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t("projects.viewRepos")}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
