'use server'

import z from "zod";
import { fetchMutation } from "convex/nextjs";
import { postSchema } from "./schemas/blog";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";


export async function createBlogAction(valuess:z.infer<typeof postSchema>){
    const parsed=postSchema.safeParse(valuess)
    if(!parsed.success){
        throw new Error("Some thing want wrong!!")
    }
    const token=await getToken();
    await fetchMutation(api.posts.createPost,{
        body:parsed.data?.content,
        title:parsed.data?.title,
    },{token})
    return redirect("/")
}

