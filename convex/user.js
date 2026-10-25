import { query } from "./_generated/server";

export const currentUser = query({
  handler: async (ctx) => {
    const identity =
      await ctx.auth.getUserIdentity();

    return identity;
  },
});

export const currentUserId = query({
  handler: async (ctx) => {
    const identity =
      await ctx.auth.getUserIdentity();

    return identity?.subject ?? null;
  },
});