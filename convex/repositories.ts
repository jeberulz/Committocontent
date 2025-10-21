import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser, getCurrentUserOrThrow } from "./users";

/**
 * Get all repositories for the current user
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    const repos = await ctx.db
      .query("repositories")
      .withIndex("byUserId", (q) => q.eq("userId", user._id))
      .collect();

    // Get commit counts for each repository
    const reposWithStats = await Promise.all(
      repos.map(async (repo) => {
        const totalCommits = await ctx.db
          .query("commits")
          .withIndex("byRepositoryId", (q) => q.eq("repositoryId", repo._id))
          .collect();

        const unprocessedCommits = await ctx.db
          .query("commits")
          .withIndex("byProcessedStatus", (q) =>
            q.eq("repositoryId", repo._id).eq("processed", false)
          )
          .collect();

        return {
          ...repo,
          totalCommits: totalCommits.length,
          newCommits: unprocessedCommits.length,
        };
      })
    );

    return reposWithStats;
  },
});

/**
 * Get active repositories for the current user
 */
export const listActive = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);

    return await ctx.db
      .query("repositories")
      .withIndex("byUserAndActive", (q) =>
        q.eq("userId", user._id).eq("isActive", true)
      )
      .collect();
  },
});

/**
 * Get a single repository by ID
 */
export const getById = query({
  args: { repositoryId: v.id("repositories") },
  handler: async (ctx, { repositoryId }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const repo = await ctx.db.get(repositoryId);

    if (!repo || repo.userId !== user._id) {
      throw new Error("Repository not found or access denied");
    }

    return repo;
  },
});

/**
 * Connect new repositories (called from OAuth callback)
 */
export const connect = internalMutation({
  args: {
    userId: v.id("users"),
    repositories: v.array(
      v.object({
        githubRepoId: v.number(),
        name: v.string(),
        fullName: v.string(),
        owner: v.string(),
        url: v.string(),
        defaultBranch: v.string(),
        language: v.optional(v.string()),
        isPrivate: v.boolean(),
      })
    ),
  },
  handler: async (ctx, { userId, repositories }) => {
    const now = Date.now();

    for (const repo of repositories) {
      // Check if repository already exists
      const existing = await ctx.db
        .query("repositories")
        .withIndex("byGithubRepoId", (q) => q.eq("githubRepoId", repo.githubRepoId))
        .unique();

      if (existing) {
        // Reactivate if it was previously connected
        await ctx.db.patch(existing._id, {
          isActive: true,
          lastSyncedAt: now,
        });
      } else {
        // Create new repository record
        await ctx.db.insert("repositories", {
          userId,
          githubRepoId: repo.githubRepoId,
          name: repo.name,
          fullName: repo.fullName,
          owner: repo.owner,
          url: repo.url,
          defaultBranch: repo.defaultBranch,
          language: repo.language,
          isActive: true,
          isPrivate: repo.isPrivate,
          lastSyncedAt: now,
          createdAt: now,
        });
      }
    }

    return { success: true, count: repositories.length };
  },
});

/**
 * Toggle repository active status
 */
export const toggleActive = mutation({
  args: { repositoryId: v.id("repositories") },
  handler: async (ctx, { repositoryId }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const repo = await ctx.db.get(repositoryId);

    if (!repo || repo.userId !== user._id) {
      throw new Error("Repository not found or access denied");
    }

    await ctx.db.patch(repositoryId, {
      isActive: !repo.isActive,
    });

    return { success: true, isActive: !repo.isActive };
  },
});

/**
 * Disconnect (delete) a repository
 */
export const disconnect = mutation({
  args: { repositoryId: v.id("repositories") },
  handler: async (ctx, { repositoryId }) => {
    const user = await getCurrentUserOrThrow(ctx);
    const repo = await ctx.db.get(repositoryId);

    if (!repo || repo.userId !== user._id) {
      throw new Error("Repository not found or access denied");
    }

    // Optionally: Delete all commits associated with this repository
    const commits = await ctx.db
      .query("commits")
      .withIndex("byRepositoryId", (q) => q.eq("repositoryId", repositoryId))
      .collect();

    for (const commit of commits) {
      await ctx.db.delete(commit._id);
    }

    // Delete the repository
    await ctx.db.delete(repositoryId);

    return { success: true };
  },
});

/**
 * Update repository's last synced timestamp
 */
export const updateLastSynced = internalMutation({
  args: {
    repositoryId: v.id("repositories"),
    timestamp: v.number(),
  },
  handler: async (ctx, { repositoryId, timestamp }) => {
    await ctx.db.patch(repositoryId, {
      lastSyncedAt: timestamp,
    });

    return { success: true };
  },
});

/**
 * Get repository count for current user (for plan limit enforcement)
 */
export const getCount = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return 0;

    const repos = await ctx.db
      .query("repositories")
      .withIndex("byUserId", (q) => q.eq("userId", user._id))
      .collect();

    return repos.length;
  },
});
