"use client"

import { Send, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onCancel?: () => void
  isGenerating?: boolean
  placeholder?: string
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onCancel,
  isGenerating,
  placeholder,
}: ChatInputProps) {
  return (
    <div className="flex items-end gap-2">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
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
        >
          <Square className="h-4 w-4" />
        </Button>
      ) : (
        <Button type="button" size="icon" onClick={onSubmit} aria-label="Enviar">
          <Send className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
