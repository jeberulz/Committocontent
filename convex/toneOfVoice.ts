import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

// Query: Get all tone of voice presets for a user
export const getUserTonePresets = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return [];
    }

    const userId = user._id;

    const presets = await ctx.db
      .query("toneOfVoice")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return presets;
  },
});

// Query: Get active tone presets
export const getActiveTonePresets = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return [];
    }

    const userId = user._id;

    const presets = await ctx.db
      .query("toneOfVoice")
      .withIndex("byUserAndActive", (q) =>
        q.eq("userId", userId).eq("isActive", true)
      )
      .collect();

    return presets;
  },
});

// Mutation: Create a new tone preset
export const createTonePreset = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    settings: v.object({
      formality: v.string(),
      technicalDepth: v.string(),
      personality: v.array(v.string()),
      targetAudience: v.optional(v.string()),
      examplePhrases: v.optional(v.array(v.string())),
    }),
    isDefault: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const userId = user._id;

    const now = Date.now();

    const presetId = await ctx.db.insert("toneOfVoice", {
      userId,
      name: args.name,
      description: args.description,
      settings: args.settings,
      isDefault: args.isDefault ?? false,
      isActive: true,
      usageCount: 0,
      createdAt: now,
      updatedAt: now,
    });

    return presetId;
  },
});

// Mutation: Update a tone preset
export const updateTonePreset = mutation({
  args: {
    presetId: v.id("toneOfVoice"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    settings: v.optional(
      v.object({
        formality: v.string(),
        technicalDepth: v.string(),
        personality: v.array(v.string()),
        targetAudience: v.optional(v.string()),
        examplePhrases: v.optional(v.array(v.string())),
      })
    ),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const userId = user._id;

    const preset = await ctx.db.get(args.presetId);
    if (!preset || preset.userId !== userId) {
      throw new Error("Preset not found or unauthorized");
    }

    const updates: any = {
      updatedAt: Date.now(),
    };

    if (args.name !== undefined) updates.name = args.name;
    if (args.description !== undefined) updates.description = args.description;
    if (args.settings !== undefined) updates.settings = args.settings;
    if (args.isActive !== undefined) updates.isActive = args.isActive;

    await ctx.db.patch(args.presetId, updates);

    return args.presetId;
  },
});

// Mutation: Delete a tone preset
export const deleteTonePreset = mutation({
  args: {
    presetId: v.id("toneOfVoice"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const userId = user._id;

    const preset = await ctx.db.get(args.presetId);
    if (!preset || preset.userId !== userId) {
      throw new Error("Preset not found or unauthorized");
    }

    // Don't delete default presets, just deactivate
    if (preset.isDefault) {
      await ctx.db.patch(args.presetId, { isActive: false });
    } else {
      await ctx.db.delete(args.presetId);
    }

    return true;
  },
});

// Mutation: Increment preset usage count
export const incrementPresetUsage = mutation({
  args: {
    presetId: v.id("toneOfVoice"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const userId = user._id;

    const preset = await ctx.db.get(args.presetId);
    if (!preset || preset.userId !== userId) {
      throw new Error("Preset not found or unauthorized");
    }

    await ctx.db.patch(args.presetId, {
      usageCount: preset.usageCount + 1,
    });

    return true;
  },
});

// Mutation: Duplicate a tone preset
export const duplicateTonePreset = mutation({
  args: {
    presetId: v.id("toneOfVoice"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const userId = user._id;

    const preset = await ctx.db.get(args.presetId);
    if (!preset || preset.userId !== userId) {
      throw new Error("Preset not found or unauthorized");
    }

    const now = Date.now();

    const newPresetId = await ctx.db.insert("toneOfVoice", {
      userId,
      name: `${preset.name} (Copy)`,
      description: preset.description,
      settings: preset.settings,
      isDefault: false, // Copies are never default
      isActive: true,
      usageCount: 0,
      createdAt: now,
      updatedAt: now,
    });

    return newPresetId;
  },
});
