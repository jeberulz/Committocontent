import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Temporary mutation to manually create a user
 * Use this if webhook isn't set up yet
 *
 * Call this from Convex dashboard with:
 * {
 *   "externalId": "user_34NaxjPBS1QFbMrdlcRej8bGSOf",
 *   "name": "jeberulz"
 * }
 */
export const createManualUser = mutation({
  args: {
    externalId: v.string(),
    name: v.string(),
  },
  handler: async (ctx, { externalId, name }) => {
    console.log("createManualUser called with:", { externalId, name });

    // Check if user already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", externalId))
      .unique();

    console.log("Existing user check:", existing);

    if (existing) {
      return { success: true, message: "User already exists", userId: existing._id };
    }

    // Create user
    console.log("Inserting new user...");
    const userId = await ctx.db.insert("users", {
      externalId,
      name,
    });

    console.log("User created with ID:", userId);
    return { success: true, message: "User created successfully!", userId };
  },
});
