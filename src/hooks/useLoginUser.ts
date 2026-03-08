"use client"

import { loginUser } from "@/lib/auth"
import { ApiError, AuthResponse, LoginPayload } from "@/types"
import { useMutation } from "@tanstack/react-query"

export function useLoginUser() {
    return useMutation<AuthResponse, ApiError, LoginPayload>({
      mutationFn: loginUser
    })
  }