import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AboutProfile } from "@/components/about/about-profile"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Education } from "@/components/education"
import { Languages } from "@/components/languages"
import { Projects } from "@/components/projects"
import { GitHubStats } from "@/components/github-stats"
import { buildPageMetadata } from "@/lib/i18n/metadata"
import { resolveLocale } from "@/lib/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return buildPageMetadata(resolveLocale(lang), "about", "/about")
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = resolveLocale(lang)

  return (
    <main className="bg-porcelain min-h-screen">
      <SiteHeader variant="light" />
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <AboutProfile />
        <Experience variant="document" />
        <Skills variant="document" />
        <Education variant="document" />
        <Languages variant="document" />
        <Projects variant="document" />
        <div className="mt-8">
          <GitHubStats locale={locale} />
        </div>
      </div>
      <SiteFooter variant="light" />
    </main>
  )
}
