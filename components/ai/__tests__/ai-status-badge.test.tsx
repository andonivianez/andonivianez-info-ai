import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { AIStatusBadge } from "@/components/ai/ai-status-badge"

describe("AIStatusBadge", () => {
  it("renders the label", () => {
    render(<AIStatusBadge label="WebGPU" />)
    expect(screen.getByText("WebGPU")).toBeInTheDocument()
  })

  it("shows progress detail while not ready", () => {
    render(
      <AIStatusBadge
        label="Chrome"
        variant="hero"
        progress={{ state: "downloading", detail: "Descargando", progress: 40 }}
      />,
    )
    expect(screen.getByText(/Descargando/)).toBeInTheDocument()
    expect(screen.getByText(/40%/)).toBeInTheDocument()
  })
})
