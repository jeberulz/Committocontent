/**
 * GitHub API Service Module
 * Handles all GitHub API interactions
 */

interface GitHubRepository {
  id: number
  name: string
  full_name: string
  owner: {
    login: string
  }
  html_url: string
  default_branch: string
  language: string | null
  private: boolean
  description: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  pushed_at: string
}

interface GitHubCommit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      email: string
      date: string
    }
  }
  html_url: string
  stats?: {
    total: number
    additions: number
    deletions: number
  }
  files?: Array<{
    filename: string
    additions: number
    deletions: number
    changes: number
  }>
}

interface GitHubUser {
  login: string
  name: string
  email: string
  avatar_url: string
}

export class GitHubAPI {
  private token: string
  private baseUrl = "https://api.github.com"

  constructor(token: string) {
    this.token = token
  }

  /**
   * Make authenticated request to GitHub API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: "application/vnd.github.v3+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      console.error("GitHub API error:", {
        status: response.status,
        statusText: response.statusText,
        error,
      })
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      )
    }

    return response.json()
  }

  /**
   * Get authenticated user info
   */
  async getUser(): Promise<GitHubUser> {
    return this.request<GitHubUser>("/user")
  }

  /**
   * Get user's repositories
   */
  async getRepositories(
    page = 1,
    perPage = 100
  ): Promise<GitHubRepository[]> {
    return this.request<GitHubRepository[]>(
      `/user/repos?per_page=${perPage}&page=${page}&sort=pushed&direction=desc`
    )
  }

  /**
   * Get all user repositories (handles pagination)
   */
  async getAllRepositories(): Promise<GitHubRepository[]> {
    const repositories: GitHubRepository[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const repos = await this.getRepositories(page, 100)
      repositories.push(...repos)

      // GitHub returns less than 100 when there are no more pages
      hasMore = repos.length === 100
      page++

      // Safety limit to prevent infinite loops
      if (page > 10) break
    }

    return repositories
  }

  /**
   * Get repository by owner and name
   */
  async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    return this.request<GitHubRepository>(`/repos/${owner}/${repo}`)
  }

  /**
   * Get commits for a repository
   */
  async getCommits(
    owner: string,
    repo: string,
    options: {
      branch?: string
      since?: string
      until?: string
      page?: number
      perPage?: number
    } = {}
  ): Promise<GitHubCommit[]> {
    const params = new URLSearchParams()

    if (options.branch) params.append("sha", options.branch)
    if (options.since) params.append("since", options.since)
    if (options.until) params.append("until", options.until)
    params.append("page", String(options.page || 1))
    params.append("per_page", String(options.perPage || 30))

    return this.request<GitHubCommit[]>(
      `/repos/${owner}/${repo}/commits?${params}`
    )
  }

  /**
   * Get detailed commit info (includes stats and files)
   */
  async getCommitDetails(
    owner: string,
    repo: string,
    sha: string
  ): Promise<GitHubCommit> {
    return this.request<GitHubCommit>(`/repos/${owner}/${repo}/commits/${sha}`)
  }

  /**
   * Get recent commits with full details (last 30 days by default)
   */
  async getRecentCommitsWithDetails(
    owner: string,
    repo: string,
    days = 30
  ): Promise<GitHubCommit[]> {
    const since = new Date()
    since.setDate(since.getDate() - days)

    // Get list of commits
    const commits = await this.getCommits(owner, repo, {
      since: since.toISOString(),
      perPage: 100,
    })

    // Fetch detailed info for each commit (includes stats)
    // Batch requests to avoid rate limiting
    const detailedCommits: GitHubCommit[] = []
    const batchSize = 10

    for (let i = 0; i < commits.length; i += batchSize) {
      const batch = commits.slice(i, i + batchSize)
      const details = await Promise.all(
        batch.map((commit) =>
          this.getCommitDetails(owner, repo, commit.sha)
        )
      )
      detailedCommits.push(...details)

      // Add a small delay between batches to respect rate limits
      if (i + batchSize < commits.length) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    return detailedCommits
  }

  /**
   * Get rate limit status
   */
  async getRateLimit() {
    return this.request<{
      rate: {
        limit: number
        remaining: number
        reset: number
      }
    }>("/rate_limit")
  }

  /**
   * Verify token is valid
   */
  async verifyToken(): Promise<boolean> {
    try {
      await this.getUser()
      return true
    } catch {
      return false
    }
  }
}

/**
 * Format repository data for Convex storage
 */
export function formatRepositoryForStorage(repo: GitHubRepository) {
  return {
    githubRepoId: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    owner: repo.owner.login,
    url: repo.html_url,
    defaultBranch: repo.default_branch,
    language: repo.language,
    isPrivate: repo.private,
  }
}

/**
 * Format commit data for Convex storage
 */
export function formatCommitForStorage(
  commit: GitHubCommit,
  branch: string
) {
  return {
    sha: commit.sha,
    message: commit.commit.message,
    authorName: commit.commit.author.name,
    authorEmail: commit.commit.author.email,
    committedAt: new Date(commit.commit.author.date).getTime(),
    filesChanged: commit.files?.length || 0,
    additions: commit.stats?.additions || 0,
    deletions: commit.stats?.deletions || 0,
    url: commit.html_url,
    branch,
  }
}