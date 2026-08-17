export interface RuntimeEnvironment {
  browser: string
  userAgent: string
  webgpu: boolean
  chromeAI: boolean
  webllm: boolean
  platform: string
  language: string
}

export async function detectRuntimeEnvironment(): Promise<RuntimeEnvironment> {
  if (typeof window === "undefined") {
    return {
      browser: "unknown",
      userAgent: "",
      webgpu: false,
      chromeAI: false,
      webllm: false,
      platform: "server",
      language: "es",
    }
  }

  const ua = navigator.userAgent
  let browser = "unknown"
  if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome"
  else if (ua.includes("Firefox")) browser = "Firefox"
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari"
  else if (ua.includes("Edg")) browser = "Edge"

  let webgpu = false
  try {
    const nav = navigator as Navigator & { gpu?: { requestAdapter: () => Promise<unknown> } }
    webgpu = !!nav.gpu && !!(await nav.gpu.requestAdapter())
  } catch {
    webgpu = false
  }

  let chromeAI = false
  try {
    const lm = (
      globalThis as typeof globalThis & { LanguageModel?: { availability: () => Promise<string> } }
    ).LanguageModel
    chromeAI = typeof lm !== "undefined" && (await lm.availability()) !== "unavailable"
  } catch {
    chromeAI = false
  }

  return {
    browser,
    userAgent: ua,
    webgpu,
    chromeAI,
    webllm: webgpu,
    platform: navigator.platform,
    language: navigator.language,
  }
}
