"use client"

import { cn } from "@/lib/utils"
import type { ChatMessage } from "@/hooks/use-ai-assistant"

interface ChatMessageProps {
  message: ChatMessage
}

export function ChatMessageBubble({ message }: ChatMessageProps) {
  const isUser = message.role === "user"
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser ? "bg-blue-600 text-white" : "bg-muted text-foreground",
        )}
      >
        {message.content}
      </div>
    </div>
  )
}
