import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
import { query } from "./_generated/server";

export const createPost = mutation({
  args: { title: v.string(),body:v.string() },
  
  handler: async (ctx, args) => {
    const user=await authComponent.safeGetAuthUser(ctx)//return the current user or null if the user is not found
    if(!user){
        throw new ConvexError("Not authenticated")
    }
    const blogArticle=await ctx.db.insert("posts",{
        body:args.body,
        title:args.title,
        authorId:user._id
    })
    return blogArticle;
  },
});

export const getPost=query({
    args: {},
  handler: async(ctx) => {
    const posts=await ctx.db.query("posts").order("desc").collect()
    return posts
  },
})