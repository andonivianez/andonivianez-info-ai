"use client"

import { Send, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onCancel?: () => void
  isGenerating?: boolean
  placeholder?: string
  variant?: "hero" | "default"
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onCancel,
  isGenerating,
  placeholder,
  variant = "default",
}: ChatInputProps) {
  const isHero = variant === "hero"

  return (
    <div className="flex items-end gap-2">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className={cn(
          isHero &&
            "border-line bg-ink text-text-on-ink placeholder:text-slate-muted focus-visible:ring-amber/40",
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
          aria-label="Cancelar"
          className={isHero ? "border-line text-slate-muted hover:text-amber" : undefined}
        >
          <Square className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          type="button"
          size="icon"
          onClick={onSubmit}
          aria-label="Enviar"
          className={isHero ? "bg-amber text-ink hover:bg-amber/90" : undefined}
        >
          <Send className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
