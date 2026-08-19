import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { PrivacyNote } from "@/components/ai/privacy-note"
import { LanguageProvider } from "@/components/language-provider"
import type { AIProvider } from "@/lib/ai/types"

const localProvider = {
  runsLocally: true,
  isGenerative: true,
} as AIProvider

function renderWithLocale(ui: React.ReactNode, language: "es" | "en" = "es") {
  return render(<LanguageProvider language={language}>{ui}</LanguageProvider>)
}

describe("PrivacyNote", () => {
  it("shows compatible mode when there is no generative provider", () => {
    renderWithLocale(<PrivacyNote provider={null} />)
    expect(screen.getByText(/Modo compatible|Compatible mode/)).toBeInTheDocument()
  })

  it("shows the private AI note for local generative providers", () => {
    renderWithLocale(<PrivacyNote provider={localProvider} variant="hero" />)
    expect(screen.getByText(/IA privada|Private AI/)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Privacidad|Privacy/i })).toBeInTheDocument()
  })
})
