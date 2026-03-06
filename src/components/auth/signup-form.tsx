"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"

import { LabeledField } from "../ui/labeled-field"
import { registerSchema, RegisterSchema } from "@/app/(auth)/register/schemas/register-schema"
import Link from "next/link"


export function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) })
  const onSubmit = (data: RegisterSchema) => {
    console.log(data)
  }


  return <form
    noValidate
    onSubmit={handleSubmit(onSubmit)}
    className="p-6 md:p-8 order-1"
  >
    <FieldGroup className="gap-5">
      <div className="flex items-center gap-2 text-center flex-col">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to register to the app
        </p>
      </div>

      <Field className="grid  gap-4 grid-cols-2">
        <LabeledField
          label="First name"
          type="text"
          registration={register("firstName")}
          error={errors.firstName}
        />
        <LabeledField
          label="Last name"
          type="text"
          registration={register("lastName")}
          error={errors.lastName}
        />
      </Field>

      <Field>
        <LabeledField
          label="Email"
          type="email"
          placeholder="Enter email"
          registration={register("email")}
          error={errors.email}
        />
      </Field>
      <Field className="grid  gap-4 grid-cols-2">
        <LabeledField
          label="Password"
          type="password"
          registration={register("password")}
          error={errors.password}
        />
        <LabeledField
          label="Confirm Password"
          type="password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword}
        />
      </Field>
      <FieldDescription>
        Password must be at least 8 characters and contain a number.
      </FieldDescription>
      <Button type="submit">
        Create Account
      </Button>
      <Field>
      <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </FieldDescription>
      </Field>
    </FieldGroup>
  </form>

}