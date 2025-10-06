import { render, screen } from "@testing-library/react";
import { TotalAmount } from "../../apps/components/TotalAmount";

describe("TotalAmount", () => {
  it("見出しが表示される", () => {
    render(<TotalAmount />);
    expect(
      screen.getByRole("heading", { name: /total amount/i })
    ).toBeInTheDocument();
  });
});
