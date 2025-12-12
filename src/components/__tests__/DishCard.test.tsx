import { render, screen, fireEvent } from "@testing-library/react";
import { DishCard } from "../DishCard";
import type { Dish } from "../../data/menu";

const sampleDish: Dish = {
  id: "test",
  code: "tst",
  name: { en: "Test dish", fr: "Plat test" },
  description: { en: "Description", fr: "Description" },
  ingredients: {
    en: ["First ingredient", "Second ingredient"],
    fr: ["Premier", "Deuxieme"]
  }
};

describe("DishCard", () => {
  it("toggles ingredients panel", () => {
    render(<DishCard dish={sampleDish} language="en" />);

    const toggle = screen.getByRole("button", { name: /show ingredients/i });
    fireEvent.click(toggle);

    expect(screen.getByText("First ingredient")).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(screen.queryByText("First ingredient")).not.toBeInTheDocument();
  });
});
