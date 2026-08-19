import { GitBranch, ExternalLink, Star, GitFork, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getGitHubStats } from "@/lib/github/stats"
import { getPortfolioData } from "@/lib/portfolio"
import type { Locale } from "@/lib/portfolio/types"

interface GitHubStatsProps {
  locale?: Locale
}

const labels = {
  es: {
    title: "Repositorios en GitHub",
    description: "Actividad open source y proyectos públicos.",
    repos: "Repos",
    stars: "Estrellas",
    followers: "Seguidores",
    languages: "Lenguajes principales",
    viewProfile: "Ver perfil",
    viewRepos: "Ver repositorios",
    unavailable: "Estadísticas no disponibles en este momento.",
  },
  en: {
    title: "GitHub Repositories",
    description: "Open source activity and public projects.",
    repos: "Repos",
    stars: "Stars",
    followers: "Followers",
    languages: "Top languages",
    viewProfile: "View profile",
    viewRepos: "View repositories",
    unavailable: "Stats unavailable at the moment.",
  },
} as const

export async function GitHubStats({ locale = "es" }: GitHubStatsProps) {
  const stats = await getGitHubStats()
  const profile = getPortfolioData().profile
  const t = labels[locale]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <GitBranch className="h-5 w-5" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6 text-sm">{t.description}</p>

        {stats ? (
          <div className="mb-6 grid grid-cols-3 gap-3">
            <div className="border-line-light bg-porcelain rounded-lg border p-4 text-center">
              <GitFork className="text-amber mx-auto mb-2 h-5 w-5" />
              <p className="font-display text-2xl font-bold">{stats.publicRepos}</p>
              <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
                {t.repos}
              </p>
            </div>
            <div className="border-line-light bg-porcelain rounded-lg border p-4 text-center">
              <Star className="text-amber mx-auto mb-2 h-5 w-5" />
              <p className="font-display text-2xl font-bold">{stats.totalStars}</p>
              <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
                {t.stars}
              </p>
            </div>
            <div className="border-line-light bg-porcelain rounded-lg border p-4 text-center">
              <Users className="text-amber mx-auto mb-2 h-5 w-5" />
              <p className="font-display text-2xl font-bold">{stats.followers}</p>
              <p className="text-muted-foreground font-mono text-xs tracking-wide uppercase">
                {t.followers}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground mb-6 text-sm">{t.unavailable}</p>
        )}

        {stats && stats.topLanguages.length > 0 && (
          <div className="mb-6">
            <p className="text-muted-foreground mb-2 font-mono text-xs tracking-wide uppercase">
              {t.languages}
            </p>
            <div className="flex flex-wrap gap-2">
              {stats.topLanguages.map((lang) => (
                <Badge key={lang.name} variant="secondary" className="font-mono text-xs">
                  {lang.name}
                  <span className="text-muted-foreground ml-1">×{lang.count}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button size="sm" asChild>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
              {t.viewProfile}
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href={`${profile.links.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              {t.viewRepos}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
