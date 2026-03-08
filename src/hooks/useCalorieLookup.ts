import { calorieLookup } from "@/lib/calorieLookup";
import { mealStore } from "@/stores/mealStore";
import { ApiError, CalorieLookupPayload, CalorieLookupResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from 'uuid';

export function useCalorieLookup() {
    return useMutation<CalorieLookupResponse, ApiError, CalorieLookupPayload>({
        mutationFn: calorieLookup,
        onSuccess: (data) => {
            mealStore.getState().addFood({foodId : uuidv4(), ...data})
          }
      })
}