"use client"

import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, ExternalLink } from "lucide-react"
import { motion } from "motion/react"
import { useLanguage } from "@/components/language-provider"
import { getProfile } from "@/lib/portfolio"
import { localizedPath } from "@/lib/i18n/config"
import { Button } from "@/components/ui/button"

export function AboutProfile() {
  const { language, t } = useLanguage()
  const profile = getProfile(language)

  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-border mb-12 flex flex-col gap-8 border-b pb-12 md:flex-row md:items-start"
    >
      <div className="border-border h-32 w-32 shrink-0 overflow-hidden rounded-full border-2">
        <Image
          src="/images/andoni-profile.png"
          alt={profile.name}
          width={128}
          height={128}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <div className="flex-1">
        {profile.tagline && (
          <p className="text-muted-foreground mb-1 font-mono text-xs tracking-wider uppercase">
            {profile.tagline}
          </p>
        )}
        <h1 className="font-display text-foreground text-3xl font-bold sm:text-4xl">
          {profile.name}
        </h1>
        <p className="text-foreground mt-1 text-lg font-medium">{profile.role}</p>
        <p className="text-muted-foreground mt-1">{profile.subtitle}</p>
        <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed text-pretty">
          {profile.bio}
        </p>

        <div className="text-muted-foreground mt-6 flex flex-wrap gap-4 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-foreground inline-flex items-center gap-2 transition-colors"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {profile.location}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="sm">
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href={profile.links.malt} target="_blank" rel="noopener noreferrer">
              {t("hero.hireMalt")}
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href={localizedPath("/", language)}>{t("home.backToChat")}</Link>
          </Button>
        </div>

        {profile.social && (
          <p className="text-muted-foreground mt-4 font-mono text-xs">
            LinkedIn · {profile.social.linkedinFollowers} {t("about.followers")} ·{" "}
            {profile.social.linkedinConnections} {t("about.connections")}
          </p>
        )}

        {(profile.availability || profile.workModel || profile.openTo) && (
          <div className="border-border bg-muted/40 mt-8 rounded-lg border p-4">
            <h2 className="mb-3 text-sm font-semibold">{t("about.availability.title")}</h2>
            {profile.availability && (
              <p className="text-muted-foreground text-sm">{profile.availability}</p>
            )}
            {profile.workModel && (
              <p className="text-muted-foreground mt-1 text-sm">{profile.workModel}</p>
            )}
            {profile.openTo && profile.openTo.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {profile.openTo.map((item) => (
                  <span
                    key={item}
                    className="bg-background text-foreground rounded-full border px-2.5 py-0.5 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-4">
              <Button asChild size="sm">
                <a href={`mailto:${profile.email}`}>{t("about.availability.contact")}</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  )
}
