"use client"

import { useAuthGuard } from "@/hooks/useAuthGuard"
import { ReactNode } from "react"

export default function ProtectedLayout({ children }: {children: ReactNode}) {
  const isAuthenticated = useAuthGuard()
  if(!isAuthenticated){
    return null
  }
  return children
}
