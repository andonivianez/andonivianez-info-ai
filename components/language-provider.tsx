"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createContext, useContext } from "react"
import { Button } from "@/components/ui/button"
import { switchLocalePath, type AppLocale } from "@/lib/i18n/config"

type Language = AppLocale

interface LanguageContextType {
  language: Language
  t: (key: string) => string
}

const translations = {
  es: {
    "nav.home": "Inicio",
    "nav.chat": "Chat",
    "nav.profile": "Perfil",
    "nav.about": "Sobre mí",
    "nav.experience": "Experiencia",
    "nav.skills": "Habilidades",
    "nav.education": "Formación",
    "nav.languages": "Idiomas",
    "nav.projects": "Proyectos",
    "nav.assistant": "Asistente",
    "nav.ailab": "AI Lab",
    "nav.openMenu": "Abrir menú",
    "nav.closeMenu": "Cerrar menú",
    "hero.title": "Senior Full Stack Engineer",
    "hero.subtitle": "Especialista en React Native & IA",
    "hero.description":
      "Con más de 14 años de experiencia desarrollando aplicaciones web y móviles innovadoras. Actualmente trabajando en Orbis Tecnología Eléctrica y disponible para proyectos freelance.",
    "hero.downloadCV": "Descargar CV",
    "hero.hireMalt": "Contratar en Malt",
    "hero.location": "Astigarraga, Guipúzcoa",
    "hero.goToAbout": "Ir a sobre mí",
    "about.title": "Resumen Profesional",
    "about.description":
      "Senior Full Stack Engineer con una sólida trayectoria en el desarrollo de aplicaciones web y móviles.",
    "about.stats.experience": "Años de Experiencia",
    "about.stats.companies": "Empresas",
    "about.stats.technologies": "Tecnologías",
    "about.stats.projects": "Proyectos Completados",
    "about.followers": "seguidores",
    "about.connections": "contactos",
    "experience.title": "Experiencia Profesional",
    "experience.current": "Actual",
    "experience.freelance": "Freelance",
    "experience.achievements": "Logros Principales",
    "skills.title": "Habilidades Técnicas",
    "skills.frontend": "Frontend & UI",
    "skills.backend": "Backend & APIs",
    "skills.mobile": "Mobile & Desktop",
    "skills.devops": "DevOps & Cloud",
    "skills.certifications": "Certificaciones",
    "skills.softSkills": "Habilidades blandas",
    "education.title": "Formación Académica",
    "education.additional": "Formación Adicional",
    "education.university": "Grado Universitario",
    "education.vocational": "Formación Profesional",
    "education.music": "Música",
    "education.basic": "Educación Básica",
    "languages.title": "Idiomas",
    "languages.native": "Nativo",
    "languages.basic": "Básico",
    "languages.intermediate": "Medio",
    "languages.motherTongue": "Lengua materna",
    "languages.basicLevel": "Nivel básico",
    "languages.intermediateLevel": "Nivel medio",
    "projects.title": "Proyectos Destacados",
    "projects.github": "Ver en GitHub",
    "projects.githubRepos": "Repositorios en GitHub",
    "projects.description":
      "Explora mi trabajo y contribuciones en GitHub, donde encontrarás proyectos de desarrollo web, aplicaciones móviles, software embebido y más.",
    "projects.contributions2024": "Contribuciones 2024",
    "projects.statistics": "Estadísticas",
    "projects.topLanguages": "Lenguajes más utilizados",
    "projects.viewProfile": "Ver GitHub Profile",
    "projects.viewRepos": "Ver Repositorios",
    "assistant.title": "Pregúntame sobre mi experiencia",
    "assistant.subtitle": "Asistente inteligente del portfolio con IA local",
    "assistant.placeholder": "Escribe tu pregunta...",
    "assistant.empty": "Haz una pregunta sobre experiencia, proyectos o tecnologías.",
    "assistant.clear": "Limpiar conversación",
    "assistant.initializing": "Inicializando…",
    "assistant.send": "Enviar",
    "assistant.cancel": "Cancelar",
    "assistant.privacy.local": "local",
    "assistant.privacy.detail":
      "IA privada. Todo se procesa en tu navegador. Sin OpenAI, Anthropic ni Google Cloud.",
    "assistant.privacy.fallback": "Modo compatible: respuestas locales sin APIs de pago.",
    "assistant.loading": "Cargando asistente IA…",
    "assistant.provider.chrome": "IA local · Chrome",
    "assistant.provider.webgpu": "IA local · WebGPU",
    "assistant.provider.fallback": "Modo compatible · sin modelo generativo",
    "assistant.provider.privacyLocal": "IA privada · procesamiento 100% local en tu navegador",
    "assistant.provider.preparing": "Preparando IA local…",
    "ailab.runtime": "AI Runtime",
    "ailab.browser": "Navegador",
    "ailab.available": "Disponible",
    "ailab.unavailable": "No disponible",
    "ailab.activeProvider": "Proveedor activo",
    "ailab.processing": "Procesamiento",
    "ailab.switchProvider": "Probar proveedores",
    "ailab.metrics": "Métricas",
    "ailab.totalQueries": "Consultas",
    "ailab.avgTotal": "Tiempo medio total",
    "ailab.avgRetrieval": "Tiempo medio retrieval",
    "ailab.avgGeneration": "Tiempo medio generación",
    "ailab.avgContext": "Contexto medio",
    "ailab.errors": "Errores",
    "ailab.providerUsage": "Uso por proveedor",
    "ailab.localOnly": "100% local",
    "ailab.clearMetrics": "Limpiar métricas",
    "home.proof.years": "Experiencia",
    "home.proof.stack": "Stack principal",
    "home.proof.location": "Ubicación",
    "home.proof.stackValue": "React Native · Next.js · IA local",
    "home.viewProfile": "Ver perfil completo",
    "home.backToChat": "Volver al chat",
  },
  en: {
    "nav.home": "Home",
    "nav.chat": "Chat",
    "nav.profile": "Profile",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.education": "Education",
    "nav.languages": "Languages",
    "nav.projects": "Projects",
    "nav.assistant": "Assistant",
    "nav.ailab": "AI Lab",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "hero.title": "Senior Full Stack Engineer",
    "hero.subtitle": "React Native & AI Specialist",
    "hero.description":
      "With over 14 years of experience developing innovative web and mobile applications. Currently working at Orbis Tecnología Eléctrica and available for freelance projects.",
    "hero.downloadCV": "Download CV",
    "hero.hireMalt": "Hire on Malt",
    "hero.location": "Astigarraga, Guipúzcoa",
    "hero.goToAbout": "Go to about section",
    "about.title": "Professional Summary",
    "about.description":
      "Senior Full Stack Engineer with a solid track record in web and mobile application development.",
    "about.stats.experience": "Years of Experience",
    "about.stats.companies": "Companies",
    "about.stats.technologies": "Technologies",
    "about.stats.projects": "Completed Projects",
    "about.followers": "followers",
    "about.connections": "connections",
    "experience.title": "Professional Experience",
    "experience.current": "Current",
    "experience.freelance": "Freelance",
    "experience.achievements": "Key Achievements",
    "skills.title": "Technical Skills",
    "skills.frontend": "Frontend & UI",
    "skills.backend": "Backend & APIs",
    "skills.mobile": "Mobile & Desktop",
    "skills.devops": "DevOps & Cloud",
    "skills.certifications": "Certifications",
    "skills.softSkills": "Soft skills",
    "education.title": "Academic Background",
    "education.additional": "Additional Training",
    "education.university": "University Degree",
    "education.vocational": "Vocational Training",
    "education.music": "Music",
    "education.basic": "Basic Education",
    "languages.title": "Languages",
    "languages.native": "Native",
    "languages.basic": "Basic",
    "languages.intermediate": "Intermediate",
    "languages.motherTongue": "Mother tongue",
    "languages.basicLevel": "Basic level",
    "languages.intermediateLevel": "Intermediate level",
    "projects.title": "Featured Projects",
    "projects.github": "View on GitHub",
    "projects.githubRepos": "GitHub Repositories",
    "projects.description":
      "Explore my work and contributions on GitHub, where you'll find web development projects, mobile applications, embedded software and more.",
    "projects.contributions2024": "2024 Contributions",
    "projects.statistics": "Statistics",
    "projects.topLanguages": "Most Used Languages",
    "projects.viewProfile": "View GitHub Profile",
    "projects.viewRepos": "View Repositories",
    "assistant.title": "Ask me about my experience",
    "assistant.subtitle": "Intelligent portfolio assistant with local AI",
    "assistant.placeholder": "Type your question...",
    "assistant.empty": "Ask a question about experience, projects or technologies.",
    "assistant.clear": "Clear conversation",
    "assistant.initializing": "Initializing…",
    "assistant.send": "Send",
    "assistant.cancel": "Cancel",
    "assistant.privacy.local": "local",
    "assistant.privacy.detail":
      "Private AI. Everything runs in your browser. No OpenAI, Anthropic or Google Cloud.",
    "assistant.privacy.fallback": "Compatible mode: local answers without paid APIs.",
    "assistant.loading": "Loading AI assistant…",
    "assistant.provider.chrome": "Local AI · Chrome",
    "assistant.provider.webgpu": "Local AI · WebGPU",
    "assistant.provider.fallback": "Compatible mode · no generative model",
    "assistant.provider.privacyLocal": "Private AI · 100% local processing in your browser",
    "assistant.provider.preparing": "Preparing local AI…",
    "ailab.runtime": "AI Runtime",
    "ailab.browser": "Browser",
    "ailab.available": "Available",
    "ailab.unavailable": "Unavailable",
    "ailab.activeProvider": "Active provider",
    "ailab.processing": "Processing",
    "ailab.switchProvider": "Test providers",
    "ailab.metrics": "Metrics",
    "ailab.totalQueries": "Queries",
    "ailab.avgTotal": "Average total time",
    "ailab.avgRetrieval": "Average retrieval time",
    "ailab.avgGeneration": "Average generation time",
    "ailab.avgContext": "Average context size",
    "ailab.errors": "Errors",
    "ailab.providerUsage": "Provider usage",
    "ailab.localOnly": "100% local",
    "ailab.clearMetrics": "Clear metrics",
    "home.proof.years": "Experience",
    "home.proof.stack": "Core stack",
    "home.proof.location": "Location",
    "home.proof.stackValue": "React Native · Next.js · Local AI",
    "home.viewProfile": "View full profile",
    "home.backToChat": "Back to chat",
  },
} as const

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({
  children,
  language,
}: {
  children: React.ReactNode
  language: Language
}) {
  const pathname = usePathname()

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, t }}>
      {children}
      <div className="fixed right-4 bottom-4 z-50">
        <div className="flex gap-1 rounded-lg border bg-white/90 p-1 shadow-lg backdrop-blur-sm">
          {(["es", "en"] as const).map((locale) => (
            <Button
              key={locale}
              variant={language === locale ? "default" : "ghost"}
              size="sm"
              asChild
              className="text-xs"
            >
              <Link href={switchLocalePath(pathname, locale)} hrefLang={locale}>
                {locale.toUpperCase()}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
