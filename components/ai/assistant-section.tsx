"use client"

import dynamic from "next/dynamic"
import { useLanguage } from "@/components/language-provider"

const AIChat = dynamic(() => import("./ai-chat").then((mod) => mod.AIChat), {
  ssr: false,
  loading: () => <AssistantLoadingFallback />,
})

function AssistantLoadingFallback() {
  const { t } = useLanguage()
  return (
    <div className="bg-muted/30 text-muted-foreground rounded-lg border p-8 text-center text-sm">
      {t("assistant.loading")}
    </div>
  )
}

export function AssistantSection() {
  return (
    <section id="assistant" className="bg-muted/20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <AIChat />
      </div>
    </section>
  )
}
