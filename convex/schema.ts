import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { paymentAttemptSchemaValidator } from "./paymentAttemptTypes";

export default defineSchema({
    users: defineTable({
      name: v.string(),
      // this the Clerk ID, stored in the subject JWT field
      externalId: v.string(),
    }).index("byExternalId", ["externalId"]),

    paymentAttempts: defineTable(paymentAttemptSchemaValidator)
      .index("byPaymentId", ["payment_id"])
      .index("byUserId", ["userId"])
      .index("byPayerUserId", ["payer.user_id"]),

    // GitHub Repositories
    repositories: defineTable({
      userId: v.id("users"),
      githubRepoId: v.number(),
      name: v.string(),
      fullName: v.string(),
      owner: v.string(),
      url: v.string(),
      defaultBranch: v.string(),
      language: v.optional(v.string()),
      isActive: v.boolean(),
      isPrivate: v.boolean(),
      webhookId: v.optional(v.number()),
      lastSyncedAt: v.number(),
      createdAt: v.number(),
    })
      .index("byUserId", ["userId"])
      .index("byGithubRepoId", ["githubRepoId"])
      .index("byUserAndActive", ["userId", "isActive"]),

    // GitHub Commits
    commits: defineTable({
      repositoryId: v.id("repositories"),
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
      processed: v.boolean(), // for content generation tracking
      createdAt: v.number(),
    })
      .index("byRepositoryId", ["repositoryId"])
      .index("bySha", ["sha"])
      .index("byProcessedStatus", ["repositoryId", "processed"]),

    // GitHub Access Tokens (encrypted)
    githubTokens: defineTable({
      userId: v.id("users"),
      accessToken: v.string(), // will be encrypted
      tokenType: v.string(),
      scope: v.string(),
      expiresAt: v.optional(v.number()),
      createdAt: v.number(),
    })
      .index("byUserId", ["userId"]),

    // Content Templates
    templates: defineTable({
      userId: v.id("users"),
      name: v.string(),
      description: v.optional(v.string()),
      category: v.string(), // "tutorial", "release-notes", "how-to", "deep-dive", "weekly-update", "custom"
      structure: v.string(), // template content with {{placeholders}}
      isDefault: v.boolean(), // system template vs user-created
      isActive: v.boolean(),
      usageCount: v.number(), // track how often used
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("byUserId", ["userId"])
      .index("byUserAndCategory", ["userId", "category"])
      .index("byUserAndActive", ["userId", "isActive"]),

    // Tone of Voice Presets
    toneOfVoice: defineTable({
      userId: v.id("users"),
      name: v.string(),
      description: v.optional(v.string()),
      settings: v.object({
        formality: v.string(), // "casual", "professional", "formal"
        technicalDepth: v.string(), // "beginner-friendly", "intermediate", "advanced"
        personality: v.array(v.string()), // ["friendly", "concise", "detailed", "humorous"]
        targetAudience: v.optional(v.string()),
        examplePhrases: v.optional(v.array(v.string())),
      }),
      isDefault: v.boolean(),
      isActive: v.boolean(),
      usageCount: v.number(),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("byUserId", ["userId"])
      .index("byUserAndActive", ["userId", "isActive"]),
  });