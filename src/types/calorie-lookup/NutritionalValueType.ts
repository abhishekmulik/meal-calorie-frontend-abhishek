
export interface MatchedFood {
    name: string
    fdc_id: number
    data_type: string
    published_date: string
}
export interface IngredientBreakdown {
    name: string
    calories_per_100g: number
    macronutrients_per_100g: Macronutrients
    serving_size: string
    data_type: string
    fdc_id: number
    brand?: string
}
export interface Macronutrients {
    protein: number
    total_fat: number
    carbohydrates: number
    fiber?: number
    sugars?: number
    saturated_fat?: number
}
export interface CalorieLookupResponse {
    dish_name: string
    servings: number
    calories_per_serving: number
    total_calories: number
    macronutrients_per_serving: Macronutrients
    total_macronutrients: Macronutrients
    source: string
    ingredient_breakdown: IngredientBreakdown[]
    matched_food: MatchedFood
    foodId?: string
}

export type CalorieLookupPayload = {
    dish_name: string,
    servings: number
}