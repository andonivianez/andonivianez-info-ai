import { afterEach, describe, expect, it, vi } from "vitest"
import { getGitHubStats } from "@/lib/github/stats"

describe("getGitHubStats", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("aggregates repos, stars and languages", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        if (url.includes("/repos")) {
          return {
            ok: true,
            json: async () => [
              { stargazers_count: 3, language: "TypeScript" },
              { stargazers_count: 1, language: "TypeScript" },
              { stargazers_count: 2, language: "Python" },
              { stargazers_count: 0, language: null },
            ],
          }
        }
        return {
          ok: true,
          json: async () => ({ login: "andonivianez", public_repos: 12, followers: 4 }),
        }
      }),
    )

    const stats = await getGitHubStats()
    expect(stats).toMatchObject({
      username: "andonivianez",
      publicRepos: 12,
      followers: 4,
      totalStars: 6,
    })
    expect(stats?.topLanguages[0]).toEqual({ name: "TypeScript", count: 2 })
  })

  it("returns null when the user request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false })),
    )
    expect(await getGitHubStats("missing")).toBeNull()
  })

  it("returns null when fetch throws", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network")
      }),
    )
    expect(await getGitHubStats()).toBeNull()
  })

  it("keeps user stats when repos fail", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        if (url.includes("/repos")) return { ok: false }
        return {
          ok: true,
          json: async () => ({ login: "andonivianez", public_repos: 1, followers: 0 }),
        }
      }),
    )
    const stats = await getGitHubStats()
    expect(stats?.totalStars).toBe(0)
    expect(stats?.topLanguages).toEqual([])
  })
})
