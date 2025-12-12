import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PricesSection } from "../PricesSection";

describe("PricesSection", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("loads and renders daily prices table", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        updatedAt: "2025-12-12T18:33:15.344Z",
        payload: { mgb_bmc: 7.99 }
      })
    } as any);

    render(<PricesSection language="en" />);

    const button = screen.getByText("Load today s prices");
    fireEvent.click(button);

    await waitFor(() =>
      expect(
        screen.getByText("Mediterranean Grain Bowl")
      ).toBeInTheDocument()
    );
    expect(screen.getByText("7.99 $")).toBeInTheDocument();
  });
});
