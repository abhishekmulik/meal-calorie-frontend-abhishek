import { LOGIN_ROUTE } from "@/constants";
import { authStore } from "@/stores/authStore"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthGuard = () => {
    const token = authStore(state=> state.token);
    const hasHydrated = authStore((state) => state.hasHydrated)
    const router = useRouter();

    useEffect(()=>{
        if (!hasHydrated) return
        if(!token) router.replace(LOGIN_ROUTE)
    },[hasHydrated, token, router])

    if (!hasHydrated) return false
    return !!token
}   
