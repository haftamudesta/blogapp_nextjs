import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

interface postIdProps{
    params:Promise<{postId:Id<"posts">}>
}

export default async function PostDetail({params}:postIdProps){
    
    return (
        <main className="max-w-3xs mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
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
            <div className="w-full relative `h-400px` mb-4 rounded-xl overflow-hidden shadow-sm">
            </div>
        </main>
    )
}