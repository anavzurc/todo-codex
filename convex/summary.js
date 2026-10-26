import { query } from "./_generated/server";
import { v } from "convex/values";

export const getSummary = query({
  args: {
    ownerId: v.string(),
  },

  handler: async (ctx) => {
    const identity =
      await ctx.auth.getUserIdentity();

  if (!identity) {
    return {
      total: 0,
      completed: 0,
      pending: 0,
    };
  }

    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_owner", (q) =>
        q.eq(
          "ownerId",
          identity.subject.split("|")[0]
        ))
      .collect();

    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.completed
    ).length;

    const pending =
      total - completed;

    return {
      total,
      completed,
      pending,
    };
  },
});