import { Octokit } from "@octokit/rest";

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
  html_url: string;
  default_branch: string;
  language: string | null;
  private: boolean;
  updated_at: string;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  html_url: string;
  stats?: {
    total: number;
    additions: number;
    deletions: number;
  };
  files?: Array<{
    filename: string;
    additions: number;
    deletions: number;
    changes: number;
  }>;
}

/**
 * Create an authenticated Octokit client
 */
export function createGitHubClient(accessToken: string): Octokit {
  return new Octokit({
    auth: accessToken,
    userAgent: "CodeToContent/1.0",
  });
}

/**
 * Fetch all repositories accessible to the authenticated user
 */
export async function fetchUserRepositories(
  accessToken: string
): Promise<GitHubRepository[]> {
  const octokit = createGitHubClient(accessToken);

  try {
    const { data } = await octokit.repos.listForAuthenticatedUser({
      sort: "updated",
      per_page: 100,
      affiliation: "owner,collaborator",
    });

    return data as GitHubRepository[];
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw new Error("Failed to fetch repositories from GitHub");
  }
}

/**
 * Fetch commits for a specific repository
 */
export async function fetchRepositoryCommits(
  accessToken: string,
  owner: string,
  repo: string,
  options: {
    since?: string; // ISO 8601 timestamp
    until?: string; // ISO 8601 timestamp
    per_page?: number;
    page?: number;
  } = {}
): Promise<GitHubCommit[]> {
  const octokit = createGitHubClient(accessToken);

  try {
    const { data } = await octokit.repos.listCommits({
      owner,
      repo,
      per_page: options.per_page || 100,
      page: options.page || 1,
      since: options.since,
      until: options.until,
    });

    // Fetch detailed commit info including stats
    const detailedCommits = await Promise.all(
      data.map(async (commit) => {
        try {
          const { data: detailedData } = await octokit.repos.getCommit({
            owner,
            repo,
            ref: commit.sha,
          });
          return detailedData as GitHubCommit;
        } catch (error) {
          console.error(`Error fetching commit ${commit.sha}:`, error);
          // Return basic commit data if detailed fetch fails
          return commit as GitHubCommit;
        }
      })
    );

    return detailedCommits;
  } catch (error) {
    console.error(`Error fetching commits for ${owner}/${repo}:`, error);
    throw new Error(`Failed to fetch commits for repository ${repo}`);
  }
}

/**
 * Fetch a single commit with full details
 */
export async function fetchCommitDetails(
  accessToken: string,
  owner: string,
  repo: string,
  sha: string
): Promise<GitHubCommit> {
  const octokit = createGitHubClient(accessToken);

  try {
    const { data } = await octokit.repos.getCommit({
      owner,
      repo,
      ref: sha,
    });

    return data as GitHubCommit;
  } catch (error) {
    console.error(`Error fetching commit ${sha}:`, error);
    throw new Error(`Failed to fetch commit details`);
  }
}

/**
 * Create a webhook for a repository
 */
export async function createRepositoryWebhook(
  accessToken: string,
  owner: string,
  repo: string,
  webhookUrl: string,
  webhookSecret: string
): Promise<number> {
  const octokit = createGitHubClient(accessToken);

  try {
    const { data } = await octokit.repos.createWebhook({
      owner,
      repo,
      config: {
        url: webhookUrl,
        content_type: "json",
        secret: webhookSecret,
      },
      events: ["push"],
      active: true,
    });

    return data.id;
  } catch (error) {
    console.error(`Error creating webhook for ${owner}/${repo}:`, error);
    throw new Error(`Failed to create webhook for repository ${repo}`);
  }
}

/**
 * Delete a webhook for a repository
 */
export async function deleteRepositoryWebhook(
  accessToken: string,
  owner: string,
  repo: string,
  webhookId: number
): Promise<void> {
  const octokit = createGitHubClient(accessToken);

  try {
    await octokit.repos.deleteWebhook({
      owner,
      repo,
      hook_id: webhookId,
    });
  } catch (error) {
    console.error(`Error deleting webhook ${webhookId}:`, error);
    throw new Error(`Failed to delete webhook`);
  }
}

/**
 * Get authenticated user info
 */
export async function getAuthenticatedUser(accessToken: string) {
  const octokit = createGitHubClient(accessToken);

  try {
    const { data } = await octokit.users.getAuthenticated();
    return data;
  } catch (error) {
    console.error("Error fetching authenticated user:", error);
    throw new Error("Failed to fetch user information");
  }
}

/**
 * Calculate date for "X days ago" (for historical commit fetching)
 */
export function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

/**
 * Transform GitHub commit to our database format
 */
export function transformCommitForDatabase(commit: GitHubCommit) {
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
    branch: "main", // TODO: detect actual branch
  };
}

/**
 * Transform GitHub repository to our database format
 */
export function transformRepositoryForDatabase(repo: GitHubRepository) {
  return {
    githubRepoId: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    owner: repo.owner.login,
    url: repo.html_url,
    defaultBranch: repo.default_branch,
    language: repo.language || undefined,
    isPrivate: repo.private,
  };
}
