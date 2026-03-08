import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { CalorieLookupResponse } from "@/types"
  
type TableChartTypes = {
   food: CalorieLookupResponse
}
  
export function TableChart({ food }: TableChartTypes) {
    const {macronutrients_per_serving, total_macronutrients, servings} = food
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nutrient</TableHead>
            <TableHead>Per serving ({food.ingredient_breakdown[0]?.serving_size})</TableHead>
            <TableHead className="font-bold">Total ({servings}x)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-96 overflow-scroll">
            <TableRow className="bg-muted/50">
            <TableCell className="font-bold">Calories</TableCell>
            <TableCell className="font-bold">{food.calories_per_serving} kcal</TableCell>
            <TableCell className="font-bold">{food?.total_calories} kcal</TableCell>
            </TableRow> 
          <TableRow>
            <TableCell className="font-medium">Protein</TableCell>
            <TableCell >{macronutrients_per_serving?.protein} g</TableCell>
            <TableCell className="font-bold">{total_macronutrients?.protein} g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Carbohydrates</TableCell>
            <TableCell>{macronutrients_per_serving?.carbohydrates} g</TableCell>
            <TableCell className="font-bold">{total_macronutrients?.carbohydrates} g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Total Fat</TableCell> 
            <TableCell>{macronutrients_per_serving?.total_fat} g</TableCell>
            <TableCell className="font-bold">{total_macronutrients?.total_fat} g</TableCell>
          </TableRow>
          {macronutrients_per_serving?.fiber && total_macronutrients?.fiber && (
            <TableRow>
              <TableCell className="font-medium">Fiber</TableCell>
              <TableCell>{macronutrients_per_serving?.fiber} g</TableCell>
              <TableCell className="font-bold">{total_macronutrients?.fiber} g</TableCell>
            </TableRow>
          )}
          {macronutrients_per_serving?.sugars && total_macronutrients?.sugars && (
            <TableRow>
              <TableCell className="font-medium">Sugars</TableCell>
              <TableCell>{macronutrients_per_serving.sugars} g</TableCell>
              <TableCell className="font-bold">{total_macronutrients.sugars} g</TableCell>
            </TableRow>
          )}
          {macronutrients_per_serving?.saturated_fat && total_macronutrients?.saturated_fat && (
            <TableRow>
              <TableCell className="font-medium">Saturated Fat</TableCell>
              <TableCell>{macronutrients_per_serving.saturated_fat} g</TableCell>
              <TableCell className="font-bold">{total_macronutrients.saturated_fat} g</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }