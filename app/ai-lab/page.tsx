import type { Metadata } from "next"
import { Header } from "@/components/header"
import { AILabDashboard } from "@/components/ai-lab/ai-lab-dashboard"

export const metadata: Metadata = {
  title: "AI Lab | Andoni Vianez",
  description: "Demostración técnica y métricas del portfolio inteligente con IA local",
}

export default function AILabPage() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold sm:text-4xl">AI Lab</h1>
        <AILabDashboard />
      </div>
    </main>
  )
}
