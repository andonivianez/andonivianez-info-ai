import { Bricolage_Grotesque } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LanguageProvider } from "@/components/language-provider"
import { JsonLd } from "@/components/seo/json-ld"
import "./globals.css"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.andonivianez.info"),
  title: {
    default: "Andoni Vianez Ulloa — Senior Full Stack Engineer & Local AI",
    template: "%s | Andoni Vianez",
  },
  description:
    "Portfolio inteligente con IA 100% local en el navegador. Senior Full Stack Engineer especializado en React Native, arquitectura full stack e IA generativa privada.",
  authors: [{ name: "Andoni Vianez Ulloa", url: "https://www.andonivianez.info" }],
  creator: "Andoni Vianez Ulloa",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    url: "https://www.andonivianez.info",
    siteName: "Andoni Vianez — Portfolio IA",
    title: "Andoni Vianez Ulloa — Senior Full Stack Engineer & Local AI",
    description:
      "Portfolio inteligente con IA local. Pregúntame sobre mi experiencia, stack y proyectos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andoni Vianez Ulloa — Senior Full Stack Engineer",
    description: "Portfolio con asistente IA 100% local en el navegador.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable} ${bricolage.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd />
        <LanguageProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
