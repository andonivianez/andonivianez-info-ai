"use client"

import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAIAssistant } from "@/hooks/use-ai-assistant"
import { getSuggestedQuestions, type AudienceType } from "@/lib/audience/profiles"
import { cn } from "@/lib/utils"
import { AIStatusBadge } from "./ai-status-badge"
import { ChatBootSequence } from "./chat-boot-sequence"
import { ChatInput } from "./chat-input"
import { ChatMessageBubble } from "./chat-message"
import { PrivacyNote } from "./privacy-note"
import { SuggestedQuestions } from "./suggested-questions"

interface AIChatProps {
  variant?: "hero" | "default"
}

export function AIChat({ variant = "default" }: AIChatProps) {
  const { language, t } = useLanguage()
  const [audience] = useState<AudienceType>("default")
  const [bootDone, setBootDone] = useState(variant !== "hero")
  const assistant = useAIAssistant(language)
  const questions = getSuggestedQuestions(audience, language)
  const isHero = variant === "hero"

  useEffect(() => {
    void assistant.initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const content = (
    <>
      {isHero && !bootDone && <ChatBootSequence onComplete={() => setBootDone(true)} />}

      {(bootDone || !isHero) && (
        <>
          <SuggestedQuestions
            questions={questions}
            disabled={assistant.isGenerating}
            onSelect={(question) => void assistant.ask(question)}
            variant={isHero ? "hero" : "default"}
          />

          <ScrollArea
            className={cn("rounded-lg border p-4", isHero ? "border-line bg-ink h-80" : "h-72")}
          >
            <div className="space-y-4">
              {assistant.messages.length === 0 ? (
                <p className={cn("text-sm", isHero ? "text-slate-muted" : "text-muted-foreground")}>
                  {t("assistant.empty")}
                </p>
              ) : (
                assistant.messages.map((message) => (
                  <ChatMessageBubble key={message.id} message={message} variant={variant} />
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
            variant={variant}
          />

          <div className="flex items-center justify-between gap-2">
            <PrivacyNote provider={assistant.activeProvider} variant={variant} />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={assistant.clear}
              className={isHero ? "text-slate-muted hover:text-amber" : undefined}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {t("assistant.clear")}
            </Button>
          </div>

          {assistant.error && <p className="text-destructive text-sm">{assistant.error}</p>}
        </>
      )}
    </>
  )

  if (isHero) {
    return (
      <div id="assistant" className="border-line bg-ink-muted/30 rounded-xl border shadow-2xl">
        <div className="border-line flex items-start justify-between gap-4 border-b px-5 py-4">
          <div>
            <h2 className="text-text-on-ink font-display text-lg font-semibold">
              {t("assistant.title")}
            </h2>
            <p className="text-slate-muted mt-1 text-sm">{t("assistant.subtitle")}</p>
          </div>
          <AIStatusBadge
            label={assistant.activeProvider?.label ?? t("assistant.initializing")}
            progress={assistant.progress}
            variant="hero"
          />
        </div>
        <div className="space-y-4 p-5">{content}</div>
      </div>
    )
  }

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
      <CardContent className="space-y-4">{content}</CardContent>
    </Card>
  )
}
