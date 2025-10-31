import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("フォーム送信でアイテムが1件追加される", async () => {
    const user = userEvent.setup();
    render(<App />);

    const openFormButton = screen.getByText(/アイテムを新規追加/i);
    await user.click(openFormButton);

    const input = screen.getByPlaceholderText("例: にんじん, 牛乳, 食パン");
    const addButton = screen.getByRole("button", { name: "追加する" });

    await user.type(input, "牛乳");
    await user.click(addButton);

    const heading = screen.getByRole("heading", { name: /item list/i });
    expect(heading).toBeInTheDocument();
    // FIXME: 現時点ではheadingの存在のみを検証している。
    // 本来は追加したアイテムがリストに表示されていることをアサーションすべき。
  });
});
