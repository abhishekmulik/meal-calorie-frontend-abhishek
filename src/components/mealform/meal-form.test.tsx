import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MealForm from "./meal-form";
import { ReactNode } from "react";

function renderWithClient(ui: ReactNode) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe("MealForm", () => {
  test("renders input and button", () => {
    renderWithClient(<MealForm />);
    expect(screen.getByTestId("meal-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
  });

  test("shows validation error when submitting empty form", async () => {
    renderWithClient(<MealForm />);
    const button = screen.getByTestId("submit-btn");
    await userEvent.click(button);
    expect(await screen.findByText(/required/i)).toBeInTheDocument();
  });
});