"use client"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"

export default function blogPost(){
    const data=useQuery(api.posts.getPost)
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((post)=>(
                <Card key={post._id}>
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image src="https://unsplash.com/photos/the-word-dream-with-colorful-wavy-distortion-ufCsTMUMlOM" alt="Image"
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
       </main>
      
    )
}