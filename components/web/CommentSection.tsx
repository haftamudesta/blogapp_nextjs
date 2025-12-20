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

interface iAppProps{
  comments:{
    id: Id<"comments">;
    _creationTime: number;
    postId: Id<"posts">;
    body: string;
    autherId: string;
    autherName: string;
  }
}
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
            <CardContent>
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
              
            </CardContent>
        </Card>
    </div>
  )
}

export default CommentSection