import { CALORIE_LOOKUP } from "@/constants"
import { apiFetch } from "@/lib/api"
import { CalorieLookupPayload, CalorieLookupResponse } from "@/types"

export async function calorieLookup(data: CalorieLookupPayload) {
  return apiFetch<CalorieLookupResponse>(CALORIE_LOOKUP, {
    method: "POST",
    data: data,
  })
}