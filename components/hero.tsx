"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Link, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { getProfile } from "@/lib/portfolio"

export function Hero() {
  const { language, t } = useLanguage()
  const profile = getProfile(language)

  return (
    <section
      id="hero"
      className="from-background to-muted/20 flex min-h-screen items-center justify-center bg-gradient-to-br px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <div className="mx-auto mb-8 h-40 w-40 overflow-hidden rounded-full border-4 border-blue-200 shadow-2xl">
            <Image
              src="/images/andoni-profile.png"
              alt={profile.name}
              width={160}
              height={160}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <h1 className="text-foreground mb-6 text-5xl font-bold text-balance sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mb-6 text-2xl font-semibold text-balance text-blue-600 sm:text-3xl">
            {profile.role}
          </p>
          <p className="mb-6 text-xl font-medium text-balance text-blue-500">{profile.subtitle}</p>
          <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-pretty">
            {t("hero.description")}
          </p>

          <div className="text-muted-foreground mb-8 flex flex-col items-center justify-center gap-6 text-sm sm:flex-row">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" />
              <a href={`mailto:${profile.email}`} className="transition-colors hover:text-blue-600">
                {profile.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>

        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="w-full bg-red-600 text-white shadow-lg hover:bg-red-700 sm:w-auto"
            asChild
          >
            <a href={profile.links.malt} target="_blank" rel="noopener noreferrer">
              {t("hero.hireMalt")}
            </a>
          </Button>
        </div>

        <div className="mb-12 flex justify-center space-x-8">
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transform transition-colors hover:scale-110 hover:text-blue-600"
          >
            <Link className="h-7 w-7" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-muted-foreground transform transition-colors hover:scale-110 hover:text-blue-600"
          >
            <Mail className="h-7 w-7" />
          </a>
        </div>

        <div className="animate-bounce">
          <a href="#about" aria-label={language === "es" ? "Ir a sobre mí" : "Go to about section"}>
            <ArrowDown className="text-muted-foreground mx-auto h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  )
}
