"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { localizedPath } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

interface SiteHeaderProps {
  variant?: "ink" | "light"
}

export function SiteHeader({ variant = "ink" }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, t } = useLanguage()
  const pathname = usePathname()

  const navigation = [
    { name: t("nav.chat"), href: localizedPath("/", language) },
    { name: t("nav.profile"), href: localizedPath("/about", language) },
    { name: t("nav.ailab"), href: localizedPath("/ai-lab", language) },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isInk = variant === "ink"
  const linkClass = cn(
    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isInk ? "text-slate-muted hover:text-amber" : "text-muted-foreground hover:text-foreground",
  )

  const activeClass = (href: string) =>
    pathname === href ? (isInk ? "text-amber" : "text-foreground font-semibold") : ""

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled &&
          (isInk
            ? "border-line/40 bg-ink/90 border-b backdrop-blur-md"
            : "border-border bg-background/95 border-b backdrop-blur-sm"),
      )}
    >
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href={localizedPath("/", language)}
          className={cn(
            "font-display text-lg font-bold tracking-tight",
            isInk ? "text-text-on-ink" : "text-foreground",
          )}
          aria-label={t("nav.home")}
        >
          AV
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(linkClass, activeClass(item.href))}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={isInk ? "text-text-on-ink hover:text-amber" : undefined}
            aria-label={isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div
            className={cn(
              "mx-4 mb-3 space-y-1 rounded-lg border p-2 shadow-lg",
              isInk ? "border-line bg-ink-muted" : "border-border bg-card",
            )}
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  isInk ? "text-text-on-ink hover:text-amber" : "text-foreground",
                  activeClass(item.href),
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
