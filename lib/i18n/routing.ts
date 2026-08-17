import { notFound } from "next/navigation"
import { isValidLocale, locales, type AppLocale } from "@/lib/i18n/config"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export function resolveLocale(lang: string): AppLocale {
  if (!isValidLocale(lang)) notFound()
  return lang
}
