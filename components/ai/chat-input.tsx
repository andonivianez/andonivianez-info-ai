"use client"

import { useEffect, useRef } from "react"
import { Send, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onCancel?: () => void
  isGenerating?: boolean
  placeholder?: string
  variant?: "hero" | "default"
  sendLabel: string
  cancelLabel: string
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onCancel,
  isGenerating,
  placeholder,
  variant = "default",
  sendLabel,
  cancelLabel,
}: ChatInputProps) {
  const isHero = variant === "hero"
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    const maxHeight = 4 * 24
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`
  }, [value])

  return (
    <div
      className={cn(
        "relative flex items-end rounded-xl border pr-1",
        isHero
          ? "border-line bg-ink focus-within:ring-amber/40 focus-within:ring-1"
          : "border-border bg-background focus-within:ring-ring focus-within:ring-1",
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={1}
        className={cn(
          "max-h-24 min-h-11 w-full resize-none bg-transparent px-3 py-2.5 text-base leading-relaxed outline-none sm:text-sm",
          isHero
            ? "text-text-on-ink placeholder:text-slate-muted"
            : "text-foreground placeholder:text-muted-foreground",
        )}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            onSubmit()
          }
        }}
      />
      {isGenerating ? (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onCancel}
          aria-label={cancelLabel}
          className={cn(
            "mb-1 h-11 w-11 shrink-0 sm:h-9 sm:w-9",
            isHero ? "border-line text-slate-muted hover:text-amber" : undefined,
          )}
        >
          <Square className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          type="button"
          size="icon"
          onClick={onSubmit}
          aria-label={sendLabel}
          className={cn(
            "mb-1 h-11 w-11 shrink-0 sm:h-9 sm:w-9",
            isHero ? "bg-amber text-ink hover:bg-amber/90" : undefined,
          )}
        >
          <Send className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
