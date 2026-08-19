import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { createElement, type ReactNode } from "react"
import { afterEach, vi } from "vitest"

afterEach(() => {
  cleanup()
})

Element.prototype.scrollIntoView = vi.fn()

vi.mock("next/navigation", () => ({
  usePathname: () => "/es",
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND")
  },
}))

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: ReactNode; href: string }) =>
    createElement("a", { href, ...props }, children),
}))
