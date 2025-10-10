import { render, screen } from "@testing-library/react";
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
});
