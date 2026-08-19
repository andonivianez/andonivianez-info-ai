import { Bricolage_Grotesque } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import { LanguageProvider } from "@/components/language-provider"
import { JsonLd } from "@/components/seo/json-ld"
import { ConsentNotice } from "@/components/legal/consent-notice"
import { AnalyticsGate } from "@/components/analytics/analytics-gate"
import { buildRootMetadata } from "@/lib/i18n/metadata"
import { generateStaticParams, resolveLocale } from "@/lib/i18n/routing"
import type { AppLocale } from "@/lib/i18n/config"
import "../globals.css"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
})

export { generateStaticParams }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return buildRootMetadata(resolveLocale(lang))
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  const locale = resolveLocale(lang) as AppLocale

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable} ${bricolage.variable}`}
    >
      <body className="font-sans antialiased">
        <JsonLd locale={locale} />
        <LanguageProvider language={locale}>
          <Suspense fallback={null}>{children}</Suspense>
          <ConsentNotice />
        </LanguageProvider>
        <AnalyticsGate />
      </body>
    </html>
  )
}
