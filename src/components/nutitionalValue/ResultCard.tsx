import { Flame } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { TableChart } from "./table-chart";
import { CalorieLookupResponse } from "@/types";
import { ChartPieDonut } from "./chart-pie-donut";

type ResultCardProps = {
    food: CalorieLookupResponse
}

export default function ResultCard(props: ResultCardProps){
    const {food} = props
    const [showDonutChart, setDonutChart] = useState(true);

    return <div className="rounded-lg bg-card p-5 shadow-card animate-fade-in border border-border">
        <div className="flex items-start justify-between mb-4">
        <div className="text-start">
          <h3 className="font-display text-lg font-bold text-foreground">{food.dish_name}</h3>
          <p className="text-sm text-muted-foreground"> 1 serving ({food?.ingredient_breakdown?.[0].serving_size}) x {food.servings}
            {food.source && <span className="ml-2 opacity-60"> - {food.source}</span>}
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-full px-3 py-1">
          <Flame className="h-4 w-4 text-primary-foreground" />
          <span className="text-sm font-semibold text-primary-foreground">{food.total_calories} kcal</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Label htmlFor="view-mode" className="text-sm text-muted-foreground cursor-pointer">Table</Label>
        <Switch id="view-mode" checked={showDonutChart} onCheckedChange={setDonutChart} />
        <Label htmlFor="view-mode" className="text-sm text-muted-foreground cursor-pointer">Chart</Label>
      </div>
      {
        showDonutChart ? <ChartPieDonut food={food}/> : <TableChart food={food}/>
      }
    </div>
}