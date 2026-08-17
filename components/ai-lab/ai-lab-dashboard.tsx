"use client"

import { useEffect, useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { useAIRuntime } from "@/hooks/use-ai-runtime"
import { metricsStore } from "@/lib/metrics/ai-metrics"
import type { ProviderId } from "@/lib/ai/types"

export function AILabDashboard() {
  const { t } = useLanguage()
  const runtime = useAIRuntime()
  const [summary, setSummary] = useState(metricsStore.summary())

  useEffect(() => {
    void runtime.initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setSummary(metricsStore.summary()), 2000)
    return () => clearInterval(interval)
  }, [])

  const chartData = useMemo(
    () =>
      Object.entries(summary.providerCounts).map(([provider, count]) => ({
        provider,
        count,
      })),
    [summary.providerCounts],
  )

  const providers: ProviderId[] = ["chrome-ai", "webllm", "fallback"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("ailab.runtime")}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm md:grid-cols-2">
          <p>
            <strong>{t("ailab.browser")}:</strong> {runtime.environment?.browser ?? "—"}
          </p>
          <p>
            <strong>WebGPU:</strong>{" "}
            {runtime.environment?.webgpu ? t("ailab.available") : t("ailab.unavailable")}
          </p>
          <p>
            <strong>Chrome AI:</strong>{" "}
            {runtime.availability["chrome-ai"] ? t("ailab.available") : t("ailab.unavailable")}
          </p>
          <p>
            <strong>WebLLM:</strong>{" "}
            {runtime.availability.webllm ? t("ailab.available") : t("ailab.unavailable")}
          </p>
          <p>
            <strong>{t("ailab.activeProvider")}:</strong>{" "}
            {runtime.activeProvider?.label ?? t("assistant.initializing")}
          </p>
          <p>
            <strong>{t("ailab.processing")}:</strong> 100% local
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("ailab.switchProvider")}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {providers.map((providerId) => (
            <Button
              key={providerId}
              variant={runtime.activeProviderId === providerId ? "default" : "outline"}
              disabled={!runtime.availability[providerId]}
              onClick={() => void runtime.switchProvider(providerId)}
            >
              {providerId}
            </Button>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("ailab.metrics")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              {t("ailab.totalQueries")}: {summary.totalQueries}
            </p>
            <p>
              {t("ailab.avgTotal")}: {summary.averageTotalTime.toFixed(0)} ms
            </p>
            <p>
              {t("ailab.avgRetrieval")}: {summary.averageRetrievalTime.toFixed(0)} ms
            </p>
            <p>
              {t("ailab.avgGeneration")}: {summary.averageGenerationTime.toFixed(0)} ms
            </p>
            <p>
              {t("ailab.avgContext")}: {summary.averageContextLength.toFixed(0)} chars
            </p>
            <p>
              {t("ailab.errors")}: {summary.errorCount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("ailab.providerUsage")}</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="provider" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => {
            const blob = new Blob([metricsStore.exportJson()], { type: "application/json" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "ai-metrics.json"
            a.click()
            URL.revokeObjectURL(url)
          }}
        >
          Export JSON
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const blob = new Blob([metricsStore.exportCsv()], { type: "text/csv" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "ai-metrics.csv"
            a.click()
            URL.revokeObjectURL(url)
          }}
        >
          Export CSV
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            metricsStore.clear()
            setSummary(metricsStore.summary())
          }}
        >
          Clear metrics
        </Button>
      </div>
    </div>
  )
}
