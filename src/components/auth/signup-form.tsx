"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"

import { LabeledField } from "../common/labeled-field"
import { registerSchema, RegisterSchema } from "@/types/schemas/register-schema"
import Link from "next/link"
import { useCreateUser } from "@/hooks/useCreateUser"
import { authStore } from "@/stores/authStore"
import { RegisterPayload, AuthResponse, ApiError } from "@/types"
import { useRouter } from "next/navigation"
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "@/constants"
import { SpinnerButton } from "../common/spinner-button"
import { handleAPIError } from "@/lib/error-handling"


export function SignupForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) })
  const {mutate: createUser, isPending} = useCreateUser();
  const router = useRouter();

  const handleSuccess = (res: AuthResponse) =>{
    authStore.getState().setToken(res.token)
    router.push(DASHBOARD_ROUTE)
    console.log(res)
  }

  const handleError = (err:ApiError) => {
    const error = handleAPIError(err);
    if(error){
      setError("email", {
        type: "server",
        message: error.message,
      })
    }
  }

  const onSubmit = (data: RegisterSchema) => {
    const payload: RegisterPayload = {
      email: data.email,
      password:data.password,
      first_name: data.firstName,
      last_name: data.lastName
    }
    createUser(payload, {
      onSuccess: (res)=>{
        console.log(res)
        handleSuccess(res)
      },
      onError: (err: ApiError)=>handleError(err)
    })
  }


  return <form
    noValidate
    onSubmit={handleSubmit(onSubmit)}
    className="p-6 md:p-8 order-1"
  >
    <FieldGroup className="gap-5">
      <div className="flex items-center gap-2 text-center flex-col">
        <h1 className="text-2xl font-bold">Create your account</h1>
      </div>

      <Field className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <LabeledField
          label="First name"
          type="text"
          registration={register("firstName")}
          error={errors.firstName}
          inputProps={{ disabled: isPending }}
          
        />
        <LabeledField
          label="Last name"
          type="text"
          registration={register("lastName")}
          error={errors.lastName}
          inputProps={{ disabled: isPending }}
        />
      </Field>

      <Field>
        <LabeledField
          label="Email"
          type="email"
          registration={register("email")}
          error={errors.email}
          inputProps={{ disabled: isPending }}
        />
      </Field>
      <Field className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <LabeledField
          label="Password"
          type="password"
          registration={register("password")}
          error={errors.password}
          inputProps={{ disabled: isPending }}
        />
        <LabeledField
          label="Confirm Password"
          type="password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword}
          inputProps={{ disabled: isPending }}
        />
      </Field>
      <FieldDescription>
        Password must be at least 8 characters long.
      </FieldDescription>
      <SpinnerButton type="submit" 
        disabled={isPending}
        isLoading={isPending}
        loadingText="Creating account...">
        Create Account
      </SpinnerButton>
      <Field>
      <FieldDescription className="px-6 text-center">
            Already have an account? <Link href={LOGIN_ROUTE} className="font-medium text-primary hover:underline">Sign in</Link>
          </FieldDescription>
      </Field>
    </FieldGroup>
  </form>

}