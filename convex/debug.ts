import { query } from "./_generated/server";

/**
 * Debug query to see what Convex auth sees
 */
export const checkAuth = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return {
        hasIdentity: false,
        identity: null,
        allUsers: await ctx.db.query("users").collect(),
      };
    }

    const user = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", identity.subject))
      .unique();

    return {
      hasIdentity: true,
      identity: {
        subject: identity.subject,
        issuer: identity.issuer,
        tokenIdentifier: identity.tokenIdentifier,
      },
      userFound: user !== null,
      user,
      allUsers: await ctx.db.query("users").collect(),
    };
  },
});
