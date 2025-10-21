import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { GitHubAPI, formatCommitForStorage } from "@/lib/github"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

/**
 * POST /api/repositories/sync
 * Sync commits for a specific repository or all repositories
 */
export async function POST(request: NextRequest) {
  try {
    console.log("=== Repository Sync Started ===")
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get optional repository ID from request body
    const body = await request.json().catch(() => ({}))
    const { repositoryId } = body

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

    // Get repositories to sync
    let repositories
    if (repositoryId) {
      // Sync specific repository
      const repo = await convex.query(api.repositories.getById, { repositoryId })
      if (!repo) {
        return NextResponse.json(
          { error: "Repository not found" },
          { status: 404 }
        )
      }
      repositories = [repo]
    } else {
      // Sync all active repositories
      repositories = await convex.query(api.repositories.listActiveByUserId, {
        userId: userDoc._id,
      })
    }

    if (!repositories || repositories.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No repositories to sync",
        synced: [],
      })
    }

    const syncResults = []

    for (const repo of repositories) {
      try {
        console.log(`Syncing repository: ${repo.fullName}`)

        // Calculate since date (last sync or 30 days ago)
        const sinceDate = repo.lastSyncedAt
          ? new Date(repo.lastSyncedAt)
          : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

        // Fetch commits since last sync
        const commits = await github.getCommits(
          repo.owner,
          repo.name,
          {
            branch: repo.defaultBranch,
            since: sinceDate.toISOString(),
            perPage: 100,
          }
        )

        console.log(`Found ${commits.length} new commits for ${repo.name}`)

        if (commits.length > 0) {
          // Fetch detailed info for new commits
          const detailedCommits = []
          const batchSize = 10

          for (let i = 0; i < Math.min(commits.length, 50); i += batchSize) {
            const batch = commits.slice(i, i + batchSize)
            const details = await Promise.all(
              batch.map((commit) =>
                github.getCommitDetails(repo.owner, repo.name, commit.sha)
              )
            )
            detailedCommits.push(...details)

            // Small delay to respect rate limits
            if (i + batchSize < commits.length) {
              await new Promise((resolve) => setTimeout(resolve, 100))
            }
          }

          // Format commits for storage
          const formattedCommits = detailedCommits.map((commit) =>
            formatCommitForStorage(commit, repo.defaultBranch)
          )

          // Save commits to Convex
          const result = await convex.mutation(api.commits.saveCommits, {
            repositoryId: repo._id,
            commits: formattedCommits,
          })

          // Update last synced timestamp
          await convex.mutation(api.repositories.updateLastSynced, {
            repositoryId: repo._id,
            timestamp: Date.now(),
          })

          syncResults.push({
            repository: repo.name,
            newCommits: result.added,
            skipped: result.skipped,
            total: result.total,
          })
        } else {
          // Update last synced timestamp even if no new commits
          await convex.mutation(api.repositories.updateLastSynced, {
            repositoryId: repo._id,
            timestamp: Date.now(),
          })

          syncResults.push({
            repository: repo.name,
            newCommits: 0,
            skipped: 0,
            total: 0,
          })
        }
      } catch (error) {
        console.error(`Error syncing repository ${repo.name}:`, error)
        syncResults.push({
          repository: repo.name,
          error: "Failed to sync",
        })
      }
    }

    // Calculate totals
    const totalNewCommits = syncResults.reduce(
      (sum, r) => sum + (r.newCommits || 0),
      0
    )

    return NextResponse.json({
      success: true,
      message: `Synced ${repositories.length} repositories`,
      totalNewCommits,
      synced: syncResults,
    })
  } catch (error) {
    console.error("Error syncing repositories:", error)
    return NextResponse.json(
      { error: "Failed to sync repositories" },
      { status: 500 }
    )
  }
}

/**
 * GET /api/repositories/sync
 * Get sync status for repositories
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

    // Get repositories with their sync status
    const repositories = await convex.query(api.repositories.listByUserId, {
      userId: userDoc._id,
    })

    if (!repositories) {
      return NextResponse.json({
        repositories: [],
        needsSync: [],
      })
    }

    // Check which repositories need syncing (not synced in last hour)
    const oneHourAgo = Date.now() - 60 * 60 * 1000
    const needsSync = repositories.filter(
      (repo) => !repo.lastSyncedAt || repo.lastSyncedAt < oneHourAgo
    )

    return NextResponse.json({
      repositories: repositories.map((repo) => ({
        id: repo._id,
        name: repo.name,
        lastSyncedAt: repo.lastSyncedAt,
        totalCommits: repo.totalCommits,
        newCommits: repo.newCommits,
        needsSync: !repo.lastSyncedAt || repo.lastSyncedAt < oneHourAgo,
      })),
      needsSync: needsSync.map((r) => r._id),
    })
  } catch (error) {
    console.error("Error getting sync status:", error)
    return NextResponse.json(
      { error: "Failed to get sync status" },
      { status: 500 }
    )
  }
}