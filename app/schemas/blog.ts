import { title } from "process"
import z from "zod"

export const postSchema=z.object({
    title:z.string().min(3).max(30),
    body:z.string().min(5)
})