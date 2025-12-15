"use client"

import { Controller, useForm } from "react-hook-form";
import { logInSchema, } from '@/app/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function Loginpage(){
    const router=useRouter()
     const [isPending, startTransition] = useTransition();
    const form=useForm({
        resolver:zodResolver(logInSchema),
        defaultValues:{
          email:"",
          password:""
        }
      })

      const onHandleSubmit=async(data:z.infer<typeof logInSchema>)=>{
        startTransition(async()=>{
            await authClient.signIn.email({
            email:data.email,
            password:data.password,
            fetchOptions:{
                    onSuccess:()=>{toast.success("Logged In successfully1")
                    router.push("/")
                    },
                    onError:(error)=>{toast.error(error.error.message)}
                }
          })
        })
        }
    return (
        <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Use Your Email and Password to Sign In</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onHandleSubmit)}>
          <FieldGroup className="gap-y-8">
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input aria-invalid={fieldState.invalid} type="email" placeholder="example@email.com" {...field} />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input aria-invalid={fieldState.invalid} type="password" placeholder="Enter your password" {...field} />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
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
                    (<span>Sign In</span>)}
              </button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
    )
}