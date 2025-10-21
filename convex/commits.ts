import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

/**
 * Get all commits for a specific repository
 */
export const listByRepository = query({
  args: {
    repositoryId: v.id("repositories"),
    limit: v.optional(v.number()),
    processed: v.optional(v.boolean()),
  },
  handler: async (ctx, { repositoryId, limit, processed }) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Verify repository belongs to user
    const repo = await ctx.db.get(repositoryId);
    if (!repo || repo.userId !== user._id) {
      throw new Error("Repository not found or access denied");
    }

    let commits = await ctx.db
      .query("commits")
      .withIndex("byRepositoryId", (q) => q.eq("repositoryId", repositoryId))
      .order("desc")
      .collect();

    // Filter by processed status if specified
    if (processed !== undefined) {
      commits = commits.filter((c) => c.processed === processed);
    }

    // Apply limit if specified
    if (limit) {
      commits = commits.slice(0, limit);
    }

    return commits;
  },
});

/**
 * Get commit by SHA
 */
export const getBySha = query({
  args: { sha: v.string() },
  handler: async (ctx, { sha }) => {
    return await ctx.db
      .query("commits")
      .withIndex("bySha", (q) => q.eq("sha", sha))
      .unique();
  },
});

/**
 * Save commits (called from sync process)
 */
export const saveCommits = internalMutation({
  args: {
    repositoryId: v.id("repositories"),
    commits: v.array(
      v.object({
        sha: v.string(),
        message: v.string(),
        authorName: v.string(),
        authorEmail: v.string(),
        committedAt: v.number(),
        filesChanged: v.number(),
        additions: v.number(),
        deletions: v.number(),
        url: v.string(),
        branch: v.string(),
      })
    ),
  },
  handler: async (ctx, { repositoryId, commits }) => {
    let addedCount = 0;
    let skippedCount = 0;

    for (const commit of commits) {
      // Check if commit already exists
      const existing = await ctx.db
        .query("commits")
        .withIndex("bySha", (q) => q.eq("sha", commit.sha))
        .unique();

      if (existing) {
        skippedCount++;
        continue;
      }

      // Insert new commit
      await ctx.db.insert("commits", {
        repositoryId,
        sha: commit.sha,
        message: commit.message,
        authorName: commit.authorName,
        authorEmail: commit.authorEmail,
        committedAt: commit.committedAt,
        filesChanged: commit.filesChanged,
        additions: commit.additions,
        deletions: commit.deletions,
        url: commit.url,
        branch: commit.branch,
        processed: false,
        createdAt: Date.now(),
      });

      addedCount++;
    }

    return {
      success: true,
      added: addedCount,
      skipped: skippedCount,
      total: commits.length,
    };
  },
});

/**
 * Mark commits as processed (after content generation)
 */
export const markProcessed = mutation({
  args: {
    commitIds: v.array(v.id("commits")),
  },
  handler: async (ctx, { commitIds }) => {
    const user = await getCurrentUserOrThrow(ctx);

    for (const commitId of commitIds) {
      const commit = await ctx.db.get(commitId);
      if (!commit) continue;

      // Verify commit's repository belongs to user
      const repo = await ctx.db.get(commit.repositoryId);
      if (!repo || repo.userId !== user._id) {
        throw new Error("Access denied");
      }

      await ctx.db.patch(commitId, {
        processed: true,
      });
    }

    return { success: true, count: commitIds.length };
  },
});

/**
 * Get commit statistics for a repository
 */
export const getStats = query({
  args: { repositoryId: v.id("repositories") },
  handler: async (ctx, { repositoryId }) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Verify repository belongs to user
    const repo = await ctx.db.get(repositoryId);
    if (!repo || repo.userId !== user._id) {
      throw new Error("Repository not found or access denied");
    }

    const allCommits = await ctx.db
      .query("commits")
      .withIndex("byRepositoryId", (q) => q.eq("repositoryId", repositoryId))
      .collect();

    const processed = allCommits.filter((c) => c.processed);
    const unprocessed = allCommits.filter((c) => !c.processed);

    // Calculate total additions and deletions
    const totalAdditions = allCommits.reduce((sum, c) => sum + c.additions, 0);
    const totalDeletions = allCommits.reduce((sum, c) => sum + c.deletions, 0);
    const totalFiles = allCommits.reduce((sum, c) => sum + c.filesChanged, 0);

    return {
      total: allCommits.length,
      processed: processed.length,
      unprocessed: unprocessed.length,
      totalAdditions,
      totalDeletions,
      totalFiles,
    };
  },
});

/**
 * Get recent commits across all user's repositories
 */
export const getRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 10 }) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Get all user's repositories
    const repos = await ctx.db
      .query("repositories")
      .withIndex("byUserId", (q) => q.eq("userId", user._id))
      .collect();

    const repoIds = repos.map((r) => r._id);

    // Get commits from all repositories
    const allCommits = await Promise.all(
      repoIds.map(async (repoId) => {
        const commits = await ctx.db
          .query("commits")
          .withIndex("byRepositoryId", (q) => q.eq("repositoryId", repoId))
          .order("desc")
          .collect();
        return commits.slice(0, limit);
      })
    );

    // Flatten and sort by committedAt
    const flatCommits = allCommits.flat();
    flatCommits.sort((a, b) => b.committedAt - a.committedAt);

    return flatCommits.slice(0, limit);
  },
});

/**
 * Delete commits older than specified days
 */
export const deleteOlderThan = internalMutation({
  args: {
    repositoryId: v.id("repositories"),
    days: v.number(),
  },
  handler: async (ctx, { repositoryId, days }) => {
    const cutoffTime = Date.now() - days * 24 * 60 * 60 * 1000;

    const oldCommits = await ctx.db
      .query("commits")
      .withIndex("byRepositoryId", (q) => q.eq("repositoryId", repositoryId))
      .collect();

    let deletedCount = 0;

    for (const commit of oldCommits) {
      if (commit.committedAt < cutoffTime) {
        await ctx.db.delete(commit._id);
        deletedCount++;
      }
    }

    return { success: true, deleted: deletedCount };
  },
});
