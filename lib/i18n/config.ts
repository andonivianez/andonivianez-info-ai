export const locales = ["es", "en"] as const
export type AppLocale = (typeof locales)[number]
export const defaultLocale: AppLocale = "es"

export function isValidLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale)
}

export function localizedPath(path: string, locale: AppLocale): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`
  return `/${locale}${clean}`
}

export function switchLocalePath(pathname: string, newLocale: AppLocale): string {
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length > 0 && isValidLocale(segments[0]!)) {
    segments[0] = newLocale
    return `/${segments.join("/")}`
  }
  return localizedPath(pathname, newLocale)
}

export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length > 0 && isValidLocale(segments[0]!)) {
    const rest = segments.slice(1).join("/")
    return rest ? `/${rest}` : "/"
  }
  return pathname || "/"
}
