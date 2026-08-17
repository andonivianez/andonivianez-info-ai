"use client"

import { Button } from "@/components/ui/button"

interface SuggestedQuestionsProps {
  questions: string[]
  onSelect: (question: string) => void
  disabled?: boolean
}

export function SuggestedQuestions({ questions, onSelect, disabled }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((question) => (
        <Button
          key={question}
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          className="h-auto text-left text-xs whitespace-normal"
          onClick={() => onSelect(question)}
        >
          {question}
        </Button>
      ))}
    </div>
  )
}
