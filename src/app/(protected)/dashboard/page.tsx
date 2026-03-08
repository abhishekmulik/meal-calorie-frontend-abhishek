import WelcomeGreetings from "@/components/welcomeGreetings/welcome-greetings";
import MealHistoryTable from "@/components/meal-history-table";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Track your meals and monitor your daily calorie intake easily.",
};

export default function page() {
    return <>
        <div className="mb-10">
            <WelcomeGreetings />
        </div>
        <div className="max-w-7xl mx-auto">
            <MealHistoryTable />
        </div>

    </>
}
