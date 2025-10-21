import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

// Query: Get all templates for a user
export const getUserTemplates = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return [];
    }

    const userId = user._id;

    const templates = await ctx.db
      .query("templates")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return templates;
  },
});

// Query: Get templates by category
export const getTemplatesByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return [];
    }

    const userId = user._id;

    const templates = await ctx.db
      .query("templates")
      .withIndex("byUserAndCategory", (q) =>
        q.eq("userId", userId).eq("category", args.category)
      )
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    return templates;
  },
});

// Query: Get active templates
export const getActiveTemplates = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return [];
    }

    const userId = user._id;

    const templates = await ctx.db
      .query("templates")
      .withIndex("byUserAndActive", (q) =>
        q.eq("userId", userId).eq("isActive", true)
      )
      .collect();

    return templates;
  },
});

// Mutation: Create a new template
export const createTemplate = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    category: v.string(),
    structure: v.string(),
    isDefault: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const userId = user._id;

    const now = Date.now();

    const templateId = await ctx.db.insert("templates", {
      userId,
      name: args.name,
      description: args.description,
      category: args.category,
      structure: args.structure,
      isDefault: args.isDefault ?? false,
      isActive: true,
      usageCount: 0,
      createdAt: now,
      updatedAt: now,
    });

    return templateId;
  },
});

// Mutation: Update a template
export const updateTemplate = mutation({
  args: {
    templateId: v.id("templates"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    structure: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const userId = user._id;

    const template = await ctx.db.get(args.templateId);
    if (!template || template.userId !== userId) {
      throw new Error("Template not found or unauthorized");
    }

    const updates: any = {
      updatedAt: Date.now(),
    };

    if (args.name !== undefined) updates.name = args.name;
    if (args.description !== undefined) updates.description = args.description;
    if (args.category !== undefined) updates.category = args.category;
    if (args.structure !== undefined) updates.structure = args.structure;
    if (args.isActive !== undefined) updates.isActive = args.isActive;

    await ctx.db.patch(args.templateId, updates);

    return args.templateId;
  },
});

// Mutation: Delete a template
export const deleteTemplate = mutation({
  args: {
    templateId: v.id("templates"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const userId = user._id;

    const template = await ctx.db.get(args.templateId);
    if (!template || template.userId !== userId) {
      throw new Error("Template not found or unauthorized");
    }

    // Don't delete default templates, just deactivate
    if (template.isDefault) {
      await ctx.db.patch(args.templateId, { isActive: false });
    } else {
      await ctx.db.delete(args.templateId);
    }

    return true;
  },
});

// Mutation: Increment template usage count
export const incrementTemplateUsage = mutation({
  args: {
    templateId: v.id("templates"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const userId = user._id;

    const template = await ctx.db.get(args.templateId);
    if (!template || template.userId !== userId) {
      throw new Error("Template not found or unauthorized");
    }

    await ctx.db.patch(args.templateId, {
      usageCount: template.usageCount + 1,
    });

    return true;
  },
});

// Mutation: Duplicate a template
export const duplicateTemplate = mutation({
  args: {
    templateId: v.id("templates"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const userId = user._id;

    const template = await ctx.db.get(args.templateId);
    if (!template || template.userId !== userId) {
      throw new Error("Template not found or unauthorized");
    }

    const now = Date.now();

    const newTemplateId = await ctx.db.insert("templates", {
      userId,
      name: `${template.name} (Copy)`,
      description: template.description,
      category: template.category,
      structure: template.structure,
      isDefault: false, // Copies are never default
      isActive: true,
      usageCount: 0,
      createdAt: now,
      updatedAt: now,
    });

    return newTemplateId;
  },
});
