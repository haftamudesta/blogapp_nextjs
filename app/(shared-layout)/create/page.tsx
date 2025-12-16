"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import z from "zod"
import { postSchema } from "@/app/schemas/blog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function createPostPage(){
    const mutation=useMutation(api.posts.createPost)
    const [isPending, startTransition] = useTransition();
    const router=useRouter()
    const form=useForm({
        resolver:zodResolver(postSchema),
        defaultValues:{
          title:"",
          content:""
        }
      })
      const onSubmit=(values:z.infer<typeof postSchema>)=>{
        startTransition(()=>{
            mutation({
            title:values.title,
            body:values.content
        })
        toast.success("Post Created successfully1")
        router.push("/")
        })
      }
    return (
        <main className="py-12">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl underline-offset-4">
                    Create Post
                </h1>
                <p className="text-xl text-muted-foreground mt-4 mb-4">
                    Share your thoughts, ideas, and expertise with us.
                </p>
            </div>
            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>
                        Create Blog Article
                    </CardTitle>
                    <CardDescription>
                        Create a new Blog Article
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-y-8">
                            <Controller name="title" control={form.control} render={({field,fieldState})=>(
                                <Field>
                                <FieldLabel>Title</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="Enter title" {...field} />
                                {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                           )} />

                           <Controller name="content" control={form.control} render={({field,fieldState})=>(
                                <Field>
                                <FieldLabel>Content</FieldLabel>
                                <Textarea aria-invalid={fieldState.invalid} placeholder="Enter your content" {...field} />
                                {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                           )} />
                           <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                disabled={isPending}
              >
                {isPending?(
                    <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Loading...</span>
                    </>):
                    (<span>Create Post</span>)}
              </button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}