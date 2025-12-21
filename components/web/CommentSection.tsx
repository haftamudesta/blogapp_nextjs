"use client"

import { MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from '@hookform/resolvers/zod';
import { commentSchema } from "@/app/schemas/comment";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CommentSection = () => {
   const params=useParams<{postId:Id<"posts">}>();
   const comments=useQuery(api.comments.getCommentsByPostId,{postId:params.postId})
  const [isPending, startTransition] = useTransition();
  const createCommentMutation=useMutation(api.comments.createComment)
  const form=useForm({
      resolver:zodResolver(commentSchema),
      defaultValues:{
        body:"",
        postId:params.postId,
      }
    })
    const onSubmit=(data:z.infer<typeof commentSchema>)=>{
      startTransition(async()=>{
        try {
        await createCommentMutation(data);
        form.reset()
        toast.success("Comment posted successfully")
      } catch (error) {
        toast.error("Faild to create comment!!!")
      }
      })
    }
  return (
    <div>
        <Card>
            <CardHeader className="flex flex-row items-center gap-2">
                <MessageSquare className="size-5" />
                <h1 className="text-sl font-bold">
                  {comments?.length} comments
                </h1>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <Controller name="body" control={form.control} render={({field,fieldState})=>(
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Textarea aria-invalid={fieldState.invalid} placeholder="share your idea here" {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
               )} />
               <Button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                disabled={isPending}
              >
                {isPending?(
                    <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Loading...</span>
                    </>):
                    (<span>Add Comment</span>)}
              </Button>
              </form>
              
                {comments && comments.length > 0 && (
                  <section className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment._id} className="flex gap-4">
                        <Avatar className="size-10 shrink-0">
                          <AvatarImage src={`https://avatar.vercel.sh/${comment.autherName}`} alt={comment.autherName}/>
                          <AvatarFallback>
                            {comment.autherName.slice(0,2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold">
                              {comment.autherName.split(" ")[0]}
                            </p>
                            <p className="text-muted-foregroun text-sm">
                              {new Date(comment._creationTime).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                            {comment.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </section>
                )}
              
            </CardContent>
        </Card>
    </div>
  )
}

export default CommentSection