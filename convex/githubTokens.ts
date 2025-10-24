import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser, getCurrentUserOrThrow } from "./users";

/**
 * NOTE: Tokens are stored as-is in Convex database
 * Convex database is encrypted at rest and access-controlled
 * For additional encryption, implement using actions with "use node" directive
 */

/**
 * Store a GitHub access token for a user (internal - called from webhooks/actions)
 */
export const store = internalMutation({
  args: {
    userId: v.id("users"),
    accessToken: v.string(),
    tokenType: v.string(),
    scope: v.string(),
    expiresAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Check if user already has a token
    const existing = await ctx.db
      .query("githubTokens")
      .withIndex("byUserId", (q) => q.eq("userId", args.userId))
      .unique();

    const tokenData = {
      userId: args.userId,
      accessToken: args.accessToken,
      tokenType: args.tokenType,
      scope: args.scope,
      expiresAt: args.expiresAt,
      createdAt: Date.now(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, tokenData);
    } else {
      await ctx.db.insert("githubTokens", tokenData);
    }

    return { success: true };
  },
});

/**
 * Store a GitHub access token (public - can be called from API routes)
 */
export const storePublic = mutation({
  args: {
    userId: v.id("users"),
    accessToken: v.string(),
    tokenType: v.string(),
    scope: v.string(),
    expiresAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Same logic as internal mutation
    const existing = await ctx.db
      .query("githubTokens")
      .withIndex("byUserId", (q) => q.eq("userId", args.userId))
      .unique();

    const tokenData = {
      userId: args.userId,
      accessToken: args.accessToken,
      tokenType: args.tokenType,
      scope: args.scope,
      expiresAt: args.expiresAt,
      createdAt: Date.now(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, tokenData);
    } else {
      await ctx.db.insert("githubTokens", tokenData);
    }

    return { success: true };
  },
});

/**
 * Get GitHub access token for current user
 */
export const get = query({
  args: {},
  handler: async (ctx): Promise<string | null> => {
    const user = await getCurrentUserOrThrow(ctx);

    const tokenRecord = await ctx.db
      .query("githubTokens")
      .withIndex("byUserId", (q) => q.eq("userId", user._id))
      .unique();

    if (!tokenRecord) {
      return null;
    }

    return tokenRecord.accessToken;
  },
});

/**
 * Check if current user has a GitHub token
 */
export const hasToken = query({
  args: {},
  handler: async (ctx): Promise<boolean> => {
    const user = await getCurrentUser(ctx);
    if (!user) return false;

    const tokenRecord = await ctx.db
      .query("githubTokens")
      .withIndex("byUserId", (q) => q.eq("userId", user._id))
      .unique();

    return tokenRecord !== null;
  },
});

/**
 * Delete GitHub token for current user
 */
export const remove = internalMutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, { userId }) => {
    const tokenRecord = await ctx.db
      .query("githubTokens")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .unique();

    if (tokenRecord) {
      await ctx.db.delete(tokenRecord._id);
    }

    return { success: true };
  },
});

/**
 * Get GitHub token by userId (for server-side API routes)
 */
export const getByUserId = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, { userId }): Promise<string | null> => {
    const tokenRecord = await ctx.db
      .query("githubTokens")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .unique();

    if (!tokenRecord) {
      return null;
    }

    return tokenRecord.accessToken;
  },
});
