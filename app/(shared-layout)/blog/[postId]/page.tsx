import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/web/CommentSection";
import { Metadata } from "next";
import UserPresence from "@/components/web/UserPresence";
import { getToken } from "@/lib/auth-server";
import { redirect } from "next/navigation";

interface postIdProps{
    params:Promise<{postId:Id<"posts">}>
}

export async function generateMetadata({params}:postIdProps):Promise<Metadata>{
    const {postId}=await params;
    const post=await fetchQuery(api.posts.getPostById,{postId:postId});
    if(!post){
        return {title:"Post not Found"}
    }
    return {
        title:post.title,
        description:post.body,
    }
}

export default async function PostDetail({params}:postIdProps){
    const {postId}=await params
    const token=await getToken()
    console.log(token)
    const post=await fetchQuery(api.posts.getPostById,{postId:postId});
    const userId=await fetchQuery(api.presence.getUserId,{},{token})
    // let comments=await fetchQuery(api.comments.getCommentsByPostId,{postId:postId})
    if(!post){
        return(
            <h1 className="text-4xl animate-pulse">Post Not Found</h1>
        )
    }
    if(!userId){
       return redirect("/auth/login")
    }
    return (
        <main className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
            <Link href="/blog" className={cn(
        buttonVariants({ variant: "ghost" }),
        "gap-2", 
        "px-4 py-2", 
        "rounded-lg", 
        "hover:bg-blue-50", 
        "dark:hover:bg-blue-900/20", 
        "transition-colors duration-200",
        "border border-gray-200", 
        "shadow-sm hover:shadow-md", 
        "text-gray-700 hover:text-gray-900", 
        "dark:border-gray-700",
        "dark:text-gray-300 dark:hover:text-gray-100"
      )}>
            <ArrowLeft className="size-4" />
            <span>Go to Blogs</span>
            </Link>
            <div className="w-full relative h-100 mb-4 rounded-xl overflow-hidden shadow-sm">
                <Image src={post.imageUrl ??"/images/javascript.png"} alt={post.title}
                fill
                className="object-cover hover:scale-120 transition-transform duration-300"
                priority 
                />
            </div>
            <div className="space-y-4 flex flex-col">
                <h1 className="text-5xl font-bold tracking-tight text-foreground">{post.title}</h1>
                <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">Posted on {new Date(post._creationTime).toLocaleDateString()}</p>
                     {userId && (<UserPresence roomId={post._id} userId={userId} />)} 
                </div>
            </div>
            <Separator className="my-4 h-4! bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <p className="text-lg leading-relaxed text-foreground/95">
            {post.body}
            </p>
            <Separator className="my-4 h-4! bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <CommentSection />
        </main>
    )
}