export type ProviderId = "chrome-ai" | "webllm" | "fallback"

export type ProviderProgressState = "checking" | "downloading" | "initializing" | "ready" | "error"

export interface ProviderProgress {
  state: ProviderProgressState
  progress?: number
  detail?: string
}

export interface AIProvider {
  readonly id: ProviderId
  readonly label: string
  readonly isGenerative: boolean
  readonly runsLocally: boolean
  readonly privacyLabel: string
  isAvailable(): Promise<boolean>
  initialize(onProgress?: (progress: ProviderProgress) => void): Promise<void>
  generate(prompt: string, context?: string, signal?: AbortSignal): Promise<string>
  stream?(prompt: string, context?: string, signal?: AbortSignal): AsyncIterable<string>
  dispose?(): Promise<void>
}

export interface ProviderStatus {
  id: ProviderId
  available: boolean
  active: boolean
  label: string
  privacyLabel: string
  modelName?: string
}
