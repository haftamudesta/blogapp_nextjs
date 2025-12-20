import { Id } from "@/convex/_generated/dataModel"
import z from "zod"

export const commentSchema=z.object({
    body:z.string().min(3,"Comment should have at list three characters"),
    postId:z.custom<Id<"posts">>()
})