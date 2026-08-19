export interface GitHubStats {
  username: string
  publicRepos: number
  followers: number
  totalStars: number
  topLanguages: { name: string; count: number }[]
}

const GITHUB_USERNAME = "andonivianez"

async function fetchGitHub<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "andonivianez-portfolio",
      },
      next: { revalidate: 86400 },
    })
    if (!response.ok) return null
    return (await response.json()) as T
  } catch {
    return null
  }
}

interface GitHubUser {
  login: string
  public_repos: number
  followers: number
}

interface GitHubRepo {
  stargazers_count: number
  language: string | null
}

export async function getGitHubStats(username = GITHUB_USERNAME): Promise<GitHubStats | null> {
  const [user, repos] = await Promise.all([
    fetchGitHub<GitHubUser>(`https://api.github.com/users/${username}`),
    fetchGitHub<GitHubRepo[]>(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    ),
  ])

  if (!user) return null

  const languageCounts = new Map<string, number>()
  let totalStars = 0

  for (const repo of repos ?? []) {
    totalStars += repo.stargazers_count
    if (repo.language) {
      languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1)
    }
  }

  const topLanguages = [...languageCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }))

  return {
    username: user.login,
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars,
    topLanguages,
  }
}
