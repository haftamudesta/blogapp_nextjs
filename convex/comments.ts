import { query } from "./_generated/server";
import { v } from "convex/values";

export const getCommentsByPostId=query({
    args:{
        postId:v.id("posts")
    },
    handler:async(ctx,args)=>{
        const data=await ctx.db.query("comments").filter((q)=>q.eq(q.field("postId"),args.postId)).order("desc").collect()
        return data;
    }
})