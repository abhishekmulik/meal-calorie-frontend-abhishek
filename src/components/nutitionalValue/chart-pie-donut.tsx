"use client"

import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { CalorieLookupResponse } from "@/types"

type ChartPieTypes = {
  food: CalorieLookupResponse
}

const DONUT_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(340 65% 55%)"
];

const macroMap = [
  { key: "protein", label: "Protein" },
  { key: "carbohydrates", label: "Carbs" },
  { key: "total_fat", label: "Fat" },
  { key: "fiber", label: "Fiber" },
  { key: "sugars", label: "Sugar" },
  { key: "saturated_fat", label: "SaturatedFat" },
] as const

export function ChartPieDonut({food}: ChartPieTypes) {
  const {macronutrients_per_serving} = food
  
  const chartData = macroMap
  .map((macro, index) => {
    const value = macronutrients_per_serving[macro.key]
    if (!value) return null
    return {
      macro: macro.label,
      value,
      fill: DONUT_COLORS[index],
    }
  })
  .filter(Boolean)

  const chartConfig: ChartConfig = {
    value: {
      label: "Grams",
    },
    ...Object.fromEntries(
      macroMap.map((macro, index) => [
        macro.label,
        {
          label: macro.label,
          color: DONUT_COLORS[index],
        },
      ])
    ),
  }
  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Macronutrient Breakdown</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[260px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="macro"
              innerRadius={70}
              strokeWidth={4}
            />
          </PieChart>
        </ChartContainer>
        <div className="flex flex-wrap justify-center gap-3 mt-2">
            {chartData.map((nutri) => (
              <div key={nutri?.macro} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  className="h-2.5 w-2.5 rounded-full inline-block"
                  style={{ backgroundColor: nutri?.fill }}
                />
                {nutri?.macro} ({nutri?.value}g)
              </div>
            ))}
          </div>
      </CardContent>
    </Card>
  )
}
