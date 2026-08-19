import type { Metadata } from "next"
import type { AppLocale } from "./config"

const baseUrl = "https://www.andonivianez.info"

export const pageMetadata: Record<
  AppLocale,
  {
    home: { title: string; description: string }
    about: { title: string; description: string }
    aiLab: { title: string; description: string }
    legalNotice: { title: string; description: string }
    legalPrivacy: { title: string; description: string }
    legalCookies: { title: string; description: string }
  }
> = {
  es: {
    home: {
      title: "Andoni Vianez — Pregúntame con IA local",
      description:
        "Portfolio inteligente con asistente IA 100% local. Senior Full Stack Engineer · React Native · 15+ años de experiencia.",
    },
    about: {
      title: "Perfil profesional",
      description:
        "Experiencia, formación, habilidades y proyectos de Andoni Vianez Ulloa — Senior Full Stack Engineer con 15+ años en web, móvil e IA.",
    },
    aiLab: {
      title: "AI Lab",
      description:
        "Demostración técnica y métricas del portfolio inteligente con IA local — TFM Andoni Vianez.",
    },
    legalNotice: {
      title: "Aviso legal",
      description: "Aviso legal del portfolio profesional de Andoni Vianez Ulloa.",
    },
    legalPrivacy: {
      title: "Política de privacidad",
      description:
        "Política de privacidad y protección de datos (RGPD) del portfolio de Andoni Vianez.",
    },
    legalCookies: {
      title: "Política de cookies",
      description: "Información sobre cookies, almacenamiento local y analítica del portfolio.",
    },
  },
  en: {
    home: {
      title: "Andoni Vianez — Ask me with local AI",
      description:
        "Intelligent portfolio with 100% local AI assistant. Senior Full Stack Engineer · React Native · 15+ years of experience.",
    },
    about: {
      title: "Professional profile",
      description:
        "Experience, education, skills and projects by Andoni Vianez Ulloa — Senior Full Stack Engineer with 15+ years in web, mobile and AI.",
    },
    aiLab: {
      title: "AI Lab",
      description:
        "Technical demo and metrics for the intelligent portfolio with local AI — Master's thesis by Andoni Vianez.",
    },
    legalNotice: {
      title: "Legal notice",
      description: "Legal notice for Andoni Vianez Ulloa's professional portfolio.",
    },
    legalPrivacy: {
      title: "Privacy policy",
      description: "Privacy policy and data protection (GDPR) for Andoni Vianez's portfolio.",
    },
    legalCookies: {
      title: "Cookie policy",
      description: "Information about cookies, local storage and analytics on the portfolio.",
    },
  },
}

export function buildPageMetadata(
  locale: AppLocale,
  page: keyof (typeof pageMetadata)["es"],
  path: string,
): Metadata {
  const meta = pageMetadata[locale][page]
  const localizedPath = path === "/" ? `/${locale}` : `/${locale}${path}`

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localizedPath,
      languages: {
        es: path === "/" ? `${baseUrl}/es` : `${baseUrl}/es${path}`,
        en: path === "/" ? `${baseUrl}/en` : `${baseUrl}/en${path}`,
        "x-default": `${baseUrl}/es${path === "/" ? "" : path}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}${localizedPath}`,
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_ES",
    },
  }
}

export function buildRootMetadata(locale: AppLocale): Metadata {
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: pageMetadata[locale].home.title,
      template: "%s | Andoni Vianez",
    },
    description: pageMetadata[locale].home.description,
    authors: [{ name: "Andoni Vianez Ulloa", url: baseUrl }],
    creator: "Andoni Vianez Ulloa",
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_ES",
      siteName: locale === "es" ? "Andoni Vianez — Portfolio IA" : "Andoni Vianez — AI Portfolio",
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
