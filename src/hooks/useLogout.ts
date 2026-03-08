import { LOGIN_ROUTE } from "@/constants"
import { authStore } from "@/stores/authStore"
import { useRouter } from "next/navigation"

export function useLogout() {
  const router = useRouter()
  const handleLogout = () => {
    authStore.getState().logout()
    router.replace(LOGIN_ROUTE)
  }
  return handleLogout
}