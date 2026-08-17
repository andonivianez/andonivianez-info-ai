import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AboutProfile } from "@/components/about/about-profile"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Education } from "@/components/education"
import { Languages } from "@/components/languages"
import { Projects } from "@/components/projects"

export const metadata: Metadata = {
  title: "Perfil profesional",
  description:
    "Experiencia, formación, habilidades y proyectos de Andoni Vianez Ulloa — Senior Full Stack Engineer con 15+ años en web, móvil e IA.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Andoni Vianez — Perfil profesional",
    description: "Trayectoria completa: Orbis, Onkologikoa, BQ, freelance y más.",
    url: "https://www.andonivianez.info/about",
  },
}

export default function AboutPage() {
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
      </div>
      <SiteFooter variant="light" />
    </main>
  )
}
