import { AI_CONFIG } from "./config"
import { ChromeAIProvider } from "./providers/chrome-ai"
import { FallbackProvider } from "./providers/fallback"
import { WebLLMProvider } from "./providers/webllm"
import type { AIProvider, ProviderId, ProviderProgress } from "./types"

export class AIProviderManager {
  private providers: AIProvider[]
  private activeProvider: AIProvider | null = null
  private forcedProviderId: ProviderId | null = null

  constructor(providers?: AIProvider[]) {
    this.providers = providers ?? [
      new ChromeAIProvider(),
      new WebLLMProvider(),
      new FallbackProvider(),
    ]
  }

  setForcedProvider(id: ProviderId | null): void {
    this.forcedProviderId = id
    this.activeProvider = null
  }

  getProviders(): AIProvider[] {
    return this.providers
  }

  getActiveProvider(): AIProvider | null {
    return this.activeProvider
  }

  async detectAvailability(): Promise<Record<ProviderId, boolean>> {
    const entries = await Promise.all(
      this.providers.map(async (provider) => [provider.id, await provider.isAvailable()] as const),
    )
    return Object.fromEntries(entries) as Record<ProviderId, boolean>
  }

  async selectBestProvider(onProgress?: (progress: ProviderProgress) => void): Promise<AIProvider> {
    if (this.forcedProviderId) {
      const forced = this.providers.find((p) => p.id === this.forcedProviderId)
      if (!forced) throw new Error(`Provider ${this.forcedProviderId} not found`)
      if (!(await forced.isAvailable())) {
        throw new Error(`Provider ${this.forcedProviderId} is not available`)
      }
      await forced.initialize(onProgress)
      this.activeProvider = forced
      return forced
    }

    for (const id of AI_CONFIG.providerPriority) {
      const provider = this.providers.find((p) => p.id === id)
      if (!provider) continue
      if (!(await provider.isAvailable())) continue
      try {
        await provider.initialize(onProgress)
        this.activeProvider = provider
        return provider
      } catch {
        continue
      }
    }

    const fallback = this.providers.find((p) => p.id === "fallback")
    if (!fallback) throw new Error("No fallback provider configured")
    await fallback.initialize(onProgress)
    this.activeProvider = fallback
    return fallback
  }

  async generate(prompt: string, context?: string, signal?: AbortSignal): Promise<string> {
    const provider = this.activeProvider ?? (await this.selectBestProvider())
    return provider.generate(prompt, context, signal)
  }

  async *stream(prompt: string, context?: string, signal?: AbortSignal): AsyncIterable<string> {
    const provider = this.activeProvider ?? (await this.selectBestProvider())
    if (provider.stream) {
      yield* provider.stream(prompt, context, signal)
      return
    }
    yield await provider.generate(prompt, context, signal)
  }

  async dispose(): Promise<void> {
    await Promise.all(this.providers.map((provider) => provider.dispose?.()))
    this.activeProvider = null
  }
}

export function createProviderManager(): AIProviderManager {
  return new AIProviderManager()
}
