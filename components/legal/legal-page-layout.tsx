import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { localizedPath, type AppLocale } from "@/lib/i18n/config"

interface LegalPageLayoutProps {
  locale: AppLocale
  title: string
  children: React.ReactNode
}

export function LegalPageLayout({ locale, title, children }: LegalPageLayoutProps) {
  const isEs = locale === "es"

  return (
    <main className="bg-porcelain min-h-screen">
      <SiteHeader variant="light" />
      <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <header className="border-border mb-10 border-b pb-6">
          <p className="text-muted-foreground mb-2 font-mono text-xs tracking-wider uppercase">
            {isEs ? "Información legal" : "Legal information"}
          </p>
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          <nav className="text-muted-foreground mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={localizedPath("/legal/notice", locale)} className="hover:underline">
              {isEs ? "Aviso legal" : "Legal notice"}
            </Link>
            <Link href={localizedPath("/legal/privacy", locale)} className="hover:underline">
              {isEs ? "Privacidad" : "Privacy"}
            </Link>
            <Link href={localizedPath("/legal/cookies", locale)} className="hover:underline">
              Cookies
            </Link>
          </nav>
        </header>
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
          {children}
        </div>
      </article>
      <SiteFooter variant="light" />
    </main>
  )
}
