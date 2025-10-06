import { render, screen } from "@testing-library/react";
import App from "../apps/App";

it("ヘッダーのタイトルが表示される", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /vite \+ react/i })
  ).toBeInTheDocument();
});
