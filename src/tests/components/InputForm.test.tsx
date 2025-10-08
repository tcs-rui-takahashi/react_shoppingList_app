import { render, screen } from "@testing-library/react";
import { InputForm } from "../../apps/components/InputForm";

describe("inputForm", () => {
  it("フォーム見出しが表示される", () => {
    render(<InputForm />);
    expect(
      screen.getByRole("heading", { name: /add items here/i })
    ).toBeInTheDocument();
  });
});
