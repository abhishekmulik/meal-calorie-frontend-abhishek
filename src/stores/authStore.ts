import { User } from "@/types";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware"

type AuthState = {
    token: string | null
    hasHydrated: boolean
    setToken: (token: string) => void
    setHasHydrated: (hasHydrated: boolean) => void
    logout: () => void
    user: User | null
}

type DecodedData = {
    "userId": number,
    "first_name": string,
    "last_name": string,
    "email": string,
    "iat": number
    "exp": number
}

const localStorageKey = 'authx';

export const authStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            hasHydrated: false,
            setToken: (token) => {
                const decoded: DecodedData = jwtDecode(token)
                set({
                  token,
                  user: {
                    id: decoded.userId,
                    email: decoded.email,
                    first_name: decoded.first_name,
                    last_name: decoded.last_name
                  },
                })
              },
            setHasHydrated: (hasHydrated) => set({ hasHydrated }),
            logout: () => {
                set({ token: null, user: null })
                window.localStorage.removeItem(localStorageKey)
            }
        }),
        {
            name: localStorageKey,
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            },
        }
    )
)