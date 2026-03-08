import { CalorieLookupResponse } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { authStore } from "./authStore"

type MealState = {
  foods: Record<string, CalorieLookupResponse[]>
  addFood: (food: CalorieLookupResponse) => void
}

export const mealStore = create<MealState>()(
  persist(
    (set) => ({
      foods: {},
      addFood: (food) => {
        const userId = authStore.getState().user?.id || "guest"
        set((state) => ({
          foods: {
            ...state.foods,
            [userId]: [food, ...(state?.foods?.[userId] || [])],
          },
        }))
      },
    }),
    { name: "meals" }
  )
)