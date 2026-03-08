import { authStore } from "@/stores/authStore"
import { ApiError } from "@/types"
import axios from "axios"

const BASE_URI = process.env.NEXT_PUBLIC_API_BASE_URL

export const apiClient = axios.create({
  baseURL: BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use((config) => {
  const token = authStore.getState().token
  if (token && config.headers && (config as any).isAuthRequired !== false) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function apiFetch<T>(
    path: string,
    options: any = {},
    isAuthRequired: { isAuthRequired?: boolean } = { isAuthRequired: true }
  ): Promise<T> {
    try {
      const res = await apiClient({
        url: path,
        ...options,
        isAuthRequired: isAuthRequired?.isAuthRequired,
      })
  
      return res.data
    } catch (error: any) {
      const errorBody = error?.response?.data ?? null
  
      const apiError: ApiError = {
        error: errorBody?.error ?? "API_ERROR",
        message: errorBody?.message ?? "API request failed",
        status_code: errorBody?.status_code,
        retryAfter: errorBody?.retryAfter,
      }
  
      throw apiError
    }
  }
