"use client"

import { cn } from "@/lib/utils"
import type { ChatMessage } from "@/hooks/use-ai-assistant"

interface ChatMessageProps {
  message: ChatMessage
  variant?: "hero" | "default"
}

export function ChatMessageBubble({ message, variant = "default" }: ChatMessageProps) {
  const isUser = message.role === "user"
  const isHero = variant === "hero"

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? isHero
              ? "bg-amber text-ink font-medium"
              : "bg-blue-600 text-white"
            : isHero
              ? "border-line bg-ink text-text-on-ink border"
              : "bg-muted text-foreground",
        )}
      >
        {message.content}
      </div>
    </div>
  )
}
