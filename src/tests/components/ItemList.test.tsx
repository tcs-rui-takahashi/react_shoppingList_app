import { render, screen } from "@testing-library/react";
import { ItemList } from "../../apps/components/ItemList";

describe("ItemList", () => {
  it("見出しが表示される", () => {
    render(<ItemList />);
    expect(
      screen.getByRole("heading", { name: /item list/i })
    ).toBeInTheDocument();
  });

  it("Item コンポーネントが3つ描画される", () => {
    render(<ItemList />);
    const items = screen.getAllByRole("group");
    expect(items.length).toHaveLength(3);
  });
});
