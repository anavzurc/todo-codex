import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getTasks = query({
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

    return tasks.sort(
      (a, b) => b.createdAt - a.createdAt
    );
  },
});

export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    ownerId: v.string(),
  },

  handler: async (ctx, args) => {
    const now = Date.now();

    const id = await ctx.db.insert("tasks", {
      title: args.title,
      description: args.description,
      completed: false,

      ownerId: args.ownerId,

      createdAt: now,
      updatedAt: now,
    });

    return id;
  },
});

export const updateTask = mutation({
  args: {
    id: v.id("tasks"),

    title: v.optional(v.string()),
    description: v.optional(v.string()),
    completed: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);

    if (!task) {
      throw new Error("Tarefa não encontrada");
    }

    await ctx.db.patch(args.id, {
      ...(args.title !== undefined && {
        title: args.title,
      }),

      ...(args.description !== undefined && {
        description: args.description,
      }),

      ...(args.completed !== undefined && {
        completed: args.completed,
      }),

      updatedAt: Date.now(),
    });
  },
});

export const deleteTask = mutation({
  args: {
    id: v.id("tasks"),
  },

  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);

    if (!task) {
      throw new Error("Tarefa não encontrada");
    }

    await ctx.db.delete(args.id);
  },
});