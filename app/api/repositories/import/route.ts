import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { GitHubAPI, formatRepositoryForStorage, formatCommitForStorage } from "@/lib/github"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

/**
 * POST /api/repositories/import
 * Import selected GitHub repositories
 */
export async function POST(request: NextRequest) {
  try {
    console.log("=== Repository Import Started ===")
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get repository IDs from request body
    const body = await request.json()
    const { repositoryIds } = body

    if (!repositoryIds || !Array.isArray(repositoryIds)) {
      return NextResponse.json(
        { error: "Invalid request: repositoryIds must be an array" },
        { status: 400 }
      )
    }

    // Get user from Convex
    const userDoc = await convex.query(api.users.getByExternalId, {
      externalId: userId,
    })

    if (!userDoc) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      )
    }

    // Get GitHub token
    const token = await convex.query(api.githubTokens.getByUserId, {
      userId: userDoc._id,
    })

    if (!token) {
      return NextResponse.json(
        { error: "GitHub token not found. Please reconnect GitHub." },
        { status: 401 }
      )
    }

    // Initialize GitHub API
    const github = new GitHubAPI(token)

    // Fetch all user repositories from GitHub
    const allRepos = await github.getAllRepositories()

    // Filter to only the selected repositories
    const selectedRepos = allRepos.filter((repo) =>
      repositoryIds.includes(repo.id)
    )

    if (selectedRepos.length === 0) {
      return NextResponse.json(
        { error: "No valid repositories found to import" },
        { status: 404 }
      )
    }

    // Format repositories for storage
    const formattedRepos = selectedRepos.map(formatRepositoryForStorage)

    // Save repositories to Convex
    await convex.mutation(api.repositories.connect, {
      userId: userDoc._id,
      repositories: formattedRepos,
    })

    // Optionally fetch initial commits for each repository
    const importedRepos = []
    for (const repo of selectedRepos) {
      try {
        console.log(`Fetching commits for ${repo.full_name}`)

        // Get the repository record from Convex to get its ID
        const repoQuery = await convex.query(api.repositories.listByUserId, {
          userId: userDoc._id,
        })
        const convexRepo = repoQuery?.find(r => r.githubRepoId === repo.id)

        if (convexRepo) {
          // Fetch recent commits (last 30 days)
          const commits = await github.getRecentCommitsWithDetails(
            repo.owner.login,
            repo.name,
            30
          )

          if (commits.length > 0) {
            // Format commits for storage
            const formattedCommits = commits.map((commit) =>
              formatCommitForStorage(commit, repo.default_branch)
            )

            // Save commits to Convex
            await convex.mutation(api.commits.saveCommits, {
              repositoryId: convexRepo._id,
              commits: formattedCommits,
            })

            console.log(`Imported ${commits.length} commits for ${repo.name}`)
          }

          importedRepos.push({
            name: repo.name,
            commitCount: commits.length,
          })
        }
      } catch (error) {
        console.error(`Error importing commits for ${repo.name}:`, error)
        // Continue with other repositories even if one fails
        importedRepos.push({
          name: repo.name,
          commitCount: 0,
          error: "Failed to import commits",
        })
      }
    }

    return NextResponse.json({
      success: true,
      imported: importedRepos,
      message: `Successfully imported ${selectedRepos.length} repositories`,
    })
  } catch (error) {
    console.error("Error importing repositories:", error)
    return NextResponse.json(
      { error: "Failed to import repositories" },
      { status: 500 }
    )
  }
}

/**
 * GET /api/repositories/import
 * Fetch available GitHub repositories for selection
 */
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user from Convex
    const userDoc = await convex.query(api.users.getByExternalId, {
      externalId: userId,
    })

    if (!userDoc) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      )
    }

    // Get GitHub token
    const token = await convex.query(api.githubTokens.getByUserId, {
      userId: userDoc._id,
    })

    if (!token) {
      return NextResponse.json(
        { error: "GitHub token not found. Please reconnect GitHub." },
        { status: 401 }
      )
    }

    // Initialize GitHub API
    const github = new GitHubAPI(token)

    // Fetch all user repositories from GitHub
    const repositories = await github.getAllRepositories()

    // Get already connected repositories
    const connectedRepos = await convex.query(api.repositories.listByUserId, {
      userId: userDoc._id,
    })
    const connectedRepoIds = connectedRepos?.map(r => r.githubRepoId) || []

    // Format response with connection status
    const formattedRepos = repositories.map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      owner: repo.owner.login,
      url: repo.html_url,
      language: repo.language,
      isPrivate: repo.private,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at,
      isConnected: connectedRepoIds.includes(repo.id),
    }))

    // Sort by most recently pushed
    formattedRepos.sort((a, b) =>
      new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
    )

    return NextResponse.json({
      repositories: formattedRepos,
      total: formattedRepos.length,
      connected: connectedRepoIds.length,
    })
  } catch (error) {
    console.error("Error fetching repositories:", error)
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    )
  }
}