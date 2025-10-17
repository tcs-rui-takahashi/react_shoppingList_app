import { render, screen, fireEvent } from "@testing-library/react";
import App from "../apps/App";

describe("App", () => {
  it("ヘッダーのタイトルが表示される", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /shopping list app/i })
    ).toBeInTheDocument();
  });

  it("フッターのコピーライトが表示される", () => {
    render(<App />);
    expect(screen.getByText(/© 2025 shopping app/i)).toBeInTheDocument();
  });

  it("フォーム送信でアイテムが1件追加される", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("アイテム名");
    const button = screen.getByRole("button", { name: "追加" });

    fireEvent.change(input, { target: { value: "牛乳" } });
    fireEvent.click(button);

    const itemList = screen.getByRole("heading", { name: /item list/i });
    expect(itemList).toBeInTheDocument();
  });
});
