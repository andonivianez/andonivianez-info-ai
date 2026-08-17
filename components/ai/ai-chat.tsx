"use client"

import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAIAssistant } from "@/hooks/use-ai-assistant"
import { getSuggestedQuestions, type AudienceType } from "@/lib/audience/profiles"
import { AIStatusBadge } from "./ai-status-badge"
import { ChatInput } from "./chat-input"
import { ChatMessageBubble } from "./chat-message"
import { PrivacyNote } from "./privacy-note"
import { SuggestedQuestions } from "./suggested-questions"

export function AIChat() {
  const { language, t } = useLanguage()
  const [audience] = useState<AudienceType>("default")
  const assistant = useAIAssistant(language)
  const questions = getSuggestedQuestions(audience, language)

  useEffect(() => {
    void assistant.initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="border-emerald-200/60 shadow-lg">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle>{t("assistant.title")}</CardTitle>
          <AIStatusBadge
            label={assistant.activeProvider?.label ?? t("assistant.initializing")}
            progress={assistant.progress}
          />
        </div>
        <p className="text-muted-foreground text-sm">{t("assistant.subtitle")}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <SuggestedQuestions
          questions={questions}
          disabled={assistant.isGenerating}
          onSelect={(question) => void assistant.ask(question)}
        />

        <ScrollArea className="h-72 rounded-lg border p-4">
          <div className="space-y-4">
            {assistant.messages.length === 0 ? (
              <p className="text-muted-foreground text-sm">{t("assistant.empty")}</p>
            ) : (
              assistant.messages.map((message) => (
                <ChatMessageBubble key={message.id} message={message} />
              ))
            )}
          </div>
        </ScrollArea>

        <ChatInput
          value={assistant.input}
          onChange={assistant.setInput}
          onSubmit={() => void assistant.ask(assistant.input)}
          onCancel={assistant.cancel}
          isGenerating={assistant.isGenerating}
          placeholder={t("assistant.placeholder")}
        />

        <div className="flex items-center justify-between gap-2">
          <PrivacyNote provider={assistant.activeProvider} />
          <Button type="button" variant="ghost" size="sm" onClick={assistant.clear}>
            <Trash2 className="mr-2 h-4 w-4" />
            {t("assistant.clear")}
          </Button>
        </div>

        {assistant.error && <p className="text-destructive text-sm">{assistant.error}</p>}
      </CardContent>
    </Card>
  )
}
