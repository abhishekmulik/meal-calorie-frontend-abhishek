import { LOGIN_USER, REGISTER_USER } from "@/constants/api.utils";
import { apiFetch } from "./api";
import { LoginPayload, RegisterPayload, AuthResponse } from "@/types";


export async function registerUser(data: RegisterPayload) {
    return apiFetch<AuthResponse>(
      REGISTER_USER,
      {
        method: "POST",
        data: data,
      },
      { isAuthRequired: false }
    )
  }

  export async function loginUser(data: LoginPayload) {
    return apiFetch<AuthResponse>(
      LOGIN_USER,
      {
        method: "POST",
        data: data,
      },
      { isAuthRequired: false }
    )
  }
  