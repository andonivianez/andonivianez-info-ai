"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAIAssistant } from "@/hooks/use-ai-assistant"
import { getSuggestedQuestions, type AudienceType } from "@/lib/audience/profiles"
import type { ProviderId } from "@/lib/ai/types"
import { cn } from "@/lib/utils"
import { ChatBootSequence } from "./chat-boot-sequence"
import { ChatInput } from "./chat-input"
import { ChatTranscript } from "./chat-message"
import { ChatRuntimeRail } from "./chat-runtime-rail"
import { SuggestedQuestions } from "./suggested-questions"

interface AIChatProps {
  variant?: "hero" | "default"
}

export function AIChat({ variant = "default" }: AIChatProps) {
  const { language, t } = useLanguage()
  const [audience] = useState<AudienceType>("default")
  const [bootDone, setBootDone] = useState(variant !== "hero")
  const assistant = useAIAssistant(language, audience)
  const questions = getSuggestedQuestions(audience, language)
  const isHero = variant === "hero"
  const showSuggestions = assistant.messages.length === 0

  const providerLabel = (() => {
    const id = assistant.activeProviderId
    if (!id) return t("assistant.initializing")
    const keys: Record<ProviderId, string> = {
      "chrome-ai": "assistant.provider.chrome",
      webllm: "assistant.provider.webgpu",
      fallback: "assistant.provider.fallback",
    }
    return t(keys[id])
  })()

  const progressDetail =
    assistant.progress?.detail === "Preparando IA local..."
      ? t("assistant.provider.preparing")
      : assistant.progress?.detail

  useEffect(() => {
    void assistant.initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const content = (
    <>
      {isHero && !bootDone && <ChatBootSequence onComplete={() => setBootDone(true)} />}

      {(bootDone || !isHero) && (
        <div className="flex min-h-0 flex-1 flex-col gap-3">
          <ChatRuntimeRail
            label={providerLabel}
            progress={
              assistant.progress
                ? { ...assistant.progress, detail: progressDetail ?? assistant.progress.detail }
                : null
            }
            provider={assistant.activeProvider}
            onClear={assistant.clear}
            variant={variant}
            privacyLocal={t("assistant.privacy.local")}
            privacyDetail={t("assistant.privacy.detail")}
            privacyFallback={t("assistant.privacy.fallback")}
            clearLabel={t("assistant.clear")}
          />

          <ChatTranscript
            messages={assistant.messages}
            emptyLabel={t("assistant.empty")}
            variant={variant}
            isGenerating={assistant.isGenerating}
          />

          {showSuggestions && (
            <SuggestedQuestions
              questions={questions}
              disabled={assistant.isGenerating}
              onSelect={(question) => void assistant.ask(question)}
              variant={variant}
            />
          )}

          <ChatInput
            value={assistant.input}
            onChange={assistant.setInput}
            onSubmit={() => void assistant.ask(assistant.input)}
            onCancel={assistant.cancel}
            isGenerating={assistant.isGenerating}
            placeholder={t("assistant.placeholder")}
            variant={variant}
            sendLabel={t("assistant.send")}
            cancelLabel={t("assistant.cancel")}
          />

          {assistant.error && <p className="text-destructive text-sm">{assistant.error}</p>}
        </div>
      )}
    </>
  )

  if (isHero) {
    return (
      <div
        id="assistant"
        className={cn(
          "border-line bg-ink-muted/30 flex flex-col overflow-hidden rounded-xl border shadow-2xl",
          "h-[min(100svh-7rem,680px)] sm:h-[min(78vh,680px)]",
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-3 p-3 sm:p-4">{content}</div>
      </div>
    )
  }

  return (
    <Card className="flex h-[min(70vh,560px)] flex-col border-emerald-200/60 shadow-lg">
      <CardHeader className="shrink-0 space-y-2 pb-2">
        <CardTitle className="text-base">{t("assistant.title")}</CardTitle>
        <p className="text-muted-foreground text-sm">{t("assistant.subtitle")}</p>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col">{content}</CardContent>
    </Card>
  )
}
