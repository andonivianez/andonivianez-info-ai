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
    <div
      className={cn(
        "flex [scrollbar-width:none] gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden",
        isHero && "-mx-1 snap-x snap-mandatory px-1 sm:mx-0 sm:px-0",
      )}
    >
      {questions.map((question) => (
        <Button
          key={question}
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          className={cn(
            "h-auto shrink-0 snap-start text-left text-xs whitespace-nowrap sm:whitespace-normal",
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
