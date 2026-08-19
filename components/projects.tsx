"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GitBranch } from "lucide-react"
import { motion } from "motion/react"
import { useLanguage } from "@/components/language-provider"
import { getProjects } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

interface ProjectsProps {
  variant?: "default" | "document"
}

export function Projects({ variant = "default" }: ProjectsProps) {
  const { language, t } = useLanguage()
  const projects = getProjects(language)
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
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  <Badge variant="outline" className="w-fit text-xs">
                    {project.category}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                  {project.problem && (
                    <div>
                      <h4 className="mb-1 text-xs font-medium tracking-wide uppercase">
                        {t("projects.problem")}
                      </h4>
                      <p className="text-muted-foreground text-sm">{project.problem}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div>
                      <h4 className="mb-1 text-xs font-medium tracking-wide uppercase">
                        {t("projects.solution")}
                      </h4>
                      <p className="text-muted-foreground text-sm">{project.solution}</p>
                    </div>
                  )}
                  {project.result && (
                    <div>
                      <h4 className="mb-1 text-xs font-medium tracking-wide uppercase">
                        {t("projects.result")}
                      </h4>
                      <p className="text-muted-foreground text-sm">{project.result}</p>
                    </div>
                  )}
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
      </div>
    </section>
  )
}
