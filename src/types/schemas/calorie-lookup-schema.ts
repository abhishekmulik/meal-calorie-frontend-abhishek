import { z } from "zod"

export const calorieSearchSchema = z.object({
  query: z.string().trim().min(1, "Dish name is required").max(40, "Dish name too long"),
  servings: z.coerce.number().min(0.5, "Servings cannot be zero")
})

export type CalorieSearchFormInput = z.input<typeof calorieSearchSchema>
export type CalorieSearchSchema = z.output<typeof calorieSearchSchema>
