"use client"
import { useCalorieLookup } from "@/hooks/useCalorieLookup";
import { CalorieLookupPayload } from "@/types";
import { calorieSearchSchema, CalorieSearchFormInput, CalorieSearchSchema } from "@/types/schemas/calorie-lookup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, Search } from "lucide-react";
import { useForm } from "react-hook-form";


import { useState } from "react";

import { handleAPIError } from "@/lib/error-handling";
import { ApiError } from "@/types";
import { cn } from "@/lib/utils";
import FadeInAnimation from "../common/fade-in-animation";
import ResultCard from "../nutitionalValue/ResultCard";
import { SpinnerButton } from "../common/spinner-button";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const defaultServings = 1;

export default function MealForm() {
    const { mutate: lookupMutation, isPending, data: food } = useCalorieLookup();
    const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<CalorieSearchFormInput, unknown, CalorieSearchSchema>({
        resolver: zodResolver(calorieSearchSchema),
        defaultValues: {
            servings: defaultServings,
        }
    })
    const [servings, setServings] = useState(defaultServings);
    const onSubmit = (data: CalorieSearchSchema) => {
        const payload: CalorieLookupPayload = {
            dish_name: data.query,
            servings: data.servings
        }
        lookupMutation(payload, {
            onError: (err: ApiError) => {
                const errorObj = handleAPIError(err)
                if (errorObj) {
                    setError("servings", {
                        type: "server",
                        message: errorObj.message || ''
                    })
                }
            }
        })
    }

    return <>
        <div className="w-[60%] mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <div className="relative flex-1" >
                            <Search className="absolute left-3 top-[24px] -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input data-testid="meal-input"
                                {...register("query")}
                                placeholder="Enter dish name"
                                className={cn("pl-10 h-12 text-base", errors?.query?.message && 'border-red-500 focus-visible:ring-red-500 focus-visible:ring-1')}
                            />
                            <p className="text-sm text-start text-red-500 min-h-[20px]">
                                {errors.query?.message || ''}
                            </p>
                        </div>
                    </div>
                    <SpinnerButton type="submit" data-testid="submit-btn"
                        className="gradient-warm text-primary-foreground h-12 px-6 font-semibold"
                        disabled={isPending} isLoading={isPending} loadingText="Searching..." >
                        Search
                    </SpinnerButton>
                </div>

                <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="flex flex-col items-center">
                        <span className="text-sm text-muted-foreground mb-1">Servings:</span>
                        <div
                            className={cn(
                                "flex items-center gap-2 rounded-full border border-border px-2 py-1 w-[160px] justify-between",
                                errors?.servings?.message && "border-red-500"
                            )}
                        >
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                disabled={servings <= 0}
                                onClick={() => {
                                    const value = Math.max(0, servings - 0.5);
                                    setServings(value);
                                    setValue("servings", value);
                                }}
                                className="h-7 w-7 rounded-full"
                            >
                                <Minus className="h-3.5 w-3.5" />
                            </Button>

                            <span className="w-14 text-center font-semibold text-foreground">
                                {servings}
                            </span>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    const value = servings + 0.5;
                                    setServings(value);
                                    setValue("servings", value);
                                }}
                                className="h-7 w-7 rounded-full"
                            >
                                <Plus className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                        <p className="text-sm text-red-500 min-h-[20px] mt-1 text-center w-[160px]">
                            {errors.servings?.message || ""}
                        </p>
                    </div>
                </div>
            </form>
        </div>
        {food ? <FadeInAnimation>
            <div className="max-w-7xl m-auto">
                <ResultCard food={food} />
            </div></FadeInAnimation> : null
        }
    </>
}
