"use client"

import { cn } from "@/lib/utils"
import type { ProviderProgress } from "@/lib/ai/types"

interface AIStatusBadgeProps {
  label: string
  progress?: ProviderProgress | null
  className?: string
}

export function AIStatusBadge({ label, progress, className }: AIStatusBadgeProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="inline-flex w-fit items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
        {label}
      </span>
      {progress && progress.state !== "ready" && (
        <span className="text-muted-foreground text-xs">
          {progress.detail}
          {progress.progress !== undefined ? ` (${progress.progress}%)` : ""}
        </span>
      )}
    </div>
  )
}
