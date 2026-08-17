"use client"

import { Badge } from "@/components/ui/badge"
import { Globe, Award } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { getLanguages } from "@/lib/portfolio"

const colorMap = ["bg-blue-600", "bg-blue-500", "bg-blue-400", "bg-blue-300", "bg-blue-200"]

export function Languages() {
  const { language, t } = useLanguage()
  const languages = getLanguages(language)

  return (
    <section id="languages" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-balance sm:text-4xl">
          {t("languages.title")}
        </h2>

        <div className="space-y-4">
          {languages.map((lang, index) => (
            <div
              key={lang.id}
              className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">{lang.language}</h3>
                  <Badge className={`${colorMap[index % colorMap.length]} text-white`}>
                    {lang.level === "native"
                      ? t("languages.native")
                      : lang.level === "basic"
                        ? t("languages.basic")
                        : lang.level === "intermediate"
                          ? t("languages.intermediate")
                          : lang.level}
                  </Badge>
                </div>
                <span className="text-lg font-bold text-blue-600">{lang.proficiency}%</span>
              </div>

              <div className="mb-2 h-3 w-full rounded-full bg-gray-200">
                <div
                  className={`h-3 rounded-full ${colorMap[index % colorMap.length]} transition-all duration-700`}
                  style={{ width: `${lang.proficiency}%` }}
                ></div>
              </div>

              <div className="text-muted-foreground flex items-center gap-1 text-sm">
                {lang.level !== "native" && <Award className="h-3 w-3" />}
                <span>{lang.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
