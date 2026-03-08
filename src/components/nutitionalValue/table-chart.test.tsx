import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TableChart } from "./table-chart";

const mockFood = {
  servings: 2,
  calories_per_serving: 200,
  total_calories: 400,
  ingredient_breakdown: [
    {
      serving_size: "100g",
    },
  ],
  macronutrients_per_serving: {
    protein: 10,
    carbohydrates: 20,
    total_fat: 5,
    fiber: 3,
    sugars: 4,
    saturated_fat: 1,
  },
  total_macronutrients: {
    protein: 20,
    carbohydrates: 40,
    total_fat: 10,
    fiber: 6,
    sugars: 8,
    saturated_fat: 2,
  },
};

describe("TableChart", () => {
  it("renders table headers correctly", () => {
    render(<TableChart food={mockFood as any} />);
    expect(screen.getByText(/nutrient/i)).toBeInTheDocument();
    expect(screen.getByText(/per serving/i)).toBeInTheDocument();
    expect(screen.getByText(/total \(2x\)/i)).toBeInTheDocument();
  });


  it("renders macronutrients values", () => {
    render(<TableChart food={mockFood as any} />);
    const caloriesRow = screen.getByText(/calories/i).closest("tr");
    expect(within(caloriesRow!).getByText("200 kcal")).toBeInTheDocument();
    expect(within(caloriesRow!).getByText("400 kcal")).toBeInTheDocument();
    const proteinRow = screen.getByText(/protein/i).closest("tr");
    expect(within(proteinRow!).getByText("10 g")).toBeInTheDocument();
    expect(within(proteinRow!).getByText("20 g")).toBeInTheDocument();
    const carbRow = screen.getByText(/carbohydrates/i).closest("tr");
    expect(within(carbRow!).getByText("20 g")).toBeInTheDocument();
    expect(within(carbRow!).getByText("40 g")).toBeInTheDocument();
    const fatRow = screen.getByText(/total fat/i).closest("tr");
    expect(within(fatRow!).getByText("5 g")).toBeInTheDocument();
    expect(within(fatRow!).getByText("10 g")).toBeInTheDocument();
  });

  it("renders optional nutrients when present", () => {
    render(<TableChart food={mockFood as any} />);
    expect(screen.getByText(/fiber/i)).toBeInTheDocument();
    expect(screen.getByText(/sugars/i)).toBeInTheDocument();
    expect(screen.getByText(/saturated fat/i)).toBeInTheDocument();
  });

  it("does not render optional nutrients when absent", () => {
    const foodWithoutOptional = {
      ...mockFood,
      macronutrients_per_serving: {
        protein: 10,
        carbohydrates: 20,
        total_fat: 5,
      },
      total_macronutrients: {
        protein: 20,
        carbohydrates: 40,
        total_fat: 10,
      },
    };

    render(<TableChart food={foodWithoutOptional as any} />);
    expect(screen.queryByText(/fiber/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sugars/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/saturated fat/i)).not.toBeInTheDocument();
  });
});