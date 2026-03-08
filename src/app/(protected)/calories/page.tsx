import FadeInAnimation from "@/components/common/fade-in-animation";
import MealForm from "@/components/mealform/meal-form";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Get Calories",
    description: "Get nutritional value for any food items",
};


export default function page() {
    return <>
        <FadeInAnimation>
            <div className="text-center py-10">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
                    What&apos;s on your plate?
                </h1>
                <p className="text-muted-foreground text-lg max-w-lg mx-auto animate-fade-in">
                    Search any dish to instantly see calories, protein, carbs, and more.
                </p>
            </div>
        <MealForm />
        </FadeInAnimation>
    </>
}
