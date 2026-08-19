import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { defaultLocale, isValidLocale, locales, type AppLocale } from "@/lib/i18n/config"

function getPreferredLocale(request: NextRequest): AppLocale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale

  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? ""
  const prefersEnglish =
    acceptLanguage.startsWith("en") ||
    acceptLanguage.split(",").some((part) => part.trim().startsWith("en"))

  return prefersEnglish ? "en" : defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (pathnameHasLocale) return NextResponse.next()

  const locale = getPreferredLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
}
