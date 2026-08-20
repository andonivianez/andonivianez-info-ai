import { afterEach, describe, expect, it } from "vitest"
import { getLegalInfo } from "@/lib/legal/config"

const ENV_KEYS = [
  "NEXT_PUBLIC_LEGAL_NAME",
  "NEXT_PUBLIC_LEGAL_NIF",
  "NEXT_PUBLIC_LEGAL_ADDRESS",
  "NEXT_PUBLIC_LEGAL_EMAIL",
  "NEXT_PUBLIC_LEGAL_ACTIVITY",
] as const

describe("legal config", () => {
  afterEach(() => {
    for (const key of ENV_KEYS) {
      delete process.env[key]
    }
  })

  it("returns public website and required fields", () => {
    const info = getLegalInfo()
    expect(info.website).toBe("https://www.andonivianez.info")
    expect(info.name.length).toBeGreaterThan(0)
    expect(info.email).toContain("@")
    expect(info.activity.length).toBeGreaterThan(0)
  })

  it("prefers environment overrides when present", () => {
    process.env.NEXT_PUBLIC_LEGAL_NAME = "Nombre Test"
    process.env.NEXT_PUBLIC_LEGAL_NIF = "00000000T"
    process.env.NEXT_PUBLIC_LEGAL_ADDRESS = "Calle Test 1"
    process.env.NEXT_PUBLIC_LEGAL_EMAIL = "test@example.com"
    process.env.NEXT_PUBLIC_LEGAL_ACTIVITY = "Consultoría"

    const info = getLegalInfo()
    expect(info.name).toBe("Nombre Test")
    expect(info.nif).toBe("00000000T")
    expect(info.address).toBe("Calle Test 1")
    expect(info.email).toBe("test@example.com")
    expect(info.activity).toBe("Consultoría")
  })
})
