"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, ExternalLink } from "lucide-react"
import { motion } from "motion/react"
import { useLanguage } from "@/components/language-provider"
import { getMedia } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

interface InterviewsProps {
  variant?: "default" | "document"
}

export function Interviews({ variant = "document" }: InterviewsProps) {
  const { language, t } = useLanguage()
  const media = getMedia(language)
  const [activeEmbed, setActiveEmbed] = useState<string | null>(null)
  const isDoc = variant === "document"

  if (media.length === 0) return null

  return (
    <section
      id="interviews"
      className={cn(!isDoc && "bg-muted/30 px-4 py-20 sm:px-6 lg:px-8", isDoc && "mb-16")}
    >
      <div className={cn(!isDoc && "mx-auto max-w-4xl")}>
        <h2
          className={cn(
            "font-display mb-2 text-2xl font-bold sm:text-3xl",
            !isDoc && "mb-12 text-center text-balance sm:text-4xl",
          )}
        >
          {t("interviews.title")}
        </h2>
        <p className="text-muted-foreground mb-8 text-sm">{t("interviews.subtitle")}</p>

        <div className="space-y-6">
          {media.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border-line overflow-hidden rounded-xl border bg-white shadow-sm"
            >
              <div className="relative aspect-video w-full bg-slate-100">
                {activeEmbed === item.id && item.embedUrl ? (
                  <iframe
                    title={item.title}
                    src={item.embedUrl}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <button
                    type="button"
                    className="group relative h-full w-full cursor-pointer"
                    onClick={() => setActiveEmbed(item.id)}
                    aria-label={t("interviews.play")}
                  >
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    ) : (
                      <div className="bg-ink-muted/20 absolute inset-0" />
                    )}
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg">
                        <Play className="text-ink ml-1 h-6 w-6 fill-current" />
                      </span>
                    </span>
                  </button>
                )}
              </div>

              <div className="space-y-2 p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-base font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground text-xs">
                      {item.platform} · {item.date}
                    </p>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs underline-offset-2 hover:underline"
                  >
                    YouTube
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.summary}</p>
                <ul className="text-muted-foreground flex flex-wrap gap-2 text-xs">
                  {item.topics.map((topic) => (
                    <li
                      key={topic}
                      className="border-line rounded-full border bg-slate-50 px-2.5 py-0.5"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
                {activeEmbed === item.id && (
                  <p className="text-muted-foreground text-xs">{t("interviews.cookieNotice")}</p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
