"use client"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { ReactNode } from "react"

type AuthGuardProps = {
    children: ReactNode
}

export default function AuthGuard({ children}: AuthGuardProps) {
  const isAuthenticated = useAuthGuard()
  if (!isAuthenticated) return null
  return <>{children}</>
}