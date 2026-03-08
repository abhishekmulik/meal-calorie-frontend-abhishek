import { authStore } from "@/stores/authStore"
import { ApiError } from "@/types"
import axios, { AxiosError, AxiosRequestConfig } from "axios"

const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL

export const apiClient = axios.create({
  baseURL: BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
})

export async function apiFetch<T>(
    path: string,
    options: AxiosRequestConfig = {},
    isAuthRequired: { isAuthRequired?: boolean } = { isAuthRequired: true }
  ): Promise<T> {
    try {
      const token = authStore.getState().token
      const shouldAttachAuth = isAuthRequired?.isAuthRequired !== false
      const res = await apiClient({
        url: path,
        ...options,
        headers: {
          ...apiClient.defaults.headers.common,
          ...(options.headers ?? {}),
          ...(shouldAttachAuth && token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
  
      return res.data
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ApiError>
      const errorBody = axiosError.response?.data ?? null

      const apiError: ApiError = {
        error: errorBody?.error ?? "API_ERROR",
        message: errorBody?.message ?? "API request failed",
        status_code: errorBody?.status_code ?? axiosError.response?.status ?? 500,
        retryAfter: errorBody?.retryAfter,
      }
  
      throw apiError
    }
  }
