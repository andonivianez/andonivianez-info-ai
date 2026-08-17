"use client"

import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import type { ChatMessage } from "@/hooks/use-ai-assistant"

interface ChatMessageBubbleProps {
  message: ChatMessage
  variant?: "hero" | "default"
  isStreaming?: boolean
}

export function ChatMessageBubble({
  message,
  variant = "default",
  isStreaming = false,
}: ChatMessageBubbleProps) {
  const isUser = message.role === "user"
  const isHero = variant === "hero"
  const reduceMotion = useReducedMotion()

  if (isUser) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex justify-end"
      >
        <div
          className={cn(
            "max-w-[88%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
            isHero ? "bg-amber text-ink font-medium" : "bg-blue-600 text-white",
          )}
        >
          {message.content}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "border-amber/70 max-w-none border-l-2 py-1 pl-3 text-sm leading-relaxed",
        isHero ? "text-text-on-ink" : "text-foreground",
      )}
    >
      {message.content}
      {isStreaming && !reduceMotion && (
        <span className="bg-amber ml-0.5 inline-block h-3.5 w-0.5 animate-pulse align-text-bottom" />
      )}
    </motion.div>
  )
}

interface ChatTranscriptProps {
  messages: ChatMessage[]
  emptyLabel: string
  variant?: "hero" | "default"
  isGenerating?: boolean
}

export function ChatTranscript({
  messages,
  emptyLabel,
  variant = "default",
  isGenerating = false,
}: ChatTranscriptProps) {
  const isHero = variant === "hero"
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, isGenerating])

  return (
    <div
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain px-1 py-2",
        isHero && "scrollbar-thin",
      )}
    >
      <div className="space-y-3">
        {messages.length === 0 ? (
          <p className={cn("text-sm", isHero ? "text-slate-muted" : "text-muted-foreground")}>
            {emptyLabel}
          </p>
        ) : (
          messages.map((message, index) => (
            <ChatMessageBubble
              key={message.id}
              message={message}
              variant={variant}
              isStreaming={
                isGenerating &&
                index === messages.length - 1 &&
                message.role === "assistant" &&
                message.content.length > 0
              }
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
