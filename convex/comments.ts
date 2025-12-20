import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

export const getCommentsByPostId=query({
    args:{
        postId:v.id("posts")
    },
    handler:async(ctx,args)=>{
        const data=await ctx.db.query("comments").filter((q)=>q.eq(q.field("postId"),args.postId)).order("desc").collect()
        return data;
    }
})

export const createComment=mutation({
    args:{
        body:v.string(),
        postId:v.id("posts")
    },
    handler:async(ctx,args)=>{
        const currentUser=await authComponent.safeGetAuthUser(ctx);
        if(!currentUser){
                throw new ConvexError("Not authenticated")
            }
        return await ctx.db.insert(("comments"),{
            postId:args.postId,
            body:args.body,
            autherId:currentUser._id,
            autherName:currentUser.name
        })

    }
})