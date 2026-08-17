"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SuggestedQuestionsProps {
  questions: string[]
  onSelect: (question: string) => void
  disabled?: boolean
  variant?: "hero" | "default"
}

export function SuggestedQuestions({
  questions,
  onSelect,
  disabled,
  variant = "default",
}: SuggestedQuestionsProps) {
  const isHero = variant === "hero"

  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((question) => (
        <Button
          key={question}
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          className={cn(
            "h-auto text-left text-xs whitespace-normal",
            isHero &&
              "border-line text-slate-muted hover:border-amber hover:text-amber bg-transparent",
          )}
          onClick={() => onSelect(question)}
        >
          {question}
        </Button>
      ))}
    </div>
  )
}
