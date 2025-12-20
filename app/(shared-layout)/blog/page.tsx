
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"
import { fetchQuery } from "convex/nextjs";
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function blogPost(){
    
    return(
       <main className="py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Our Blog
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Latest insights and updates from our team
            </p>
        </div>
        <Suspense fallback={<SkeletonLoadingUi/>}>
            <FetchBlogLists/>
        </Suspense>
       </main>
      
    )
}

async function FetchBlogLists(){
const data=await fetchQuery(api.posts.getPost);
return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((post)=>(
                <Card key={post._id}>
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image src={post.imageUrl ?? "https://unsplash.com/photos/people-relaxing-in-a-sunlit-lobby-with-large-windows-oT2RQPUDiFk"} alt="Image"
                        fill
                        />
                    </div>
                    <CardContent>
                        <Link href={`/blog/${post._id}`}>
                        <h1 className="text-2xl font-extrabold hover:text-blue-400">{post.title}</h1>
                        </Link>
                        <p className="text-muted-foreground line-clamp-3">{post.body}</p>
                    </CardContent>
                    <CardFooter>
                        <Link className={buttonVariants({className:"w-full",})} href={`/blog/${post._id}`}>
                        read more
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
)
}

function SkeletonLoadingUi(){
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_,i)=>(
                <div className="flex flex-col space-y-3" key={i}>
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <div className="space-y-2 flex flex-col">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            ))}
        </div>
    )
}