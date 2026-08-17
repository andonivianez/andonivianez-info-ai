"use client"

import { Lock } from "lucide-react"
import type { AIProvider } from "@/lib/ai/types"

interface PrivacyNoteProps {
  provider: AIProvider | null
}

export function PrivacyNote({ provider }: PrivacyNoteProps) {
  if (!provider?.runsLocally || !provider.isGenerative) {
    return (
      <p className="text-muted-foreground text-xs">
        Modo compatible: las respuestas se generan localmente sin enviar datos a servicios externos
        de IA de pago, pero no utilizan un modelo generativo.
      </p>
    )
  }

  return (
    <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
      <Lock className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        <strong>IA privada.</strong> Las preguntas y respuestas se procesan localmente en tu
        navegador. No utilizamos servicios externos de IA y tus consultas no se envían a proveedores
        como OpenAI, Anthropic o Google Cloud.
      </p>
    </div>
  )
}
