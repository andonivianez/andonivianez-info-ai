"use client"

import { useState } from "react"
import { Lock, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { AIProvider } from "@/lib/ai/types"
import type { ProviderProgress } from "@/lib/ai/types"

interface ChatRuntimeRailProps {
  label: string
  progress?: ProviderProgress | null
  provider: AIProvider | null
  onClear: () => void
  variant?: "hero" | "default"
  privacyLocal: string
  privacyDetail: string
  privacyFallback: string
  clearLabel: string
}

export function ChatRuntimeRail({
  label,
  progress,
  provider,
  onClear,
  variant = "default",
  privacyLocal,
  privacyDetail,
  privacyFallback,
  clearLabel,
}: ChatRuntimeRailProps) {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const isHero = variant === "hero"
  const isReady = !progress || progress.state === "ready"
  const isLocal = provider?.runsLocally && provider.isGenerative

  return (
    <div className="space-y-1">
      <div
        className={cn(
          "flex items-center gap-2 px-1 py-1 font-mono text-[11px] sm:text-xs",
          isHero ? "text-slate-muted" : "text-muted-foreground",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full",
            isReady ? "bg-amber" : "bg-amber/50 animate-pulse",
          )}
          aria-hidden
        />
        <span className="min-w-0 flex-1 truncate">
          {label}
          {progress && progress.state !== "ready" && progress.detail
            ? ` · ${progress.detail}${progress.progress !== undefined ? ` ${progress.progress}%` : ""}`
            : ""}
        </span>
        <button
          type="button"
          onClick={() => setPrivacyOpen((open) => !open)}
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-1 transition-colors",
            isHero ? "hover:text-amber" : "hover:text-foreground",
          )}
          aria-expanded={privacyOpen}
        >
          <Lock className="h-3 w-3" />
          <span>{privacyLocal}</span>
        </button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClear}
          className={cn(
            "h-11 w-11 shrink-0 sm:h-9 sm:w-9",
            isHero ? "text-slate-muted hover:text-amber" : undefined,
          )}
          aria-label={clearLabel}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {privacyOpen && (
        <p
          className={cn(
            "px-1 pb-1 text-[11px] leading-relaxed sm:text-xs",
            isHero ? "text-slate-muted" : "text-muted-foreground",
          )}
        >
          {isLocal ? privacyDetail : privacyFallback}
        </p>
      )}
    </div>
  )
}
