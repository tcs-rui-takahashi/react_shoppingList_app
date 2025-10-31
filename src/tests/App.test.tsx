import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../apps/App";

describe("App", () => {
  test("ヘッダーのタイトルが表示される", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /shopping list app/i })
    ).toBeInTheDocument();
  });

  test("フッターのコピーライトが表示される", () => {
    render(<App />);

    expect(screen.getByText(/© 2025 shopping app/i)).toBeInTheDocument();
  });

  test("フォーム送信でアイテムが1件追加され、リストに表示される", async () => {
    render(<App />);
    const openButton = screen.getByRole("button", { name: "アイテムを新規追加" });
    await userEvent.click(openButton);

    const input = await screen.findByPlaceholderText("例: にんじん, 牛乳, 食パン");
    await userEvent.type(input, "りんご");

    const addButton = screen.getByRole("button", { name: "追加する" });
    await userEvent.click(addButton);
    
    expect(await screen.findByText("りんご")).toBeInTheDocument();
    expect(screen.queryByText("アイテムがありません")).toBeNull();
  });
});
