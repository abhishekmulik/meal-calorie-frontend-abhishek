import { nutritionFacts } from "@/constants";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fetchGreetings(){
    const hour = new Date().getHours();
    if (hour<12) return "Good morning"
    if (hour<17) return "Good afternoon";
    return "Good evening"
}

export function getRandomFoodFact(){
  return nutritionFacts[Math.floor(Math.random() * nutritionFacts.length)]
}


