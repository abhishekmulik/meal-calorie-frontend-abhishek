"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import { LabeledField } from "../common/labeled-field"
import Link from "next/link"
import { LoginSchema, loginSchema } from "@/types/schemas/login-schema"
import { useLoginUser } from "@/hooks/useLoginUser"
import { ApiError, AuthResponse, LoginPayload } from "@/types"
import { useRouter } from "next/navigation"
import { DASHBOARD_ROUTE, REGISTER_ROUTE } from "@/constants"
import { authStore } from "@/stores/authStore"
import { SpinnerButton } from "../common/spinner-button"
import { handleAPIError } from "@/lib/error-handling"


export function LoginForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) })
  const router = useRouter();
  const { mutate: loginUser, isPending } = useLoginUser();
  const handleSuccess = (data: AuthResponse) => {
    router.push(DASHBOARD_ROUTE)
    authStore.getState().setToken(data.token)
    console.log(data)
  }
  const handleError = (error: ApiError) => {
    if(error.status_code === 422){
      setError("email",{
            type: "server",
            message: error.message, 
          })
          setError("password",{
            type: "server",
            message: error.message, 
          })
          return
    }
    handleAPIError(error);
  }
  const onSubmit = (data: LoginSchema) => {
    const payload: LoginPayload = {
      email: data.email,
      password: data.password
    }
    loginUser(payload, {
      onSuccess: (res) => handleSuccess(res),
      onError: (error: ApiError) => handleError(error)
    })
    console.log(data)
  }


  return <div>
  <form
    noValidate
    onSubmit={handleSubmit(onSubmit)}
    className="p-6 md:p-8 order-1"
  >
    <FieldGroup className="gap-5">
      <div className="flex items-center gap-2 text-center flex-col">
        <h1 className="text-2xl font-bold">Login to your Account</h1>
      </div>
      <Field>
        <LabeledField inputProps={{ disabled: isPending }} label="Email" type="email" registration={register("email")} error={errors.email} />
      </Field>
      <Field>
        <LabeledField inputProps={{ disabled: isPending }} label="Password" type="password" registration={register("password")} error={errors.password} />
      </Field>
      <SpinnerButton type="submit" disabled={isPending}
        isLoading={isPending}
        loadingText="Logging in">
        Login
      </SpinnerButton>
      <Field>
        <FieldDescription className="px-6 text-center">
          Don't have an account? <Link href={REGISTER_ROUTE} className="font-medium text-primary hover:underline">Register</Link>
        </FieldDescription>
      </Field>
    </FieldGroup>
  </form>
  </div>
}