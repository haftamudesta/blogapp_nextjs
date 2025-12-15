"use client"

import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { ThemeToggle } from "./theme-toggle"
import {useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const {isAuthenticated,isLoading}=useConvexAuth()
    const router=useRouter()
  return (
    <nav className="w-full py-5 flex items-center justify-between">
        <div className="flex items-center gap-12">
            <Link href={"/"}>
            <h1 className="text-4xl font-bold">
                My <span className="text-sky-500">BlogApp</span>
            </h1>
            </Link>
            <div className="flex items-center gap-4">
                <Link className={buttonVariants({variant:"ghost"})} href={"/"}>Home</Link>
                <Link className={buttonVariants({variant:"ghost"})} href={"/blog"}>Blog</Link>
                <Link className={buttonVariants({variant:"ghost"})} href={"/create"}>Creat</Link>
            </div>
        </div>
        <div className="flex items-center gap-4 mr-4">
        {isLoading?null:isAuthenticated?(
            <Button onClick={()=>authClient.signOut({
                fetchOptions:{
                    onSuccess:()=>{toast.success("Logged out successfully1")
                    router.push("/")
                    },
                    onError:(error)=>{toast.error(error.error.message)}
                }
            })}>
                Log Out
            </Button>
        ):(
        <>
        
            <Link className={buttonVariants()} href={"/auth/sign-up"}>Sign Up</Link>
            <Link className={buttonVariants({variant:"outline"})} href={"/auth/login"}>Log In</Link>
        </>
        )}
        
        <ThemeToggle />
        </div>
    </nav>
  )
}

export default Navbar