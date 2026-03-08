"use client"

import { registerUser } from "@/lib/auth"
import { ApiError, AuthResponse, RegisterPayload } from "@/types"
import { useMutation } from "@tanstack/react-query"

export function useCreateUser() {
  return useMutation<AuthResponse, ApiError, RegisterPayload>({
    mutationFn: registerUser,
  })
}
