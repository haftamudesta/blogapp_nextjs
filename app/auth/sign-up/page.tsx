"use client"

import { signUpSchema } from "@/app/schemas/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  const form=useForm({
    resolver:zodResolver(signUpSchema),
    defaultValues:{
      name:"",
      email:"",
      password:""
    }
  })
  const onHandleSubmit=()=>{
    console.log("handle it")
  }
  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onHandleSubmit)}>
          <FieldGroup className="gap-y-8">
            <Controller name="name" control={form.control} render={({field,fieldState})=>(
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Input aria-invalid={fieldState.invalid} placeholder="Haftamu Desta" {...field} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )} />
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
              >
                Sign Up
              </button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
    </>
  );
}