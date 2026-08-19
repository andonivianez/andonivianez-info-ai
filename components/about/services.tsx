"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"
import { motion } from "motion/react"
import { useLanguage } from "@/components/language-provider"
import { getServices } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

interface ServicesProps {
  variant?: "default" | "document"
}

export function Services({ variant = "default" }: ServicesProps) {
  const { language, t } = useLanguage()
  const services = getServices(language)
  const isDoc = variant === "document"

  return (
    <section id="services" className={cn(!isDoc && "px-4 py-20 sm:px-6 lg:px-8", isDoc && "mb-16")}>
      <div className={cn(!isDoc && "mx-auto max-w-4xl")}>
        <h2
          className={cn(
            "font-display mb-8 text-2xl font-bold sm:text-3xl",
            !isDoc && "mb-12 text-center text-balance sm:text-4xl",
          )}
        >
          {t("services.title")}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Briefcase className="h-4 w-4 shrink-0" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div>
                    <h4 className="mb-1.5 text-xs font-medium tracking-wide uppercase">
                      {t("services.deliverables")}
                    </h4>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-foreground shrink-0">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {service.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {service.pricing && (
                    <p className="text-muted-foreground text-xs italic">{service.pricing}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
