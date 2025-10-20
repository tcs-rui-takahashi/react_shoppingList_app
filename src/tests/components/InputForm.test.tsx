import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { InputForm } from "../../apps/components/InputForm";

describe("inputForm", () => {
  it("フォーム送信時にonAddItemが正しく呼ばれる", async () => {
    const mockOnAddItem = vi.fn();

    const user = userEvent.setup();

    render(<InputForm onAddItem={mockOnAddItem} />);

    const input = screen.getByPlaceholderText("アイテム名");
    await user.type(input, "牛乳");
    await user.keyboard("{Enter}");

    expect(mockOnAddItem).toHaveBeenCalledTimes(1);
    const arg = mockOnAddItem.mock.calls[0][0];
    expect(arg.name).toBe("牛乳");
    expect(arg.completed).toBe(false);
    expect(typeof arg.id).toBe("string");
  });
});
