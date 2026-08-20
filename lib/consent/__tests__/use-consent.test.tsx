import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { useConsent } from "@/lib/consent/use-consent"

describe("useConsent", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("starts without a choice and hydrates on the client", () => {
    const { result } = renderHook(() => useConsent())
    expect(result.current.hydrated).toBe(true)
    expect(result.current.hasChoice).toBe(false)
    expect(result.current.hasAnalyticsConsent).toBe(false)
  })

  it("accepts, rejects and resets analytics consent", () => {
    const { result } = renderHook(() => useConsent())

    act(() => {
      result.current.accept()
    })
    expect(result.current.analytics).toBe("accepted")
    expect(result.current.hasAnalyticsConsent).toBe(true)

    act(() => {
      result.current.reject()
    })
    expect(result.current.analytics).toBe("rejected")
    expect(result.current.hasAnalyticsConsent).toBe(false)

    act(() => {
      result.current.reset()
    })
    expect(result.current.hasChoice).toBe(false)
  })
})
