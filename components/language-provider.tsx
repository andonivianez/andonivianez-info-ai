"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  es: {
    // Header
    "nav.home": "Inicio",
    "nav.about": "Sobre mí",
    "nav.experience": "Experiencia",
    "nav.skills": "Habilidades",
    "nav.education": "Formación",
    "nav.languages": "Idiomas",
    "nav.projects": "Proyectos",

    // Hero
    "hero.title": "Senior Full Stack Engineer",
    "hero.subtitle": "Especialista en React Native & IA",
    "hero.description":
      "Con más de 14 años de experiencia desarrollando aplicaciones web y móviles innovadoras. Actualmente trabajando en Orbis Tecnología Eléctrica y disponible para proyectos freelance.",
    "hero.downloadCV": "Descargar CV",
    "hero.hireMalt": "Contratar en Malt",
    "hero.location": "Astigarraga, Guipúzcoa",

    // About
    "about.title": "Resumen Profesional",
    "about.description":
      "Senior Full Stack Engineer con una sólida trayectoria en el desarrollo de aplicaciones web y móviles. Mi experiencia abarca desde el desarrollo frontend con React y Angular hasta soluciones backend robustas con Node.js y PHP. Especializado en React Native para desarrollo móvil multiplataforma y con creciente experiencia en tecnologías de IA.",
    "about.stats.experience": "Años de Experiencia",
    "about.stats.companies": "Empresas",
    "about.stats.technologies": "Tecnologías",
    "about.stats.projects": "Proyectos Completados",

    // Experience
    "experience.title": "Experiencia Profesional",
    "experience.current": "Actual",
    "experience.freelance": "Freelance",

    // Skills
    "skills.title": "Habilidades Técnicas",
    "skills.frontend": "Frontend & UI",
    "skills.backend": "Backend & APIs",
    "skills.mobile": "Mobile & Desktop",
    "skills.devops": "DevOps & Cloud",

    // Education
    "education.title": "Formación Académica",

    // Languages
    "languages.title": "Idiomas",

    // Projects
    "projects.title": "Proyectos Destacados",
    "projects.github": "Ver en GitHub",
    "projects.githubRepos": "Repositorios en GitHub",
    "projects.description": "Explora mi trabajo y contribuciones en GitHub, donde encontrarás proyectos de desarrollo web, aplicaciones móviles, software embebido y más.",
    "projects.contributions2024": "Contribuciones 2024",
    "projects.statistics": "Estadísticas",
    "projects.topLanguages": "Lenguajes más utilizados",
    "projects.viewProfile": "Ver GitHub Profile",
    "projects.viewRepos": "Ver Repositorios",

    // Education
    "education.additional": "Formación Adicional",
    "education.university": "Grado Universitario",
    "education.vocational": "Formación Profesional",
    "education.music": "Música",
    "education.basic": "Educación Básica",

    // Languages
    "languages.native": "Nativo",
    "languages.basic": "Básico",
    "languages.intermediate": "Medio",
    "languages.motherTongue": "Lengua materna",
    "languages.basicLevel": "Nivel básico",
    "languages.intermediateLevel": "Nivel medio",

    // Experience
    "experience.achievements": "Logros Principales",
  },
  en: {
    // Header
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.education": "Education",
    "nav.languages": "Languages",
    "nav.projects": "Projects",

    // Hero
    "hero.title": "Senior Full Stack Engineer",
    "hero.subtitle": "React Native & AI Specialist",
    "hero.description":
      "With over 14 years of experience developing innovative web and mobile applications. Currently working at Orbis Tecnología Eléctrica and available for freelance projects.",
    "hero.downloadCV": "Download CV",
    "hero.hireMalt": "Hire on Malt",
    "hero.location": "Astigarraga, Guipúzcoa",

    // About
    "about.title": "Professional Summary",
    "about.description":
      "Senior Full Stack Engineer with a solid track record in web and mobile application development. My experience spans from frontend development with React and Angular to robust backend solutions with Node.js and PHP. Specialized in React Native for cross-platform mobile development and with growing experience in AI technologies.",
    "about.stats.experience": "Years of Experience",
    "about.stats.companies": "Companies",
    "about.stats.technologies": "Technologies",
    "about.stats.projects": "Completed Projects",

    // Experience
    "experience.title": "Professional Experience",
    "experience.current": "Current",
    "experience.freelance": "Freelance",
    "experience.achievements": "Key Achievements",

    // Skills
    "skills.title": "Technical Skills",
    "skills.frontend": "Frontend & UI",
    "skills.backend": "Backend & APIs",
    "skills.mobile": "Mobile & Desktop",
    "skills.devops": "DevOps & Cloud",

    // Education
    "education.title": "Academic Background",
    "education.additional": "Additional Training",
    "education.university": "University Degree",
    "education.vocational": "Vocational Training",
    "education.music": "Music",
    "education.basic": "Basic Education",

    // Languages
    "languages.title": "Languages",
    "languages.native": "Native",
    "languages.basic": "Basic",
    "languages.intermediate": "Intermediate",
    "languages.motherTongue": "Mother tongue",
    "languages.basicLevel": "Basic level",
    "languages.intermediateLevel": "Intermediate level",

    // Projects
    "projects.title": "Featured Projects",
    "projects.github": "View on GitHub",
    "projects.githubRepos": "GitHub Repositories",
    "projects.description": "Explore my work and contributions on GitHub, where you'll find web development projects, mobile applications, embedded software and more.",
    "projects.contributions2024": "2024 Contributions",
    "projects.statistics": "Statistics",
    "projects.topLanguages": "Most Used Languages",
    "projects.viewProfile": "View GitHub Profile",
    "projects.viewRepos": "View Repositories",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border">
          <Button
            variant={language === "es" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleSetLanguage("es")}
            className="text-xs"
          >
            ES
          </Button>
          <Button
            variant={language === "en" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleSetLanguage("en")}
            className="text-xs"
          >
            EN
          </Button>
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
