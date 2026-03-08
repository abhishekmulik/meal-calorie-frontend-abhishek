"use client"
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "@/constants";
import { authStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const hasHydrated = authStore((state) => state.hasHydrated)
  const userInfo = authStore((state) => state.user)
  useEffect(()=>{
    if(!hasHydrated) return 
    if(userInfo){
      router.replace(DASHBOARD_ROUTE)
    }else{
      router.replace(LOGIN_ROUTE)
    }
  },[router, hasHydrated, userInfo])
  return null
}
