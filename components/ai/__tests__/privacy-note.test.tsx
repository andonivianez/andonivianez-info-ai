import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { PrivacyNote } from "@/components/ai/privacy-note"
import type { AIProvider } from "@/lib/ai/types"

const localProvider = {
  runsLocally: true,
  isGenerative: true,
} as AIProvider

describe("PrivacyNote", () => {
  it("shows compatible mode when there is no generative provider", () => {
    render(<PrivacyNote provider={null} />)
    expect(screen.getByText(/Modo compatible/)).toBeInTheDocument()
  })

  it("shows the private AI note for local generative providers", () => {
    render(<PrivacyNote provider={localProvider} variant="hero" />)
    expect(screen.getByText(/IA privada/)).toBeInTheDocument()
  })
})
