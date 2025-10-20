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

    const input = screen.getByPlaceholderText("アイテム名");
    const button = screen.getByRole("button", { name: "追加" });

    await user.type(input, "牛乳");
    await user.click(button);

    const heading = screen.getByRole("heading", { name: /item list/i });
    expect(heading).toBeInTheDocument();
  });
});
