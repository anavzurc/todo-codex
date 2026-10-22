import { query } from "./_generated/server";
import { v } from "convex/values";

export const getSummary = query({
  args: {
    ownerId: v.string(),
  },

  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_owner", (q) =>
        q.eq("ownerId", args.ownerId)
      )
      .collect();

    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.completed
    ).length;

    const pending = total - completed;

    return {
      total,
      completed,
      pending,
    };
  },
});