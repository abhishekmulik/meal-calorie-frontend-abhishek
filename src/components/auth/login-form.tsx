"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import { LoginSchema, loginSchema } from "@/app/(auth)/login/schemas/login-schema"
import { LabeledField } from "../ui/labeled-field"
import Link from "next/link"


export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) })
  const onSubmit = (data: LoginSchema) => {
    console.log(data)
  }


  return <form
    noValidate
    onSubmit={handleSubmit(onSubmit)}
    className="p-6 md:p-8 order-1"
  >
    <FieldGroup className="gap-5">
      <div className="flex items-center gap-2 text-center flex-col">
        <h1 className="text-2xl font-bold">Login to your Account</h1>
      </div>
      <Field>
          <LabeledField label="Email" type="email" registration={register("email")} error={errors.email}/>
      </Field>
      <Field>
          <LabeledField label="Password" type="password" registration={register("password")} error={errors.password}/>
      </Field>
      <Button type="submit">
        Login
      </Button>
      <Field>
      <FieldDescription className="px-6 text-center">
            Don't have an account? <Link href="/register" className="font-medium text-primary hover:underline">Register</Link>
      </FieldDescription>
      </Field>
    </FieldGroup>
  </form>

}