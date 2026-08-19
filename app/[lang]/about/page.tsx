import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AboutProfile } from "@/components/about/about-profile"
import { Services } from "@/components/about/services"
import { Faq } from "@/components/about/faq"
import { Interviews } from "@/components/about/interviews"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Education } from "@/components/education"
import { Languages } from "@/components/languages"
import { Projects } from "@/components/projects"
import { GitHubStats } from "@/components/github-stats"
import { buildPageMetadata } from "@/lib/i18n/metadata"
import { resolveLocale } from "@/lib/i18n/routing"
import { getMedia } from "@/lib/portfolio"

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
  const media = getMedia(locale)
  const videoSchema = media.map((item) => ({
    "@type": "VideoObject",
    name: item.title,
    description: item.summary,
    uploadDate: `${item.date}-01-01`,
    thumbnailUrl: item.thumbnail ? `https://www.andonivianez.info${item.thumbnail}` : undefined,
    contentUrl: item.url,
    embedUrl: item.embedUrl,
    publisher: {
      "@type": "Organization",
      name: item.platform,
    },
  }))

  return (
    <main className="bg-porcelain min-h-screen">
      {videoSchema.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": videoSchema,
            }),
          }}
        />
      )}
      <SiteHeader variant="light" />
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <AboutProfile />
        <Services variant="document" />
        <Experience variant="document" />
        <Skills variant="document" />
        <Education variant="document" />
        <Languages variant="document" />
        <Projects variant="document" />
        <Faq variant="document" />
        <Interviews variant="document" />
        <div className="mt-8">
          <GitHubStats locale={locale} />
        </div>
      </div>
      <SiteFooter variant="light" />
    </main>
  )
}
