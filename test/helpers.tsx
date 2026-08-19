import type { ReactNode } from "react"
import { LanguageProvider } from "@/components/language-provider"
import type { AppLocale } from "@/lib/i18n/config"

export function renderWithLanguage(ui: ReactNode, language: AppLocale = "es") {
  return <LanguageProvider language={language}>{ui}</LanguageProvider>
}
