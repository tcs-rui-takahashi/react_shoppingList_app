import { render, screen } from "@testing-library/react";
import { ItemList } from "../../apps/components/ItemList";

describe("ItemList", () => {
  it("見出しが表示される", () => {
    render(<ItemList items={[]} />);
    expect(
      screen.getByRole("heading", { name: /shopping items/i })
    ).toBeInTheDocument();
  });
});
