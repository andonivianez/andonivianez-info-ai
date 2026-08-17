"use client"

import { cn } from "@/lib/utils"
import type { ProviderProgress } from "@/lib/ai/types"

interface AIStatusBadgeProps {
  label: string
  progress?: ProviderProgress | null
  className?: string
  variant?: "hero" | "default"
}

export function AIStatusBadge({
  label,
  progress,
  className,
  variant = "default",
}: AIStatusBadgeProps) {
  const isHero = variant === "hero"

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium",
          isHero ? "bg-amber/15 text-amber" : "bg-emerald-100 text-emerald-800",
        )}
      >
        {label}
      </span>
      {progress && progress.state !== "ready" && (
        <span className={cn("text-xs", isHero ? "text-slate-muted" : "text-muted-foreground")}>
          {progress.detail}
          {progress.progress !== undefined ? ` (${progress.progress}%)` : ""}
        </span>
      )}
    </div>
  )
}
